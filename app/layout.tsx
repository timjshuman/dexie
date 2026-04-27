import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Princess Word Quest",
  description:
    "A dyslexia-friendly spelling and word challenge game with princesses and unicorns.",
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
