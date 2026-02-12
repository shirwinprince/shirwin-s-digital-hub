import { useMemo, useEffect, useState } from "react";
import BentoCard from "./BentoCard";
import { Github, Loader2 } from "lucide-react";
import { motion } from "framer-motion";

interface ContributionDay {
  date: string;
  count: number;
  level: number;
}

const GitHubActivityCard = () => {
  const [realData, setRealData] = useState<ContributionDay[] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resp = await fetch(
          `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/github-activity`,
          {
            headers: {
              Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
            },
          }
        );
        if (resp.ok) {
          const data = await resp.json();
          if (data.contributions && Array.isArray(data.contributions)) {
            setRealData(data.contributions);
          }
        }
      } catch {
        // Fall back to mock data
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Mock fallback
  const mockContributions = useMemo(() => {
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
  if (realData) {
    // Use last 364 days of real data
    const last364 = realData.slice(-364);
    for (let w = 0; w < 52; w++) {
      weeks.push(last364.slice(w * 7, w * 7 + 7).map((d) => d.level));
    }
  } else {
    for (let w = 0; w < 52; w++) {
      weeks.push(mockContributions.slice(w * 7, w * 7 + 7));
    }
  }

  const totalContributions = realData
    ? realData.reduce((sum, d) => sum + d.count, 0)
    : null;

  return (
    <BentoCard delay={0.5}>
      <div className="flex items-center gap-2 mb-4">
        <Github size={16} className="text-primary" />
        <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">GitHub Activity</h2>
        {totalContributions !== null && (
          <span className="text-xs text-primary font-mono ml-1">{totalContributions} contributions</span>
        )}
        <a
          href="https://github.com/shirwinprince"
          target="_blank"
          rel="noopener noreferrer"
          className="ml-auto text-xs text-primary hover:underline"
        >
          @shirwinprince
        </a>
      </div>
      {loading ? (
        <div className="flex items-center justify-center py-8">
          <Loader2 size={20} className="animate-spin text-muted-foreground" />
        </div>
      ) : (
        <>
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
        </>
      )}
    </BentoCard>
  );
};

export default GitHubActivityCard;
