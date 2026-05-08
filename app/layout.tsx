import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Magíster en Gestión de Riesgos | Consultoría Estratégica",
  description: "Consultoría especializada en gestión de riesgos corporativos, financieros y operativos. Asesoría de alto nivel por expertos Magíster.",
  keywords: ["Gestión de riesgos", "Consultoría estratégica", "Magíster en riesgos", "Mitigación de riesgos", "Empresas"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${geistSans.variable} ${geistMono.variable} scroll-smooth`}>
      <body className="antialiased bg-white text-black font-sans">
        {children}
      </body>
    </html>
  );
}