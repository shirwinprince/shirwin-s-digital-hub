import HeroCard from "@/components/HeroCard";
import TechStackCard from "@/components/TechStackCard";
import { ExperienceCard, EducationCard } from "@/components/ExperienceEducation";
import ProjectCards from "@/components/ProjectCards";
import CertificationsCard from "@/components/CertificationsCard";
import ContactCard from "@/components/ContactCard";

const Index = () => {
  return (
    <div className="min-h-screen bg-background px-4 py-12 md:py-20">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Hero - spans 2 cols and 2 rows */}
          <div className="md:col-span-2 lg:col-span-2 lg:row-span-2">
            <HeroCard />
          </div>

          {/* Experience */}
          <div className="lg:col-span-1">
            <ExperienceCard />
          </div>

          {/* Education */}
          <div className="lg:col-span-1">
            <EducationCard />
          </div>

          {/* Tech Stack - wide */}
          <div className="md:col-span-2">
            <TechStackCard />
          </div>

          {/* Projects */}
          <ProjectCards />

          {/* Certifications */}
          <CertificationsCard />

          {/* Contact - wide */}
          <div className="md:col-span-2 lg:col-span-4">
            <ContactCard />
          </div>
        </div>

        <p className="text-center text-muted-foreground text-xs mt-12">
          © 2024 Shirwin Prince I. Built with passion.
        </p>
      </div>
    </div>
  );
};

export default Index;
