import type { CSSProperties } from "react";
import { T } from "./T";

/* 01 · Who I am: five words. On desktop they appear around the face once it smiles (pinned hero, see Motion);
   on phones (and with reduced motion) they are a plain list under the hero. */
const words: [en: string, es: string, enText: string, esText: string][] = [
  ["curious", "curioso", "I want to know how everything works, even reverse-engineering a humanoid robot's control API.", "Quiero saber cómo funciona todo, hasta hacer ingeniería inversa de la API de control de un robot humanoide."],
  ["open-minded", "de mente abierta", "Tech, business, law and design: apps, a marketing plan, a draft bill on AI in education.", "Tecnología, negocios, derecho y diseño: apps, un plan de marketing, un proyecto de ley sobre IA en la educación."],
  ["empathetic", "empático", "I build for the people around me: my mom's agency, my dad's studio, a home cloud for my family.", "Construyo para la gente que me rodea: la agencia de mi mamá, el estudio de mi papá, una nube casera para mi familia."],
  ["active", "activo", "Rugby since I was 4, six other sports, travel, competitions. Always doing something.", "Rugby desde los 4, otros seis deportes, viajes, competencias. Siempre haciendo algo."],
  ["responsible", "responsable", "The apps I build run real businesses with real people's data, so I treat them that way.", "Las apps que hago manejan negocios reales con datos de gente real, así que las trato así."],
];
// left column: heading + 2 words, right column: 3 words (tops in % of the hero)
const spots: [side: "l" | "r", top: number][] = [["r", 14], ["l", 36], ["r", 36], ["l", 58], ["r", 58]];

const Word = ({ i }: { i: number }) => {
  const [en, es, enText, esText] = words[i];
  return (
    <>
      <p className="label">{String(i + 1).padStart(2, "0")}</p>
      <h3><T en={en} es={es} /></h3>
      <p className="label who__other"><T en={es} es={en} /></p>
      <p className="who__text"><T en={enText} es={esText} /></p>
    </>
  );
};

export function WhoAround() {
  return (
    <div className="who" aria-label="Who I am">
      <div className="who__head who__item--l" style={{ "--top": "14%" } as CSSProperties}>
        <p className="label"><T en="01 / In five words" es="01 / En cinco palabras" /></p>
        <h2 className="h2"><T en="Who I am." es="Quién soy." /></h2>
      </div>
      {spots.map(([side, top], i) => (
        <div className={`who__item who__item--${side}`} style={{ "--top": `${top}%` } as CSSProperties} key={i}>
          <Word i={i} />
        </div>
      ))}
    </div>
  );
}

export function WhoList() {
  return (
    <section className="who-list section" id="who">
      <header className="sec-head">
        <p className="label"><T en="01 / In five words" es="01 / En cinco palabras" /></p>
        <h2 className="h2"><T en="Who I am." es="Quién soy." /></h2>
      </header>
      <ol className="who-list__rows">
        {words.map((_, i) => (
          <li key={i} data-reveal><Word i={i} /></li>
        ))}
      </ol>
    </section>
  );
}
