import { Twitter, Linkedin, Instagram, Youtube, ArrowUp } from "lucide-react";

const footerLinkMap: Record<string, string> = {
  "AI Marketing Automation": "#services",
  "CRM Automation": "#services",
  "Sales Funnels": "#services",
  "Meta & Google Ads": "#services",
  "AI Chatbots": "#services",
  "Lead Generation": "#services",
  "About Us": "#about",
  "Our Team": "#",
  "Case Studies": "#case-studies",
  Careers: "#",
  Contact: "#contact",
  WhatsApp: "https://wa.me/923231034955",

  Blog: "#",
  "AI Playbook": "#",
  "Free Audit": "/audit",
  "CRM Template": "#",
  "Funnel Checklist": "#",
  Community: "#",
  "Privacy Policy": "#",
  "Terms of Service": "#",
  "Cookie Policy": "#",
  GDPR: "#",
  Security: "#",
};

const socialLinks = [
  { Icon: Twitter, link: "https://twitter.com/novaautomate" },
  { Icon: Linkedin, link: "https://linkedin.com/company/novaautomate" },
  { Icon: Instagram, link: "https://instagram.com/nova.automate" },
  { Icon: Youtube, link: "https://youtube.com/@novaautomate" },
];

const footerLinks = {
  Services: [
    "AI Marketing Automation",
    "CRM Automation",
    "Sales Funnels",
    "Meta & Google Ads",
    "AI Chatbots",
    "Lead Generation",
  ],
  Company: [
    "About Us",
    "Our Team",
    "Case Studies",
    "Careers",
    "Contact",
    "WhatsApp",
  ],
  Resources: [
    "Blog",
    "AI Playbook",
    "Free Audit",
    "CRM Template",
    "Funnel Checklist",
    "Community",
  ],
  Legal: [
    "Privacy Policy",
    "Terms of Service",
    "Cookie Policy",
    "GDPR",
    "Security",
  ],
};

export const Footer = () => {
  return (
    <footer className="relative border-t border-border/40 pt-12 pb-8">
      <div className="absolute inset-0 grid-bg opacity-10" />
      <div className="container relative">
        <div className="grid gap-10 lg:grid-cols-[1.5fr_1fr_1fr_1fr_1fr]">
          <div>
            <a href="#" className="flex items-center gap-2 mb-4">
              <img
                src="https://vibe.filesafe.space/1786109541213169282/attachments/651846b4-4159-4a4c-b451-ea7fe356fbf7.png"
                alt="Nova Automate Logo"
                className="h-12 w-auto object-contain rounded-full"
              />
            </a>
            <p className="text-sm text-muted-foreground max-w-xs">
              We build AI systems that grow businesses automatically. Premium
              marketing automation for ambitious companies.
            </p>
            <div className="mt-6 flex gap-3">
              {socialLinks.map(({ Icon, link }, i) => (
                <a
                  key={i}
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="h-10 w-10 rounded-full glass flex items-center justify-center hover:bg-primary/20 transition-colors"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="text-sm font-semibold mb-4">{title}</h4>
              <ul className="space-y-2.5">
                {links.map((l) => (
                  <li key={l}>
                    <a
                      href={footerLinkMap[l] || "#"}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-10 pt-6 border-t border-border/40 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <img
              src="https://vibe.filesafe.space/1786109541213169282/attachments/651846b4-4159-4a4c-b451-ea7fe356fbf7.png"
              alt="Nova Automate Logo"
              className="h-5 w-auto object-contain rounded-full"
            />
            <span className="text-xs text-muted-foreground">
              © 2026. All rights reserved.
            </span>
          </div>
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground transition-colors"
          >
            Back to top <ArrowUp className="h-3 w-3" />
          </a>
        </div>
      </div>
    </footer>
  );
};
