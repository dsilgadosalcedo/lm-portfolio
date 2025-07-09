import Image from "next/image";
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
    <section className="flex justify-between relative z-20">
      <div>
        <h2 className="text-4xl md:text-[4rem] font-bold mb-2 md:mb-4">
          Abogada <span className="text-primary">Tech</span>
        </h2>
        {description && (
          <p className="text-lg flex md:text-xl mb-8 text-muted-foreground whitespace-normal max-w-[420px]">
            {description}
          </p>
        )}

        <div className="flex p-2.5 rounded-full border w-fit">
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

      {photoUrl && (
        <div>
          <Image
            src={photoUrl}
            alt="Foto de perfil"
            width={280}
            height={280}
            className="mask-b-from-50% mask-radial-[50%_90%] mask-radial-from-80% animate-in  fade-in fade-out duration-300"
          />
        </div>
      )}
    </section>
  );
};
