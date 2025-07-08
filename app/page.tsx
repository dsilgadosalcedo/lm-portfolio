import { Gmail, LinkedIn, WhatsApp } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { services } from "@/lib/constants";

export default function Home() {
  return (
    <div className="grid min-h-screen font-[family-name:var(--font-sarala)]">
      <main className="flex flex-col flex-1 items-center sm:items-start max-w-[1128px] w-full mx-auto">
        {/* Header */}
        <header className="flex items-center justify-between w-full my-6 px-20">
          <h1 className="text-xl font-base text-primary">Linda Armesto</h1>
          <Button variant="outline" size="icon">
            <LinkedIn />
          </Button>
        </header>

        <div className="flex-1 rounded-t-[3.5rem] border-t border-x border-border pt-25 px-20 w-full shadow-[0_-4px_20px_0_rgba(255,255,255,0.52)]">
          {/* Hero */}
          <section>
            <div className="mb-23">
              <h2 className="text-[4rem] font-bold mb-0">
                Abogada <span className="text-primary">Tech</span>
              </h2>
              <p className="text-xl mb-10 text-muted-foreground">
                Asesoría y representación legal estratégica
                <br />
                para el mundo tech
              </p>
              <div className="flex p-2.5 rounded-full border w-fit">
                <Button variant="primary" size="icon" className="mr-2.5">
                  <WhatsApp />
                </Button>
                <Button variant="primary" size="icon">
                  <Gmail />
                </Button>
                <span className="text-xl font-bold mx-8 my-auto text-primary">
                  Contactar
                </span>
              </div>
            </div>
          </section>

          {/* Services */}
          <section className="bg-card rounded-[2.25rem] py-5 px-10">
            <ul className="flex flex-wrap justify-center">
              {services.map((service, index) => (
                <div key={`service-${index}`} className="flex items-center">
                  <li className="flex items-center justify-center h-22.5 w-42 max-w-42 text-center text-balance text-muted-foreground">
                    {service}
                  </li>
                  {index !== services.length - 1 && index !== 3 && (
                    <div className="h-15">
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
