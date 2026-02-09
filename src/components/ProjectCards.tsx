import BentoCard from "./BentoCard";
import { Brain, BarChart3, HeartPulse, Package, UtensilsCrossed } from "lucide-react";

const projects = [
  {
    title: "Bone Fracture Detection",
    desc: "CNN-based deep learning system for automated X-ray fracture analysis.",
    icon: Brain,
    tags: ["Deep Learning", "CNN", "Medical AI"],
    delay: 0.3,
  },
  {
    title: "Retail Price Analyzer",
    desc: "ML predictive pricing model with an interactive Streamlit interface.",
    icon: BarChart3,
    tags: ["ML", "Streamlit", "Prediction"],
    delay: 0.35,
  },
  {
    title: "Cancer Recurrence Prediction",
    desc: "Classification model for clinical cancer recurrence risk assessment.",
    icon: HeartPulse,
    tags: ["Classification", "Healthcare"],
    delay: 0.4,
  },
  {
    title: "SKU Clustering",
    desc: "Unsupervised ML using K-Means & DBSCAN for inventory optimization.",
    icon: Package,
    tags: ["K-Means", "DBSCAN", "Clustering"],
    delay: 0.45,
  },
  {
    title: "Zomato Dashboard",
    desc: "Interactive Power BI dashboard with advanced DAX analytics.",
    icon: UtensilsCrossed,
    tags: ["Power BI", "DAX", "Analytics"],
    delay: 0.5,
  },
];

const ProjectCards = () => {
  return (
    <>
      {projects.map((project) => (
        <BentoCard key={project.title} delay={project.delay} className="group">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 rounded-lg bg-primary/10 text-primary group-hover:bg-primary/20 transition-colors">
              <project.icon size={18} />
            </div>
            <h3 className="font-semibold text-foreground text-sm">{project.title}</h3>
          </div>
          <p className="text-muted-foreground text-sm leading-relaxed">{project.desc}</p>
          <div className="flex flex-wrap gap-1.5 mt-3">
            {project.tags.map((tag) => (
              <span key={tag} className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-muted text-muted-foreground">
                {tag}
              </span>
            ))}
          </div>
        </BentoCard>
      ))}
    </>
  );
};

export default ProjectCards;
