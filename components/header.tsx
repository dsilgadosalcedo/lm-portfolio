import { LinkedIn } from "./icons";
import { Button } from "./ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";

export const Header = ({
  linkedinUsername,
}: {
  linkedinUsername: string | undefined;
}) => {
  return (
    <header className="flex items-center justify-between w-full my-2 md:my-6 px-4 md:px-20 animate-fade-in-up">
      <h1 className="text-xl font-base text-primary">Linda Armesto</h1>

      {linkedinUsername && (
        <Tooltip>
          <TooltipTrigger asChild>
            <a
              href={`https://www.linkedin.com/in/${linkedinUsername}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="outline" size="icon">
                <LinkedIn />
              </Button>
            </a>
          </TooltipTrigger>
          <TooltipContent>
            <p>Ver @LindaArmesto</p>
          </TooltipContent>
        </Tooltip>
      )}
    </header>
  );
};
