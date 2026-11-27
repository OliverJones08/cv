import Image from "next/image";
import cover from "@/assets/marea-cover.jpg";
import { T, Ptr } from "./T";

const Eq = () => (
  <span className="player__eq" aria-hidden="true">
    <i />
    <i />
    <i />
    <i />
  </span>
);

/* 00 · Loader: same type system as the hero. The click/tap/key that enters is the one that starts the music (browsers require it) */
export function Loader() {
  return (
    <div className="loader" role="button" tabIndex={-1} aria-label="Enter the site">
      <div className="loader__ring" aria-hidden="true" />
      <div className="loader__beam" aria-hidden="true" />
      <p className="label loader__tl">CV — 2026</p>
      <p className="label loader__vert">Buenos Aires — Argentina</p>
      <div className="loader__center">
        <p className="loader__name">
          <span className="line"><span>Oliver</span></span>
          <span className="line soft"><span>Jones</span></span>
        </p>
        <div className="loader__foot">
          <p className="label loader__count" aria-hidden="true">
            <span><T en="Loading" es="Cargando" /></span> — <span className="n">000</span>%
          </p>
          <span className="loader__enter">
            <Eq />
            <span className="t">
              <T
                en={<><Ptr fine="Click" coarse="Tap" /> to enter</>}
                es={<><Ptr fine="Click para" coarse="Tocá para" /> entrar</>}
              />
            </span>
          </span>
        </div>
      </div>
      <p className="label loader__bl">
        <T en="Sound on · Marea — Fred again.." es="Con sonido · Marea — Fred again.." />
      </p>
    </div>
  );
}

export function Nav() {
  return (
    <header className="nav">
      <a className="nav__brand" href="#top">Oliver Jones</a>
      <nav className="nav__links" aria-label="Sections">
        <a href="#words"><T en="About" es="Sobre mí" /></a>
        <a href="#built"><T en="Built" es="Proyectos" /></a>
        <a href="#sport"><T en="Sport" es="Deporte" /></a>
        <a href="#school"><T en="School" es="Colegio" /></a>
        <a href="#world"><T en="World" es="Mundo" /></a>
      </nav>
      <button className="lang" type="button" aria-label="Language / Idioma">
        <span data-l="en">EN</span>
        <span data-l="es">ES</span>
      </button>
      <a className="nav__cta" href="#contact"><T en="Contact" es="Contacto" /></a>
    </header>
  );
}

/* Music: starts on the click / tap / key that enters (browsers block sound before that) */
export function Player() {
  return (
    <>
      <button className="player" type="button" aria-pressed="false" aria-label="Music: Marea (We've Lost Dancing) by Fred again..">
        <Image className="player__cover" src={cover} alt="" width={24} height={24} loading="eager" />
        <Eq />
        <span className="label player__title">Marea (We&apos;ve Lost Dancing) — Fred again..</span>
      </button>
      <audio loop preload="auto">
        {/* full track if you add it locally (public/media/marea.mp3 or .m4a); otherwise Apple Music's official 30-second preview */}
        <source src="/media/marea.mp3" type="audio/mpeg" />
        <source src="/media/marea.m4a" type="audio/mp4" />
        <source
          src="https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/15/ea/4e/15ea4ed2-f7fc-f87c-b44f-9ca2c628437a/mzaf_1763923556124349361.plus.aac.p.m4a"
          type="audio/mp4"
        />
      </audio>

      {/* Now playing: on enter the song takes the screen, then shrinks into the player (bottom-left) */}
      <div className="np" aria-hidden="true">
        <div className="np__card">
          <Image className="np__cover" src={cover} alt="" sizes="380px" loading="eager" />
          <div className="np__text">
            <p className="label"><T en="Now playing" es="Sonando ahora" /></p>
            <p className="np__title">Marea<br /><span className="soft">(We&apos;ve Lost Dancing)</span></p>
            <p className="np__artist">Fred again.. &amp; The Blessed Madonna</p>
          </div>
        </div>
      </div>
    </>
  );
}

/* 01 · Hero: the portrait smiles on the first scroll down */
export function Hero() {
  return (
    <section className="hero" id="top">
      <p className="label hero__tl">CV — 2026</p>
      <figure className="hero__portrait mask-soft">
        <video src="/media/hero-smile.mp4" poster="/media/hero-poster.jpg" muted playsInline preload="auto" aria-label="Portrait of Oliver Jones" />
      </figure>
      <h1 className="hero__name" data-lines>
        <span className="line"><span>Oliver</span></span>
        <span className="line"><span>Jones</span></span>
      </h1>
      <p className="hero__words">
        <T
          en="5th-year TIC student at ORT Argentina; before that, Northlands. Curiosity drives me: I want to understand how everything works, and I build software for real people. Rugby since I was 4."
          es="Estudiante de 5.º año de TIC en ORT Argentina; antes, Northlands. Me mueve la curiosidad: quiero entender cómo funciona todo y construyo software para gente real. Juego al rugby desde los 4."
        />
      </p>
      <p className="label hero__bl"><T en="Student · Builder · Rugby player" es="Estudiante · Builder · Jugador de rugby" /></p>
      <p className="label hero__scroll">Scroll</p>
      <p className="label hero__vert">Buenos Aires — Argentina</p>
    </section>
  );
}
