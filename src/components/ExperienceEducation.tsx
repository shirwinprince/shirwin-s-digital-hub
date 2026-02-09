import BentoCard from "./BentoCard";
import { Briefcase, GraduationCap } from "lucide-react";

const ExperienceCard = () => {
  return (
    <BentoCard delay={0.2}>
      <div className="flex items-center gap-2 mb-4">
        <Briefcase size={16} className="text-primary" />
        <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Experience</h2>
      </div>
      <h3 className="font-semibold text-foreground">IT Assistant Intern</h3>
      <p className="text-primary text-sm mt-1">Roots • May — July 2023</p>
      <p className="text-muted-foreground text-sm mt-3 leading-relaxed">
        Optimized logistics workflows and managed IT asset tracking systems to improve operational efficiency.
      </p>
    </BentoCard>
  );
};

const EducationCard = () => {
  return (
    <BentoCard delay={0.25}>
      <div className="flex items-center gap-2 mb-4">
        <GraduationCap size={16} className="text-primary" />
        <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Education</h2>
      </div>
      <h3 className="font-semibold text-foreground">M.Sc. Software Systems</h3>
      <p className="text-primary text-sm mt-1">KG College of Arts & Science • 2021–Present</p>
      <div className="mt-3 space-y-1">
        <p className="text-muted-foreground text-xs">HSC — 2021</p>
        <p className="text-muted-foreground text-xs">SSLC — 2019</p>
      </div>
    </BentoCard>
  );
};

export { ExperienceCard, EducationCard };
