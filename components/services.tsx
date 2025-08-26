type ServiceItem = {
  id?: string;
  _id?: string;
  content: string;
  description?: string;
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
    <>
      {devServices && devServicesTitle && (
        <section
          className={`bg-card mb-4 rounded-[2.25rem] py-5 pb-8 px-4 md:px-10 relative z-20 flex flex-col gap-4 ${
            !businessServices && "lg:mb-8 "
          }`}
        >
          <Service services={devServices} title={devServicesTitle} />
        </section>
      )}
      {businessServices && businessServicesTitle && (
        <section className="bg-card mb-4 lg:mb-8 rounded-[2.25rem] pb-8 py-5 px-4 md:px-10 relative z-20 flex flex-col gap-4">
          <Service services={businessServices} title={businessServicesTitle} />
        </section>
      )}
    </>
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
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {validServices.map((service, index) => (
          <div
            key={service.id || service._id || `service-${index}`}
            className="group relative"
          >
            <div className="bg-card/50 backdrop-blur-sm border rounded-2xl p-6 hover:bg-card/70 transition-all duration-300 hover:shadow-lg">
              <div className="flex items-start gap-3">
                <div className="h-2 w-2 bg-primary/50 border rounded-full mt-2 flex-shrink-0"></div>
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                    {service.content}
                  </h3>
                  {service.description && (
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {service.description}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
