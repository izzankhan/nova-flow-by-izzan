import { motion } from "framer-motion";
import { AISphere } from "./AISphere";
import { ParticleField } from "./ParticleField";
import { ArrowRight, Check } from "lucide-react";

export const BookCall = () => {
  return (
    <section id="book-call" className="relative py-8 overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-20" />
      <ParticleField
        count={40}
        className="absolute inset-0"
        color="201, 168, 76"
      />
      <div className="container relative">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs font-medium uppercase tracking-widest text-primary mb-6"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse-glow" />{" "}
              Book Strategy Call
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl font-bold leading-tight sm:text-5xl"
            >
              Let's Build Your{" "}
              <span className="text-gradient">AI Growth Engine</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mt-6 text-lg text-muted-foreground"
            >
              Book a free 30-minute strategy call. We'll audit your current
              systems and show you exactly how AI can automate your growth.
            </motion.p>
            <div className="mt-8 space-y-3">
              {[
                "Free 30-minute consultation",
                "Custom AI growth roadmap",
                "No obligation, no pressure",
                "Walk away with actionable insights",
              ].map((p) => (
                <div key={p} className="flex items-center gap-3">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/20">
                    <Check className="h-3.5 w-3.5 text-primary" />
                  </div>
                  <span className="text-sm text-muted-foreground">{p}</span>
                </div>
              ))}
            </div>
            <a
              href="/audit"
              className="mt-10 btn-gradient inline-flex items-center gap-2 rounded-full px-8 py-4 text-sm font-semibold text-white"
            >
              Book Your Strategy Call <ArrowRight className="h-4 w-4" />
            </a>
          </div>
          <div className="relative hidden lg:flex items-center justify-center">
            <AISphere className="h-[350px] w-[350px]" />
          </div>
        </div>
      </div>
    </section>
  );
};
