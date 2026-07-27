import type { Metadata } from "next";
import {
  Cormorant_Garamond,
  Manrope,
  Noto_Serif_Bengali,
} from "next/font/google";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-pristha-sans",
  subsets: ["latin"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-pristha-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const notoSerifBengali = Noto_Serif_Bengali({
  variable: "--font-pristha-bengali",
  subsets: ["bengali"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Pristha Dev — Read. Write. Publish.",
  description:
    "A calm bilingual workspace for readers, writers, and independent publishing houses.",
  other: {
    "codex-preview": "development",
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${manrope.variable} ${cormorant.variable} ${notoSerifBengali.variable}`}
      >
        {children}
      </body>
    </html>
  );
}
