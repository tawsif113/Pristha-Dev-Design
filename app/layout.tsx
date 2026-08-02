import type { Metadata } from "next";
import {
  Cormorant_Garamond,
  Manrope,
  Noto_Serif_Bengali,
} from "next/font/google";
import "./globals.css";
import { PristhaProvider } from "@/src/features/app-state/pristha-provider";

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
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://pristha-dev.tawsif1804113.chatgpt.site",
  ),
  title: {
    default: "Pristha — Read. Write. Publish.",
    template: "%s · Pristha",
  },
  description:
    "A calm bilingual workspace for readers, writers, and independent publishing houses.",
  other: {
    "codex-preview": "development",
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
  openGraph: {
    type: "website",
    siteName: "Pristha",
    title: "Pristha — Read. Write. Publish.",
    description:
      "A premium bilingual reading, writing, and independent publishing platform.",
  },
  twitter: {
    card: "summary",
    title: "Pristha — Read. Write. Publish.",
    description:
      "A premium bilingual reading, writing, and independent publishing platform.",
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
        <PristhaProvider>{children}</PristhaProvider>
      </body>
    </html>
  );
}
