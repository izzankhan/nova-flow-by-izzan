import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { SectionHeader } from "./SectionHeader";
import { useSpotlight } from "@/hooks/useSpotlight";

const projects = [
  {
    title: "SaaS Platform Scale",
    category: "AI Automation",
    result: "+412% MRR",
    image:
      "https://vibe.filesafe.space/1786109541213169282/assets/519c4d51-52f5-425b-a524-8e58c349384a.png",
  },
  {
    title: "Ecommerce Growth",
    category: "Funnel + Ads",
    result: "+287% Revenue",
    image:
      "https://vibe.filesafe.space/1786109541213169282/assets/cb06d6b6-9490-49f7-b53e-f5cd0cabaa1f.png",
  },
  {
    title: "Real Estate CRM",
    category: "CRM Automation",
    result: "+5.2x Leads",
    image:
      "https://vibe.filesafe.space/1786109541213169282/assets/41b93aea-49c0-4eb5-b09c-846f04c9f71b.png",
  },
  {
    title: "Healthcare Booking",
    category: "AI Chatbot",
    result: "+89% Bookings",
    image:
      "https://vibe.filesafe.space/1786109541213169282/assets/c5b056cc-968b-45a0-b22b-b48ab0ba72a0.png",
  },
  {
    title: "Fitness Chain",
    category: "Email + SMS",
    result: "+312% Retention",
    image:
      "https://vibe.filesafe.space/1786109541213169282/assets/ed4adb27-2ee1-47eb-b875-e1a2c36bc128.png",
  },
  {
    title: "Law Firm Pipeline",
    category: "Lead Gen",
    result: "+234% Cases",
    image:
      "https://vibe.filesafe.space/1786109541213169282/assets/72a43a67-d92c-4c55-a135-84132d7c2e42.png",
  },
];

const PortfolioCard = ({
  p,
  i,
}: {
  p: (typeof projects)[number];
  i: number;
}) => {
  const { ref, onMouseMove, onMouseLeave } = useSpotlight<HTMLDivElement>();
  return (
    <motion.div
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      key={p.title}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: i * 0.08 }}
      whileHover={{ y: -8 }}
      className="group relative overflow-hidden rounded-3xl glass-card neon-trace spotlight"
    >
      <div className="relative h-64 overflow-hidden">
        <img
          src={p.image}
          alt={p.title}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
        <div className="absolute top-4 right-4 glass rounded-full px-3 py-1 text-xs font-semibold text-gradient-blue">
          {p.result}
        </div>
      </div>
      <div className="p-6 relative z-[2]">
        <div className="text-xs uppercase tracking-widest text-primary mb-2">
          {p.category}
        </div>
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">{p.title}</h3>
          <ArrowUpRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
        </div>
      </div>
    </motion.div>
  );
};

export const Portfolio = () => {
  return (
    <section id="portfolio" className="relative py-8">
      <div className="container">
        <SectionHeader
          eyebrow="Portfolio"
          title={
            <>
              Work That <span className="text-gradient">Speaks for Itself</span>
            </>
          }
          description="A selection of systems we've engineered for clients across industries — each built to compound growth."
        />
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((p, i) => (
            <PortfolioCard key={p.title} p={p} i={i} />
          ))}
        </div>
      </div>
    </section>
  );
};
