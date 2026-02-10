import BentoCard from "./BentoCard";
import { motion } from "framer-motion";

const techStack = [
  { name: "Python", icon: "🐍", level: 90 },
  { name: "SQL", icon: "🗄️", level: 80 },
  { name: "Pandas", icon: "🐼", level: 85 },
  { name: "NumPy", icon: "🔢", level: 80 },
  { name: "Matplotlib", icon: "📊", level: 75 },
  { name: "Seaborn", icon: "📈", level: 70 },
  { name: "Power BI", icon: "📉", level: 85 },
  { name: "DAX", icon: "⚡", level: 75 },
  { name: "Streamlit", icon: "🚀", level: 80 },
  { name: "Azure AI", icon: "☁️", level: 65 },
];

const TechStackCard = () => {
  return (
    <BentoCard className="md:col-span-2" delay={0.1}>
      <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-5">Tech Stack</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {techStack.map((tech, i) => (
          <div key={tech.name} className="group flex items-center gap-3">
            <div className="tech-icon !p-2 shrink-0">
              <span className="text-base">{tech.icon}</span>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-center mb-1">
                <span className="text-xs font-medium text-foreground">{tech.name}</span>
                <span className="text-[10px] font-mono text-muted-foreground">{tech.level}%</span>
              </div>
              <div className="progress-bar">
                <motion.div
                  className="progress-bar-fill"
                  initial={{ width: 0 }}
                  animate={{ width: `${tech.level}%` }}
                  transition={{ duration: 1, delay: 0.3 + i * 0.08, ease: "easeOut" }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </BentoCard>
  );
};

export default TechStackCard;
