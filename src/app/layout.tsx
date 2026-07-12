import type { Metadata } from "next";
import { Bodoni_Moda, Cormorant_Garamond, Jost, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const bodoniModa = Bodoni_Moda({
  variable: "--font-display",
  subsets: ["latin"],
});

const cormorantGaramond = Cormorant_Garamond({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const jost = Jost({
  variable: "--font-ui",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ELROI — Manual de Identidad de Marca",
  description: "Identidad visual y manual de marca de ELROI",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${bodoniModa.variable} ${cormorantGaramond.variable} ${jost.variable} ${jetbrainsMono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
