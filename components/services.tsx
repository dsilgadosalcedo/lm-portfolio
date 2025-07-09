import { Separator } from "./ui/separator";
import { PortfolioItem } from "@/lib/notion.mapper";

type ServicesProps = {
  devServicesTitle: string | undefined;
  devServices: PortfolioItem[] | undefined;
  businessServicesTitle: string | undefined;
  businessServices: PortfolioItem[] | undefined;
};

export const Services = ({
  devServicesTitle,
  devServices,
  businessServicesTitle,
  businessServices,
}: ServicesProps) => {
  return (
    <section className="bg-card mb-4 lg:mb-8 rounded-[2.25rem] py-5 px-10 relative z-20 flex flex-col gap-4">
      {devServices && devServicesTitle && (
        <Service services={devServices} title={devServicesTitle} />
      )}
      {businessServices && businessServicesTitle && (
        <Service services={businessServices} title={businessServicesTitle} />
      )}
    </section>
  );
};

const Service = ({
  services,
  title,
}: {
  services: PortfolioItem[];
  title: string;
}) => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-2">{title}</h2>
      <ul className="flex flex-wrap justify-center">
        {services.map((service, index) => (
          <div key={`service-${index}`} className="flex items-center">
            <li className="flex items-center justify-center h-22.5 w-42 max-w-42 text-center text-balance text-muted-foreground">
              {service.name}
            </li>
            {index !== services.length - 1 && index !== 3 && (
              <div className="hidden lg:block h-15">
                <Separator orientation="vertical" className="mx-4" />
              </div>
            )}
          </div>
        ))}
      </ul>
    </div>
  );
};
