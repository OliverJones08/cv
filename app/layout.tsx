import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geist = Geist({ variable: "--font-geist", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Oliver Jones — CV",
  description:
    "Oliver Jones: 5th-year TIC student at ORT Argentina. Curious, builds software for real people, rugby player since 4. Buenos Aires.",
};

export const viewport: Viewport = { themeColor: "#000000" };

// Runs before paint: English by default, Spanish when the computer is in Spanish; a saved choice wins.
const boot = `document.documentElement.classList.add('js');try{var l=localStorage.getItem('lang')||(/^es\\b/i.test(navigator.language||'')?'es':'en');document.documentElement.lang=l}catch(e){}`;

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${geist.variable} ${geistMono.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: boot }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
