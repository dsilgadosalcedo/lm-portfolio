import { Award } from "lucide-react";

type ExperienceItem = {
  id?: string;
  _id?: string;
  content: string;
};

export const Experience = ({
  experience,
}: {
  experience?: ExperienceItem[];
}) => {
  if (!experience || experience.length === 0) return null;
  
  // Filter out items without valid IDs and add fallback keys
  const validExperience = experience.filter(item => item && (item.id || item._id));
  
  if (validExperience.length === 0) return null;
  
  return (
    <div className="flex flex-wrap gap-6 my-8">
      {validExperience.map((item, index) => (
        <div
          key={item.id || item._id || `experience-${index}`}
          className="flex items-center gap-2 text-muted-foreground text-base animate-fade-in-up"
          style={{ animationDelay: `${0.2 + index * 0.1}s` }}
        >
          <Award className="w-5 h-5 text-primary" />
          <span>{item.content}</span>
        </div>
      ))}
    </div>
  );
};
