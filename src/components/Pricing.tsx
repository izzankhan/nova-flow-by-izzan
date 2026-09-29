import { motion } from "framer-motion";
import { Check, Zap } from "lucide-react";
import { SectionHeader } from "./SectionHeader";
import { useSpotlight } from "@/hooks/useSpotlight";

const plans = [
  {
    name: "Starter",
    price: "$2,500",
    period: "/mo",
    desc: "Perfect for businesses ready to automate their first growth engine.",
    features: [
      "AI Chatbot (1 channel)",
      "Email Automation (3 sequences)",
      "CRM Setup",
      "Lead Capture Forms",
      "Monthly Strategy Call",
      "Analytics Dashboard",
    ],
    popular: false,
  },
  {
    name: "Growth",
    price: "$5,000",
    period: "/mo",
    desc: "For scaling businesses that need full-stack automation across channels.",
    features: [
      "Everything in Starter",
      "AI Funnels (unlimited)",
      "Meta + Google Ads Management",
      "SMS Automation",
      "Pipeline Management",
      "Reputation Automation",
      "Bi-weekly Strategy Calls",
      "Priority Support",
    ],
    popular: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    desc: "For high-volume businesses needing custom AI systems and dedicated support.",
    features: [
      "Everything in Growth",
      "Custom AI Model Training",
      "Unlimited Integrations",
      "Dedicated AI Engineer",
      "Weekly Strategy Sessions",
      "24/7 Priority Support",
      "SLA Guarantee",
      "Custom Reporting",
    ],
    popular: false,
  },
];

export const Pricing = () => {
  return (
    <section id="pricing" className="relative py-8">
      <div className="absolute inset-0 radial-fade opacity-30" />
      <div className="container relative">
        <SectionHeader
          eyebrow="Pricing"
          title={
            <>
              Investment That{" "}
              <span className="text-gradient">Pays for Itself</span>
            </>
          }
          description="Transparent pricing. No long-term contracts. Cancel anytime. Every plan is engineered to deliver positive ROI within 90 days."
        />
        <div className="mt-8 grid gap-6 lg:grid-cols-3">
          {plans.map((p, i) => (
            <PricingCard key={p.name} p={p} i={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

const PricingCard = ({ p, i }: { p: (typeof plans)[number]; i: number }) => {
  const { ref, onMouseMove, onMouseLeave } = useSpotlight<HTMLDivElement>();
  return (
    <motion.div
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      key={p.name}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: i * 0.1 }}
      className={`relative glass-card rounded-3xl p-8 neon-trace spotlight ${p.popular ? "border-primary/50 glow-blue lg:scale-105" : ""}`}
    >
      {p.popular && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 btn-gradient rounded-full px-4 py-1 text-xs font-semibold text-white flex items-center gap-1">
          <Zap className="h-3 w-3" /> Most Popular
        </div>
      )}
      <h3 className="text-xl font-bold">{p.name}</h3>
      <div className="mt-4 flex items-baseline gap-1">
        <span className="text-4xl font-bold text-gradient">{p.price}</span>
        <span className="text-muted-foreground">{p.period}</span>
      </div>
      <p className="mt-3 text-sm text-muted-foreground">{p.desc}</p>
      <a
        href="/audit"
        className={`mt-6 block rounded-full py-3 text-center text-sm font-semibold transition-all ${
          p.popular ? "btn-gradient text-white" : "glass hover:bg-white/5"
        }`}
      >
        Get Started
      </a>
      <div className="mt-8 space-y-3">
        {p.features.map((f) => (
          <div key={f} className="flex items-start gap-2 text-sm">
            <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
            <span className="text-muted-foreground">{f}</span>
          </div>
        ))}
      </div>
    </motion.div>
  );
};
