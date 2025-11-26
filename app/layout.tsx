import type { Metadata, Viewport } from "next";
import { Geist_Mono, Sarala } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import Script from "next/script";
import {
  generateMetadata as buildMetadata,
  generateStructuredData,
  siteConfig,
} from "@/lib/seo";

const sarala = Sarala({
  variable: "--font-sarala",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = buildMetadata({
  title: siteConfig.name,
  description: siteConfig.description,
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
};

const structuredData = generateStructuredData({
  type: "WebApplication",
  name: siteConfig.name,
  description: siteConfig.description,
  url: siteConfig.url,
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <head>
        <Script
          id="structured-data"
          type="application/ld+json"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <link rel="manifest" href="/manifest.webmanifest" />
        <meta name="theme-color" content="#0a0a0a" />
        <meta name="color-scheme" content="dark light" />
      </head>
      <body className={`${sarala.variable} ${geistMono.variable} antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
