import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

const WORDS = ["Think", "Design", "Develop", "Train", "Deploy", "Evolve", "Machine Learning"];
const DURATION = 2500; // ms

interface PreloaderProps {
  onComplete: () => void;
}

const Preloader = ({ onComplete }: PreloaderProps) => {
  const [progress, setProgress] = useState(0);
  const [wordIndex, setWordIndex] = useState(0);
  const [phase, setPhase] = useState<"loading" | "reveal" | "done">("loading");

  useEffect(() => {
    const start = Date.now();
    let raf: number;

    const tick = () => {
      const elapsed = Date.now() - start;
      const pct = Math.min(Math.floor((elapsed / DURATION) * 100), 100);
      setProgress(pct);

      // Cycle words based on progress
      const wi = Math.min(Math.floor((pct / 100) * WORDS.length), WORDS.length - 1);
      setWordIndex(wi);

      if (pct < 100) {
        raf = requestAnimationFrame(tick);
      } else {
        setTimeout(() => setPhase("reveal"), 300);
      }
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  const handleRevealComplete = useCallback(() => {
    setPhase("done");
    onComplete();
  }, [onComplete]);

  if (phase === "done") return null;

  return (
    <AnimatePresence>
      {(
        <motion.div
          className="fixed inset-0 z-[9999] flex flex-col justify-center"
          style={{ backgroundColor: "#050505" }}
          initial={{ y: 0 }}
          animate={phase === "reveal" ? { y: "-100%" } : { y: 0 }}
          transition={phase === "reveal" ? { duration: 0.8, ease: [0.76, 0, 0.24, 1] } : undefined}
          onAnimationComplete={() => {
            if (phase === "reveal") handleRevealComplete();
          }}
        >
          {/* Word stack - center/left */}
          <div className="absolute left-8 md:left-16 top-1/2 -translate-y-1/2">
            <AnimatePresence mode="wait">
              <motion.h1
                key={wordIndex}
                initial={{ y: 40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -40, opacity: 0 }}
                transition={{ duration: 0.15, ease: "easeOut" }}
                className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight"
                style={{
                  fontFamily: "'Space Grotesk', 'Inter', sans-serif",
                  color: "white",
                }}
              >
                {WORDS[wordIndex]}
              </motion.h1>
            </AnimatePresence>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              transition={{ delay: 0.5 }}
              className="mt-4 text-sm tracking-widest uppercase"
              style={{ color: "rgba(255,255,255,0.4)", fontFamily: "'JetBrains Mono', monospace" }}
            >
              Shirwin Prince I — Portfolio
            </motion.p>
          </div>

          {/* Percentage counter - bottom right */}
          <motion.div
            className="absolute bottom-8 right-8 md:bottom-12 md:right-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            <span
              className="text-7xl md:text-9xl font-bold tabular-nums"
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                color: "white",
                lineHeight: 1,
              }}
            >
              {progress}%
            </span>
          </motion.div>

          {/* Progress bar - bottom */}
          <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-white/5">
            <motion.div
              className="h-full"
              style={{
                background: "linear-gradient(90deg, hsl(217 91% 60%), hsl(260 60% 55%))",
                width: `${progress}%`,
              }}
              transition={{ duration: 0.05 }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Preloader;
