"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

/** All the page's behavior: smooth scroll, loader, music, language switch, details drawer, scroll scenes.
 *  The markup is server-rendered; this only wires it up (and tears it down, for dev's double mount). */
export function Motion() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ac = new AbortController();
    const on = { signal: ac.signal };
    const $ = <E extends Element = HTMLElement>(s: string, r: ParentNode = document) => r.querySelector<E>(s)!;
    const $$ = <E extends Element = HTMLElement>(s: string, r: ParentNode = document) => [...r.querySelectorAll<E>(s)];
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const root = document.documentElement;
    const store = {
      get: (k: string) => { try { return localStorage.getItem(k); } catch { return null; } },
      set: (k: string, v: string) => { try { localStorage.setItem(k, v); } catch {} },
    };
    let lenis: Lenis | null = null;
    const raf = (t: number) => lenis?.raf(t * 1000);
    const mm = gsap.matchMedia();
    const svg = $<SVGSVGElement>(".net__lines");

    const ctx = gsap.context(() => {
      /* ---------- smooth scroll ---------- */
      if (!reduce) {
        lenis = new Lenis({ lerp: 0.1 });
        lenis.on("scroll", ScrollTrigger.update);
        gsap.ticker.add(raf);
        gsap.ticker.lagSmoothing(0);
      }
      $$<HTMLAnchorElement>('a[href^="#"]').forEach((a) => a.addEventListener("click", (e) => {
        const target = document.querySelector<HTMLElement>(a.getAttribute("href")!);
        if (!target) return;
        e.preventDefault();
        if (lenis) lenis.scrollTo(target, { duration: 1.4 });
        else target.scrollIntoView({ behavior: "smooth" });
      }, on));

      /* ---------- music ----------
         Every browser blocks sound until the visitor clicks, taps or presses a key,
         so the gesture that enters the page (see loader) is the one that starts Marea.
         The button mutes and is remembered. */
      const audio = $<HTMLAudioElement>("audio");
      const player = $(".player");
      let fadeRaf = 0;
      const fade = (to: number, ms: number, done?: () => void) => {
        cancelAnimationFrame(fadeRaf);
        const from = audio.volume, t0 = performance.now();
        const step = (t: number) => {
          const k = Math.min(1, (t - t0) / ms);
          audio.volume = from + (to - from) * k;
          if (k < 1) fadeRaf = requestAnimationFrame(step);
          else done?.();
        };
        fadeRaf = requestAnimationFrame(step);
      };
      const setPlaying = (playing: boolean) => { player.classList.toggle("is-playing", playing); player.setAttribute("aria-pressed", String(playing)); };
      // starts at full volume, no fade-in
      const play = () => {
        cancelAnimationFrame(fadeRaf);
        audio.volume = 1;
        return audio.play().then(() => { setPlaying(true); return true; }).catch(() => false);
      };
      const stop = () => fade(0, 500, () => { audio.pause(); setPlaying(false); });
      // with <source> children, only the last source reports when every option failed
      $$("source", audio).at(-1)!.addEventListener("error", () => { player.dataset.missing = ""; player.title = "Music unavailable"; }, on);
      player.addEventListener("click", () => {
        if (audio.paused) { store.set("muted", "0"); play(); } else { store.set("muted", "1"); stop(); }
      }, on);

      /* ---------- language ----------
         Both languages are in the HTML; <html lang> (set before paint in layout.tsx) picks one. */
      const langBtn = $(".lang");
      const label = () => langBtn.setAttribute("aria-label", root.lang === "es" ? "Switch to English" : "Cambiar a español");
      label();
      langBtn.addEventListener("click", () => {
        root.lang = root.lang === "es" ? "en" : "es";
        store.set("lang", root.lang);
        label();
        ScrollTrigger.refresh(); // text lengths change, so pinned scenes re-measure
      }, on);

      /* ---------- loader ---------- */
      const loader = $(".loader");
      const countEl = $(".loader__count .n");
      const imgs = $$<HTMLImageElement>("img").filter((i) => i.loading !== "lazy");
      let loaded = imgs.filter((i) => i.complete).length;
      const progress = { v: 0 };
      const showCount = () => (countEl.textContent = String(Math.round(progress.v)).padStart(3, "0"));
      const tick = () => gsap.to(progress, { v: (loaded / Math.max(1, imgs.length)) * 100, duration: 0.6, ease: "power2.out", onUpdate: showCount });
      const ready = Promise.all(imgs.filter((i) => !i.complete).map((img) =>
        new Promise((r) => { img.addEventListener("load", r, on); img.addEventListener("error", r, on); }).then(() => { loaded++; tick(); })));
      tick();
      const minTime = new Promise((r) => setTimeout(r, reduce ? 0 : 1800));

      lenis?.stop();
      if (!reduce) gsap.from(".loader__name .line > span", { yPercent: 110, duration: 1.2, stagger: 0.08, ease: "expo.out", delay: 0.1 });

      // at 100% the ring waits; the click / tap / key that enters is the one that starts Marea
      Promise.all([ready, minTime, document.fonts.ready]).then(() => {
        if (ac.signal.aborted) return;
        gsap.timeline()
          .to(progress, { v: 100, duration: 0.4, onUpdate: showCount })
          .to(".loader__count", { opacity: 0, y: -8, duration: 0.4, ease: "power2.in" }, "+=0.2")
          .add(() => {
            loader.classList.add("is-ready");
            loader.tabIndex = 0;
            loader.focus({ preventScroll: true });
            loader.addEventListener("click", enter, on);
            addEventListener("keydown", enter, on);
          });
      });

      let entered = false;
      function enter(e: Event) {
        if (entered || (e instanceof KeyboardEvent && ["Escape", "Tab", "Shift", "Meta", "Alt", "Control"].includes(e.key))) return;
        entered = true;
        loader.removeEventListener("click", enter);
        removeEventListener("keydown", enter);
        const withSong = store.get("muted") !== "1";
        if (withSong) play(); // called inside the gesture, so every browser allows it
        loader.classList.remove("is-ready");
        gsap.timeline({ onComplete: () => { loader.style.display = "none"; lenis?.start(); ScrollTrigger.refresh(); } })
          .to(".loader__ring", { scale: 1.6, opacity: 0, duration: 1.2, ease: "expo.inOut" })
          .to(".loader__beam", { scaleX: 0, opacity: 0, duration: 0.8, ease: "expo.inOut" }, "<")
          .to(".loader__name .line > span", { yPercent: -110, duration: 0.8, stagger: 0.06, ease: "expo.in" }, "<")
          .to([".loader__foot", ".loader .label"], { opacity: 0, duration: 0.4, ease: "power2.in" }, "<")
          .to(loader, { opacity: 0, duration: 0.6 }, "-=0.4")
          .add(withSong ? nowPlaying : () => heroIn(true), "-=0.5");
      }

      /* the song takes the screen, then the card shrinks into the player's cover (FLIP) */
      function nowPlaying() {
        const np = $(".np");
        if (reduce) { np.style.display = "none"; return; }
        const card = $(".np__card"), cover = $(".np__cover");
        gsap.set(np, { visibility: "visible" });
        gsap.set(player, { opacity: 0 });
        gsap.timeline()
          .fromTo(cover, { scale: 0.85, opacity: 0 }, { scale: 1, opacity: 1, duration: 1, ease: "expo.out" })
          .fromTo(".np__text > *", { y: 24, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9, stagger: 0.08, ease: "expo.out" }, 0.15)
          .add(() => {
            const to = $(".player__cover").getBoundingClientRect(), from = cover.getBoundingClientRect(), c = card.getBoundingClientRect();
            gsap.timeline({ onComplete: () => { np.style.display = "none"; } })
              .to(".np__text", { opacity: 0, x: -20, duration: 0.4, ease: "power2.in" })
              .to(card, { x: to.left - from.left, y: to.top - from.top, scale: to.width / from.width,
                          transformOrigin: `${from.left - c.left}px ${from.top - c.top}px`, duration: 1.1, ease: "expo.inOut" }, 0.1)
              .to(np, { backgroundColor: "rgba(0,0,0,0)", duration: 0.9, ease: "power2.inOut" }, 0.1)
              .add(() => heroIn(false), 0.3)
              .to(player, { opacity: 1, duration: 0.3 }, 1.05)
              .to(card, { opacity: 0, duration: 0.25 }, 1.05);
          }, "+=1.3");
      }

      function heroIn(withPlayer: boolean) {
        if (reduce) return;
        gsap.timeline()
          .from(".hero__portrait", { scale: 1.12, opacity: 0, duration: 2, ease: "expo.out" })
          .from(".hero__name .line > span", { yPercent: 110, duration: 1.2, stagger: 0.08, ease: "expo.out" }, 0.15)
          .from(".nav", { y: -20, opacity: 0, duration: 1, ease: "expo.out" }, 0.3)
          .from([".hero__words", ".hero .label", ...(withPlayer ? [".player"] : [])], { opacity: 0, y: 12, duration: 1, stagger: 0.05, ease: "power2.out" }, 0.5);
      }

      /* hero: the portrait smiles on the first scroll down, serious again back at the top */
      const hero = $(".hero");
      const face = $<HTMLVideoElement>(".hero__portrait video");
      face.muted = true;
      // iOS only decodes frames after a (muted) play
      face.play().then(() => { face.pause(); if (!hero.classList.contains("is-smiling")) face.currentTime = 0; }).catch(() => {});
      let heroPinned = false; // desktop: the pinned hero timeline scrubs the smile instead
      const smile = (y: number) => {
        if (heroPinned || hero.classList.contains("is-smiling") === y > 4) return;
        hero.classList.toggle("is-smiling", y > 4);
        // clip is all-keyframe, so scrubbing currentTime both ways is smooth
        gsap.to(face, { currentTime: y > 4 ? (face.duration || 1) - 0.01 : 0, duration: 0.9, ease: "power2.out", overwrite: true });
      };
      if (lenis) lenis.on("scroll", (l: Lenis) => smile(l.scroll));
      else addEventListener("scroll", () => smile(scrollY), { passive: true, signal: ac.signal });

      /* ---------- details: anything with data-detail opens its article in the drawer ---------- */
      const dlg = $<HTMLDialogElement>(".detail");
      const openDetail = (id: string) => {
        $$("article", dlg).forEach((a) => (a.hidden = a.id !== id));
        dlg.showModal();
        dlg.scrollTop = 0;
        lenis?.stop();
        if (!reduce) gsap.fromTo(dlg, { x: 60, opacity: 0 }, { x: 0, opacity: 1, duration: 0.6, ease: "expo.out" });
      };
      $$("[data-detail]").forEach((el) => {
        const id = el.dataset.detail!;
        if (el.tagName !== "BUTTON") { el.tabIndex = 0; el.setAttribute("role", "button"); }
        el.addEventListener("click", () => openDetail(id), on);
        el.addEventListener("keydown", (e) => {
          if (el.tagName !== "BUTTON" && (e.key === "Enter" || e.key === " ")) { e.preventDefault(); openDetail(id); }
        }, on);
      });
      $(".detail__close").addEventListener("click", () => dlg.close(), on);
      // a click on the backdrop (left of the drawer) closes it
      dlg.addEventListener("click", (e) => { if (e.clientX < dlg.getBoundingClientRect().left) dlg.close(); }, on);
      dlg.addEventListener("close", () => lenis?.start(), on);
      // Esc is native for <dialog>, but some browsers skip it without a fresh gesture, so handle it too
      addEventListener("keydown", (e) => { if (e.key === "Escape" && dlg.open) dlg.close(); }, on);

      /* ---------- built: tap a folder to open it, tap again (or its document) to close ---------- */
      const folders = $$(".folder");
      const setOpen = (f: HTMLElement, open: boolean) => {
        f.classList.toggle("is-open", open);
        $(".folder__front", f).setAttribute("aria-expanded", String(open));
      };
      let jump: ((i: number) => void) | null = null; // desktop deck: a tab brings its folder to the front
      folders.forEach((f, i) => {
        $(".folder__front", f).addEventListener("click", () => setOpen(f, !f.classList.contains("is-open")), on);
        $(".folder__back", f).addEventListener("click", (e) => {
          if (!(e.target as Element).closest("a, .folder__front")) setOpen(f, false);
        }, on);
        $(".folder__tab", f).addEventListener("click", () => (jump ? jump(i) : setOpen(f, true)), on);
      });

      /* ---------- sports net: rugby in the middle, the sports on a ring around it; scrolling spins the ring ---------- */
      const board = $(".net__board");
      const core = $(".net__card--core", board);
      const ring = $$(".net__card:not(.net__card--core)", board);
      const n7 = ring.length;
      const mk = (cls?: string) => { const l = document.createElementNS("http://www.w3.org/2000/svg", "line"); if (cls) l.classList.add(cls); svg.append(l); return l; };
      const spokes = ring.map(() => mk("spoke"));
      const rim = ring.map(() => mk());
      const cross = ring.map(() => mk());
      const setLine = (l: SVGLineElement, a: number[], b: number[]) => {
        l.setAttribute("x1", String(a[0])); l.setAttribute("y1", String(a[1])); l.setAttribute("x2", String(b[0])); l.setAttribute("y2", String(b[1]));
      };
      // rot is the ring's turn in radians; cards lower on the ring are nearer: bigger, brighter, on top
      const spin = (rot: number) => {
        const W = board.clientWidth, H = board.clientHeight, c = [W / 2, H / 2];
        const rx = Math.min(W * 0.46, 640), ry = H * 0.4;
        gsap.set(core, { x: c[0], y: c[1], xPercent: -50, yPercent: -50 });
        const pts = ring.map((card, i) => {
          const a = -Math.PI / 2 + (i * 2 * Math.PI) / n7 + rot;
          const depth = (Math.sin(a) + 1) / 2;
          const p = [c[0] + rx * Math.cos(a), c[1] + ry * Math.sin(a)];
          gsap.set(card, { x: p[0], y: p[1], xPercent: -50, yPercent: -50, scale: 0.78 + 0.32 * depth, opacity: 0.55 + 0.45 * depth, zIndex: 1 + Math.round(depth * 18) });
          return p;
        });
        pts.forEach((p, i) => { setLine(spokes[i], c, p); setLine(rim[i], p, pts[(i + 1) % n7]); setLine(cross[i], p, pts[(i + 2) % n7]); });
      };
      let turn = 0;
      spin(turn);
      addEventListener("resize", () => spin(turn), on);

      if (reduce) return; // everything below is motion

      /* sports net: the ring turns as the section scrolls by (pinned on desktop, below) */
      const spinWith = (st: ScrollTrigger) => { turn = st.progress * Math.PI * 1.15; spin(turn); };

      /* ---------- generic reveals ---------- */
      const reveals = $$("[data-reveal]");
      gsap.set(reveals, { opacity: 0, y: 28 });
      ScrollTrigger.batch(reveals, {
        start: "top 88%", once: true,
        onEnter: (b) => gsap.to(b, { opacity: 1, y: 0, duration: 1.1, stagger: 0.08, ease: "expo.out", overwrite: true }),
      });
      $$(".contact [data-lines] .line > span").forEach((el) => gsap.from(el, {
        yPercent: 110, duration: 1.3, ease: "expo.out", scrollTrigger: { trigger: el, start: "top 85%" },
      }));

      /* school: 8.59 counts up, hairlines draw */
      const gpa = $(".gpa span"); const g = { v: 0 };
      ScrollTrigger.create({ trigger: ".gpa", start: "top 85%", once: true,
        onEnter: () => { gsap.to(g, { v: 8.59, duration: 1.8, ease: "power3.out", onUpdate: () => { gpa.textContent = g.v.toFixed(2); } }); } });
      gpa.textContent = "0.00";
      gsap.from(".row__line", { scaleX: 0, duration: 1.4, stagger: 0.1, ease: "expo.out", scrollTrigger: { trigger: ".rows", start: "top 80%" } });
      gsap.from(".row > *:not(.row__line)", { opacity: 0, y: 16, duration: 1, stagger: 0.05, ease: "expo.out", scrollTrigger: { trigger: ".rows", start: "top 80%" } });

      /* likes: tags float in */
      gsap.from(".tags li", { opacity: 0, y: 24, duration: 0.9, stagger: 0.04, ease: "expo.out", scrollTrigger: { trigger: ".tags", start: "top 85%" } });

      /* world: photos drift sideways at different speeds */
      $$(".world__photo").forEach((el) => gsap.fromTo(el, { x: () => 80 * Number(el.dataset.speed) }, {
        x: () => -80 * Number(el.dataset.speed), ease: "none",
        scrollTrigger: { trigger: ".world__strip", start: "top bottom", end: "bottom top", scrub: true, invalidateOnRefresh: true },
      }));

      /* ---------- desktop-only pinned scenes ---------- */
      mm.add("(min-width: 901px)", () => {
        /* Hero: pinned; the first scroll makes the portrait smile, then the five words appear around the face */
        heroPinned = true;
        const dur = () => (face.duration || 1) - 0.01;
        gsap.timeline({ scrollTrigger: { trigger: hero, start: "top top", end: "+=160%", pin: true, scrub: 1, invalidateOnRefresh: true } })
          .fromTo(face, { currentTime: 0 }, { currentTime: dur, duration: 0.35, ease: "none" }, 0)
          .to([".hero__name", ".hero__words", ".hero__bl", ".hero__scroll", ".hero__vert"], { opacity: 0, y: -24, duration: 0.2, stagger: 0.02 }, 0.12)
          .fromTo(".who__head", { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.2 }, 0.3)
          .fromTo(".who__item", { opacity: 0, x: (i: number, el: Element) => (el.classList.contains("who__item--l") ? -40 : 40) },
            { opacity: 1, x: 0, duration: 0.2, stagger: 0.09 }, 0.36);

        /* Built: the folders sit in a drawer, newest in front; scrolling pulls each one out and the next comes forward */
        const cabinet = $(".cabinet");
        cabinet.classList.add("cabinet--deck");
        const n = folders.length;
        const slot = (s: number) => ({ y: -s * 16, scale: 1 - s * 0.035 }); // further back = higher and smaller, so its tab shows
        folders.forEach((f, i) => gsap.set(f, { ...slot(i), zIndex: n - i, transformOrigin: "50% 0%" }));
        let front = 0;
        const deck = gsap.timeline({
          scrollTrigger: {
            trigger: ".built__stage", start: "top top", end: () => "+=" + innerHeight * 0.9 * (n - 1), pin: true, scrub: 1, invalidateOnRefresh: true,
            onUpdate: (st) => {
              const k = Math.round(st.progress * (n - 1));
              if (k !== front) { front = k; folders.forEach((f) => setOpen(f, false)); } // a folder closes when it leaves the front
            },
          },
        });
        for (let k = 0; k < n - 1; k++) {
          // slides down out of the drawer, solid until it is almost gone
          deck.to(folders[k], { yPercent: 105, rotateX: -18, duration: 1, ease: "power2.in" }, k)
            .to(folders[k], { opacity: 0, duration: 0.35, ease: "power1.in" }, k + 0.65);
          for (let j = k + 1; j < n; j++) deck.to(folders[j], { ...slot(j - k - 1), duration: 1, ease: "power2.inOut" }, k);
        }
        jump = (i) => {
          const st = deck.scrollTrigger!;
          const y = st.start + ((st.end - st.start) * i) / (n - 1);
          if (lenis) lenis.scrollTo(y, { duration: 1.2 }); else scrollTo({ top: y, behavior: "smooth" });
        };

        /* Sport: photo starts centered and big, slides to the right */
        const photo = $(".sport__photo");
        const toCenter = () => innerWidth / 2 - (photo.offsetLeft + photo.offsetWidth / 2);
        // fromTo, not from: after a refresh a from() re-reads its start as its end and never moves
        gsap.timeline({ scrollTrigger: { trigger: ".sport", start: "top top", end: "+=120%", pin: true, scrub: 1, invalidateOnRefresh: true } })
          .fromTo(photo, { x: toCenter }, { x: 0, duration: 1, ease: "power2.inOut" })
          .fromTo(".sport__text > *", { opacity: 0, y: 40 }, { opacity: 1, y: 0, stagger: 0.06, duration: 0.5, ease: "power2.out" }, 0.45);

        /* Sports net: pinned while the ring spins (created after the pins above it, so its start accounts for their spacing) */
        ScrollTrigger.create({ trigger: ".net__stage", start: "top top", end: "+=140%", pin: true, scrub: true, onUpdate: spinWith });

        return () => { cabinet.classList.remove("cabinet--deck"); jump = null; heroPinned = false; };
      });
      mm.add("(max-width: 900px)", () => {
        ScrollTrigger.create({ trigger: ".net", start: "top bottom", end: "bottom top", onUpdate: spinWith });
      });

      addEventListener("load", () => ScrollTrigger.refresh(), on);
    });

    return () => {
      ac.abort();
      mm.revert();
      ctx.revert();
      gsap.ticker.remove(raf);
      lenis?.destroy();
      svg.replaceChildren();
    };
  }, []);

  return null;
}
