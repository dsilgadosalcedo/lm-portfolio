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
  services: ServiceItem[];
  title: string;
}) => {
  // Filter out items without valid IDs
  const validServices = services.filter(service => service && (service.id || service._id));
  
  if (validServices.length === 0) return null;
  
  return (
    <div>
      <h2 className="text-2xl font-bold mb-2">{title}</h2>
      <ul className="flex flex-wrap justify-center">
        {validServices.map((service, index) => (
          <li key={service.id || service._id || `service-${index}`} className="flex items-center">
            <div className="flex items-center justify-center h-22.5 w-42 max-w-42 text-center text-balance text-muted-foreground">
              {service.content}
            </div>
            {index !== validServices.length - 1 && index !== 3 && (
              <div className="hidden lg:block h-15">
                <Separator orientation="vertical" className="mx-4" />
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};
