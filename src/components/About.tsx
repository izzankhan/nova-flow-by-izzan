import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { SectionHeader } from "./SectionHeader";

const points = [
  "Founded in 2019 by AI engineers and marketing veterans",
  "500+ businesses scaled across 12 industries",
  "Dedicated AI systems running 24/7 for every client",
  "Full-stack automation from ads to closing",
];

export const About = () => {
  return (
    <section id="about" className="relative py-8">
      <div className="container">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="relative rounded-3xl overflow-hidden glass-card p-2">
              <img
                src="https://vibe.filesafe.space/1786109541213169282/assets/6cc75971-40e1-4f2d-afc1-eae584197fc4.png"
                alt="Nova Automate luxury office workspace"
                className="rounded-2xl w-full"
                loading="lazy"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 glass-card rounded-2xl p-6 max-w-[200px]">
              <div className="text-3xl font-bold text-gradient">5+</div>
              <div className="text-xs text-muted-foreground mt-1">
                Years engineering AI growth systems
              </div>
            </div>
          </motion.div>

          <div>
            <SectionHeader
              align="left"
              eyebrow="About Nova Automate"
              title={
                <>
                  Engineering the{" "}
                  <span className="text-gradient">Future of Marketing</span>
                </>
              }
              description="We are a team of AI engineers, automation specialists, and growth strategists obsessed with one thing: building intelligent systems that grow your business on autopilot."
            />
            <div className="mt-8 space-y-4">
              {points.map((p, i) => (
                <motion.div
                  key={p}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-start gap-3"
                >
                  <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/20">
                    <Check className="h-3.5 w-3.5 text-primary" />
                  </div>
                  <span className="text-sm text-muted-foreground">{p}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
