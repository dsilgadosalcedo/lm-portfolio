import { Skeleton } from "@/components/ui/skeleton";

export const PortfolioSkeleton = () => {
  return (
    <div className="grid min-h-screen font-[family-name:var(--font-sarala)]">
      <main className="flex flex-col flex-1 items-center sm:items-start max-w-[1100px] w-full mx-auto md:px-7 overflow-hidden">
        {/* Header Skeleton */}
        <header className="flex items-center justify-between w-full my-2 md:my-6 px-20">
          <Skeleton className="h-6 w-32" />
          <Skeleton className="h-10 w-10 rounded-full" />
        </header>

        <div className="flex-1 rounded-4xl md:rounded-t-[3.5rem] border-t border-x border-border md:pt-14 pt-8 px-4 md:px-20 w-full shadow-[0_-4px_20px_0_rgba(161,143,227,0.12)] relative">
          {/* Gradient */}
          <div className="bg-gradient-to-b from-transparent to-background h-full w-screen absolute bottom-0 md:-left-10 lg:-left-30 z-10" />

          {/* Hero Section Skeleton */}
          <section className="flex justify-between relative z-20 mb-16">
            <div className="flex-1">
              {/* Title */}
              <div className="mb-2 md:mb-4">
                <Skeleton className="h-12 md:h-16 w-64 md:w-80 mb-2" />
              </div>
              
              {/* Description */}
              <div className="mb-8">
                <Skeleton className="h-6 w-full max-w-[420px] mb-2" />
                <Skeleton className="h-6 w-3/4 max-w-[320px]" />
              </div>

              {/* Contact Buttons */}
              <div className="flex p-2.5 rounded-full border w-fit">
                <Skeleton className="h-10 w-10 rounded-full mr-2.5" />
                <Skeleton className="h-10 w-10 rounded-full mr-8" />
                <Skeleton className="h-6 w-20" />
              </div>
            </div>

            {/* Profile Photo */}
            <div className="hidden md:block">
              <Skeleton className="w-[280px] h-[280px] rounded-full" />
            </div>
          </section>

          {/* Experience Section Skeleton */}
          <section className="mb-16">
            <div className="mb-8">
              <Skeleton className="h-8 w-48 mb-4" />
              <div className="space-y-6">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex gap-4">
                    <Skeleton className="h-16 w-16 rounded-lg flex-shrink-0" />
                    <div className="flex-1">
                      <Skeleton className="h-6 w-3/4 mb-2" />
                      <Skeleton className="h-4 w-1/2 mb-2" />
                      <Skeleton className="h-4 w-full mb-1" />
                      <Skeleton className="h-4 w-2/3" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Services Section Skeleton */}
          <section className="mb-16">
            {/* Development Services */}
            <div className="mb-12">
              <Skeleton className="h-8 w-64 mb-6" />
              <div className="grid md:grid-cols-2 gap-6">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="p-6 rounded-lg border">
                    <Skeleton className="h-6 w-3/4 mb-3" />
                    <Skeleton className="h-4 w-full mb-2" />
                    <Skeleton className="h-4 w-2/3" />
                  </div>
                ))}
              </div>
            </div>

            {/* Business Services */}
            <div>
              <Skeleton className="h-8 w-64 mb-6" />
              <div className="grid md:grid-cols-2 gap-6">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="p-6 rounded-lg border">
                    <Skeleton className="h-6 w-3/4 mb-3" />
                    <Skeleton className="h-4 w-full mb-2" />
                    <Skeleton className="h-4 w-2/3" />
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}; 