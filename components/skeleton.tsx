import { Header } from "./header";
import { Hero } from "./hero";
import { Experience } from "./experience";
import { Services } from "./services";

export const PortfolioSkeleton = () => {
  return (
    <div className="grid min-h-screen font-[family-name:var(--font-sarala)]">
      <main className="flex flex-col flex-1 items-center sm:items-start max-w-[1100px] w-full mx-auto md:px-7 overflow-hidden">
        <Header linkedinUsername="Linda Armesto" />

        <div className="flex-1 rounded-4xl md:rounded-t-[3.5rem] border-t border-x border-border md:pt-14 pt-8 px-4 md:px-20 w-full shadow-[0_-4px_20px_0_rgba(161,143,227,0.12)] relative">
          {/* Gradient */}
          <div className="bg-gradient-to-b from-transparent to-background h-full w-screen absolute bottom-0 md:-left-10 lg:-left-30 z-10" />

          <Hero
            description={"···"}
            email={"example@example.com"}
            photoUrl={undefined}
            whatsappNumber={"1234567890"}
            title={undefined}
            titleHighlighted={undefined}
          />

          <Experience experience={[]} />

          <Services
            devServicesTitle={""}
            devServices={undefined}
            businessServicesTitle={""}
            businessServices={undefined}
          />
        </div>
      </main>
    </div>
  );
}; 