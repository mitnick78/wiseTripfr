import type { Metadata } from "next";
import { Outfit, DM_Serif_Display } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  weight: ["300", "400", "500", "600"],
});

const dmSerif = DM_Serif_Display({
  subsets: ["latin"],
  variable: "--font-dm-serif",
  weight: ["400"],
});

export const metadata: Metadata = {
  title: {
    default: "WiseTrip — Planifiez vos voyages intelligemment",
    template: "%s | WiseTrip",
  },
  description:
    "WiseTrip vous aide à organiser vos voyages, planifier vos itinéraires et gérer votre budget de voyage en un seul endroit.",
  keywords: [
    "voyage",
    "planification",
    "itinéraire",
    "budget voyage",
    "organiser voyage",
  ],
  authors: [{ name: "WiseTrip" }],
  creator: "WiseTrip",
  metadataBase: new URL("https://wisetrip.vercel.app"),
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "https://wisetrip.vercel.app",
    title: "WiseTrip — Planifiez vos voyages intelligemment",
    description:
      "Organisez vos voyages, planifiez vos itinéraires et gérez votre budget de voyage en un seul endroit.",
    siteName: "WiseTrip",
  },
  twitter: {
    card: "summary_large_image",
    title: "WiseTrip — Planifiez vos voyages intelligemment",
    description:
      "Organisez vos voyages, planifiez vos itinéraires et gérez votre budget de voyage en un seul endroit.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body className={`${outfit.variable} ${dmSerif.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
