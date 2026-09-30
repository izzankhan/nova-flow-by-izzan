import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { ParticleField } from "./ParticleField";

export const FinalCTA = () => {
  return (
    <section className="relative py-12 overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-20" />
      <ParticleField
        count={50}
        className="absolute inset-0"
        color="201, 168, 76"
      />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-96 w-96 rounded-full bg-primary/20 blur-[120px] animate-pulse-glow" />

      <div className="container relative text-center">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl font-bold leading-tight sm:text-6xl"
        >
          We're Ready to{" "}
          <span className="text-gradient">Scale Your Business</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground"
        >
          Your competitors are already automating. Don't get left behind. Book
          your free strategy call today.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mt-10"
        >
          <a
            href="https://wa.me/923231034955"
            className="btn-gradient inline-flex items-center gap-2 rounded-full px-10 py-5 text-base font-semibold text-white"
          >
            WhatsApp <ArrowRight className="h-5 w-5" />
          </a>
        </motion.div>
      </div>
    </section>
  );
};
