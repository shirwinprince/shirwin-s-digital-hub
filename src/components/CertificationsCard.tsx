import BentoCard from "./BentoCard";
import { Award, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";

const certs = [
  { name: "Azure AI Fundamentals", badge: "AI-900", org: "Microsoft", color: "from-primary to-secondary" },
  { name: "Generative AI Assistants", badge: "GenAI", org: "Certified", color: "from-secondary to-primary" },
  { name: "Python for Data Science", badge: "Python", org: "IBM / Coursera", color: "from-primary to-accent" },
];

const CertificationsCard = () => {
  return (
    <BentoCard delay={0.55}>
      <div className="flex items-center gap-2 mb-4">
        <Award size={16} className="text-primary" />
        <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Certifications</h2>
      </div>
      <div className="space-y-3">
        {certs.map((cert, i) => (
          <motion.div
            key={cert.name}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 + i * 0.1 }}
            className="group flex items-center gap-3 p-2 rounded-xl hover:bg-muted/40 transition-colors"
          >
            <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${cert.color} flex items-center justify-center shrink-0`}>
              <span className="text-[10px] font-bold text-primary-foreground">{cert.badge}</span>
            </div>
            <div className="min-w-0">
              <p className="text-sm font-medium text-foreground truncate">{cert.name}</p>
              <p className="text-[11px] text-muted-foreground">{cert.org}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </BentoCard>
  );
};

export default CertificationsCard;
