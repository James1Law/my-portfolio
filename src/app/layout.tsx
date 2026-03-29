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
  title: "James Law — Head of Product",
  description:
    "Strategic Product Leader with 5+ years delivering complex SaaS platforms, following 11 years at sea as a Senior Deck Officer. Building AI-powered tools and shipping great product.",
  openGraph: {
    title: "James Law — Head of Product",
    description:
      "Product leader. Builder. 11 years commanding ships, now shipping product.",
    url: "https://jamesslaw.co.uk",
    siteName: "James Law",
    locale: "en_GB",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "James Law — Head of Product",
    description:
      "Product leader. Builder. 11 years commanding ships, now shipping product.",
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
