import { motion, useInView, useAnimation } from "framer-motion";
import { useRef, useEffect } from "react";
import { ArrowRight, Play, Sparkles } from "lucide-react";
import { AISphere } from "./AISphere";
import { ParticleField } from "./ParticleField";
import { MagneticButton } from "./MagneticButton";

export const Hero = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { margin: "-10% 0px -10% 0px" });
  const bgControls = useAnimation();

  useEffect(() => {
    if (inView) {
      bgControls.start({ rotateY: [0, 360] });
    } else {
      bgControls.stop();
    }
  }, [inView, bgControls]);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen overflow-hidden pt-24 pb-12"
    >
      {/* Background image - circular 3D orbiting animation */}
      <div className="absolute inset-0 z-0 flex items-center justify-center overflow-hidden">
        <div
          className="relative w-[160%] h-[160%] flex items-center justify-center"
          style={{ perspective: "1200px" }}
        >
          <motion.div
            animate={bgControls}
            transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
            style={{ transformStyle: "preserve-3d" }}
            className="relative w-[120%] h-[120%]"
          >
            {/* Orbit ring 1 */}
            <div className="absolute inset-0 rounded-full border border-primary/15 animate-spin-slow" />
            {/* Orbit ring 2 */}
            <div className="absolute inset-[8%] rounded-full border border-accent/10 animate-spin-reverse" />
            {/* Orbit ring 3 */}
            <div
              className="absolute inset-[16%] rounded-full border border-secondary/10 animate-spin-slow"
              style={{ animationDuration: "40s" }}
            />
            {/* The image as a rotating circular element */}
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
              className="absolute inset-[10%] rounded-full overflow-hidden"
              style={{
                transformStyle: "preserve-3d",
                boxShadow: "0 0 120px -20px rgba(201,168,76,0.3)",
              }}
            >
              <img
                src="https://vibe.filesafe.space/1786109541213169282/assets/d177d85d-e3a3-47a7-9921-2e242bfae30d.png"
                alt="Futuristic AI city at night"
                className="h-full w-full object-cover opacity-40 rounded-full"
              />
            </motion.div>
            {/* Glowing orbiting dots */}
            <div
              className="absolute inset-0 animate-spin-slow"
              style={{ animationDuration: "25s" }}
            >
              <div className="absolute top-0 left-1/2 -translate-x-1/2 h-4 w-4 rounded-full bg-accent shadow-[0_0_24px_6px_rgba(240,215,140,0.6)]" />
            </div>
            <div
              className="absolute inset-0 animate-spin-reverse"
              style={{ animationDuration: "30s" }}
            >
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 h-3 w-3 rounded-full bg-primary shadow-[0_0_20px_5px_rgba(201,168,76,0.5)]" />
            </div>
            <div
              className="absolute inset-[8%] animate-spin-slow"
              style={{ animationDuration: "35s" }}
            >
              <div className="absolute top-1/2 right-0 -translate-y-1/2 h-3 w-3 rounded-full bg-secondary shadow-[0_0_20px_5px_rgba(201,168,76,0.4)]" />
            </div>
          </motion.div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/80 to-background" />
      </div>

      {/* Grid overlay */}
      <div className="absolute inset-0 grid-bg opacity-30 z-0" />

      {/* Particles */}
      <ParticleField
        count={60}
        className="absolute inset-0 z-0"
        color="201, 168, 76"
      />

      {/* Floating orbs */}
      <div className="absolute top-1/4 left-10 h-64 w-64 rounded-full bg-primary/20 blur-[100px] animate-pulse-glow z-0" />
      <div
        className="absolute bottom-1/4 right-10 h-72 w-72 rounded-full bg-secondary/20 blur-[100px] animate-pulse-glow z-0"
        style={{ animationDelay: "2s" }}
      />

      <div className="container relative z-10">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Left content */}
          <div className="text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 rounded-full glass px-4 py-2 text-xs font-medium text-muted-foreground mb-6"
            >
              <Sparkles className="h-3.5 w-3.5 text-primary" />
              <span>AI-Powered Marketing Automation Agency</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl md:text-6xl lg:text-7xl"
            >
              We Build <span className="text-gradient">AI Systems</span> That
              Grow Businesses Automatically
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="mx-auto lg:mx-0 mt-6 max-w-xl text-base text-muted-foreground sm:text-lg"
            >
              AI Marketing Automation • Funnels • CRM • Meta Ads • Google Ads •
              AI Chatbots
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center lg:justify-start"
            >
              <MagneticButton
                href="/audit"
                className="w-full sm:w-auto justify-center"
              >
                Book Strategy Call <ArrowRight className="h-4 w-4" />
              </MagneticButton>
              <MagneticButton
                href="#portfolio"
                variant="ghost"
                className="w-full sm:w-auto justify-center"
              >
                <Play className="h-4 w-4" /> View Portfolio
              </MagneticButton>
            </motion.div>

            {/* Trust line */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.5 }}
              className="mt-10 flex items-center justify-center lg:justify-start gap-6 text-xs text-muted-foreground"
            >
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="h-7 w-7 rounded-full border-2 border-background bg-gradient-to-br from-primary/40 to-secondary/40"
                    />
                  ))}
                </div>
                <span>500+ Clients Scaled</span>
              </div>
              <div className="hidden sm:flex items-center gap-1">
                <span className="text-accent">★★★★★</span>
                <span>4.9/5 Rating</span>
              </div>
            </motion.div>
          </div>

          {/* Right - AI sphere */}
          <div className="relative flex items-center justify-center mt-12 lg:mt-0">
            <AISphere className="h-[280px] w-[280px] sm:h-[340px] sm:w-[340px] lg:h-[400px] lg:w-[400px]" />

            {/* Floating UI cards */}
            <motion.div
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-4 -left-4 glass-card rounded-2xl p-4 w-48"
            >
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-primary/20 flex items-center justify-center">
                  <Sparkles className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <div className="text-xs text-muted-foreground">Revenue</div>
                  <div className="text-sm font-bold text-gradient-blue">
                    +312%
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              animate={{ y: [0, 15, 0] }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1,
              }}
              className="absolute -bottom-4 -right-4 glass-card rounded-2xl p-4 w-48"
            >
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-secondary/20 flex items-center justify-center">
                  <div className="h-2.5 w-2.5 rounded-full bg-secondary animate-pulse" />
                </div>
                <div>
                  <div className="text-xs text-muted-foreground">
                    Leads Today
                  </div>
                  <div className="text-sm font-bold text-foreground">1,284</div>
                </div>
              </div>
            </motion.div>

            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.5,
              }}
              className="absolute top-1/2 -right-8 glass-card rounded-2xl p-3 w-36"
            >
              <div className="text-xs text-muted-foreground mb-1">
                AI Active
              </div>
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-accent animate-pulse" />
                <span className="text-xs font-semibold">24/7 Running</span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <div className="flex flex-col items-center gap-2 text-muted-foreground">
          <span className="text-xs">Scroll</span>
          <div className="h-10 w-6 rounded-full border border-muted-foreground/30 p-1">
            <motion.div
              animate={{ y: [0, 16, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="h-2 w-2 rounded-full bg-primary"
            />
          </div>
        </div>
      </motion.div>
    </section>
  );
};
