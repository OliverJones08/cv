# Oliver Jones — CV

Personal CV landing page (ORT Argentina · TIC · UX/UI).

- **Stack:** Next.js 16 (App Router) · TypeScript · GSAP + ScrollTrigger · Lenis · next/image · next/font (Geist)
- **Languages:** English and Spanish are both in the HTML; `<html lang>` picks one (browser language by default, the EN/ES switch is remembered).
- **Music:** the full track goes in `public/media/marea.mp3` (not committed, it's copyrighted); without it the page plays Apple Music's 30-second preview.

```bash
npm install
npm run dev     # http://localhost:3000
npm run build
```

Code map: `app/page.tsx` puts the sections together · `components/Intro.tsx` (loader, nav, player, hero) · `components/Sections.tsx` (the rest of the page) · `components/Details.tsx` (the diploma drawer) · `components/Motion.tsx` (every animation and interaction) · `components/T.tsx` (the EN/ES helper).
