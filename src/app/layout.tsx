import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "James Law | Product Leader & Builder",
  description:
    "Head of Product with 5+ years building complex SaaS platforms and 11 years at sea. Hands-on with React, TypeScript, and AI. Open to senior product leadership roles.",
  metadataBase: new URL("https://jamesslaw.co.uk"),
  openGraph: {
    title: "James Law | Product Leader & Builder",
    description:
      "11 years commanding ships. Now shipping product. Head of Product building SaaS platforms and AI-powered tools.",
    url: "https://jamesslaw.co.uk",
    siteName: "James Law",
    locale: "en_GB",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "James Law | Product Leader & Builder",
    description:
      "11 years commanding ships. Now shipping product. Head of Product building SaaS platforms and AI-powered tools.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport = {
  themeColor: "#0b4c9e",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-GB" className="antialiased">
      {/* The desktop owns the viewport and never scrolls as a document. */}
      <body className="h-dvh overflow-hidden">{children}</body>
    </html>
  );
}
