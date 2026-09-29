import { motion } from "framer-motion";
import { SectionHeader } from "./SectionHeader";

const milestones = [
  {
    year: "2019",
    title: "Nova Automate Founded",
    desc: "Started with 3 engineers and a vision to automate marketing.",
  },
  {
    year: "2020",
    title: "First 50 Clients",
    desc: "Scaled our first cohort of businesses with AI funnels.",
  },
  {
    year: "2021",
    title: "CRM Platform Launch",
    desc: "Released our proprietary AI-powered CRM automation.",
  },
  {
    year: "2022",
    title: "250+ Clients",
    desc: "Expanded to 8 industries with 312% average ROI.",
  },
  {
    year: "2023",
    title: "AI Chatbot Engine",
    desc: "Launched conversational AI deployed across all channels.",
  },
  {
    year: "2024",
    title: "Global Expansion",
    desc: "Now serving clients in 40+ countries worldwide.",
  },
  {
    year: "2026",
    title: "500+ Clients",
    desc: "Recognized as a top AI marketing automation agency.",
  },
];

export const Timeline = () => {
  return (
    <section className="relative py-8">
      <div className="container">
        <SectionHeader
          eyebrow="Client Success Timeline"
          title={
            <>
              Our <span className="text-gradient">Journey</span>
            </>
          }
          description="From a small team to a global AI automation powerhouse."
        />
        <div className="mt-8 relative">
          <div className="absolute left-4 sm:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary via-secondary to-accent opacity-30" />
          <div className="space-y-8">
            {milestones.map((m, i) => {
              const isLeft = i % 2 === 0;
              return (
                <motion.div
                  key={m.year}
                  initial={{ opacity: 0, x: isLeft ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className={`relative flex items-center gap-6 ${isLeft ? "sm:flex-row" : "sm:flex-row-reverse"}`}
                >
                  <div className="hidden sm:block sm:w-1/2" />
                  <div className="absolute left-4 sm:left-1/2 -translate-x-1/2 z-10">
                    <div className="h-4 w-4 rounded-full bg-primary ring-4 ring-background glow-blue" />
                  </div>
                  <div
                    className={`ml-12 sm:ml-0 sm:w-1/2 ${isLeft ? "sm:pr-12" : "sm:pl-12"}`}
                  >
                    <div className="glass-card rounded-2xl p-6">
                      <div className="text-sm font-bold text-gradient">
                        {m.year}
                      </div>
                      <h3 className="mt-1 font-semibold">{m.title}</h3>
                      <p className="mt-2 text-sm text-muted-foreground">
                        {m.desc}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
