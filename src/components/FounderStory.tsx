import { motion } from "framer-motion";
import { Activity } from "lucide-react";

export const FounderStory = () => {
  return (
    <section className="relative py-8">
      <div className="container">
        <div className="grid items-center gap-12 lg:grid-cols-[1fr_1.2fr]">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative mx-auto max-w-sm"
          >
            <div className="relative rounded-3xl overflow-hidden glass-card p-2">
              <div className="relative rounded-3xl overflow-hidden glass-card p-2">
                <img
                  src="https://vibe.filesafe.space/1786109541213169282/attachments/6bb8b88d-4eae-4af8-b14a-4823c14da847.jpg"
                  alt="Founder of Nova Automate"
                  className="rounded-2xl w-full object-cover"
                  loading="lazy"
                />
              </div>
            </div>
            <div className="absolute -top-4 -left-4 h-20 w-20 rounded-full bg-primary/20 blur-2xl" />
            <div className="absolute -bottom-4 -right-4 glass-card rounded-2xl px-5 py-3">
              <div className="text-sm font-semibold">M Izzan</div>
              <div className="text-xs text-muted-foreground">Founder & CEO</div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs font-medium uppercase tracking-widest text-primary mb-6">
              <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse-glow" />
              Founder Story
            </div>
            <Activity className="h-10 w-10 text-primary/30 mb-4" />
            <blockquote className="text-lg font-medium leading-relaxed sm:text-xl lg:text-2xl xl:text-3xl">
              I started Nova Automate after watching brilliant businesses fail
              not because their product was bad, but because their marketing was
              manual. I knew AI could change that. So we built systems that do
              not just market they{" "}
              <span className="text-gradient">think, adapt, and scale</span> on
              their own.
            </blockquote>
            <div className="mt-8 flex items-center gap-4">
              <div className="h-px w-12 bg-border" />
              <div>
                <div className="text-sm font-semibold">M Izzan</div>
                <div className="text-xs text-muted-foreground">
                  Former ML Engineer at top tech firms, now building the future
                  of AI marketing
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
