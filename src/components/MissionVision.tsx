import { motion } from "framer-motion";
import { Target, Eye, Heart, Cpu, Globe, Users } from "lucide-react";

const items = [
  {
    icon: Target,
    title: "Our Mission",
    desc: "To democratize AI-powered growth for every business on Earth making enterprise-grade marketing automation accessible, intelligent, and effortless.",
  },
  {
    icon: Eye,
    title: "Our Vision",
    desc: "A world where every business runs on autonomous AI systems that predict, engage, and convert — so founders can focus on building, not selling.",
  },
  {
    icon: Heart,
    title: "Our Promise",
    desc: "We treat your business like our own. Every system we deploy is engineered for measurable, compounding growth — not vanity metrics.",
  },
];

const values = [
  {
    icon: Cpu,
    title: "Innovation First",
    desc: "We push the boundaries of what AI can do for marketing.",
  },
  {
    icon: Globe,
    title: "Global Impact",
    desc: "Our systems power growth across 40+ countries worldwide.",
  },
  {
    icon: Users,
    title: "Client Obsession",
    desc: "Your success is the only metric that matters to us.",
  },
];

export const MissionVision = () => {
  return (
    <section className="relative py-8">
      <div className="absolute inset-0 grid-bg opacity-20" />
      <div className="container relative">
        <div className="grid gap-6 lg:grid-cols-3">
          {items.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="glass-card rounded-3xl p-8 hover:border-primary/30 transition-all"
            >
              <div className="mb-5 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20">
                <item.icon className="h-7 w-7 text-primary" />
              </div>
              <h3 className="text-xl font-semibold">{item.title}</h3>
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>

        <div className="mt-8">
          <h3 className="text-center text-2xl font-bold mb-6">
            Our <span className="text-gradient">Core Values</span>
          </h3>
          <div className="grid gap-6 sm:grid-cols-3">
            {values.map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex flex-col items-center text-center glass rounded-2xl p-6"
              >
                <v.icon className="h-8 w-8 text-accent mb-3" />
                <h4 className="font-semibold">{v.title}</h4>
                <p className="mt-1 text-xs text-muted-foreground">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
