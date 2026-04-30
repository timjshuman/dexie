import type { Metadata, Viewport } from "next";
import "./globals.css";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000");

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Princess Word Quest",
  description:
    "A dyslexia-friendly spelling and word challenge game with princesses and unicorns.",
  openGraph: {
    title: "Everette's Princess Land Spelling Quest",
    description:
      "Save the unicorn by unlocking castle words in a dyslexia-friendly spelling game.",
    siteName: "Princess Word Quest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Everette's Princess Land Spelling Quest",
    description:
      "Save the unicorn by unlocking castle words in a dyslexia-friendly spelling game.",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
