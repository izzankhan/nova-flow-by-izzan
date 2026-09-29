import { motion } from "framer-motion";
import { Mail, Phone, MapPin } from "lucide-react";
import { SectionHeader } from "./SectionHeader";

export const Contact = () => {
  return (
    <section id="contact" className="relative py-8">
      <div className="container">
        <SectionHeader
          eyebrow="Contact"
          title={
            <>
              Let's <span className="text-gradient">Talk</span>
            </>
          }
          description="Have a question or ready to get started? Reach out and we'll respond within 24 hours."
        />
        <div className="mt-8 mx-auto max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            {[
              {
                icon: Mail,
                label: "Email",
                value: "niceaz0323@gmail.com",
                href: "mailto:niceaz0323@gmail.com",
              },
              {
                icon: Phone,
                label: "Phone",
                value: "+92 323 1034955",
                href: "tel:+923231034955",
              },
              {
                icon: MapPin,
                label: "Office",
                value: "DHA, Multan, Pakistan",
                href: "https://maps.google.com/?q=DHA+Multan+Pakistan",
              },
            ].map((c) => (
              <a
                key={c.label}
                href={c.href}
                target={c.label === "Office" ? "_blank" : undefined}
                rel={c.label === "Office" ? "noopener noreferrer" : undefined}
                className="glass-card rounded-2xl p-6 flex items-center gap-4 hover:border-primary/30 transition-all"
              >
                <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                  <c.icon className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <div className="text-xs text-muted-foreground">{c.label}</div>
                  <div className="text-sm font-semibold">{c.value}</div>
                </div>
              </a>
            ))}
            <div className="glass-card rounded-2xl p-6">
              <div className="text-sm font-semibold mb-3">Office Hours</div>
              <div className="space-y-1 text-sm text-muted-foreground">
                <div className="flex justify-between">
                  <span>Mon – Fri</span>
                  <span>9am – 6pm PST</span>
                </div>
                <div className="flex justify-between">
                  <span>Sat – Sun</span>
                  <span>AI Support 24/7</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export const GoogleMap = () => {
  return (
    <section className="relative py-8">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-3xl glass-card p-2 h-80"
        >
          <img
            src="https://vibe.filesafe.space/1786109541213169282/assets/b079d172-3a57-4d45-8c32-23f6c090e353.png"
            alt="Nova Automate office location map"
            className="h-full w-full object-cover rounded-2xl"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent pointer-events-none" />
          <div className="absolute bottom-6 left-6 glass-card rounded-2xl p-4">
            <div className="text-sm font-semibold">Nova Automate HQ</div>
            <div className="text-xs text-muted-foreground">
              DHA, Multan, Pakistan
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
