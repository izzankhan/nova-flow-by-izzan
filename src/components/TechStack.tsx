import { motion } from "framer-motion";
import { SectionHeader } from "./SectionHeader";

const tech = [
  "React",
  "Python",
  "TensorFlow",
  "OpenAI",
  "Node.js",
  "AWS",
  "GCP",
  "Stripe",
  "Zapier",
  "Make",
  "Twilio",
  "SendGrid",
  "Meta API",
  "Google Ads",
  "HubSpot",
  "Slack",
];

export const TechStack = () => {
  return (
    <section className="relative py-8">
      <div className="container">
        <SectionHeader
          eyebrow="Technology Stack"
          title={
            <>
              Built on <span className="text-gradient">Best-in-Class</span>{" "}
              Technology
            </>
          }
          description="We leverage the most powerful AI and automation tools to build systems that scale."
        />
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          {tech.map((t, i) => (
            <motion.div
              key={t}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.04 }}
              whileHover={{ y: -6, scale: 1.05 }}
              className="glass rounded-2xl px-6 py-4 text-sm font-medium hover:border-primary/40 transition-all cursor-default"
            >
              {t}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const integrations = [
  "Stripe",
  "Twilio",
  "SendGrid",
  "Slack",
  "Zapier",
  "HubSpot",
  "Salesforce",
  "Mailchimp",
  "Calendly",
  "Zoom",
  "Shopify",
  "WordPress",
  "QuickBooks",
  "DocuSign",
];

export const Integrations = () => {
  return (
    <section className="relative py-8">
      <div className="container">
        <SectionHeader
          eyebrow="Integrations"
          title={
            <>
              Connects with <span className="text-gradient">Everything</span>
            </>
          }
          description="500+ native integrations. If you use it, we can automate it."
        />
        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-7">
          {integrations.map((it, i) => (
            <motion.div
              key={it}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.04 }}
              whileHover={{ y: -4 }}
              className="glass rounded-2xl p-5 text-center text-xs font-medium hover:border-primary/40 transition-all"
            >
              {it}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
