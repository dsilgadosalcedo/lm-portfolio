import { Metadata } from "next";

export const siteConfig = {
  name: "Linda M. Armesto",
  description:
    "Soy una abogada especializada en derecho tecnológico, asesoría legal para startups, empresas de software y protección de datos.",
  url: process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000",
  creator: "Linda M. Armesto",
  keywords: [
    "abogada",
    "derecho tecnológico",
    "protección de datos",
    "startups",
    "legaltech",
    "asesoría legal",
  ],
} as const;

export function generateMetadata({
  title,
  description,
  image,
  path = "",
  noIndex = false,
  twitterCreator = "@",
}: {
  title?: string;
  description?: string;
  image?: string;
  path?: string;
  noIndex?: boolean;
  twitterCreator?: string;
}): Metadata {
  const url = `${siteConfig.url}${path}`;
  const fullTitle = title ?? siteConfig.name;

  return {
    title: fullTitle,
    description: description ?? siteConfig.description,
    keywords: [...siteConfig.keywords],
    authors: [{ name: siteConfig.creator }],
    creator: siteConfig.creator,
    publisher: siteConfig.creator,

    robots: {
      index: !noIndex,
      follow: !noIndex,
      googleBot: {
        index: !noIndex,
        follow: !noIndex,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },

    openGraph: {
      type: "website",
      locale: "es_ES",
      url,
      title: fullTitle,
      description: description ?? siteConfig.description,
      siteName: siteConfig.name,
      images: image ? [{ url: image }] : undefined,
    },

    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description: description ?? siteConfig.description,
      images: image ? [image] : undefined,
      creator: twitterCreator,
    },

    metadataBase: new URL(siteConfig.url),
    alternates: { canonical: url },

    applicationName: siteConfig.name,
    appleWebApp: {
      capable: true,
      statusBarStyle: "default",
      title: siteConfig.name,
    },
    formatDetection: { telephone: false },
  };
}

export function generateStructuredData({
  type = "WebApplication",
  name,
  description,
  url,
  image,
  additionalData = {},
}: {
  type?: "WebApplication" | "CreativeWork" | "SoftwareApplication";
  name: string;
  description: string;
  url: string;
  image?: string;
  additionalData?: Record<string, unknown>;
}) {
  const baseData: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": type,
    name,
    description,
    url,
    applicationCategory: "Utility",
    operatingSystem: "Web Browser",
    creator: { "@type": "Person", name: siteConfig.creator },
  };

  if (image) baseData.image = image;

  return { ...baseData, ...additionalData };
}

export const sitemapRoutes = [
  { url: "/", lastModified: new Date(), changeFrequency: "daily", priority: 1 },
] as const;
