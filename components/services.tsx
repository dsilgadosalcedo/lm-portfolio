"use client";

import { useState } from "react";

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
          className={`bg-card mb-4 rounded-[2.25rem] py-5 pb-8 px-4 md:px-10 relative z-20 flex flex-col gap-4 animate-fade-in-up animate-delay-300 ${
            !businessServices && "lg:mb-8 "
          }`}
        >
          <Service services={devServices} title={devServicesTitle} />
        </section>
      )}
      {businessServices && businessServicesTitle && (
        <section className="bg-card mb-4 lg:mb-8 rounded-[2.25rem] pb-8 py-5 px-4 md:px-10 relative z-20 flex flex-col gap-4 animate-fade-in-up animate-delay-400">
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
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());

  // Filter out items without valid IDs
  const validServices = services.filter(
    (service) => service && (service.id || service._id)
  );

  if (validServices.length === 0) return null;

  const toggleDescription = (serviceId: string) => {
    setExpandedItems((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(serviceId)) {
        newSet.delete(serviceId);
      } else {
        newSet.add(serviceId);
      }
      return newSet;
    });
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-2">{title}</h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {validServices.map((service, index) => {
          const serviceId = service.id || service._id || `service-${index}`;
          const isExpanded = expandedItems.has(serviceId);
          const hasDescription = !!service.description;

          return (
            <div
              key={serviceId}
              className="group relative animate-fade-in-up"
              style={{ animationDelay: `${0.5 + index * 0.1}s` }}
            >
              <div className="bg-card/50 backdrop-blur-sm border rounded-2xl p-6 hover:bg-card/70 transition-all duration-300 hover:shadow-lg">
                <div className="flex items-start">
                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="font-semibold text-foreground mb-0 group-hover:text-primary transition-colors flex-1">
                        {service.content}
                      </h3>
                      {hasDescription && (
                        <button
                          onClick={() => toggleDescription(serviceId)}
                          className="mt-0.5 flex-shrink-0 p-1 rounded-md hover:bg-accent transition-colors focus:outline-none focus:ring-2 focus:ring-primary/50"
                          aria-label={
                            isExpanded
                              ? "Collapse description"
                              : "Expand description"
                          }
                          aria-expanded={isExpanded}
                        >
                          <svg
                            className={`w-5 h-5 text-muted-foreground transition-transform duration-200 ${
                              isExpanded ? "rotate-180" : ""
                            }`}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M19 9l-7 7-7-7"
                            />
                          </svg>
                        </button>
                      )}
                    </div>
                    {hasDescription && (
                      <div
                        className={`overflow-hidden transition-all duration-300 ease-in-out ${
                          isExpanded
                            ? "max-h-96 opacity-100"
                            : "max-h-0 opacity-0"
                        }`}
                      >
                        <p className="text-sm text-muted-foreground leading-relaxed pt-2">
                          {service.description}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
