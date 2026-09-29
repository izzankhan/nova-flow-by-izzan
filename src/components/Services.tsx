import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import { SectionHeader } from "./SectionHeader";

interface ServiceItem {
  num: string;
  title: string;
  desc: string;
  image: string;
  features: string[];
}

const services: ServiceItem[] = [
  {
    num: "12",
    title: "AI Marketing Automation",
    image:
      "https://vibe.filesafe.space/1786109541213169282/assets/57c94b2c-300a-48d9-8723-f183169b1143.png",
    desc: "Intelligent automation that orchestrates your entire marketing engine — from first touch to closed deal.",
    features: [
      "AI-driven campaign orchestration",
      "Real-time performance optimization",
      "Predictive audience targeting",
      "Autonomous budget allocation",
    ],
  },
  {
    num: "13",
    title: "CRM Automation",
    image:
      "https://vibe.filesafe.space/1786109541213169282/assets/b1f02028-388b-4bcc-abe1-6bcf6e43a930.png",
    desc: "A unified CRM that manages every customer interaction automatically — no manual data entry, ever.",
    features: [
      "Automated contact management",
      "Smart pipeline tracking",
      "AI lead scoring",
      "Seamless integrations",
    ],
  },
  {
    num: "14",
    title: "Sales Funnels",
    image:
      "https://vibe.filesafe.space/1786109541213169282/assets/8bea8f01-4923-49d4-b566-43bb35f5f80f.png",
    desc: "High-converting funnels engineered to turn cold traffic into paying customers on autopilot.",
    features: [
      "Multi-step conversion funnels",
      "A/B tested landing pages",
      "Upsell & cross-sell automation",
      "Revenue tracking",
    ],
  },
  {
    num: "15",
    title: "Meta Ads",
    image:
      "https://vibe.filesafe.space/1786109541213169282/assets/41edac62-b567-4c0f-99bb-59fe57282b85.png",
    desc: "AI-optimized Meta ad campaigns that maximize ROAS across Facebook and Instagram.",
    features: [
      "AI creative optimization",
      "Audience lookalike modeling",
      "Dynamic budget scaling",
      "Conversion API integration",
    ],
  },
  {
    num: "16",
    title: "Google Ads",
    image:
      "https://vibe.filesafe.space/1786109541213169282/assets/d1e18335-e84b-42f0-8cfb-7cea1aba928e.png",
    desc: "Data-driven Google Ads management that captures high-intent search traffic at scale.",
    features: [
      "Smart bidding strategies",
      "Keyword AI expansion",
      "Performance Max campaigns",
      "Conversion tracking",
    ],
  },
  {
    num: "17",
    title: "AI Chatbots",
    image:
      "https://vibe.filesafe.space/1786109541213169282/assets/1d665385-da57-41e4-9042-9f22a1e0b7c0.png",
    desc: "Conversational AI that qualifies leads, answers questions, and books appointments 24/7.",
    features: [
      "Natural language processing",
      "Lead qualification flows",
      "Appointment booking",
      "Multi-channel deployment",
    ],
  },
  {
    num: "18",
    title: "Email Automation",
    image:
      "https://vibe.filesafe.space/1786109541213169282/assets/7ad9229e-b9ca-4608-aadc-8a403f5b76a1.png",
    desc: "Behavior-triggered email sequences that nurture prospects and drive repeat purchases.",
    features: [
      "Smart segmentation",
      "Behavior-triggered sequences",
      "AI subject line optimization",
      "Deliverability monitoring",
    ],
  },
  {
    num: "19",
    title: "SMS Automation",
    image:
      "https://vibe.filesafe.space/1786109541213169282/assets/ad087d36-d5d3-491a-8ebc-f4be8c4ccc8f.png",
    desc: "High-open-rate SMS campaigns that reach customers instantly wherever they are.",
    features: [
      "Two-way SMS conversations",
      "Automated reminders",
      "Compliance built-in",
      "98% open rate campaigns",
    ],
  },
  {
    num: "20",
    title: "Workflow Automation",
    image:
      "https://vibe.filesafe.space/1786109541213169282/assets/3d40a925-8772-489e-8bd6-cde745ae586a.png",
    desc: "Connected automation nodes that eliminate repetitive tasks across your entire business.",
    features: [
      "Visual workflow builder",
      "500+ app integrations",
      "Conditional logic flows",
      "Real-time triggers",
    ],
  },
  {
    num: "21",
    title: "Lead Generation",
    image:
      "https://vibe.filesafe.space/1786109541213169282/assets/4acb9340-caa7-4b41-a34d-c290e4b19916.png",
    desc: "AI-powered lead pipelines that fill your calendar with qualified prospects automatically.",
    features: [
      "Multi-channel capture",
      "AI lead enrichment",
      "Instant lead routing",
      "Quality scoring",
    ],
  },
  {
    num: "22",
    title: "CRM Automation",
    image:
      "https://vibe.filesafe.space/1786109541213169282/assets/cd7324f0-d57c-4203-a562-0c2170e70ba3.png",
    desc: "Customer cards that move through your pipeline automatically — updated, tagged, and nurtured.",
    features: [
      "Auto-updating records",
      "Smart tagging",
      "Lifecycle stage automation",
      "Activity timeline",
    ],
  },
  {
    num: "23",
    title: "Calendars",
    image:
      "https://vibe.filesafe.space/1786109541213169282/assets/2f7d7f7b-162c-4153-9f43-7f512059f77f.png",
    desc: "Smart booking calendars that eliminate scheduling friction and no-shows.",
    features: [
      "Round-robin scheduling",
      "Automated reminders",
      "Buffer time logic",
      "Calendar sync",
    ],
  },
  {
    num: "24",
    title: "Appointment System",
    image:
      "https://vibe.filesafe.space/1786109541213169282/assets/32dcd26c-8680-46e2-b74e-6d5218b9083e.png",
    desc: "3D appointment systems that book, confirm, and follow up — without you lifting a finger.",
    features: [
      "Self-booking portals",
      "Automated confirmations",
      "Rescheduling flows",
      "Post-visit automation",
    ],
  },
  {
    num: "25",
    title: "Pipeline Management",
    image:
      "https://vibe.filesafe.space/1786109541213169282/assets/eea9a18e-cbac-42dc-87c7-9dafbc11d741.png",
    desc: "Visual pipelines that track every deal from prospect to close with AI-driven insights.",
    features: [
      "Drag-and-drop boards",
      "Win probability AI",
      "Bottleneck detection",
      "Revenue forecasting",
    ],
  },
  {
    num: "26",
    title: "Reputation Management",
    image:
      "https://vibe.filesafe.space/1786109541213169282/assets/79fc797b-1f1c-4fbb-854c-146d3eda6a3c.png",
    desc: "Automated review generation and response systems that build trust and boost rankings.",
    features: [
      "Review request automation",
      "AI response drafting",
      "Multi-platform monitoring",
      "Sentiment analysis",
    ],
  },
];

const ServiceImage = ({
  service: s,
  reversed,
}: {
  service: ServiceItem;
  reversed: boolean;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const rotateX = useTransform(scrollYProgress, [0, 0.5, 1], [25, 0, -25]);
  const rotateZ = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [reversed ? -8 : 8, 0, reversed ? 8 : -8],
  );
  const y = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.85, 1, 0.85]);

  return (
    <div ref={ref} className="container">
      <div
        className={`grid items-center gap-10 lg:grid-cols-2 ${reversed ? "lg:[&>*:first-child]:order-2" : ""}`}
      >
        <motion.div
          initial={{ opacity: 0, x: reversed ? 40 : -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative"
          style={{ perspective: 1200 }}
        >
          <motion.div
            style={{
              rotateX,
              rotateZ,
              y,
              scale,
              transformStyle: "preserve-3d",
            }}
            className="relative"
          >
            {/* Outer rotating ring */}
            <div
              className="absolute -inset-6 rounded-full pointer-events-none animate-spin-slow"
              style={{ zIndex: 1 }}
            >
              <div className="absolute inset-0 rounded-full border border-primary/20" />
              <div className="absolute top-0 left-1/2 -translate-x-1/2 h-3 w-3 rounded-full bg-accent shadow-[0_0_20px_4px_rgba(240,215,140,0.6)]" />
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 h-2 w-2 rounded-full bg-primary shadow-[0_0_16px_3px_rgba(201,168,76,0.5)]" />
            </div>
            {/* Middle rotating ring (reverse) */}
            <div
              className="absolute -inset-3 rounded-full pointer-events-none animate-spin-reverse"
              style={{ zIndex: 1 }}
            >
              <div className="absolute inset-0 rounded-full border border-accent/15" />
              <div className="absolute top-1/2 right-0 -translate-y-1/2 h-2.5 w-2.5 rounded-full bg-primary shadow-[0_0_18px_3px_rgba(201,168,76,0.5)]" />
              <div className="absolute top-1/2 left-0 -translate-y-1/2 h-2 w-2 rounded-full bg-accent shadow-[0_0_16px_3px_rgba(240,215,140,0.5)]" />
            </div>
            {/* Orbiting dots */}
            <div
              className="absolute inset-0 pointer-events-none animate-spin-slow"
              style={{ zIndex: 2 }}
            >
              <div className="absolute top-1/2 left-0 h-4 w-4 -translate-y-1/2 rounded-full bg-gradient-to-br from-primary to-accent opacity-70 blur-[2px]" />
              <div className="absolute top-1/2 right-0 h-3 w-3 -translate-y-1/2 rounded-full bg-accent opacity-60 blur-[1px]" />
            </div>
            {/* Floating 3D data particles — animate on hover */}
            <div
              className="absolute -inset-12 pointer-events-none"
              style={{ zIndex: 3 }}
            >
              {[
                {
                  top: "10%",
                  left: "15%",
                  delay: "0s",
                  dur: "4s",
                  size: "h-2 w-2",
                },
                {
                  top: "20%",
                  left: "80%",
                  delay: "0.5s",
                  dur: "5s",
                  size: "h-1.5 w-1.5",
                },
                {
                  top: "75%",
                  left: "10%",
                  delay: "1s",
                  dur: "4.5s",
                  size: "h-2.5 w-2.5",
                },
                {
                  top: "85%",
                  left: "85%",
                  delay: "1.5s",
                  dur: "3.5s",
                  size: "h-1.5 w-1.5",
                },
                {
                  top: "5%",
                  left: "50%",
                  delay: "0.8s",
                  dur: "6s",
                  size: "h-1 w-1",
                },
                {
                  top: "50%",
                  left: "5%",
                  delay: "2s",
                  dur: "4s",
                  size: "h-2 w-2",
                },
                {
                  top: "50%",
                  left: "92%",
                  delay: "2.5s",
                  dur: "5s",
                  size: "h-1.5 w-1.5",
                },
                {
                  top: "95%",
                  left: "45%",
                  delay: "1.2s",
                  dur: "4.5s",
                  size: "h-2 w-2",
                },
              ].map((p, idx) => (
                <div
                  key={idx}
                  className={`absolute ${p.size} rounded-full bg-accent shadow-[0_0_12px_3px_rgba(240,215,140,0.6)] opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                  style={{
                    top: p.top,
                    left: p.left,
                    animation: `float-particle ${p.dur} ease-in-out ${p.delay} infinite`,
                    transform: "translateZ(60px)",
                  }}
                />
              ))}
              {/* Data connection lines on hover */}
              <svg
                className="absolute inset-0 w-full h-full opacity-0 group-hover:opacity-40 transition-opacity duration-700"
                style={{ transform: "translateZ(55px)" }}
              >
                <line
                  x1="20%"
                  y1="20%"
                  x2="50%"
                  y2="50%"
                  stroke="hsl(48 77% 75%)"
                  strokeWidth="0.5"
                  strokeDasharray="4 4"
                  className="animate-pulse"
                />
                <line
                  x1="80%"
                  y1="20%"
                  x2="50%"
                  y2="50%"
                  stroke="hsl(45 53% 54%)"
                  strokeWidth="0.5"
                  strokeDasharray="4 4"
                  className="animate-pulse"
                />
                <line
                  x1="20%"
                  y1="80%"
                  x2="50%"
                  y2="50%"
                  stroke="hsl(45 53% 54%)"
                  strokeWidth="0.5"
                  strokeDasharray="4 4"
                  className="animate-pulse"
                />
                <line
                  x1="80%"
                  y1="80%"
                  x2="50%"
                  y2="50%"
                  stroke="hsl(48 77% 75%)"
                  strokeWidth="0.5"
                  strokeDasharray="4 4"
                  className="animate-pulse"
                />
              </svg>
            </div>
            <div
              onMouseMove={(e) => {
                const el = e.currentTarget;
                const rect = el.getBoundingClientRect();
                const x = (e.clientX - rect.left) / rect.width - 0.5;
                const y2 = (e.clientY - rect.top) / rect.height - 0.5;
                el.style.transform = `rotateY(${x * 12}deg) rotateX(${-y2 * 12}deg) scale(1.03)`;
                el.style.setProperty(
                  "--spot-x",
                  `${((e.clientX - rect.left) / rect.width) * 100}%`,
                );
                el.style.setProperty(
                  "--spot-y",
                  `${((e.clientY - rect.top) / rect.height) * 100}%`,
                );
                el.style.setProperty("--spot-opacity", "1");
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform =
                  "rotateY(0deg) rotateX(0deg) scale(1)";
                e.currentTarget.style.setProperty("--spot-opacity", "0");
              }}
              className="relative rounded-3xl overflow-hidden glass-card p-2 group transition-transform duration-300 ease-out rounded-full neon-trace spotlight"
              style={{ transformStyle: "preserve-3d" }}
            >
              <div className="absolute -inset-2 rounded-3xl bg-gradient-to-br from-primary/20 via-transparent to-accent/20 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500 pointer-events-none" />
              <img
                src={s.image}
                alt={s.title}
                className="w-full transition-transform duration-700 group-hover:scale-105 rounded-full aspect-square object-cover"
                loading="lazy"
                style={{ transform: "translateZ(40px)" }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent pointer-events-none" />
            </div>
            <div
              className="absolute -top-4 -left-4 h-16 w-16 rounded-2xl glass-card flex items-center justify-center text-lg font-bold text-primary"
              style={{ transform: "translateZ(50px)" }}
            >
              {s.num}
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: reversed ? -40 : 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <h3 className="text-2xl font-bold sm:text-3xl">{s.title}</h3>
          <p className="mt-4 text-muted-foreground leading-relaxed">{s.desc}</p>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {s.features.map((f) => (
              <div
                key={f}
                className="flex items-center gap-2 text-sm text-muted-foreground"
              >
                <div className="h-1.5 w-1.5 rounded-full bg-accent" />
                {f}
              </div>
            ))}
          </div>
          <a
            href="/audit"
            className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-primary hover:gap-3 transition-all"
          >
            Learn more →
          </a>
        </motion.div>
      </div>
    </div>
  );
};

export const Services = () => {
  return (
    <section id="services" className="relative py-8">
      <div className="container">
        <SectionHeader
          eyebrow="Our Expertise"
          title={
            <>
              Full-Stack <span className="text-gradient">AI Automation</span>{" "}
              Services
            </>
          }
          description="Fifteen integrated systems working together to automate your entire growth engine — from first click to closed deal."
        />
      </div>

      <div className="mt-10 space-y-12">
        {services.map((s, i) => {
          const reversed = i % 2 === 1;
          return <ServiceImage key={s.num} service={s} reversed={reversed} />;
        })}
      </div>
    </section>
  );
};
