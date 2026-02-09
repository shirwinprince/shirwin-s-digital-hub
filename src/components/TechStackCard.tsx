import BentoCard from "./BentoCard";

const techStack = [
  { name: "Python", icon: "🐍" },
  { name: "SQL", icon: "🗄️" },
  { name: "Pandas", icon: "🐼" },
  { name: "NumPy", icon: "🔢" },
  { name: "Matplotlib", icon: "📊" },
  { name: "Seaborn", icon: "📈" },
  { name: "Power BI", icon: "📉" },
  { name: "DAX", icon: "⚡" },
  { name: "Streamlit", icon: "🚀" },
  { name: "Azure AI", icon: "☁️" },
];

const TechStackCard = () => {
  return (
    <BentoCard className="md:col-span-2" delay={0.1}>
      <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-4">Tech Stack</h2>
      <div className="flex flex-wrap gap-3">
        {techStack.map((tech) => (
          <div key={tech.name} className="tech-icon gap-2 px-4">
            <span className="text-lg">{tech.icon}</span>
            <span className="text-sm font-medium text-foreground">{tech.name}</span>
          </div>
        ))}
      </div>
    </BentoCard>
  );
};

export default TechStackCard;
