import { Gmail, LinkedIn, WhatsApp } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { services } from "@/lib/constants";
import { Award } from "lucide-react";

export default function Home() {
  return (
    <div className="grid min-h-screen font-[family-name:var(--font-sarala)]">
      <main className="flex flex-col flex-1 items-center sm:items-start max-w-[1100px] w-full mx-auto md:px-7 overflow-hidden">
        {/* Header */}
        <header className="flex items-center justify-between w-full my-2 md:my-6 px-20">
          <h1 className="text-xl font-base text-primary">Linda Armesto</h1>

          <Tooltip>
            <TooltipTrigger>
              <a
                href="https://www.linkedin.com/in/linda-armesto/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="outline" size="icon">
                  <LinkedIn />
                </Button>
              </a>
            </TooltipTrigger>
            <TooltipContent>
              <p>Ver @LindaArmesto</p>
            </TooltipContent>
          </Tooltip>
        </header>

        <div className="flex-1 rounded-4xl md:rounded-t-[3.5rem] border-t border-x border-border md:pt-14 pt-8 px-4 md:px-20 w-full shadow-[0_-4px_20px_0_rgba(161,143,227,0.12)] relative">
          {/* Gradient */}
          <div className="bg-gradient-to-b from-transparent to-background h-full w-screen absolute bottom-0 md:-left-10 lg:-left-30 z-10" />

          {/* Hero */}
          <section className="flex justify-between relative z-20">
            <div>
              <h2 className="text-4xl md:text-[4rem] font-bold mb-2 md:mb-0">
                Abogada <span className="text-primary">Tech</span>
              </h2>
              <p className="md:hidden text-lg mb-8 text-muted-foreground">
                Asesoría y representación legal estratégica para el mundo tech
              </p>
              <p className="hidden md:block text-xl mb-8 text-muted-foreground">
                Asesoría y representación legal estratégica
                <br />
                para el mundo tech
              </p>
              <div className="flex p-2.5 rounded-full border w-fit">
                <a
                  href="https://wa.me/573136037029"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button variant="primary" size="icon" className="mr-2.5">
                    <WhatsApp />
                  </Button>
                </a>
                <Button variant="primary" size="icon">
                  <Gmail />
                </Button>
                <span className="text-xl font-bold mx-8 my-auto text-primary">
                  Contactar
                </span>
              </div>
            </div>

            <div>
              <img
                src="/profile-photo.png"
                alt="Foto de perfil"
                width={280}
                height={280}
                className="mask-b-from-50% mask-radial-[50%_90%] mask-radial-from-80% animate-in  fade-in fade-out duration-300"
              />
            </div>
          </section>

          {/* Experience */}
          <section className="relative z-20 py-8">
            <ul className="flex flex-wrap gap-6">
              <li className="flex items-center gap-2">
                <div className="h-10 w-10 bg-border rounded-full relative overflow-hidden grid place-items-center">
                  <div className="h-6 w-6 bg-radial from-primary/50 to-border rounded-full absolute -bottom-2.5 left-1/2 -translate-x-1/2" />
                  <Award className="text-muted-foreground z-20" />
                </div>
                <p>
                  <span className="font-bold">2</span> Años de experiencia
                </p>
              </li>
              <li className="flex items-center gap-2">
                <div className="h-10 w-10 bg-border rounded-full relative overflow-hidden grid place-items-center">
                  <div className="h-6 w-6 bg-radial from-primary/50 to-border rounded-full absolute -bottom-2.5 left-1/2 -translate-x-1/2" />
                  <Award className="text-muted-foreground z-20" />
                </div>
                <p>
                  <span className="font-bold">25</span> Casos resueltos
                </p>
              </li>
              <li className="flex items-center gap-2">
                <div className="h-10 w-10 bg-border rounded-full relative overflow-hidden grid place-items-center">
                  <div className="h-6 w-6 bg-radial from-primary/50 to-border rounded-full absolute -bottom-2.5 left-1/2 -translate-x-1/2" />
                  <Award className="text-muted-foreground z-20" />
                </div>
                <p>
                  <span className="font-bold">6</span> Empresas creadas
                </p>
              </li>
            </ul>
          </section>

          {/* Services */}
          <section className="bg-card mb-4 lg:mb-0 rounded-[2.25rem] py-5 px-10 relative z-20">
            <ul className="flex flex-wrap justify-center">
              {services.map((service, index) => (
                <div key={`service-${index}`} className="flex items-center">
                  <li className="flex items-center justify-center h-22.5 w-42 max-w-42 text-center text-balance text-muted-foreground">
                    {service}
                  </li>
                  {index !== services.length - 1 && index !== 3 && (
                    <div className="hidden lg:block h-15">
                      <Separator orientation="vertical" className="mx-4" />
                    </div>
                  )}
                </div>
              ))}
            </ul>
          </section>
        </div>
      </main>
    </div>
  );
}
