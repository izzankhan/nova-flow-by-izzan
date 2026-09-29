import { motion } from "framer-motion";
import { Brain, Zap, Shield, TrendingUp, Clock, Target } from "lucide-react";
import { SectionHeader } from "./SectionHeader";

const features = [
  {
    icon: Brain,
    title: "AI-First Approach",
    desc: "Every system we build is powered by cutting-edge AI that learns and optimizes in real-time.",
  },
  {
    icon: Zap,
    title: "Lightning Fast",
    desc: "Automated workflows that execute in milliseconds, so you never miss a lead or opportunity.",
  },
  {
    icon: Shield,
    title: "Enterprise Security",
    desc: "Bank-grade encryption and compliance built into every layer of your automation stack.",
  },
  {
    icon: TrendingUp,
    title: "Proven ROI",
    desc: "312% average return on investment across our client portfolio in the first 90 days.",
  },
  {
    icon: Clock,
    title: "24/7 Operations",
    desc: "Your AI systems never sleep — capturing leads, nurturing prospects, and closing deals.",
  },
  {
    icon: Target,
    title: "Precision Targeting",
    desc: "AI-driven audience segmentation that puts your message in front of the right people.",
  },
];

export const WhyChooseUs = () => {
  return (
    <section className="relative py-8">
      <div className="absolute inset-0 radial-fade opacity-50" />
      <div className="container relative">
        <SectionHeader
          eyebrow="Why Choose Us"
          title={
            <>
              The <span className="text-gradient">Intelligence</span> Behind
              Your Growth
            </>
          }
          description="We do not just build automation. we engineer intelligent systems that think, adapt, and scale your business while you focus on what matters."
        />
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              whileHover={{ y: -8 }}
              className="glass-card group rounded-3xl p-8 transition-all duration-300 hover:border-primary/30"
            >
              <div className="mb-5 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 group-hover:from-primary/30 group-hover:to-secondary/30 transition-all">
                <f.icon className="h-7 w-7 text-primary" />
              </div>
              <h3 className="text-lg font-semibold">{f.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                {f.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
