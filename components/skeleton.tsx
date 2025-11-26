import { Header } from "./header";
import { Skeleton } from "./ui/skeleton";

export const PortfolioSkeleton = () => {
  return (
    <div className="grid min-h-screen font-[family-name:var(--font-sarala)]">
      <main className="flex flex-col flex-1 items-center sm:items-start max-w-[1100px] w-full mx-auto md:px-7 overflow-hidden">
        <Header linkedinUsername={undefined} />

        <div className="flex-1 rounded-4xl md:rounded-t-[3.5rem] border-t border-x border-border md:pt-14 pt-8 px-4 md:px-20 w-full shadow-[0_-4px_20px_0_rgba(161,143,227,0.12)] relative">
          {/* Gradient */}
          <div className="bg-gradient-to-b from-transparent to-background h-full w-screen absolute bottom-0 md:-left-10 lg:-left-30 z-10" />

          {/* Hero Section Skeleton */}
          <section className="relative z-20 flex flex-col-reverse md:flex-row md:items-center md:justify-between mb-8">
            <div className="text-center md:text-left flex-1">
              {/* Title Skeleton */}
              <div className="mb-4">
                <Skeleton className="h-12 md:h-20 w-64 md:w-96 mx-auto md:mx-0 mb-4" />
              </div>

              {/* Description Skeleton */}
              <div className="mb-6 md:mb-8 max-w-[420px] mx-auto md:mx-0">
                <Skeleton className="h-5 md:h-6 w-full mb-2" />
              </div>

              {/* Contact Buttons Skeleton */}
              <div className="flex p-2.5 rounded-full border w-fit mx-auto md:mx-0">
                <Skeleton className="w-10 h-10 rounded-full mr-2.5" />
                <Skeleton className="w-10 h-10 rounded-full" />
                <Skeleton className="h-6 w-24 mx-8 my-auto" />
              </div>
            </div>

            {/* Photo Skeleton */}
            <div className="w-40 h-40 min-w-40 min-h-40 sm:min-w-52 sm:min-h-52 sm:w-52 sm:h-52 md:w-64 md:h-64 md:min-w-64 md:min-h-64 lg:w-[280px] lg:h-[280px] mx-auto md:mx-0 mb-4 md:mb-0 rounded-4xl overflow-hidden">
              <Skeleton className="w-full h-full" />
            </div>
          </section>

          {/* Experience Section Skeleton */}
          <div className="flex flex-wrap gap-6 my-8">
            <div className="flex items-center gap-2">
              <Skeleton className="w-5 h-5 rounded" />
              <Skeleton className="h-5 w-32" />
            </div>
            <div className="flex items-center gap-2">
              <Skeleton className="w-5 h-5 rounded" />
              <Skeleton className="h-5 w-40" />
            </div>
            <div className="flex items-center gap-2">
              <Skeleton className="w-5 h-5 rounded" />
              <Skeleton className="h-5 w-36" />
            </div>
          </div>

          {/* Services Section Skeleton */}
          <section className="bg-card mb-4 rounded-[2.25rem] py-5 pb-8 px-4 md:px-10 relative z-20 flex flex-col gap-4">
            <Skeleton className="h-8 w-48 mb-2" />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="bg-card/50 backdrop-blur-sm border rounded-2xl p-6"
                >
                  <Skeleton className="h-6 w-3/4 mb-2" />
                  <Skeleton className="h-4 w-full mb-1" />
                  <Skeleton className="h-4 w-5/6" />
                </div>
              ))}
            </div>
          </section>

          {/* Business Services Section Skeleton */}
          <section className="bg-card mb-4 lg:mb-8 rounded-[2.25rem] pb-8 py-5 px-4 md:px-10 relative z-20 flex flex-col gap-4">
            <Skeleton className="h-8 w-56 mb-2" />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {[1, 2].map((i) => (
                <div
                  key={i}
                  className="bg-card/50 backdrop-blur-sm border rounded-2xl p-6"
                >
                  <Skeleton className="h-6 w-3/4 mb-2" />
                  <Skeleton className="h-4 w-full mb-1" />
                  <Skeleton className="h-4 w-5/6" />
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};
