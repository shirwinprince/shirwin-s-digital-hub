import { useState } from "react";
import { motion } from "framer-motion";
import HeroCard from "@/components/HeroCard";
import TechStackCard from "@/components/TechStackCard";
import { ExperienceCard, EducationCard } from "@/components/ExperienceEducation";
import { projects, ProjectCard } from "@/components/ProjectCards";
import CertificationsCard from "@/components/CertificationsCard";
import ContactCard from "@/components/ContactCard";
import ChatBot from "@/components/ChatBot";
import ThemeToggle from "@/components/ThemeToggle";
import FluidCursor from "@/components/FluidCursor";
import CustomCursor from "@/components/CustomCursor";
import GitHubActivityCard from "@/components/GitHubActivityCard";
import Preloader from "@/components/Preloader";

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.5, ease: "easeOut" as const },
  }),
};

const Index = () => {
  const [loaded, setLoaded] = useState(() => {
    if (typeof window !== "undefined") {
      return sessionStorage.getItem("preloaded") === "true";
    }
    return false;
  });

  const handlePreloaderComplete = () => {
    setLoaded(true);
    sessionStorage.setItem("preloaded", "true");
  };

  return (
    <div className="min-h-screen bg-background relative transition-colors duration-500">
      <FluidCursor />
      <CustomCursor />

      {!loaded && <Preloader onComplete={handlePreloaderComplete} />}

      <ThemeToggle />

      <div className="relative z-10 px-4 py-12 md:py-20">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
            initial="hidden"
            animate={loaded ? "visible" : "hidden"}
          >
            {/* Hero - spans 2 cols and 2 rows */}
            <motion.div className="md:col-span-2 lg:col-span-2 lg:row-span-2" custom={0} variants={cardVariants}>
              <HeroCard />
            </motion.div>

            {/* Experience */}
            <motion.div className="lg:col-span-1" custom={1} variants={cardVariants}>
              <ExperienceCard />
            </motion.div>

            {/* Education */}
            <motion.div className="lg:col-span-1" custom={2} variants={cardVariants}>
              <EducationCard />
            </motion.div>

            {/* Tech Stack - wide */}
            <motion.div className="md:col-span-2" custom={3} variants={cardVariants}>
              <TechStackCard />
            </motion.div>

            {/* Projects - each as individual grid item */}
            {projects.map((project, i) => (
              <motion.div key={project.title} custom={4 + i} variants={cardVariants}>
                <ProjectCard project={project} />
              </motion.div>
            ))}

            {/* GitHub Activity */}
            <motion.div custom={9} variants={cardVariants} className="md:col-span-2">
              <GitHubActivityCard />
            </motion.div>

            {/* Certifications */}
            <motion.div custom={10} variants={cardVariants}>
              <CertificationsCard />
            </motion.div>

            {/* Contact - wide */}
            <motion.div className="md:col-span-2 lg:col-span-4" custom={11} variants={cardVariants}>
              <ContactCard />
            </motion.div>
          </motion.div>

          <p className="text-center text-muted-foreground text-xs mt-12">
            © 2024 Shirwin Prince I. Built with passion.
          </p>
        </div>
      </div>

      <ChatBot />
    </div>
  );
};

export default Index;
