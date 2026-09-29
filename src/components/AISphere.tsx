import { motion } from "framer-motion";
import { useRef } from "react";

export const AISphere = ({ className = "" }: { className?: string }) => {
  const ref = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    el.style.transform = `perspective(800px) rotateY(${x * 25}deg) rotateX(${-y * 25}deg)`;
  };

  const handleMouseLeave = () => {
    const el = ref.current;
    if (el)
      el.style.transform = "perspective(800px) rotateY(0deg) rotateX(0deg)";
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative ${className}`}
      style={{
        transformStyle: "preserve-3d",
        transition: "transform 0.2s ease-out",
      }}
    >
      {/* Outer glow */}
      <div className="absolute inset-0 rounded-full bg-[#c9a84c]/30 blur-[80px] animate-pulse-glow" />

      {/* Rotating rings */}
      <div className="absolute inset-0 rounded-full border border-[#c9a84c]/40 animate-spin-slow" />
      <div className="absolute inset-4 rounded-full border border-[#f0d78c]/40 animate-spin-reverse" />
      <div className="absolute inset-8 rounded-full border border-[#c9a84c]/30 animate-spin-slow" />

      {/* Core sphere glow */}
      <motion.div
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute inset-12 rounded-full bg-gradient-to-br from-[#c9a84c] via-[#f0d78c] to-[#c9a84c] opacity-90 blur-md"
      />

      {/* Rotating circular image inside sphere */}
      <motion.div
        animate={{ rotate: [0, 360] }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        className="absolute inset-14 rounded-full overflow-hidden"
        style={{ boxShadow: "0 0 60px -10px rgba(201,168,76,0.5)" }}
      >
        <img
          src="https://vibe.filesafe.space/1786109541213169282/assets/d177d85d-e3a3-47a7-9921-2e242bfae30d.png"
          alt="AI technology dashboard"
          className="h-full w-full object-cover rounded-full opacity-80"
        />
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#c9a84c]/40 via-[#f0d78c]/20 to-[#c9a84c]/40" />
      </motion.div>

      {/* Inner highlight */}
      <div className="absolute inset-16 rounded-full bg-gradient-to-tr from-white/20 via-transparent to-transparent pointer-events-none" />

      {/* Orbiting dots */}
      {[0, 1, 2, 3, 4, 5].map((i) => {
        const angle = (i / 6) * 360;
        return (
          <div
            key={i}
            className="absolute inset-0 animate-spin-slow"
            style={{ animationDelay: `${i * -5}s` }}
          >
            <div
              className="absolute left-1/2 top-0 h-3 w-3 -translate-x-1/2 rounded-full bg-[#f0d78c] shadow-[0_0_20px_4px_rgba(240,215,140,0.7)]"
              style={{
                transform: `rotate(${angle}deg) translateY(-50%)`,
                transformOrigin: "center 100%",
              }}
            />
          </div>
        );
      })}
    </div>
  );
};
