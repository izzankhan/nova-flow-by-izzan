import { motion } from "framer-motion";

const companies = [
  "TECHFLOW",
  "QUANTUM",
  "NEURALX",
  "VANTAGE",
  "CIRCA",
  "PIXELFORGE",
  "AETHER",
  "NOVA",
];

export const TrustLogos = () => {
  return (
    <section className="relative py-6 border-y border-border/40">
      <div className="container">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-xs uppercase tracking-[0.3em] text-muted-foreground mb-6"
        >
          Trusted by industry-leading companies
        </motion.p>
        <div className="relative overflow-hidden">
          <div className="flex gap-16 animate-[gradient-shift_30s_linear_infinite] flex-wrap justify-center">
            {companies.map((c, i) => (
              <motion.div
                key={c}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="text-xl font-bold tracking-widest text-muted-foreground/40 hover:text-foreground transition-colors cursor-default"
              >
                {c}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
