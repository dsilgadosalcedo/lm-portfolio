"use client";

import { Experience } from "@/components/experience";
import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { Services } from "@/components/services";
import { PortfolioSkeleton } from "@/components/skeleton";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

export default function HomeClient() {
  const grouped = useQuery(api.queries.getPortfolioItems) || {};

  const profilePhoto = grouped["profile-photo"]?.[0];
  const photoUrl = useQuery(
    api.queries.getFileUrl,
    profilePhoto?.imageUrl ? { storageId: profilePhoto.imageUrl } : "skip"
  );

  if (!grouped || Object.keys(grouped).length === 0) {
    return <PortfolioSkeleton />;
  }

  return (
    <div className="grid min-h-screen font-[family-name:var(--font-sarala)]">
      <main className="flex flex-col flex-1 items-center sm:items-start max-w-[1100px] w-full mx-auto md:px-7 overflow-hidden">
        <Header linkedinUsername={grouped.linkedin?.[0]?.content} />

        <div className="flex-1 rounded-4xl md:rounded-t-[3.5rem] border-t border-x border-border md:pt-14 pt-8 px-4 md:px-20 w-full shadow-[0_-4px_20px_0_rgba(161,143,227,0.12)] relative">
          <div className="bg-gradient-to-b from-transparent to-background h-full w-screen absolute bottom-0 md:-left-10 lg:-left-30 z-10" />

          <Hero
            description={grouped.description?.[0]?.content}
            email={grouped.email?.[0]?.content}
            photoUrl={photoUrl || undefined}
            whatsappNumber={grouped.whatsapp?.[0]?.content}
          />

          <Experience experience={grouped.experience} />

          <Services
            devServicesTitle={grouped["service-dev-title"]?.[0]?.content}
            devServices={grouped["service-dev-item"]}
            businessServicesTitle={grouped["service-business-title"]?.[0]?.content}
            businessServices={grouped["service-business-item"]}
          />
        </div>
      </main>
    </div>
  );
}
