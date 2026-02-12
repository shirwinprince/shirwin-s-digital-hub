import { useRef, useState, ReactNode } from "react";
import { motion } from "framer-motion";

interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  as?: "a" | "button";
  href?: string;
  download?: boolean;
  onClick?: () => void;
  target?: string;
  rel?: string;
}

const MagneticButton = ({ children, className = "", as = "button", ...props }: MagneticButtonProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = (e: React.MouseEvent) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const x = (e.clientX - rect.left - rect.width / 2) * 0.3;
    const y = (e.clientY - rect.top - rect.height / 2) * 0.3;
    setPosition({ x, y });
  };

  const reset = () => setPosition({ x: 0, y: 0 });

  const Comp = as === "a" ? motion.a : motion.button;

  return (
    <div ref={ref} onMouseMove={handleMouse} onMouseLeave={reset} className="inline-block">
      <Comp
        animate={{ x: position.x, y: position.y }}
        transition={{ type: "spring", stiffness: 200, damping: 15 }}
        className={className}
        {...(props as any)}
      >
        {children}
      </Comp>
    </div>
  );
};

export default MagneticButton;
