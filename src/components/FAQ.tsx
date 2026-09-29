import { motion } from "framer-motion";
import { SectionHeader } from "./SectionHeader";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    q: "How quickly can you deploy our AI automation system?",
    a: "Most clients are fully onboarded and automated within 2-3 weeks. We start with a strategy call, audit your current systems, then deploy in phases so you see results fast.",
  },
  {
    q: "Do I need to switch my existing tools?",
    a: "No. We integrate with your existing CRM, ad platforms, and tools. If you don't have one, we'll set up the best-in-class stack for you.",
  },
  {
    q: "What ROI can I expect?",
    a: "Our clients average 312% ROI within the first 90 days. Results depend on your industry, current systems, and ad spend — we'll give you a realistic projection on your strategy call.",
  },
  {
    q: "Are there long-term contracts?",
    a: "No. All plans are month-to-month. We earn your business every month with results, not contracts.",
  },
  {
    q: "Can your AI chatbot handle complex questions?",
    a: "Yes. Our chatbots use advanced NLP trained on your business data. They can qualify leads, answer FAQs, book appointments, and escalate to humans when needed.",
  },
  {
    q: "Do you work with my industry?",
    a: "We've built systems for 12+ industries including healthcare, real estate, ecommerce, fitness, law, and more. If you have leads and customers, we can automate your growth.",
  },
];

export const FAQ = () => {
  return (
    <section className="relative py-8">
      <div className="container max-w-3xl">
        <SectionHeader
          eyebrow="FAQ"
          title={
            <>
              Questions? <span className="text-gradient">We Have Answers</span>
            </>
          }
          description="Everything you need to know before booking your strategy call."
        />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-8"
        >
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((f, i) => (
              <AccordionItem
                key={i}
                value={`item-${i}`}
                className="glass-card rounded-2xl px-6 border-none"
              >
                <AccordionTrigger className="text-left text-base font-semibold hover:no-underline">
                  {f.q}
                </AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground leading-relaxed">
                  {f.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
};
