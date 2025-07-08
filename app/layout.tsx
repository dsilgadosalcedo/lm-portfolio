import type { Metadata } from "next";
import { Geist, Geist_Mono, Sarala } from "next/font/google";
import "./globals.css";

const sarala = Sarala({
  variable: "--font-sarala",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Linda M. Armesto",
  description:
    "Soy una abogada especializada en derecho tecnológico, asesoría legal para startups, empresas de software y protección de datos.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${sarala.variable} ${geistMono.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
