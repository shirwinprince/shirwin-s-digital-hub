import { useMemo } from "react";
import BentoCard from "./BentoCard";
import { Github } from "lucide-react";
import { motion } from "framer-motion";

const GitHubActivityCard = () => {
  // Generate mock contribution data (52 weeks x 7 days)
  const contributions = useMemo(() => {
    const data: number[] = [];
    for (let i = 0; i < 364; i++) {
      const rand = Math.random();
      if (rand < 0.3) data.push(0);
      else if (rand < 0.55) data.push(1);
      else if (rand < 0.75) data.push(2);
      else if (rand < 0.9) data.push(3);
      else data.push(4);
    }
    return data;
  }, []);

  const getLevelClass = (level: number) => {
    switch (level) {
      case 0: return "bg-muted/50";
      case 1: return "bg-primary/25";
      case 2: return "bg-primary/45";
      case 3: return "bg-primary/70";
      case 4: return "bg-primary";
      default: return "bg-muted/50";
    }
  };

  const weeks: number[][] = [];
  for (let w = 0; w < 52; w++) {
    weeks.push(contributions.slice(w * 7, w * 7 + 7));
  }

  return (
    <BentoCard delay={0.5} className="md:col-span-2">
      <div className="flex items-center gap-2 mb-4">
        <Github size={16} className="text-primary" />
        <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">GitHub Activity</h2>
        <a
          href="https://github.com/shirwinprince"
          target="_blank"
          rel="noopener noreferrer"
          className="ml-auto text-xs text-primary hover:underline"
        >
          @shirwinprince
        </a>
      </div>
      <div className="overflow-x-auto">
        <div className="flex gap-[3px] min-w-[680px]">
          {weeks.map((week, wi) => (
            <div key={wi} className="flex flex-col gap-[3px]">
              {week.map((level, di) => (
                <motion.div
                  key={di}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.01 * wi, duration: 0.2 }}
                  className={`w-[10px] h-[10px] rounded-[2px] ${getLevelClass(level)} transition-colors`}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
      <div className="flex items-center gap-2 mt-3 text-[10px] text-muted-foreground">
        <span>Less</span>
        {[0, 1, 2, 3, 4].map((l) => (
          <div key={l} className={`w-[10px] h-[10px] rounded-[2px] ${getLevelClass(l)}`} />
        ))}
        <span>More</span>
      </div>
    </BentoCard>
  );
};

export default GitHubActivityCard;
