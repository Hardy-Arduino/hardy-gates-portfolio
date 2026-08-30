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
  metadataBase: new URL(
    "https://hardy-gates-portfolio.vercel.app"
  ),

  title: {
    default:
      "Hardy Gates | Électronique, Systèmes embarqués & IoT",
    template: "%s | Hardy Gates",
  },

  description:
    "Portfolio de Hardy Gates, étudiant en ingénierie électronique : systèmes embarqués, IoT, automatisation, électronique de puissance et projets technologiques.",

  keywords: [
    "Hardy Gates",
    "Électronique",
    "Systèmes embarqués",
    "Embedded Systems",
    "IoT",
    "Internet of Things",
    "ESP32",
    "Arduino",
    "Automatisation",
    "Électronique de puissance",
    "Engineering Portfolio",
  ],

  authors: [
    {
      name: "Hardy Gates",
    },
  ],

  creator: "Hardy Gates",

  alternates: {
    canonical: "/",
  },

  openGraph: {
    title:
      "Hardy Gates | Électronique, Systèmes embarqués & IoT",

    description:
      "Découvrez mes projets en électronique, systèmes embarqués, IoT et automatisation.",

    url: "/",

    siteName: "Portfolio Hardy Gates",

    locale: "fr_FR",

    type: "website",

    images: [
      {
        url: "/images/profile/hardy.jpg",
        width: 1200,
        height: 1200,
        alt: "Hardy Gates",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",

    title:
      "Hardy Gates | Électronique, Systèmes embarqués & IoT",

    description:
      "Portfolio d'ingénierie électronique, systèmes embarqués, IoT et automatisation.",

    images: [
      "/images/profile/hardy.jpg",
    ],
  },

  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="fr"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
