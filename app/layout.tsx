import type { Metadata, Viewport } from "next";
import "./globals.css";

/** Canonical origin for OG/Twitter URLs. Set NEXT_PUBLIC_SITE_URL in production so link previews resolve to your real domain (iMessage needs absolute https og:image URLs). */
function getSiteOrigin(): URL {
  const normalize = (value: string) => value.trim().replace(/\/$/, "");

  const explicit = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (explicit) {
    const href =
      /^https?:\/\//i.test(explicit) ? explicit : `https://${explicit}`;
    return new URL(normalize(href));
  }

  const prod = process.env.VERCEL_PROJECT_PRODUCTION_URL?.trim();
  if (prod) {
    const href = /^https?:\/\//i.test(prod) ? prod : `https://${prod}`;
    return new URL(normalize(href));
  }

  const vercelUrl = process.env.VERCEL_URL?.trim();
  if (vercelUrl) {
    const href =
      /^https?:\/\//i.test(vercelUrl) ? vercelUrl : `https://${vercelUrl}`;
    return new URL(normalize(href));
  }

  return new URL("http://localhost:3000");
}

const siteOrigin = getSiteOrigin();

const OG_IMAGE_ALT = "Everette's Princess Land Spelling Quest game preview";

/** Static JPEG (~1200×627) works reliably with LinkedIn and other crawlers; dynamic OG routes sometimes fail preview. */
const ogImageAbsolute = `${siteOrigin.origin}/og-share.jpg`;

export const metadata: Metadata = {
  metadataBase: siteOrigin,
  title: "Princess Word Quest",
  description:
    "A dyslexia-friendly spelling and word challenge game with princesses and unicorns.",
  openGraph: {
    title: "Everette's Princess Land Spelling Quest",
    description:
      "Save the unicorn by unlocking castle words in a dyslexia-friendly spelling game.",
    siteName: "Princess Word Quest",
    type: "website",
    url: siteOrigin,
    images: [
      {
        url: ogImageAbsolute,
        width: 1200,
        height: 627,
        type: "image/jpeg",
        alt: OG_IMAGE_ALT,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Everette's Princess Land Spelling Quest",
    description:
      "Save the unicorn by unlocking castle words in a dyslexia-friendly spelling game.",
    images: [ogImageAbsolute],
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
