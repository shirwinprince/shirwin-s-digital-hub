import BentoCard from "./BentoCard";
import profileImg from "@/assets/profile-placeholder.jpg";
import { MapPin } from "lucide-react";

const HeroCard = () => {
  return (
    <BentoCard className="flex flex-col justify-between min-h-[350px] h-full" delay={0}>
      <div>
        <span className="tag mb-4">Available for opportunities</span>
        <h1 className="text-4xl md:text-5xl font-bold mt-4 leading-tight">
          Hi, I'm <span className="glow-text">Shirwin Prince I</span>
        </h1>
        <p className="text-muted-foreground mt-4 text-lg leading-relaxed max-w-lg">
          Machine Learning enthusiast and Software Developer from India, focused on building smart and scalable applications.
        </p>
        <div className="flex items-center gap-2 mt-4 text-muted-foreground text-sm">
          <MapPin size={14} />
          <span>India</span>
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
