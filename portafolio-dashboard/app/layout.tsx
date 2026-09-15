import type { Metadata } from "next";
import "./globals.css";
import Providers from "./providers";
import { Oxanium } from "next/font/google";
import { cn } from "@/lib/utils";

const oxanium = Oxanium({subsets:['latin'],variable:'--font-sans'});

export const metadata: Metadata = {
  title: "Mi Aplicación",
  description: "App con TanStack Query y Next.js",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={cn("font-sans", oxanium.variable)}>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
