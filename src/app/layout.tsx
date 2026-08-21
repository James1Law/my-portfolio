import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  // The page title stays plain. It is what a recruiter sees in a search result
  // and in a browser tab, where "JamesOS" would cost clarity and gain nothing —
  // the desktop concept is carried by the share image instead.
  title: "James Law | Product Leader & Builder",
  description:
    "Head of Product with 5+ years building complex SaaS platforms and 11 years at sea. Hands-on with React, TypeScript, and AI. Open to senior product leadership roles.",
  metadataBase: new URL("https://jamesslaw.co.uk"),
  openGraph: {
    title: "James Law | Product Leader & Builder",
    // The image shows the desktop; the description explains that it is real and
    // worth clicking into.
    description:
      "11 years commanding ships. Now shipping product. An interactive desktop portfolio \u2014 open the applications and have a look around.",
    url: "https://jamesslaw.co.uk",
    siteName: "James Law",
    locale: "en_GB",
    type: "website",
  },
  twitter: {
    // A large card, so the desktop is legible. With no twitter:image set, X
    // falls back to og:image, which is the same file.
    card: "summary_large_image",
    title: "James Law | Product Leader & Builder",
    description:
      "11 years commanding ships. Now shipping product. An interactive desktop portfolio \u2014 open the applications and have a look around.",
  },
  // The label under the icon when the site is added to an iOS home screen. Not
  // `capable`: the desktop wants ordinary browser behaviour, not standalone mode.
  appleWebApp: {
    title: "James Law",
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
