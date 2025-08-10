import type { Metadata } from "next";
import HomeClient from "./page-client"; // client component
import { generateMetadata as buildMetadata, siteConfig } from "@/lib/seo";
import { getHeroPhotoUrl } from "@/lib/convex-server";

export async function generateMetadata(): Promise<Metadata> {
  const heroImage = await getHeroPhotoUrl();

  return buildMetadata({
    title: siteConfig.name,
    description: siteConfig.description,
    image: heroImage ?? `${siteConfig.url}/opengraph-image`,
    path: "/",
  });
}

export default function Page() {
  return <HomeClient />;
}
