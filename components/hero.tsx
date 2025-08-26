import { Gmail, WhatsApp } from "./icons";
import { Button } from "./ui/button";

type HeroProps = {
  description: string | undefined;
  email: string | undefined;
  photoUrl: string | undefined;
  whatsappNumber: string | undefined;
};

export const Hero = ({
  description,
  email,
  photoUrl,
  whatsappNumber,
}: HeroProps) => {
  return (
    <section className="relative z-20 flex flex-col-reverse md:flex-row md:items-center md:justify-between">
      <div className="text-center md:text-left">
        <h2 className="text-3xl sm:text-4xl md:text-[4rem] font-bold mb-2 md:mb-4">
          Abogada <span className="text-primary">Tech</span>
        </h2>
        {description && (
          <p className="text-base md:text-xl mb-6 md:mb-8 text-muted-foreground whitespace-normal max-w-[420px] mx-auto md:mx-0">
            {description}
          </p>
        )}

        <div className="flex p-2.5 rounded-full border w-fit mx-auto md:mx-0">
          {whatsappNumber && (
            <a
              href={`https://wa.me/${whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="primary" size="icon" className="mr-2.5">
                <WhatsApp />
              </Button>
            </a>
          )}
          {email && (
            <a
              href={`mailto:${email}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="primary" size="icon">
                <Gmail />
              </Button>
            </a>
          )}
          <span className="text-xl font-bold mx-8 my-auto text-primary">
            Contactar
          </span>
        </div>
      </div>

      <div className="-mask-linear-70 mask-linear-from-50% mask-linear-to-100%">
        <div className="w-40 h-40 min-w-40 min-h-40 sm:min-w-52 sm:min-h-52 sm:w-52 sm:h-52 md:w-64 md:h-64 md:min-w-64 md:min-h-64 lg:w-[280px] lg:h-[280px] mx-auto md:mx-0 mb-4 md:mb-0 rounded-4xl overflow-hidden mask-linear-75 mask-linear-from-60% mask-linear-to-100% ">
          {photoUrl && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={photoUrl}
              alt="Foto de perfil"
              className="w-full h-full object-cover shadow-lg md:shadow-none"
              onError={(e) => {
                console.error("Error loading hero image:", e);
                const target = e.target as HTMLImageElement;
                target.style.display = "none";
              }}
            />
          )}
        </div>
      </div>
    </section>
  );
};
