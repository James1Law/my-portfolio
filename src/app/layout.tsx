import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/layout/ThemeProvider";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} antialiased`} suppressHydrationWarning>
      <body className="min-h-screen bg-bg-primary text-text-primary">
        <ThemeProvider>
          <Header />
          <main>{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
