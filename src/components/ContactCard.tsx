import { useState } from "react";
import BentoCard from "./BentoCard";
import { Github, Linkedin, Mail, Phone, Copy, Check } from "lucide-react";

const ContactCard = () => {
  const [copied, setCopied] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText("shirwinprince@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <BentoCard className="md:col-span-2" delay={0.6}>
      <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-4">Get in Touch</h2>
      <div className="flex flex-wrap items-center gap-3">
        <a
          href="https://github.com/shirwinprince"
          target="_blank"
          rel="noopener noreferrer"
          className="tech-icon gap-2 px-4 hover:text-primary"
        >
          <Github size={18} />
          <span className="text-sm">GitHub</span>
        </a>
        <a
          href="https://linkedin.com/in/shirwinprince"
          target="_blank"
          rel="noopener noreferrer"
          className="tech-icon gap-2 px-4 hover:text-primary"
        >
          <Linkedin size={18} />
          <span className="text-sm">LinkedIn</span>
        </a>
        <button onClick={copyEmail} className="tech-icon gap-2 px-4 hover:text-primary cursor-pointer">
          <Mail size={18} />
          <span className="text-sm">shirwinprince@gmail.com</span>
          {copied ? <Check size={14} className="text-primary" /> : <Copy size={14} className="text-muted-foreground" />}
        </button>
        <div className="tech-icon gap-2 px-4">
          <Phone size={18} />
          <span className="text-sm">+91 97905 48292</span>
        </div>
      </div>
    </BentoCard>
  );
};

export default ContactCard;
