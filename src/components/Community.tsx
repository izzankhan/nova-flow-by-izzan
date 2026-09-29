import { motion } from "framer-motion";
import { SectionHeader } from "./SectionHeader";

export const Newsletter = () => {
  return (
    <section className="relative py-8">
      <div className="container">
        <SectionHeader
          eyebrow="Newsletter"
          title={
            <>
              Stay Ahead of the <span className="text-gradient">AI Curve</span>
            </>
          }
          description="Get weekly insights on AI marketing, automation trends, and growth strategies — delivered to your inbox."
        />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-8 mx-auto max-w-md glass-card rounded-3xl p-8 text-center"
        >
          <p className="text-sm text-muted-foreground">
            Subscribe to our newsletter for weekly AI marketing insights,
            automation trends, and growth strategies. Reach out at{" "}
            <a
              href="mailto:niceaz0323@gmail.com"
              className="text-primary font-semibold hover:underline"
            >
              niceaz0323@gmail.com
            </a>{" "}
            to join.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

const partners = [
  "AWS Partner",
  "Google Cloud",
  "Meta Business",
  "OpenAI",
  "Stripe Verified",
  "Twilio",
];

export const Partners = () => {
  return (
    <section className="relative py-6 border-y border-border/40">
      <div className="container">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-xs uppercase tracking-[0.3em] text-muted-foreground mb-6"
        >
          Official Technology Partners
        </motion.p>
        <div className="flex flex-wrap justify-center gap-8">
          {partners.map((p, i) => (
            <motion.div
              key={p}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="text-sm font-semibold text-muted-foreground/50 hover:text-foreground transition-colors"
            >
              {p}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export const Community = () => {
  return (
    <section className="relative py-8">
      <div className="container">
        <SectionHeader
          eyebrow="Community"
          title={
            <>
              Join 10,000+ <span className="text-gradient">Growth Leaders</span>
            </>
          }
          description="Connect with founders and marketers automating their growth with AI."
        />
        <div className="mt-8 grid gap-6 sm:grid-cols-3">
          {[
            {
              name: "Discord",
              members: "8,400+ members",
              desc: "Live discussions & AI demos",
              link: "https://discord.gg/novaautomate",
            },
            {
              name: "Slack",
              members: "3,200+ members",
              desc: "Founder networking group",
              link: "https://join.slack.com/t/novaautomate",
            },
            {
              name: "LinkedIn Group",
              members: "12,000+ members",
              desc: "Industry insights & jobs",
              link: "https://linkedin.com/groups/novaautomate",
            },
          ].map((c, i) => (
            <motion.a
              key={c.name}
              href={c.link}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -6 }}
              className="glass-card rounded-3xl p-8 text-center cursor-pointer"
            >
              <div className="text-2xl font-bold text-gradient">
                {c.members}
              </div>
              <div className="mt-2 text-sm font-semibold">{c.name}</div>
              <div className="mt-1 text-xs text-muted-foreground">{c.desc}</div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
};

export const SocialMedia = () => {
  const socials = [
    {
      name: "Twitter",
      handle: "@novaautomate",
      followers: "45K",
      link: "https://twitter.com/novaautomate",
    },
    {
      name: "LinkedIn",
      handle: "/novaautomate",
      followers: "32K",
      link: "https://linkedin.com/company/novaautomate",
    },
    {
      name: "Instagram",
      handle: "@nova.automate",
      followers: "28K",
      link: "https://instagram.com/nova.automate",
    },
    {
      name: "YouTube",
      handle: "Nova Automate",
      followers: "19K",
      link: "https://youtube.com/@novaautomate",
    },
  ];
  return (
    <section className="relative py-8">
      <div className="container">
        <SectionHeader
          eyebrow="Social Media"
          title={
            <>
              Follow the <span className="text-gradient">Movement</span>
            </>
          }
          description="Daily AI insights, automation tips, and behind-the-scenes content."
        />
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {socials.map((s, i) => (
            <motion.a
              key={s.name}
              href={s.link}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              whileHover={{ y: -6 }}
              className="glass-card rounded-3xl p-6 text-center cursor-pointer hover:border-primary/30 transition-all"
            >
              <div className="text-lg font-bold">{s.name}</div>
              <div className="mt-1 text-xs text-muted-foreground">
                {s.handle}
              </div>
              <div className="mt-4 text-2xl font-bold text-gradient">
                {s.followers}
              </div>
              <div className="text-xs text-muted-foreground">followers</div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
};
