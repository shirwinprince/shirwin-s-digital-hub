import BentoCard from "./BentoCard";
import { Award } from "lucide-react";

const certs = [
  "Python for Data Science — IBM / Coursera",
  "Generative AI Assistants",
  "Microsoft Azure AI Fundamentals (AI-900)",
];

const CertificationsCard = () => {
  return (
    <BentoCard delay={0.55}>
      <div className="flex items-center gap-2 mb-4">
        <Award size={16} className="text-primary" />
        <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Certifications</h2>
      </div>
      <ul className="space-y-3">
        {certs.map((cert) => (
          <li key={cert} className="flex items-start gap-2">
            <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
            <span className="text-sm text-foreground">{cert}</span>
          </li>
        ))}
      </ul>
    </BentoCard>
  );
};

export default CertificationsCard;
