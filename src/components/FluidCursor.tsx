import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  size: number;
  hue: number;
  sat: number;
  light: number;
}

const DARK_PALETTE = [
  { hue: 180, sat: 90, light: 60 },  // Cyan
  { hue: 270, sat: 80, light: 60 },  // Purple
  { hue: 320, sat: 85, light: 65 },  // Pink
  { hue: 200, sat: 85, light: 55 },  // Blue
  { hue: 290, sat: 75, light: 55 },  // Violet
];

const LIGHT_PALETTE = [
  { hue: 260, sat: 80, light: 40 },  // Deep Violet
  { hue: 220, sat: 90, light: 45 },  // Strong Blue
  { hue: 310, sat: 75, light: 45 },  // Deep Pink
  { hue: 270, sat: 85, light: 35 },  // Purple
  { hue: 195, sat: 90, light: 40 },  // Teal
];

const FluidCursor = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particles = useRef<Particle[]>([]);
  const mouse = useRef({ x: 0, y: 0, px: 0, py: 0 });
  const raf = useRef<number>(0);
  const isDark = useRef(true);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true })!;

    // Render at reduced resolution for performance
    const SCALE = 0.5;
    const resize = () => {
      canvas.width = Math.floor(window.innerWidth * SCALE);
      canvas.height = Math.floor(window.innerHeight * SCALE);
    };
    resize();
    window.addEventListener("resize", resize);

    const checkTheme = () => {
      isDark.current = document.documentElement.classList.contains("dark");
    };
    checkTheme();

    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });

    const onMove = (e: MouseEvent) => {
      mouse.current.px = mouse.current.x;
      mouse.current.py = mouse.current.y;
      mouse.current.x = e.clientX * SCALE;
      mouse.current.y = e.clientY * SCALE;

      const dx = mouse.current.x - mouse.current.px;
      const dy = mouse.current.y - mouse.current.py;
      const speed = Math.sqrt(dx * dx + dy * dy);

      const palette = isDark.current ? DARK_PALETTE : LIGHT_PALETTE;
      const count = Math.min(Math.floor(speed * 0.5), 6);
      for (let i = 0; i < count; i++) {
        const angle = Math.atan2(dy, dx) + (Math.random() - 0.5) * 2;
        const sp = speed * 0.3 * Math.random();
        const color = palette[Math.floor(Math.random() * palette.length)];
        particles.current.push({
          x: mouse.current.x + (Math.random() - 0.5) * 8,
          y: mouse.current.y + (Math.random() - 0.5) * 8,
          vx: Math.cos(angle) * sp + (Math.random() - 0.5) * 1.5,
          vy: Math.sin(angle) * sp + (Math.random() - 0.5) * 1.5,
          life: 1,
          maxLife: 35 + Math.random() * 30,
          size: (2 + Math.random() * 6),
          hue: color.hue,
          sat: color.sat,
          light: color.light,
        });
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const arr = particles.current;

      for (let i = arr.length - 1; i >= 0; i--) {
        const p = arr[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vx *= 0.96;
        p.vy *= 0.96;
        p.life -= 1 / p.maxLife;

        if (p.life <= 0) {
          arr[i] = arr[arr.length - 1];
          arr.pop();
          continue;
        }

        const alpha = p.life * 0.7;
        const size = p.size * p.life;

        ctx.beginPath();
        const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, size * 2);
        gradient.addColorStop(0, `hsla(${p.hue}, ${p.sat}%, ${p.light}%, ${alpha})`);
        gradient.addColorStop(0.5, `hsla(${p.hue}, ${p.sat - 10}%, ${p.light - 5}%, ${alpha * 0.35})`);
        gradient.addColorStop(1, `hsla(${p.hue}, ${p.sat - 20}%, ${p.light - 10}%, 0)`);
        ctx.fillStyle = gradient;
        ctx.arc(p.x, p.y, size * 2, 0, Math.PI * 2);
        ctx.fill();
      }

      raf.current = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", onMove);
    raf.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("resize", resize);
      observer.disconnect();
      cancelAnimationFrame(raf.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none"
      style={{ width: "100vw", height: "100vh", mixBlendMode: "screen" }}
    />
  );
};

export default FluidCursor;
