import Image, { type StaticImageData } from "next/image";
import type { ReactNode } from "react";
import { T } from "./T";
import ticx26 from "@/assets/ticx26.jpg";
import c3po from "@/assets/c3po.jpg";
import cambridgeC1 from "@/assets/certs/cambridge-c1.jpg";
import cambridgeB2 from "@/assets/certs/cambridge-b2.jpg";
import claude101 from "@/assets/certs/claude-101.jpg";
import claudeCode101 from "@/assets/certs/claude-code-101.jpg";
import claudeCodeInAction from "@/assets/certs/claude-code-in-action.jpg";
import claudeCowork from "@/assets/certs/claude-cowork.jpg";
import codesignalHtml from "@/assets/certs/codesignal-html.jpg";
import codesignalCss from "@/assets/certs/codesignal-css.jpg";
import codesignalJs from "@/assets/certs/codesignal-js.jpg";
import semrush from "@/assets/certs/semrush.jpg";
import openUniversity from "@/assets/certs/open-university.jpg";
import itbaEssay from "@/assets/certs/itba-essay.jpg";
import ditella01 from "@/assets/certs/ditella-slide-01.jpg";
import ditella02 from "@/assets/certs/ditella-slide-02.jpg";
import ditella07 from "@/assets/certs/ditella-slide-07.jpg";
import ditellaRoc from "@/assets/certs/ditella-roc-curve.jpg";

type Pic = [img: StaticImageData, alt: string, href?: string];

/** Thumbnails that open the full-size file in a new tab. */
function Media({ pics, tall }: { pics: Pic[]; tall?: boolean }) {
  return (
    <div className={tall ? "detail__media detail__media--tall" : "detail__media"}>
      {pics.map(([img, alt, href]) => (
        <a key={alt} href={href ?? img.src} target="_blank" rel="noopener">
          <Image src={img} alt={alt} sizes="(max-width: 600px) 100vw, 360px" />
        </a>
      ))}
    </div>
  );
}

function Item({ id, label, title, children }: { id: string; label: ReactNode; title: ReactNode; children: ReactNode }) {
  return (
    <article id={id} hidden>
      <p className="label">{label}</p>
      <h3>{title}</h3>
      {children}
    </article>
  );
}

const Scores = ({ s }: { s: [number, number, number, number, number] }) => {
  const parts: [string, string][] = [["Reading", "Lectura"], ["Use of English", "Uso del inglés"], ["Writing", "Escritura"], ["Listening", "Comprensión auditiva"], ["Speaking", "Expresión oral"]];
  return (
    <dl className="scores">
      {parts.map(([en, es], i) => (
        <div key={en}><dt><T en={en} es={es} /></dt><dd>{s[i]}</dd></div>
      ))}
    </dl>
  );
};

const anthropic: Pic[] = [
  [claude101, "Claude 101 certificate"],
  [claudeCode101, "Claude Code 101 certificate"],
  [claudeCodeInAction, "Claude Code in Action certificate"],
  [claudeCowork, "Introduction to Claude Cowork certificate"],
];
const codesignal: Pic[] = [
  [codesignalHtml, "CodeSignal Introduction to HTML certificate"],
  [codesignalCss, "CodeSignal Basics of CSS certificate"],
  [codesignalJs, "CodeSignal JavaScript for Front-End Engineers certificate"],
];
const marketing: Pic[] = [
  [semrush, "Semrush certificate"],
  [openUniversity, "Open University statement of participation"],
];
const c1: Pic = [cambridgeC1, "Cambridge Certificate in Advanced English, C1"];
const b2: Pic = [cambridgeB2, "Cambridge First Certificate in English, B2"];

/* Anything with data-detail="id" opens the matching article here (see Motion) */
export function Details() {
  return (
    <dialog className="detail" aria-label="Details" data-lenis-prevent>
      <button className="detail__close" type="button"><T en="Close ✕" es="Cerrar ✕" /></button>

      <Item id="d-ticx26" label="2026 · ORT Argentina" title="TICx26 · Diseñahackathon">
        <p><T en="I organized the Diseñahackathon at TICx26, at ORT Argentina. I didn't compete in it; I put it together." es="Organicé la Diseñahackathon de TICx26 en ORT Argentina. No participé: la armé." /></p>
        <Media pics={[[ticx26, "Oliver with friends at TICx26"]]} />
      </Item>

      <Item id="d-itba" label="2026 · ITBA" title={<T en="ITBA Challenge 2026 · Business" es="Desafío ITBA 2026 · Negocios" />}>
        <p>
          <T
            en="This year's theme: “Decisions under uncertainty: how to prepare for an unpredictable world.” I wrote an essay, “Decidir en la niebla” (Deciding in the fog), about cognitive biases, antifragile companies and scenario planning (Knight, Kahneman, Taleb). I was a finalist and got a diploma."
            es="El tema del año: “Decisiones bajo incertidumbre: cómo prepararse para un mundo impredecible”. Escribí un ensayo, “Decidir en la niebla”, sobre sesgos cognitivos, empresas antifrágiles y planificación por escenarios (Knight, Kahneman, Taleb). Quedé finalista y recibí un diploma."
          />
        </p>
        <p><a className="detail__link" href="/media/itba-essay.pdf" target="_blank" rel="noopener"><T en="Read the full essay (PDF, Spanish) ↗" es="Leer el ensayo completo (PDF) ↗" /></a></p>
        <Media pics={[[itbaEssay, "First page of the essay", "/media/itba-essay.pdf"]]} />
      </Item>

      <Item id="d-oatec" label="2026 · OATec" title="OATec 2026">
        <p><T en="I took the local exam in Zona 1 – Centro (Region A) and qualified for the final." es="Rendí el examen local en la Zona 1 – Centro (Región A) y clasifiqué a la final." /></p>
      </Item>

      <Item id="d-modelo" label="ORT Argentina" title="Modelo Legislativo">
        <p><T en="I drafted a bill on artificial intelligence in education, and the articles for the debate." es="Redacté un proyecto de ley sobre inteligencia artificial en la educación, y los artículos para el debate." /></p>
      </Item>

      <Item id="d-c3po" label={<T en="Final project · ORT" es="Proyecto final · ORT" />} title="C3PO">
        <p>
          <T
            en="An embodiment layer for LLMs: it gives Claude a Unitree G1 humanoid body. The same code drives the simulator and the real robot."
            es="Una capa de embodiment para LLMs: le da a Claude un cuerpo de humanoide Unitree G1. El mismo código maneja el simulador y el robot real."
          />
        </p>
        <p className="label fg">SvelteKit · Python · ROS 2 · MCP</p>
        <p><a className="detail__link" href="https://c3po-web.vercel.app" target="_blank" rel="noopener"><T en="Visit the site ↗" es="Ver el sitio ↗" /></a></p>
        <Media pics={[[c3po, "Unitree G1 humanoid robot"]]} />
      </Item>

      <Item id="d-northlands" label={<T en="Northlands · Primary school" es="Northlands · Primaria" />} title={<T en="A prize every year" es="Un premio todos los años" />}>
        <p><T en="At Northlands primary school I got a prize every year, mostly All-Round Excellence." es="En la primaria de Northlands recibí un premio todos los años, casi siempre All-Round Excellence." /></p>
      </Item>

      <Item id="d-cs50" label={<T en="Harvard · in progress" es="Harvard · en curso" />} title="CS50">
        <p><T en="Harvard's intro to computer science. My first game, made in Scratch: “The Eggy Road”." es="El curso de introducción a la computación de Harvard. Mi primer juego, hecho en Scratch: “The Eggy Road”." /></p>
      </Item>

      <Item id="d-ditella" label="Universidad Di Tella" title={<T en="AI + Data Science + Business" es="IA + Data Science + Negocios" />}>
        <p>
          <T
            en="We predicted hospital readmissions with data from 4,372 patients: 13 models and 247 ensembles with cross-validation. The simplest one won, a logistic regression (AUC 0.786)."
            es="Predijimos reinternaciones hospitalarias con datos de 4.372 pacientes: 13 modelos y 247 ensembles con validación cruzada. Ganó el más simple, una regresión logística (AUC 0,786)."
          />
        </p>
        <Media
          pics={[
            [ditella01, "Title slide: hospital readmission prediction"],
            [ditella02, "Benchmark slide"],
            [ditella07, "Model comparison slide"],
            [ditellaRoc, "ROC curve, AUC 0.786"],
          ]}
        />
      </Item>

      <Item id="d-anthropic" label="Anthropic" title={<T en="Claude courses" es="Cursos de Claude" />}>
        <p><T en="Four courses from Anthropic: Claude 101, Claude Code 101, Claude Code in Action and Introduction to Claude Cowork." es="Cuatro cursos de Anthropic: Claude 101, Claude Code 101, Claude Code in Action e Introduction to Claude Cowork." /></p>
        <Media pics={anthropic} />
      </Item>

      <Item id="d-cambridge" label="Cambridge English" title={<T en="English · C1" es="Inglés · C1" />}>
        <p>
          <T
            en="Certificate in Advanced English: C1, score 187 (December 2024). Before that, First Certificate in English: B2, score 162 (November 2022)."
            es="Certificate in Advanced English: C1, 187 puntos (diciembre 2024). Antes, First Certificate in English: B2, 162 puntos (noviembre 2022)."
          />
        </p>
        <Media pics={[c1, b2]} tall />
      </Item>

      <Item id="d-cae" label={<T en="Cambridge English · December 2024" es="Cambridge English · diciembre 2024" />} title="C1 Advanced">
        <p><T en="Certificate in Advanced English, Grade C, Council of Europe level C1. Overall score: 187. Taken in Buenos Aires." es="Certificate in Advanced English, Grade C, nivel C1 del Marco Común Europeo. Puntaje general: 187. Rendido en Buenos Aires." /></p>
        <Scores s={[177, 182, 193, 190, 192]} />
        <Media pics={[c1]} />
      </Item>

      <Item id="d-fce" label={<T en="Cambridge English · November 2022" es="Cambridge English · noviembre 2022" />} title="B2 First">
        <p><T en="First Certificate in English, Grade C, Council of Europe level B2. Overall score: 162. Taken in Buenos Aires." es="First Certificate in English, Grade C, nivel B2 del Marco Común Europeo. Puntaje general: 162. Rendido en Buenos Aires." /></p>
        <Scores s={[162, 167, 157, 152, 174]} />
        <Media pics={[b2]} />
      </Item>

      <Item id="d-codesignal" label="CodeSignal · 2026" title="HTML · CSS · JavaScript">
        <p><T en="Three courses from the “Comprehensive Introduction to Front-End Engineering” learning path." es="Tres cursos del recorrido “Comprehensive Introduction to Front-End Engineering”." /></p>
        <Media pics={codesignal} />
      </Item>

      <Item id="d-semrush" label="Semrush · The Open University" title={<T en="Marketing · IT in everyday life" es="Marketing · IT en la vida cotidiana" />}>
        <p><T en="Semrush's Emoji Marketing Mini-Course, and The Open University's free course “IT in everyday life” (December 2025)." es="El Emoji Marketing Mini-Course de Semrush y el curso gratuito “IT in everyday life” de The Open University (diciembre 2025)." /></p>
        <Media pics={marketing} />
      </Item>

      <Item id="d-all" label={<T en="All of them" es="Todo junto" />} title={<T en="Certificates" es="Certificados" />}>
        <p><T en="Tap one to see it full size. (The World Rugby ones aren't here because they show my ID number.)" es="Tocá uno para verlo en grande. (Los de World Rugby no están acá porque muestran mi DNI.)" /></p>
        <Media pics={[c1, b2, ...anthropic, ...codesignal, ...marketing]} />
      </Item>
    </dialog>
  );
}
