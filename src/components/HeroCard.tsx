import BentoCard from "./BentoCard";
import profileImg from "@/assets/profile-placeholder.jpg";
import { MapPin, Download, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const HeroCard = () => {
  return (
    <BentoCard className="flex flex-col justify-between min-h-[350px] h-full" delay={0}>
      <div>
        <motion.span
          className="tag mb-4"
          animate={{ opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          Available for opportunities
        </motion.span>
        <h1
          className="text-4xl md:text-5xl font-bold mt-4 leading-tight"
          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
        >
          Hey, I'm <span className="glow-text">Shirwin Prince I</span> 👋
        </h1>
        <p className="text-muted-foreground mt-4 text-lg leading-relaxed max-w-lg">
          Machine Learning Specialist & Software Developer focused on AI-driven solutions.
        </p>
        <div className="flex items-center gap-4 mt-5">
          <div className="flex items-center gap-2 text-muted-foreground text-sm">
            <MapPin size={14} />
            <span>India</span>
          </div>
          <a
            href="/resume.pdf"
            download
            className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:shadow-lg hover:shadow-primary/25 transition-all"
          >
            <Download size={15} />
            Download CV
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      </div>
      <div className="flex justify-end mt-6">
        <div className="relative">
          <div className="absolute inset-0 rounded-full profile-glow animate-glow-pulse" />
          <img
            src={profileImg}
            alt="Shirwin Prince I"
            className="w-28 h-28 md:w-36 md:h-36 rounded-full object-cover border-2 border-primary/30 relative z-10"
          />
        </div>
      </div>
    </BentoCard>
  );
};

export default HeroCard;
