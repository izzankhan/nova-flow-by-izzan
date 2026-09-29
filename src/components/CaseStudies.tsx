import { motion } from "framer-motion";
import { Counter } from "./Counter";
import { SectionHeader } from "./SectionHeader";
import { useSpotlight } from "@/hooks/useSpotlight";

const cases = [
  {
    client: "TechFlow SaaS",
    industry: "B2B Software",
    before: { revenue: 45, leads: 120, cac: 320 },
    after: { revenue: 231, leads: 980, cac: 89 },
    desc: "Deployed AI-driven funnel + CRM automation that cut CAC by 72% while tripling qualified leads.",
  },
  {
    client: "LuxRealty Group",
    industry: "Real Estate",
    before: { revenue: 180, leads: 340, cac: 540 },
    after: { revenue: 612, leads: 2100, cac: 145 },
    desc: "Built an AI chatbot + pipeline system that booked 3x more showings on autopilot.",
  },
  {
    client: "MedCare Clinics",
    industry: "Healthcare",
    before: { revenue: 90, leads: 200, cac: 210 },
    after: { revenue: 348, leads: 1450, cac: 67 },
    desc: "Implemented appointment automation + SMS reminders that slashed no-shows by 68%.",
  },
];

export const CaseStudies = () => {
  return (
    <section id="case-studies" className="relative py-8">
      <div className="absolute inset-0 radial-fade opacity-30" />
      <div className="container relative">
        <SectionHeader
          eyebrow="Case Studies"
          title={
            <>
              Before & After:{" "}
              <span className="text-gradient">Real Revenue Growth</span>
            </>
          }
          description="Real clients. Real numbers. The systems we build don't just look good — they move the metrics that matter."
        />
        <div className="mt-8 space-y-6">
          {cases.map((c, i) => (
            <CaseCard key={c.client} c={c} i={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

const CaseCard = ({ c, i }: { c: (typeof cases)[number]; i: number }) => {
  const { ref, onMouseMove, onMouseLeave } = useSpotlight<HTMLDivElement>();
  return (
    <motion.div
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: i * 0.1 }}
      className="glass-card neon-trace spotlight rounded-3xl p-8"
    >
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between mb-8">
        <div>
          <div className="text-xs uppercase tracking-widest text-primary">
            {c.industry}
          </div>
          <h3 className="text-2xl font-bold mt-1">{c.client}</h3>
        </div>
        <p className="text-sm text-muted-foreground max-w-md">{c.desc}</p>
      </div>
      <div className="grid gap-4 sm:grid-cols-3">
        {[
          {
            label: "Revenue (k/mo)",
            before: c.before.revenue,
            after: c.after.revenue,
            suffix: "k",
            prefix: "$",
          },
          {
            label: "Leads/mo",
            before: c.before.leads,
            after: c.after.leads,
            suffix: "",
            prefix: "",
          },
          {
            label: "CAC ($)",
            before: c.before.cac,
            after: c.after.cac,
            suffix: "",
            prefix: "$",
            invert: true,
          },
        ].map((m) => (
          <div key={m.label} className="glass rounded-2xl p-5">
            <div className="text-xs text-muted-foreground mb-3">{m.label}</div>
            <div className="flex items-center gap-3">
              <div className="flex-1">
                <div className="text-xs text-muted-foreground/60">Before</div>
                <div className="text-lg font-semibold text-muted-foreground line-through">
                  {m.prefix}
                  {m.before}
                  {m.suffix}
                </div>
              </div>
              <div className="text-accent">→</div>
              <div className="flex-1">
                <div className="text-xs text-primary/80">After</div>
                <div className="text-lg font-bold text-gradient">
                  <Counter
                    value={m.after}
                    prefix={m.prefix}
                    suffix={m.suffix}
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};
