import BentoCard from "./BentoCard";
import { motion } from "framer-motion";
import { useState } from "react";

const techStack = [
  { name: "Python", icon: "🐍", level: 95 },
  { name: "SQL", icon: "🗄️", level: 85 },
  { name: "Pandas", icon: "🐼", level: 88 },
  { name: "NumPy", icon: "🔢", level: 85 },
  { name: "Scikit-Learn", icon: "🧠", level: 90 },
  { name: "Power BI", icon: "📊", level: 85 },
  { name: "Streamlit", icon: "🚀", level: 82 },
  { name: "Azure AI", icon: "☁️", level: 70 },
];

const ProgressRing = ({ level, size = 52, stroke = 4 }: { level: number; size?: number; stroke?: number }) => {
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (level / 100) * circumference;

  return (
    <svg width={size} height={size} className="transform -rotate-90">
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke="hsl(var(--muted))"
        strokeWidth={stroke}
      />
      <motion.circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke="url(#ringGradient)"
        strokeWidth={stroke}
        strokeLinecap="round"
        strokeDasharray={circumference}
        initial={{ strokeDashoffset: circumference }}
        animate={{ strokeDashoffset: offset }}
        transition={{ duration: 1.2, ease: "easeOut", delay: 0.3 }}
      />
      <defs>
        <linearGradient id="ringGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="hsl(var(--primary))" />
          <stop offset="100%" stopColor="hsl(var(--secondary))" />
        </linearGradient>
      </defs>
    </svg>
  );
};

const TechStackCard = () => {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <BentoCard className="md:col-span-2" delay={0.1}>
      <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-5">
        Tech Stack & Skill Levels
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {techStack.map((tech) => (
          <motion.div
            key={tech.name}
            onHoverStart={() => setHovered(tech.name)}
            onHoverEnd={() => setHovered(null)}
            className="flex flex-col items-center gap-2 group"
            whileHover={{ scale: 1.05 }}
          >
            <div className="relative">
              <ProgressRing level={hovered === tech.name ? tech.level : tech.level} />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-lg">{tech.icon}</span>
              </div>
            </div>
            <span className="text-xs font-medium text-foreground text-center">{tech.name}</span>
            <motion.span
              className="text-[10px] font-mono text-primary"
              initial={{ opacity: 0 }}
              animate={{ opacity: hovered === tech.name ? 1 : 0.6 }}
            >
              {tech.level}%
            </motion.span>
          </motion.div>
        ))}
      </div>
    </BentoCard>
  );
};

export default TechStackCard;
