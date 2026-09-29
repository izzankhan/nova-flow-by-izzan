import { motion } from "framer-motion";
import { Search, ArrowRight } from "lucide-react";

export const FreeAudit = () => {
  return (
    <section className="relative py-8">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-[2rem] glass-card p-10 sm:p-16 text-center"
        >
          <div className="absolute -top-20 -right-20 h-60 w-60 rounded-full bg-primary/20 blur-[80px]" />
          <div className="absolute -bottom-20 -left-20 h-60 w-60 rounded-full bg-secondary/20 blur-[80px]" />
          <div className="relative">
            <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 mb-6">
              <Search className="h-8 w-8 text-primary" />
            </div>
            <h2 className="text-3xl font-bold sm:text-4xl">
              Get Your{" "}
              <span className="text-gradient">Free AI Growth Audit</span>
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
              We'll analyze your current marketing systems and show you exactly
              where AI can add the most revenue — in 30 minutes, free.
            </p>
            <a
              href="/audit"
              className="mt-8 btn-gradient inline-flex items-center gap-2 rounded-full px-8 py-4 text-sm font-semibold text-white"
            >
              Claim Free Audit <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
