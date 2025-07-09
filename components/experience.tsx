import { Award } from "lucide-react";
import { PortfolioItem } from "@/lib/notion.mapper";

export const Experience = ({
  experience,
}: {
  experience: PortfolioItem[] | undefined;
}) => {
  if (!experience) return null;

  return (
    <section className="relative z-20 py-8">
      <ul className="flex flex-wrap gap-6">
        {experience.map(
          (item, index) =>
            item.name && (
              <li
                key={`${item.id}${index}`}
                className="flex items-center gap-2"
              >
                <div className="h-10 w-10 bg-border rounded-full relative overflow-hidden grid place-items-center">
                  <div className="h-6 w-6 bg-radial from-primary/50 to-border rounded-full absolute -bottom-2.5 left-1/2 -translate-x-1/2" />
                  <Award className="text-muted-foreground z-20" />
                </div>
                <p>
                  {/* <span className="font-bold">2</span> */}
                  {item.name}
                </p>
              </li>
            )
        )}
      </ul>
    </section>
  );
};
