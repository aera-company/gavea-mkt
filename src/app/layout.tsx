import type { Metadata, Viewport } from "next";
import { IBM_Plex_Mono, Mona_Sans } from "next/font/google";
import "./globals.css";

// Mona Sans carries display and body; the wdth axis gives the condensed cut
// for labels (a nod to the GAVEA wordmark) and the wide cut for scale moments.
// IBM Plex Mono only for captions, folios and the technical title block.
const sans = Mona_Sans({
  variable: "--font-sans-src",
  subsets: ["latin", "latin-ext"],
  axes: ["wdth"],
  display: "swap",
});

const mono = IBM_Plex_Mono({
  variable: "--font-mono-src",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500"],
  display: "swap",
});

// Private presentation: never indexed.
export const metadata: Metadata = {
  title: "GAVEA × AERA · Direção & Gerência de Marketing",
  description: "Uma nova camada de direção para a marca e a comunicação da GAVEA.",
  robots: { index: false, follow: false },
  icons: { icon: "/favicon.svg" },
};

export const viewport: Viewport = {
  themeColor: "#06121c",
};

/* Runs before first paint: opt into motion start states only when motion is
   allowed, and drop them after 3s if no scene has started (JS failure). */
const MOTION_BOOT = `(function(){var d=document.documentElement;if(matchMedia('(prefers-reduced-motion: reduce)').matches)return;d.classList.add('motion');setTimeout(function(){if(!window.__motionReady)d.classList.remove('motion')},3000)})()`;

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="pt-BR"
      className={`${sans.variable} ${mono.variable} antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: MOTION_BOOT }} />
      </head>
      <body>
        <a href="#main" className="skip-link t-label">
          Pular para o conteúdo
        </a>
        {children}
      </body>
    </html>
  );
}
