import type { Metadata } from "next";
import { Geist_Mono, Sarala } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import {
  ClerkProvider,
} from '@clerk/nextjs'

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
    <ClerkProvider
      signUpForceRedirectUrl="/editar"
      afterSignOutUrl="/sign-in"
      signInUrl="/sign-in"
      signInForceRedirectUrl="/editar"
    >
      <html lang="es">
        <body className={`${sarala.variable} ${geistMono.variable} antialiased`}>
          <Providers>{children}</Providers>
        </body>
      </html>
    </ClerkProvider>
  );
}
