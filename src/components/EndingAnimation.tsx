import { motion } from "framer-motion";

export const EndingAnimation = () => {
  return (
    <section className="relative h-60 overflow-hidden flex items-center justify-center">
      <div className="absolute inset-0 grid-bg opacity-20" />
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="relative"
      >
        {/* AI sphere transforming into logo */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary via-secondary to-accent blur-2xl opacity-60 animate-pulse-glow" />
        <div className="relative flex items-center gap-3">
          <div className="relative h-16 w-16">
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary to-secondary animate-pulse-glow" />
            <div className="absolute inset-0 flex items-center justify-center text-2xl font-bold text-white">
              N
            </div>
          </div>
          <span className="text-3xl font-bold tracking-tight">
            Nova<span className="text-gradient">Automate</span>
          </span>
        </div>
        {/* Particles */}
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-1.5 w-1.5 rounded-full bg-accent"
            style={{ top: "50%", left: "50%" }}
            animate={{
              x: [0, Math.cos((i / 12) * Math.PI * 2) * 150],
              y: [0, Math.sin((i / 12) * Math.PI * 2) * 150],
              opacity: [1, 0],
              scale: [1, 0],
            }}
            transition={{ duration: 2, repeat: Infinity, delay: i * 0.1 }}
          />
        ))}
      </motion.div>
    </section>
  );
};
