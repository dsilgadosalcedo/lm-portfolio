import { Separator } from "./ui/separator";

type ServiceItem = {
  id?: string;
  _id?: string;
  content: string;
};

type ServicesProps = {
  devServicesTitle: string | undefined;
  devServices: ServiceItem[] | undefined;
  businessServicesTitle: string | undefined;
  businessServices: ServiceItem[] | undefined;
};

export const Services = ({
  devServicesTitle,
  devServices,
  businessServicesTitle,
  businessServices,
}: ServicesProps) => {
  if (!devServices && !businessServices) return null;

  return (
    <section className="bg-card mb-4 lg:mb-8 rounded-[2.25rem] py-5 px-4 md:px-10 relative z-20 flex flex-col gap-4">
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
  services: ServiceItem[];
  title: string;
}) => {
  // Filter out items without valid IDs
  const validServices = services.filter(
    (service) => service && (service.id || service._id)
  );

  if (validServices.length === 0) return null;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-2">{title}</h2>
      <ul className="flex flex-col md:flex-row md:flex-wrap md:justify-center gap-3 sm:gap-4 md:gap-0">
        {validServices.map((service, index) => (
          <li
            key={service.id || service._id || `service-${index}`}
            className="flex items-center"
          >
            <div className="h-2 w-2 bg-primary/50 border rounded-full mr-2 md:hidden"></div>
            <div className="md:h-22.5 md:w-42 md:max-w-42 flex items-center justify-center px-4 py-2 rounded-full border md:text-balance text-muted-foreground bg-background/40 text-sm md:text-base md:p-0 md:border-none md:bg-transparent text-start md:text-center">
              {service.content}
            </div>
            {index !== validServices.length - 1 && index !== 3 && (
              <div className="hidden lg:block h-10 my-auto">
                <Separator orientation="vertical" className="mx-4" />
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};
