import { motion } from "framer-motion";
import { Counter } from "./Counter";

const stats = [
  { value: 500, suffix: "+", label: "Clients Scaled" },
  { value: 312, suffix: "%", label: "Average ROI" },
  { value: 12, suffix: "M+", label: "Leads Generated" },
  { value: 99, suffix: "%", label: "Client Retention" },
];

export const Stats = () => {
  return (
    <section className="relative py-8">
      <div className="container">
        <div className="grid grid-cols-2 gap-6 lg:grid-cols-4">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="glass-card rounded-3xl p-8 text-center hover:glow-blue transition-all duration-500 group"
            >
              <div className="text-4xl font-bold text-gradient sm:text-5xl">
                <Counter value={s.value} suffix={s.suffix} />
              </div>
              <div className="mt-3 text-sm text-muted-foreground">
                {s.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
