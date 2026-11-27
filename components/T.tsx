import type { ReactNode } from "react";

/** Both languages go in the HTML; CSS shows the one that matches <html lang>. */
export function T({ en, es }: { en: ReactNode; es: ReactNode }) {
  return (
    <>
      <span lang="en">{en}</span>
      <span lang="es">{es}</span>
    </>
  );
}

/** "Click" with a mouse, "Tap" on a touch screen. */
export function Ptr({ fine, coarse }: { fine: ReactNode; coarse: ReactNode }) {
  return (
    <>
      <span className="on-fine">{fine}</span>
      <span className="on-coarse">{coarse}</span>
    </>
  );
}
