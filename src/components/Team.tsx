import { motion } from "framer-motion";
import { Linkedin, Twitter } from "lucide-react";
import { SectionHeader } from "./SectionHeader";

const team = [
  {
    name: "M Izzan",
    role: "Founder & CEO",
    image:
      "https://vibe.filesafe.space/1786109541213169282/attachments/6bb8b88d-4eae-4af8-b14a-4823c14da847.jpg",
    linkedin: "https://linkedin.com/in/alexmercer",
    twitter: "https://twitter.com/alexmercer",
  },
  {
    name: "Sofia Lin",
    role: "Head of AI",
    image:
      "https://vibe.filesafe.space/1786109541213169282/assets/131e2b52-e1e8-41c3-a96c-b0f1967d910b.png",
    linkedin: "https://linkedin.com/in/sofialin",
    twitter: "https://twitter.com/sofialin",
  },
  {
    name: "David Kim",
    role: "Lead Engineer",
    image:
      "https://vibe.filesafe.space/1786109541213169282/assets/05db9372-ee26-4973-87dc-29097852e564.png",
    linkedin: "https://linkedin.com/in/davidkim",
    twitter: "https://twitter.com/davidkim",
  },
  {
    name: "Maya Johnson",
    role: "Growth Strategist",
    image:
      "https://vibe.filesafe.space/1786109541213169282/assets/2e8af3d7-f21f-49eb-820b-8ee4120f7bce.png",
    linkedin: "https://linkedin.com/in/mayajohnson",
    twitter: "https://twitter.com/mayajohnson",
  },
  {
    name: "Ryan Cole",
    role: "Data Scientist",
    image:
      "https://vibe.filesafe.space/1786109541213169282/assets/a3da08d8-1b28-4531-89ca-7e900bcca665.png",
    linkedin: "https://linkedin.com/in/ryancole",
    twitter: "https://twitter.com/ryancole",
  },
  {
    name: "Elena Voss",
    role: "Client Success",
    image:
      "https://vibe.filesafe.space/1786109541213169282/assets/c99cf05f-138b-4bba-b6e7-dd692733ad60.png",
    linkedin: "https://linkedin.com/in/elenavoss",
    twitter: "https://twitter.com/elenavoss",
  },
];

export const Team = () => {
  return (
    <section className="relative py-8">
      <div className="container">
        <SectionHeader
          eyebrow="Our Team"
          title={
            <>
              The <span className="text-gradient">Minds</span> Behind the
              Machine
            </>
          }
          description="A world-class team of AI engineers, strategists, and automation specialists."
        />
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {team.map((m, i) => (
            <motion.div
              key={m.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              whileHover={{ y: -8 }}
              className="group relative overflow-hidden rounded-3xl glass-card"
            >
              <div className="relative h-80 overflow-hidden">
                <img
                  src={m.image}
                  alt={m.name}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-lg font-semibold">{m.name}</h3>
                  <p className="text-sm text-primary">{m.role}</p>
                  <div className="mt-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <a
                      href={m.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="h-8 w-8 rounded-full glass flex items-center justify-center hover:bg-primary/20 transition-colors"
                    >
                      <Linkedin className="h-4 w-4" />
                    </a>
                    <a
                      href={m.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="h-8 w-8 rounded-full glass flex items-center justify-center hover:bg-primary/20 transition-colors"
                    >
                      <Twitter className="h-4 w-4" />
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
