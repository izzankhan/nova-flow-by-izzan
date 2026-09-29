import { motion } from "framer-motion";
import { Trophy } from "lucide-react";
import { SectionHeader } from "./SectionHeader";

const awards = [
  { title: "Best AI Marketing Agency 2026", org: "Tech Awards" },
  { title: "Innovation in Automation", org: "SaaS Summit" },
  { title: "Top Growth Partner", org: "Forbes Digital" },
  { title: "Excellence in AI", org: "Marketing Week" },
  { title: "Agency of the Year", org: "Growth Awards" },
  { title: "Best CRM Integration", org: "TechCrunch" },
];

export const Awards = () => {
  return (
    <section className="relative py-8">
      <div className="container">
        <SectionHeader
          eyebrow="Awards"
          title={
            <>
              Recognized for <span className="text-gradient">Excellence</span>
            </>
          }
          description="Our work has been recognized by the industry's most prestigious organizations."
        />
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {awards.map((a, i) => (
            <motion.div
              key={a.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              whileHover={{ y: -6 }}
              className="glass-card rounded-3xl p-8 flex items-center gap-5"
            >
              <div className="shrink-0 h-16 w-16 rounded-2xl bg-gradient-to-br from-amber-500/20 to-amber-700/20 flex items-center justify-center">
                <Trophy className="h-8 w-8 text-amber-400" />
              </div>
              <div>
                <div className="font-semibold">{a.title}</div>
                <div className="text-xs text-muted-foreground mt-1">
                  {a.org}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
