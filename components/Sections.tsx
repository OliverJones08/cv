import Image, { type StaticImageData } from "next/image";
import type { CSSProperties, ReactNode } from "react";
import { T, Ptr } from "./T";
import restoman from "@/assets/restoman.jpg";
import boutique from "@/assets/boutique-landing.jpg";
import patanazo from "@/assets/patanazo.jpg";
import c3po from "@/assets/c3po.jpg";
import rugbyPost from "@/assets/rugby-post.jpg";
import presenting from "@/assets/presenting.jpg";
import ticx26 from "@/assets/ticx26.jpg";
import nyc from "@/assets/nyc.jpg";
import devconnect from "@/assets/devconnect.jpg";
import colosseum from "@/assets/colosseum.jpg";
import trevi from "@/assets/trevi.jpg";
import navona from "@/assets/navona.jpg";
import cambridgeC1 from "@/assets/certs/cambridge-c1.jpg";
import itbaEssay from "@/assets/certs/itba-essay.jpg";
import claudeCodeInAction from "@/assets/certs/claude-code-in-action.jpg";
import rugbyCelebration from "@/assets/sports/rugby-celebration.jpg";
import rugbyLineout from "@/assets/sports/rugby-lineout.jpg";

const half = "(max-width: 900px) 100vw, 50vw";

/* 03 · Built: a gallery of big screenshots in 3D (KHZ Art). On desktop, scrolling slides them sideways;
   the one in the middle turns flat, stops for a moment and shows its info. On phones it is a plain list.
   Order: the robot first, then Restoman, then the rest. "since" is when each project's repo was created. */
type Project = { name: string; img: StaticImageData; alt: string; href?: string; since: [string, string]; role: [string, string]; desc: [string, string]; stack: string };
const projects: Project[] = [
  {
    name: "C3PO", img: c3po, alt: "Unitree G1 humanoid robot", href: "https://c3po-web.vercel.app", since: ["May 2026", "may. 2026"],
    role: ["ORT final project", "Proyecto final ORT"],
    desc: ["An embodiment layer for LLMs: it gives Claude a Unitree G1 humanoid body. The same code drives the simulator and the real robot.",
           "Una capa de embodiment para LLMs: le da a Claude un cuerpo de humanoide Unitree G1. El mismo código maneja el simulador y el robot real."],
    stack: "SvelteKit · Python · ROS 2 · MCP",
  },
  {
    name: "Restoman", img: restoman, alt: "Restoman website", href: "https://restoman.com.ar", since: ["Aug 2025", "ago. 2025"],
    role: ["My venture", "Mi emprendimiento"],
    desc: ["Full-stack platform to run restaurants: QR menu, orders paid with Mercado Pago, kitchen and counter, analytics. Plus the launch campaigns (BIBIS, Poke & Roll Núñez).",
           "Plataforma full-stack para gestionar restaurantes: menú QR, pedidos pagados con Mercado Pago, cocina y mostrador, analytics. Además, las campañas de lanzamiento (BIBIS, Poke & Roll Núñez)."],
    stack: "Next.js · PostgreSQL · Marketing",
  },
  {
    name: "Boutique de Viajes", img: boutique, alt: "Boutique de Viajes landing page", href: "https://boutiquedeviajes.com/landing", since: ["Sep 2026", "sept. 2026"],
    role: ["For my mom", "Para mi mamá"],
    desc: ["Platform for her travel agency. The agency builds the itinerary; the traveler opens it on the phone with a link and a PIN. Maps, offline mode, AI that imports PDFs.",
           "Plataforma para su agencia de viajes. La agencia arma el itinerario; el viajero lo abre en el celular con un link y un PIN. Mapas, modo offline, IA que importa PDFs."],
    stack: "Next.js 16 · Supabase · Claude AI",
  },
  {
    name: "Patanazo", img: patanazo, alt: "Patanazo website", href: "https://patanazo.vercel.app", since: ["Oct 2026", "oct. 2026"],
    role: ["For my dad · Estudio Jones", "Para mi papá · Estudio Jones"],
    desc: ["Argentine real-estate platform: know the full cost (deed, fees, permits, construction) before you buy, build, renovate or rent.",
           "Plataforma inmobiliaria argentina: conocé el costo total (escritura, honorarios, permisos, obra) antes de comprar, construir, reformar o alquilar."],
    stack: "Next.js 16 · Drizzle · Supabase",
  },
];

const Info = ({ p, i }: { p: Project; i: number }) => (
  <>
    <div>
      <p className="label">{String(i + 1).padStart(2, "0")} · <T en={p.since[0]} es={p.since[1]} /></p>
      <h3 className="plate__name">{p.name}</h3>
      <p className="label role"><T en={p.role[0]} es={p.role[1]} /></p>
    </div>
    <div>
      <p className="desc"><T en={p.desc[0]} es={p.desc[1]} /></p>
      <p className="plate__meta">
        <span className="label fg">{p.stack}</span>
        {p.href && (
          <a className="plate__link" href={p.href} target="_blank" rel="noopener">
            <T en="Visit the site ↗" es="Ver el sitio ↗" />
          </a>
        )}
      </p>
    </div>
  </>
);

export function Built() {
  return (
    <section className="built section" id="built">
      <div className="built__stage">
        <div className="built__side">
          <header className="sec-head">
            <p className="label" data-reveal><T en="02 / Built" es="02 / Proyectos" /></p>
            <h2 className="h2" data-reveal>
              <T en={<>Things I&apos;ve built,<br /><span className="soft">for real people.</span></>} es={<>Cosas que construí,<br /><span className="soft">para gente real.</span></>} />
            </h2>
          </header>
          {/* desktop: the info of the plate in the middle (phones show it under each plate instead) */}
          <div className="built__infos">
            {projects.map((p, i) => <div className="plate__info" key={p.name}><Info p={p} i={i} /></div>)}
          </div>
        </div>
        <ol className="gallery">
          {projects.map((p, i) => (
            <li className="plate" key={p.name}>
              <figure className="plate__img"><Image src={p.img} alt={p.alt} sizes="(max-width: 900px) 100vw, 64vw" /></figure>
              <div className="plate__info"><Info p={p} i={i} /></div>
            </li>
          ))}
        </ol>
      </div>
      <p className="also" data-reveal>
        <T
          en="Also: Jones Cloud (a home cloud that replaces iCloud for my family) · personal website · lifetracker · openforum · ConstructAI · cheatsheets"
          es="También: Jones Cloud (una nube casera que reemplaza iCloud para mi familia) · sitio personal · lifetracker · openforum · ConstructAI · cheatsheets"
        />
      </p>
    </section>
  );
}

/* 04 · Sport: the photo starts centered and slides to the side */
export function Sport() {
  return (
    <section className="sport" id="sport">
      <div className="sport__text">
        <p className="label"><T en="03 / Sport" es="03 / Deporte" /></p>
        <h2 className="h2 h2--xl">
          <T en={<>Rugby,<br /><span className="soft">since I was 4.</span></>} es={<>Rugby,<br /><span className="soft">desde los 4.</span></>} />
        </h2>
        <p className="body">
          <T
            en="I play hooker at Buenos Aires Cricket & Rugby Club: front row, middle of the scrum, and I throw into the lineout."
            es="Juego de hooker en Buenos Aires Cricket & Rugby Club: primera línea, en el medio del scrum, y tiro el line."
          />
        </p>
        <p className="label fg rule"><T en="World Rugby certificates" es="Certificados de World Rugby" /></p>
        <p className="small">
          <T
            en={<>Player: intro, front-row accreditation, concussion, anti-doping<br />Referee: Pre-Level 1, Rugby Ready, Safeguarding, concussion</>}
            es={<>Jugador: intro, acreditación de primera línea, conmoción, antidoping<br />Árbitro: Pre-Level 1, Rugby Ready, Safeguarding, conmoción</>}
          />
        </p>
      </div>
      {/* the original England Rugby Instagram post, as posted (caption stays in English: it's their words) */}
      <figure className="sport__photo">
        <a className="post" href="https://www.instagram.com/englandrugby/" target="_blank" rel="noopener">
          <Image src={rugbyPost} alt="England Rugby's Instagram post from Buenos Aires showing Oliver celebrating at a training with BACRC's young players" sizes="(max-width: 900px) 460px, 40vw" />
        </a>
        <figcaption className="post__caption"><b>englandrugby</b> A fantastic afternoon with the young players of @bacrc1864.</figcaption>
      </figure>
    </section>
  );
}

/* 04b · All the sports: a horizontal gallery of connected cards (Method's photo gallery). On desktop scrolling down
   moves it sideways and it ends at the last card; on phones you drag it. Only rugby has real photos (England Rugby's);
   the other cards are type until there are photos. y, w and gap are fractions of the gallery's height. */
type Card = { en: string; es: string; note?: [string, string]; img?: StaticImageData; alt?: string; ar?: string; y: number; w: number; gap: number };
const cards: Card[] = [
  { en: "Rugby", es: "Rugby", note: ["since 4 · BACRC · photo: England Rugby", "desde los 4 · BACRC · foto: England Rugby"], img: rugbyCelebration, alt: "Oliver celebrating at a BACRC training with England Rugby", y: 0.04, w: 0.56, gap: 0 },
  { en: "Boxing", es: "Boxeo", ar: "4 / 3", y: 0.1, w: 0.52, gap: 0.24 },
  { en: "Rugby", es: "Rugby", note: ["Lineout · BACRC", "Line · BACRC"], img: rugbyLineout, alt: "BACRC players throwing into a lineout at training", y: 0.36, w: 0.5, gap: 0.16 },
  { en: "Krav Maga", es: "Krav Maga", ar: "3 / 4", y: 0.03, w: 0.36, gap: 0.2 },
  { en: "Golf", es: "Golf", ar: "4 / 3", y: 0.52, w: 0.58, gap: 0.12 },
  { en: "Tennis", es: "Tenis", ar: "3 / 4", y: 0.1, w: 0.38, gap: 0.24 },
  { en: "Football", es: "Fútbol", ar: "4 / 3", y: 0.56, w: 0.52, gap: 0.1 },
  { en: "Swimming", es: "Natación", note: ["school team", "equipo del colegio"], ar: "3 / 4", y: 0.18, w: 0.42, gap: 0.26 },
];

export function Net() {
  return (
    <section className="net" id="sports">
      <div className="net__stage">
        <header className="sec-head">
          <p className="label" data-reveal><T en="More sports" es="Más deportes" /></p>
          <h2 className="h2" data-reveal>
            <T en={<>Rugby first.<br /><span className="soft">Six more next to it.</span></>} es={<>Rugby primero.<br /><span className="soft">Seis más al lado.</span></>} />
          </h2>
        </header>
        <div className="net__view">
          <div className="net__track">
            <svg className="net__lines" aria-hidden="true" />
            {cards.map((c, i) => (
              <figure
                className={i === 0 ? "net__card net__card--core" : "net__card"}
                key={i}
                style={{ "--y": c.y, "--w": c.w, "--gap": c.gap, "--ar": c.ar } as CSSProperties}
              >
                {c.img && <Image src={c.img} alt={c.alt!} sizes="(max-width: 900px) 60vw, 360px" />}
                <figcaption>
                  <span className="net__sport"><T en={c.en} es={c.es} /></span>
                  {c.note && <span className="label"><T en={c.note[0]} es={c.note[1]} /></span>}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
        <p className="label net__hint">
          <T en={<><Ptr fine="Scroll" coarse="Drag sideways" /> · 08 cards</>} es={<><Ptr fine="Scrolleá" coarse="Deslizá de costado" /> · 08 tarjetas</>} />
        </p>
      </div>
    </section>
  );
}

/* 05 · School & awards */
const rows: [detail: string, when: string, title: ReactNode, text: ReactNode][] = [
  ["d-ticx26", "2026", "TICx26 · ORT", <T key="1" en="Organized the Diseñahackathon" es="Organicé la Diseñahackathon" />],
  ["d-itba", "2026", "ITBA Negocios", <T key="2" en="Finalist, with an essay · diploma" es="Finalista, con un ensayo · diploma" />],
  ["d-oatec", "2026", "OATec", <T key="3" en="Qualified for the final (Zona 1A)" es="Clasifiqué a la final (Zona 1A)" />],
  ["d-modelo", "ORT", "Modelo Legislativo", <T key="4" en="Drafted a bill on AI in education" es="Redacté un proyecto de ley sobre IA en la educación" />],
  ["d-c3po", "ORT", <T key="5" en="Final project" es="Proyecto final" />, <T key="6" en="C3PO, a humanoid robot Claude can control" es="C3PO, un robot humanoide que Claude puede controlar" />],
  ["d-northlands", "Northlands", <T key="7" en="Primary school" es="Primaria" />, <T key="8" en="A prize every year, mostly All-Round Excellence" es="Un premio todos los años, casi siempre All-Round Excellence" />],
];
const diplomas: [detail: string, img: StaticImageData, alt: string][] = [
  ["d-itba", itbaEssay, "ITBA essay, first page"],
  ["d-cae", cambridgeC1, "Cambridge C1 Advanced certificate"],
  ["d-anthropic", claudeCodeInAction, "Claude Code in Action certificate"],
];

export function School() {
  return (
    <section className="school section" id="school">
      <div className="school__left">
        <header className="sec-head">
          <p className="label" data-reveal><T en="04 / School" es="04 / Colegio" /></p>
          <h2 className="h2" data-reveal>
            <T en={<>School, where I<br /><span className="soft">learned to learn.</span></>} es={<>El colegio, donde<br /><span className="soft">aprendí a aprender.</span></>} />
          </h2>
        </header>
        <p className="gpa" data-reveal><span>8.59</span></p>
        <p className="label" data-reveal>
          <T en="Overall average · ORT Argentina · TIC · 5th year" es="Promedio general · ORT Argentina · TIC · 5.º año" />
        </p>
        <figure className="photo" data-reveal><Image src={presenting} alt="Oliver presenting at ORT" sizes={half} /></figure>
        <p className="label fg diplomas__label" data-reveal><T en="Diplomas · tap to open" es="Diplomas · tocá para ver" /></p>
        <ul className="diplomas" data-reveal>
          {diplomas.map(([detail, img, alt]) => (
            <li key={alt}>
              <button type="button" data-detail={detail}><Image src={img} alt={alt} sizes="(max-width: 900px) 50vw, 12vw" /></button>
            </li>
          ))}
        </ul>
      </div>
      <div className="school__right">
        <ol className="rows">
          {rows.map(([detail, when, title, text]) => (
            <li className="row" data-detail={detail} key={detail}>
              <span className="label">{when}</span>
              <div><h3>{title}</h3><p>{text}</p></div>
              <i className="row__line" />
            </li>
          ))}
        </ol>
        <figure className="photo" data-reveal data-detail="d-ticx26"><Image src={ticx26} alt="Oliver with friends at TICx26" sizes={half} /></figure>
      </div>
    </section>
  );
}

/* 06 · Learning */
const courses: [detail: string | undefined, who: string, what: ReactNode][] = [
  ["d-cs50", "Harvard", <T key="1" en="CS50 (in progress) · first game: “The Eggy Road”" es="CS50 (en curso) · primer juego: “The Eggy Road”" />],
  ["d-ditella", "Universidad Di Tella", <T key="2" en="AI + Data Science + Business · predicted hospital readmissions" es="IA + Data Science + Negocios · predije reinternaciones hospitalarias" />],
  ["d-anthropic", "Anthropic", "Claude 101 · Claude Code 101 · Claude Code in Action · Claude Cowork"],
  ["d-codesignal", "CodeSignal", <T key="3" en="HTML · CSS · JavaScript for front-end" es="HTML · CSS · JavaScript para front-end" />],
  [undefined, "J.P. Morgan", "Business finance · Grow your business"],
  ["d-semrush", "Semrush · Open University", "Marketing · IT in everyday life"],
];

export function Learning() {
  return (
    <section className="learning section" id="learning">
      <header className="sec-head">
        <p className="label" data-reveal><T en="05 / Learning" es="05 / Aprendizaje" /></p>
        <h2 className="h2" data-reveal>
          <T en={<>Learning outside<br /><span className="soft">the classroom.</span></>} es={<>Aprender fuera<br /><span className="soft">del aula.</span></>} />
        </h2>
      </header>
      <div className="learning__grid">
        <ul className="courses">
          {courses.map(([detail, who, what]) => (
            <li data-reveal data-detail={detail} key={who}>
              <span className="label fg">{who}</span>
              <span>{what}</span>
            </li>
          ))}
        </ul>
        <div className="learning__media">
          <figure className="photo" data-reveal>
            <Image src={nyc} alt="Tech Week New York 2026" sizes="(max-width: 900px) 50vw, 25vw" />
            <figcaption className="label">Tech Week New York 2026</figcaption>
          </figure>
          <figure className="photo" data-reveal>
            <Image src={devconnect} alt="Devconnect with friends" sizes="(max-width: 900px) 50vw, 25vw" />
            <figcaption className="label">Devconnect</figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}

/* 07 · World: photos drift sideways with the scroll */
export function World() {
  return (
    <section className="world section" id="world">
      <header className="sec-head">
        <p className="label" data-reveal><T en="06 / World" es="06 / Mundo" /></p>
        <h2 className="h2" data-reveal>
          <T en={<>Around the world.<br /><span className="soft">Almost everywhere, really.</span></>} es={<>Por el mundo.<br /><span className="soft">Casi a todos lados, en serio.</span></>} />
        </h2>
      </header>
      <div className="world__strip">
        <figure className="world__photo" data-speed="1">
          <Image src={colosseum} alt="Oliver at the Colosseum, Rome" sizes="(max-width: 900px) 100vw, 36vw" />
          <figcaption className="label"><T en="Rome, Italy" es="Roma, Italia" /></figcaption>
        </figure>
        <figure className="world__photo" data-speed="-0.6"><Image src={trevi} alt="Oliver at the Trevi Fountain, Rome" sizes="(max-width: 900px) 100vw, 29vw" /></figure>
        <figure className="world__photo" data-speed="0.4"><Image src={navona} alt="Oliver at Piazza Navona, Rome" sizes="(max-width: 900px) 100vw, 26vw" /></figure>
      </div>
      <ul className="langs">
        <li data-reveal><h3>Español</h3><p className="label"><T en="Native" es="Nativo" /></p></li>
        <li data-reveal>
          <h3>English</h3>
          <p className="label">C1 · Cambridge Advanced</p>
          <ul className="exams">
            <li data-detail="d-cae"><span>C1 Advanced</span><span className="label">187 · 2024</span></li>
            <li data-detail="d-fce"><span>B2 First</span><span className="label">162 · 2022</span></li>
            <li className="is-next"><span>C2 Proficiency</span><span className="label"><T en="next" es="el próximo" /></span></li>
          </ul>
        </li>
        <li data-reveal><h3>Français</h3><p className="label"><T en="A little" es="Un poco" /></p></li>
        <li data-reveal>
          <h3><T en={<>Hebrew <span lang="he">עברית</span></>} es={<>Hebreo <span lang="he">עברית</span></>} /></h3>
          <p className="label"><T en="I can read a lot" es="Leo bastante" /></p>
        </li>
      </ul>
    </section>
  );
}

/* 08 · Things I like */
const groups: [label: ReactNode, tags: ReactNode[]][] = [
  [<T key="l" en="Music" es="Música" />, ["Techno", "Fred again..", <T key="g" en="I played guitar" es="Tocaba guitarra" />, <T key="d" en="& drums" es="y batería" />]],
  [<T key="l" en="To watch" es="Para mirar" />, ["Fauda", "Mission: Impossible", <T key="a" en="Action, special ops" es="Acción, operaciones especiales" />]],
  [<T key="l" en="Tech" es="Tecnología" />, ["Apple", "Vercel", <T key="r" en="Robots & AI" es="Robots e IA" />]],
  [<T key="l" en="Life" es="Vida" />, [<T key="t" en="Travel" es="Viajar" />, "Asados", <T key="b" en="Black (the color)" es="El negro (el color)" />]],
];

export function Likes() {
  return (
    <section className="likes section" id="likes">
      <div className="likes__inner">
        <header className="sec-head">
          <p className="label" data-reveal><T en="07 / Off the clock" es="07 / Tiempo libre" /></p>
          <h2 className="h2" data-reveal><T en="Things I like." es="Cosas que me gustan." /></h2>
        </header>
        <ul className="groups">
          {groups.map(([label, tags], i) => (
            <li data-reveal key={i}>
              <p className="label">{label}</p>
              <ul className="tags">{tags.map((t, j) => <li key={j}>{t}</li>)}</ul>
            </li>
          ))}
        </ul>
        <p className="dream" data-reveal>
          <T en="Dream: being part of a special forces unit." es="Sueño: formar parte de una unidad de fuerzas especiales." />
        </p>
      </div>
    </section>
  );
}

/* 09 · Contact */
export function Contact() {
  const apple = "https://music.apple.com/us/album/marea-weve-lost-dancing/1553064273";
  return (
    <section className="contact section" id="contact">
      <h2 className="display" data-lines><span className="line"><span><T en="Let's talk." es="Hablemos." /></span></span></h2>
      <ul className="contact__links">
        <li data-reveal><p className="label">Email</p><a href="#contact">[ your email ]</a></li>
        <li data-reveal><p className="label">LinkedIn</p><a href="#contact">[ your LinkedIn ]</a></li>
        <li data-reveal><p className="label">GitHub</p><a href="#contact">[ your GitHub ]</a></li>
      </ul>
      <footer className="footer">
        <p className="label">
          <T
            en={<>Music: Marea (We&apos;ve Lost Dancing) — Fred again.. &amp; The Blessed Madonna · <a href={apple} target="_blank" rel="noopener">Listen on Apple Music ↗</a></>}
            es={<>Música: Marea (We&apos;ve Lost Dancing) — Fred again.. &amp; The Blessed Madonna · <a href={apple} target="_blank" rel="noopener">Escuchar en Apple Music ↗</a></>}
          />
        </p>
        <p className="label">© 2026 Oliver Jones · Buenos Aires</p>
      </footer>
    </section>
  );
}
