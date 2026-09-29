import { motion } from "framer-motion";
import { SectionHeader } from "./SectionHeader";

const industries = [
  {
    name: "Healthcare",
    image:
      "https://vibe.filesafe.space/1786109541213169282/assets/de322f10-36fb-4d5d-884d-b7e15f1bc408.png",
    desc: "AI appointment systems & patient engagement",
  },
  {
    name: "Real Estate",
    image:
      "https://vibe.filesafe.space/1786109541213169282/assets/e0b04955-03c0-4d4e-a9f9-7799bf192f0b.png",
    desc: "Lead capture & property pipeline automation",
  },
  {
    name: "Ecommerce",
    image:
      "https://vibe.filesafe.space/1786109541213169282/assets/75d566d3-45a1-4234-876e-34264eb90fdf.png",
    desc: "Funnel optimization & retention automation",
  },
  {
    name: "Education",
    image:
      "https://vibe.filesafe.space/1786109541213169282/assets/ffeba2e5-d412-47bb-9adb-6a2b6a17b150.png",
    desc: "Enrollment funnels & student nurturing",
  },
  {
    name: "Fitness",
    image:
      "https://vibe.filesafe.space/1786109541213169282/assets/2e37e0d1-6452-4508-9fbe-c779945f527b.png",
    desc: "Member retention & class booking automation",
  },
  {
    name: "Law Firms",
    image:
      "https://vibe.filesafe.space/1786109541213169282/assets/279d6284-c00e-4020-b8b7-e124992dc0ad.png",
    desc: "Case intake & consultation scheduling",
  },
  {
    name: "Restaurants",
    image:
      "https://vibe.filesafe.space/1786109541213169282/assets/e530b1b2-f8e1-4798-895a-555e1992299b.png",
    desc: "Reservation automation & review management",
  },
];

export const Industries = () => {
  return (
    <section className="relative py-8">
      <div className="container">
        <SectionHeader
          eyebrow="Industries We Serve"
          title={
            <>
              Tailored AI Systems for{" "}
              <span className="text-gradient">Every Industry</span>
            </>
          }
          description="We've engineered growth systems for 12+ industries. Here are a few we specialize in."
        />
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {industries.map((ind, i) => (
            <motion.div
              key={ind.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              whileHover={{ y: -8 }}
              className="group relative overflow-hidden rounded-3xl glass-card h-72"
            >
              <img
                src={ind.image}
                alt={ind.name}
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="text-xl font-bold">{ind.name}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{ind.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
