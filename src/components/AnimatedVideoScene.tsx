import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import {
  Layout,
  Filter,
  Workflow,
  Calendar,
  Mail,
  MessageSquare,
  BarChart3,
  Sparkles,
  Bot,
  Tag,
  CheckCircle2,
  Phone,
  UserPlus,
  TrendingUp,
  Zap,
  Database,
  ArrowRight,
} from "lucide-react";

export type SceneType = "funnel" | "crm" | "chatbot";

interface AnimatedVideoSceneProps {
  sceneType: SceneType;
  isPlaying: boolean;
  onProgress: (pct: number, currentSec: number, totalSec: number) => void;
  onEnded: () => void;
  seekPct: number | null;
  onSeekHandled: () => void;
}

const DURATION = 75; // seconds

export const AnimatedVideoScene = ({
  sceneType,
  isPlaying,
  onProgress,
  onEnded,
  seekPct,
  onSeekHandled,
}: AnimatedVideoSceneProps) => {
  const [progress, setProgress] = useState(0); // 0-100
  const rafRef = useRef<number | null>(null);
  const lastTsRef = useRef<number | null>(null);

  // Reset when scene changes
  useEffect(() => {
    setProgress(0);
    lastTsRef.current = null;
  }, [sceneType]);

  // Handle seek
  useEffect(() => {
    if (seekPct !== null) {
      setProgress(seekPct);
      onSeekHandled();
    }
  }, [seekPct, onSeekHandled]);

  // Timeline loop
  useEffect(() => {
    if (!isPlaying) {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      lastTsRef.current = null;
      return;
    }
    const tick = (ts: number) => {
      if (lastTsRef.current === null) lastTsRef.current = ts;
      const dt = (ts - lastTsRef.current) / 1000;
      lastTsRef.current = ts;
      setProgress((prev) => {
        const next = prev + (dt / DURATION) * 100;
        if (next >= 100) {
          onProgress(100, DURATION, DURATION);
          onEnded();
          return 100;
        }
        const sec = (next / 100) * DURATION;
        onProgress(next, sec, DURATION);
        return next;
      });
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [isPlaying, onProgress, onEnded]);

  const stage = (p: number) => progress >= p;

  return (
    <div className="absolute inset-0 overflow-hidden bg-[#050505]">
      {/* Ambient grid + glow */}
      <div className="absolute inset-0 grid-bg opacity-30" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[500px] rounded-full bg-primary/10 blur-[120px]" />

      {sceneType === "funnel" && (
        <FunnelScene progress={progress} stage={stage} />
      )}
      {sceneType === "crm" && <CrmScene progress={progress} stage={stage} />}
      {sceneType === "chatbot" && (
        <ChatbotScene progress={progress} stage={stage} />
      )}

      {/* Cinematic vignette */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/40 pointer-events-none" />
    </div>
  );
};

/* ---------- Shared building blocks ---------- */

const Panel = ({
  children,
  className = "",
  show,
  delay = 0,
  x = 0,
  y = 0,
}: {
  children: React.ReactNode;
  className?: string;
  show: boolean;
  delay?: number;
  x?: number;
  y?: number;
}) => (
  <AnimatePresence>
    {show && (
      <motion.div
        initial={{ opacity: 0, x, y, scale: 0.9, rotateX: -10 }}
        animate={{ opacity: 1, x: 0, y: 0, scale: 1, rotateX: 0 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
        style={{ transformPerspective: 800 }}
        className={`glass-card rounded-2xl border border-primary/30 ${className}`}
      >
        {children}
      </motion.div>
    )}
  </AnimatePresence>
);

const GlowLine = ({
  show,
  delay = 0,
  className = "",
}: {
  show: boolean;
  delay?: number;
  className?: string;
}) => (
  <AnimatePresence>
    {show && (
      <motion.div
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{ scaleX: 1, opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.6, delay }}
        className={`origin-left h-px bg-gradient-to-r from-primary via-accent to-transparent shadow-[0_0_8px_rgba(201,168,76,0.6)] ${className}`}
      />
    )}
  </AnimatePresence>
);

const StageLabel = ({
  show,
  label,
  delay = 0,
}: {
  show: boolean;
  label: string;
  delay?: number;
}) => (
  <AnimatePresence>
    {show && (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5, delay }}
        className="absolute top-4 left-1/2 -translate-x-1/2 z-20 glass rounded-full px-4 py-1.5 text-[11px] font-mono uppercase tracking-widest text-primary border border-primary/40 whitespace-nowrap"
      >
        {label}
      </motion.div>
    )}
  </AnimatePresence>
);

const Node = ({
  show,
  delay = 0,
  icon: Icon,
  label,
  active,
}: {
  show: boolean;
  delay?: number;
  icon: any;
  label: string;
  active: boolean;
}) => (
  <AnimatePresence>
    {show && (
      <motion.div
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4, delay }}
        className="flex flex-col items-center gap-1.5"
      >
        <div
          className={`h-12 w-12 rounded-xl glass border flex items-center justify-center transition-all ${active ? "border-primary shadow-[0_0_20px_rgba(201,168,76,0.5)]" : "border-white/10"}`}
        >
          <Icon
            className={`h-5 w-5 ${active ? "text-primary" : "text-muted-foreground"}`}
          />
        </div>
        <span className="text-[9px] font-mono text-muted-foreground uppercase tracking-wider">
          {label}
        </span>
      </motion.div>
    )}
  </AnimatePresence>
);

/* ---------- Scene 1: AI Funnel Walkthrough ---------- */
const FunnelScene = ({
  progress,
  stage,
}: {
  progress: number;
  stage: (p: number) => boolean;
}) => (
  <div className="absolute inset-0">
    <StageLabel show={stage(0)} label="AI Funnel Walkthrough" />

    {/* 1. Futuristic office holographic screens */}
    <Panel show={stage(0)} className="absolute top-16 left-6 w-40 p-3" x={-30}>
      <div className="flex items-center gap-2 mb-2">
        <div className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
        <span className="text-[10px] font-mono text-accent">
          HOLO-SCREEN 01
        </span>
      </div>
      <div className="space-y-1.5">
        <div className="h-1.5 w-full rounded-full bg-primary/30" />
        <div className="h-1.5 w-2/3 rounded-full bg-white/10" />
        <div className="h-1.5 w-3/4 rounded-full bg-white/10" />
      </div>
    </Panel>
    <Panel
      show={stage(2)}
      delay={0.2}
      className="absolute top-16 right-6 w-40 p-3"
      x={30}
    >
      <div className="flex items-center gap-2 mb-2">
        <div className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
        <span className="text-[10px] font-mono text-primary">
          HOLO-SCREEN 02
        </span>
      </div>
      <div className="grid grid-cols-3 gap-1">
        {Array.from({ length: 6 }).map((_, i) => (
          <motion.div
            key={i}
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
            className="h-6 rounded bg-primary/20"
          />
        ))}
      </div>
    </Panel>

    {/* 2. Sales funnel dashboard as floating 3D panels */}
    <Panel
      show={stage(10)}
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 p-4"
      y={20}
    >
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-semibold text-white flex items-center gap-1.5">
          <Filter className="h-3.5 w-3.5 text-primary" /> Funnel Dashboard
        </span>
        <span className="text-[10px] font-mono text-accent">v4.2</span>
      </div>
      <div className="space-y-2">
        {[
          { label: "Visitors", w: "100%", c: "bg-primary/40" },
          { label: "Leads", w: "65%", c: "bg-primary/60" },
          { label: "Qualified", w: "40%", c: "bg-accent/60" },
          { label: "Booked", w: "20%", c: "bg-accent" },
        ].map((row, i) => (
          <motion.div
            key={row.label}
            initial={{ width: 0 }}
            animate={{ width: row.w }}
            transition={{ duration: 0.8, delay: i * 0.15 }}
            className={`h-7 ${row.c} rounded-lg flex items-center px-2`}
          >
            <span className="text-[10px] font-mono text-black/80 font-semibold">
              {row.label}
            </span>
          </motion.div>
        ))}
      </div>
    </Panel>

    {/* 3. Landing page blocks assembled */}
    <Panel
      show={stage(20)}
      className="absolute bottom-20 left-6 w-44 p-3"
      x={-30}
    >
      <div className="text-[10px] font-mono text-primary mb-2 flex items-center gap-1.5">
        <Layout className="h-3 w-3" /> Landing Builder
      </div>
      <div className="space-y-1.5">
        {[0, 1, 2, 3].map((i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -20 }}
            animate={stage(20) ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: i * 0.2 }}
            className="h-4 rounded border border-primary/30 bg-primary/10 flex items-center px-1.5"
          >
            <div className="h-1 w-1.5 rounded-full bg-accent mr-1.5" />
            <div className="h-1 flex-1 rounded bg-white/20" />
          </motion.div>
        ))}
      </div>
    </Panel>

    {/* 4. Lead forms connect to CRM */}
    <div className="absolute top-1/2 left-[28%] -translate-y-1/2">
      <GlowLine show={stage(30)} className="w-40 -rotate-12" />
    </div>
    <Panel
      show={stage(30)}
      className="absolute top-1/2 right-[8%] -translate-y-[20%] w-36 p-3"
      x={30}
    >
      <div className="text-[10px] font-mono text-accent mb-2 flex items-center gap-1.5">
        <Database className="h-3 w-3" /> CRM Sync
      </div>
      {["Sarah", "Marcus", "Amara"].map((n, i) => (
        <motion.div
          key={n}
          initial={{ opacity: 0, y: -10 }}
          animate={stage(30) ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: i * 0.25 }}
          className="flex items-center gap-1.5 mb-1.5"
        >
          <div className="h-4 w-4 rounded-full bg-primary/40" />
          <span className="text-[10px] text-white/70">{n}</span>
          <CheckCircle2 className="h-3 w-3 text-accent ml-auto" />
        </motion.div>
      ))}
    </Panel>

    {/* 5. Workflow nodes light up */}
    <div className="absolute bottom-16 left-1/2 -translate-x-1/2 flex items-center gap-3">
      <Node
        show={stage(40)}
        icon={Workflow}
        label="Trigger"
        active={stage(40)}
      />
      <ArrowRight className="h-4 w-4 text-primary/50" />
      <Node
        show={stage(43)}
        delay={0.2}
        icon={Filter}
        label="Filter"
        active={stage(43)}
      />
      <ArrowRight className="h-4 w-4 text-primary/50" />
      <Node
        show={stage(46)}
        delay={0.4}
        icon={Mail}
        label="Email"
        active={stage(46)}
      />
      <ArrowRight className="h-4 w-4 text-primary/50" />
      <Node
        show={stage(49)}
        delay={0.6}
        icon={MessageSquare}
        label="SMS"
        active={stage(49)}
      />
    </div>

    {/* 6. Appointments flow into calendar */}
    <Panel
      show={stage(50)}
      className="absolute bottom-24 right-6 w-36 p-3"
      x={30}
    >
      <div className="text-[10px] font-mono text-primary mb-2 flex items-center gap-1.5">
        <Calendar className="h-3 w-3" /> Bookings
      </div>
      <div className="grid grid-cols-7 gap-0.5">
        {Array.from({ length: 14 }).map((_, i) => (
          <motion.div
            key={i}
            initial={{ scale: 0 }}
            animate={stage(50) ? { scale: 1 } : {}}
            transition={{ delay: i * 0.05 }}
            className={`h-3 rounded ${i % 3 === 0 ? "bg-primary" : "bg-white/10"}`}
          />
        ))}
      </div>
    </Panel>

    {/* 7. Email + SMS icons animate through funnel */}
    <AnimatePresence>
      {stage(60) && !stage(70) && (
        <>
          {[0, 1, 2].map((i) => (
            <motion.div
              key={`email-${i}`}
              initial={{ x: -100, y: 100, opacity: 0 }}
              animate={{ x: 200, y: -50, opacity: [0, 1, 0] }}
              transition={{ duration: 2, repeat: Infinity, delay: i * 0.6 }}
              className="absolute top-[40%] left-[20%] h-8 w-8 rounded-lg glass border border-primary/40 flex items-center justify-center"
            >
              <Mail className="h-4 w-4 text-primary" />
            </motion.div>
          ))}
          {[0, 1].map((i) => (
            <motion.div
              key={`sms-${i}`}
              initial={{ x: -50, y: 80, opacity: 0 }}
              animate={{ x: 250, y: -30, opacity: [0, 1, 0] }}
              transition={{
                duration: 2.2,
                repeat: Infinity,
                delay: i * 0.8 + 0.3,
              }}
              className="absolute top-[45%] left-[25%] h-8 w-8 rounded-lg glass border border-accent/40 flex items-center justify-center"
            >
              <MessageSquare className="h-4 w-4 text-accent" />
            </motion.div>
          ))}
        </>
      )}
    </AnimatePresence>

    {/* 8. Analytics dashboards — increasing conversions */}
    <Panel
      show={stage(70)}
      className="absolute top-20 left-1/2 -translate-x-1/2 w-64 p-4"
      y={-20}
    >
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-semibold text-white flex items-center gap-1.5">
          <BarChart3 className="h-3.5 w-3.5 text-primary" /> Conversions
        </span>
        <motion.span
          initial={{ opacity: 0 }}
          animate={stage(70) ? { opacity: 1 } : {}}
          className="text-[10px] font-mono text-accent flex items-center gap-1"
        >
          <TrendingUp className="h-3 w-3" /> +247%
        </motion.span>
      </div>
      <div className="flex items-end gap-1.5 h-16">
        {[20, 35, 30, 50, 45, 65, 60, 80, 75, 95].map((h, i) => (
          <motion.div
            key={i}
            initial={{ height: 0 }}
            animate={stage(70) ? { height: `${h}%` } : {}}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            className="flex-1 rounded-t bg-gradient-to-t from-primary/40 to-accent"
          />
        ))}
      </div>
    </Panel>

    {/* 9. AI optimizes funnel */}
    <AnimatePresence>
      {stage(80) && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            className="h-32 w-32 rounded-full border-2 border-dashed border-primary/40"
          />
          <motion.div
            animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute h-20 w-20 rounded-full bg-primary/20 blur-xl flex items-center justify-center"
          >
            <Sparkles className="h-8 w-8 text-primary" />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>

    {/* 10. Rotating holographic AI funnel with particles */}
    <AnimatePresence>
      {stage(90) && (
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <motion.div
            animate={{ rotateY: 360 }}
            transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
            style={{ transformStyle: "preserve-3d" }}
            className="relative"
          >
            <div
              className="h-28 w-28 border-t-2 border-primary/60 border-r-2 border-transparent rounded-full"
              style={{ transform: "rotateX(70deg)" }}
            />
            <div
              className="h-20 w-20 border-t-2 border-accent/60 border-r-2 border-transparent rounded-full absolute top-4 left-4"
              style={{ transform: "rotateX(70deg)" }}
            />
            <div
              className="h-12 w-12 border-t-2 border-primary/80 border-r-2 border-transparent rounded-full absolute top-8 left-8"
              style={{ transform: "rotateX(70deg)" }}
            />
          </motion.div>
          {Array.from({ length: 12 }).map((_, i) => (
            <motion.div
              key={i}
              animate={{ y: [0, -30, 0], opacity: [0, 1, 0] }}
              transition={{ duration: 2, repeat: Infinity, delay: i * 0.15 }}
              className="absolute h-1 w-1 rounded-full bg-accent"
              style={{ left: `${20 + i * 5}%`, top: `${30 + (i % 3) * 20}%` }}
            />
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  </div>
);

/* ---------- Scene 2: CRM Automation Demo ---------- */
const CrmScene = ({
  progress,
  stage,
}: {
  progress: number;
  stage: (p: number) => boolean;
}) => (
  <div className="absolute inset-0">
    <StageLabel show={stage(0)} label="CRM Automation Demo" />

    {/* 1. Floating CRM dashboard */}
    <Panel
      show={stage(0)}
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 p-5"
      y={20}
    >
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm font-semibold text-white flex items-center gap-2">
          <Database className="h-4 w-4 text-primary" /> CRM Dashboard
        </span>
        <span className="text-[10px] font-mono text-accent glass px-2 py-0.5 rounded-full border border-accent/30">
          LIVE
        </span>
      </div>
      {/* 2. New leads appear */}
      <div className="space-y-2">
        {[
          { n: "New Lead — Jordan K.", t: 0 },
          { n: "New Lead — Priya S.", t: 5 },
          { n: "New Lead — David L.", t: 10 },
        ].map((lead, i) => (
          <motion.div
            key={lead.n}
            initial={{ opacity: 0, x: -40 }}
            animate={stage(lead.t) ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-2 p-2 rounded-lg glass border border-primary/20"
          >
            <UserPlus className="h-3.5 w-3.5 text-accent" />
            <span className="text-[11px] text-white/80 flex-1">{lead.n}</span>
            <motion.span
              initial={{ opacity: 0 }}
              animate={stage(lead.t + 2) ? { opacity: 1 } : {}}
              className="text-[9px] font-mono text-accent"
            >
              added
            </motion.span>
          </motion.div>
        ))}
      </div>
    </Panel>

    {/* 3. Contact cards move through pipeline stages */}
    <div className="absolute bottom-20 left-1/2 -translate-x-1/2 w-[90%] max-w-md">
      <div className="flex items-center justify-between mb-2 px-2">
        {["New", "Contacted", "Qualified", "Won"].map((s, i) => (
          <motion.div
            key={s}
            initial={{ opacity: 0.3 }}
            animate={stage(15 + i * 8) ? { opacity: 1 } : {}}
            className="flex flex-col items-center gap-1"
          >
            <span className="text-[9px] font-mono uppercase tracking-wider text-muted-foreground">
              {s}
            </span>
            <div
              className={`h-1 w-12 rounded-full transition-all ${stage(15 + i * 8) ? "bg-primary" : "bg-white/10"}`}
            />
          </motion.div>
        ))}
      </div>
      <div className="relative h-10">
        <motion.div
          animate={stage(15) ? { x: ["0%", "25%", "50%", "75%"] } : {}}
          transition={{
            duration: 8,
            times: [0, 0.33, 0.66, 1],
            repeat: stage(15) && !stage(45) ? Infinity : 0,
          }}
          className="absolute top-0 h-10 w-16 rounded-lg glass border border-accent/40 flex items-center justify-center"
        >
          <span className="text-[9px] font-mono text-accent">Contact</span>
        </motion.div>
      </div>
    </div>

    {/* 4. AI tags & organizes */}
    <Panel show={stage(35)} className="absolute top-16 right-6 w-36 p-3" x={30}>
      <div className="text-[10px] font-mono text-primary mb-2 flex items-center gap-1.5">
        <Tag className="h-3 w-3" /> AI Tags
      </div>
      <div className="flex flex-wrap gap-1">
        {["VIP", "Hot Lead", "Enterprise", "Follow-up"].map((tag, i) => (
          <motion.span
            key={tag}
            initial={{ scale: 0 }}
            animate={stage(35) ? { scale: 1 } : {}}
            transition={{ delay: i * 0.15 }}
            className="text-[9px] font-mono glass px-2 py-0.5 rounded-full border border-primary/30 text-accent"
          >
            {tag}
          </motion.span>
        ))}
      </div>
    </Panel>

    {/* 5 & 6. Email + SMS automation triggers */}
    <div className="absolute top-20 left-6 flex flex-col gap-2">
      <AnimatePresence>
        {stage(45) && (
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="glass-card rounded-xl p-2.5 border border-primary/30 flex items-center gap-2 w-40"
          >
            <Mail className="h-4 w-4 text-primary" />
            <span className="text-[10px] text-white/80">
              Email sequence sent
            </span>
            <CheckCircle2 className="h-3 w-3 text-accent ml-auto" />
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {stage(52) && (
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="glass-card rounded-xl p-2.5 border border-accent/30 flex items-center gap-2 w-40"
          >
            <MessageSquare className="h-4 w-4 text-accent" />
            <span className="text-[10px] text-white/80">SMS reminder sent</span>
            <CheckCircle2 className="h-3 w-3 text-accent ml-auto" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>

    {/* 7. Tasks assigned automatically */}
    <Panel
      show={stage(58)}
      className="absolute bottom-40 left-6 w-36 p-3"
      x={-30}
    >
      <div className="text-[10px] font-mono text-primary mb-2 flex items-center gap-1.5">
        <CheckCircle2 className="h-3 w-3" /> Auto-Tasks
      </div>
      {["Call back", "Send proposal", "Schedule demo"].map((task, i) => (
        <motion.div
          key={task}
          initial={{ opacity: 0 }}
          animate={stage(58) ? { opacity: 1 } : {}}
          transition={{ delay: i * 0.2 }}
          className="flex items-center gap-1.5 mb-1"
        >
          <div className="h-3 w-3 rounded border border-primary/40" />
          <span className="text-[10px] text-white/70">{task}</span>
        </motion.div>
      ))}
    </Panel>

    {/* 8. Calendar appointments sync */}
    <Panel
      show={stage(65)}
      className="absolute bottom-40 right-6 w-36 p-3"
      x={30}
    >
      <div className="text-[10px] font-mono text-accent mb-2 flex items-center gap-1.5">
        <Calendar className="h-3 w-3" /> Calendar Sync
      </div>
      <div className="grid grid-cols-7 gap-0.5">
        {Array.from({ length: 14 }).map((_, i) => (
          <motion.div
            key={i}
            initial={{ scale: 0 }}
            animate={stage(65) ? { scale: 1 } : {}}
            transition={{ delay: i * 0.04 }}
            className={`h-3 rounded ${i % 4 === 0 ? "bg-accent" : "bg-white/10"}`}
          />
        ))}
      </div>
    </Panel>

    {/* 9. Pipeline values increase with animated charts */}
    <Panel
      show={stage(72)}
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[30%] w-64 p-4"
      y={-20}
    >
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-semibold text-white flex items-center gap-1.5">
          <TrendingUp className="h-3.5 w-3.5 text-primary" /> Pipeline Value
        </span>
        <motion.span
          animate={stage(72) ? { opacity: [0.5, 1] } : {}}
          className="text-[10px] font-mono text-accent"
        >
          $1.2M
        </motion.span>
      </div>
      <motion.svg viewBox="0 0 200 60" className="w-full h-12">
        <motion.path
          d="M0,50 L30,45 L60,35 L90,38 L120,20 L150,15 L180,5 L200,8"
          fill="none"
          stroke="rgb(201,168,76)"
          strokeWidth="2"
          initial={{ pathLength: 0 }}
          animate={stage(72) ? { pathLength: 1 } : {}}
          transition={{ duration: 1.5 }}
        />
      </motion.svg>
    </Panel>

    {/* 10. Glowing AI CRM dashboard — healthy workflow */}
    <AnimatePresence>
      {stage(85) && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
        >
          <motion.div
            animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0.8, 0.4] }}
            transition={{ duration: 2.5, repeat: Infinity }}
            className="h-40 w-40 rounded-full bg-primary/15 blur-2xl flex items-center justify-center"
          >
            <Database className="h-12 w-12 text-primary" />
          </motion.div>
          <div className="absolute glass-card rounded-full px-4 py-1.5 text-[11px] font-mono text-accent border border-accent/40">
            Automated & Healthy
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  </div>
);

/* ---------- Scene 3: AI Chatbot in Action ---------- */
const ChatbotScene = ({
  progress,
  stage,
}: {
  progress: number;
  stage: (p: number) => boolean;
}) => (
  <div className="absolute inset-0">
    <StageLabel show={stage(0)} label="AI Chatbot in Action" />

    {/* 1. Glowing AI chatbot avatar */}
    <div className="absolute top-16 left-1/2 -translate-x-1/2">
      <AnimatePresence>
        {stage(0) && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="relative"
          >
            <motion.div
              animate={{ scale: [1, 1.15, 1], opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="h-20 w-20 rounded-full bg-primary/20 blur-xl flex items-center justify-center"
            />
            <div className="absolute inset-0 h-20 w-20 rounded-full glass border-2 border-primary/50 flex items-center justify-center">
              <Bot className="h-10 w-10 text-primary" />
            </div>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
              className="absolute -inset-2 rounded-full border border-dashed border-accent/40"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>

    {/* 2. Live chat window opens */}
    <Panel
      show={stage(8)}
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 p-4"
      y={20}
    >
      <div className="flex items-center gap-2 mb-3 pb-3 border-b border-white/10">
        <div className="h-7 w-7 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
          <Bot className="h-4 w-4 text-black" />
        </div>
        <div>
          <div className="text-xs font-semibold text-white">
            Nova AI Assistant
          </div>
          <div className="flex items-center gap-1 text-[9px] text-accent">
            <span className="h-1 w-1 rounded-full bg-accent animate-pulse" />{" "}
            Online
          </div>
        </div>
      </div>
      <div className="space-y-2 min-h-[120px]">
        {/* 3. Chatbot responds with message animations */}
        <AnimatePresence>
          {stage(12) && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex justify-start"
            >
              <div className="max-w-[75%] glass rounded-2xl rounded-tl-sm px-3 py-2 text-[11px] text-white/90">
                Hi! How can I help you today?
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        <AnimatePresence>
          {stage(20) && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex justify-end"
            >
              <div className="max-w-[75%] btn-gradient rounded-2xl rounded-tr-sm px-3 py-2 text-[11px] text-black">
                I'd like to book a consultation.
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        <AnimatePresence>
          {stage(28) && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex justify-start"
            >
              <div className="max-w-[75%] glass rounded-2xl rounded-tl-sm px-3 py-2 text-[11px] text-white/90">
                Sure! I have Thursday at 2 PM or Friday at 11 AM. Which works?
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        {/* Typing indicator */}
        <AnimatePresence>
          {stage(35) && !stage(40) && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex justify-start"
            >
              <div className="glass rounded-2xl rounded-tl-sm px-3 py-2.5 flex gap-1">
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    animate={{ y: [0, -4, 0] }}
                    transition={{
                      duration: 0.6,
                      repeat: Infinity,
                      delay: i * 0.15,
                    }}
                    className="h-1.5 w-1.5 rounded-full bg-primary"
                  />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        <AnimatePresence>
          {stage(40) && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex justify-end"
            >
              <div className="max-w-[75%] btn-gradient rounded-2xl rounded-tr-sm px-3 py-2 text-[11px] text-black">
                Thursday 2 PM works!
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Panel>

    {/* 4. Customer info flows into CRM */}
    <div className="absolute top-1/2 right-[6%] -translate-y-1/2">
      <GlowLine show={stage(30)} className="w-24 rotate-12" />
    </div>
    <Panel
      show={stage(30)}
      className="absolute top-1/2 right-[2%] -translate-y-[60%] w-32 p-3"
      x={30}
    >
      <div className="text-[10px] font-mono text-accent mb-2 flex items-center gap-1.5">
        <Database className="h-3 w-3" /> CRM
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={stage(30) ? { opacity: 1 } : {}}
        className="flex items-center gap-1.5 mb-1"
      >
        <div className="h-4 w-4 rounded-full bg-primary/40" />
        <span className="text-[10px] text-white/70">Visitor</span>
        <CheckCircle2 className="h-3 w-3 text-accent ml-auto" />
      </motion.div>
    </Panel>

    {/* 5. Chatbot schedules a meeting on calendar */}
    <Panel
      show={stage(42)}
      className="absolute bottom-20 right-6 w-36 p-3"
      x={30}
    >
      <div className="text-[10px] font-mono text-primary mb-2 flex items-center gap-1.5">
        <Calendar className="h-3 w-3" /> Meeting Booked
      </div>
      <motion.div
        initial={{ scale: 0.9 }}
        animate={stage(42) ? { scale: 1 } : {}}
        className="glass rounded-lg p-2 border border-accent/40"
      >
        <div className="text-[10px] font-semibold text-accent">
          Thu, 2:00 PM
        </div>
        <div className="text-[9px] text-muted-foreground mt-0.5">
          30-min consultation
        </div>
      </motion.div>
    </Panel>

    {/* 6. Email confirmation + SMS reminder triggered */}
    <div className="absolute bottom-20 left-6 flex flex-col gap-2">
      <AnimatePresence>
        {stage(50) && (
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="glass-card rounded-xl p-2.5 border border-primary/30 flex items-center gap-2 w-40"
          >
            <Mail className="h-4 w-4 text-primary" />
            <span className="text-[10px] text-white/80">Confirmation sent</span>
            <CheckCircle2 className="h-3 w-3 text-accent ml-auto" />
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {stage(56) && (
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="glass-card rounded-xl p-2.5 border border-accent/30 flex items-center gap-2 w-40"
          >
            <Phone className="h-4 w-4 text-accent" />
            <span className="text-[10px] text-white/80">SMS reminder set</span>
            <CheckCircle2 className="h-3 w-3 text-accent ml-auto" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>

    {/* 7. AI answers multiple questions simultaneously */}
    <div className="absolute top-16 left-6 flex flex-col gap-1.5">
      {["Chat 1", "Chat 2", "Chat 3"].map((c, i) => (
        <motion.div
          key={c}
          initial={{ opacity: 0, x: -20 }}
          animate={stage(62) ? { opacity: 1, x: 0 } : {}}
          transition={{ delay: i * 0.2 }}
          className="glass rounded-lg px-2.5 py-1.5 border border-primary/20 flex items-center gap-1.5"
        >
          <div className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
          <span className="text-[9px] font-mono text-white/70">{c}</span>
          <span className="text-[9px] font-mono text-accent ml-auto">
            active
          </span>
        </motion.div>
      ))}
    </div>

    {/* 8. Business analytics update in real time */}
    <Panel
      show={stage(72)}
      className="absolute bottom-40 left-1/2 -translate-x-1/2 w-56 p-3"
      y={20}
    >
      <div className="flex items-center justify-between mb-2">
        <span className="text-[11px] font-semibold text-white flex items-center gap-1.5">
          <BarChart3 className="h-3.5 w-3.5 text-primary" /> Live Analytics
        </span>
        <Zap className="h-3.5 w-3.5 text-accent" />
      </div>
      <div className="grid grid-cols-3 gap-2 text-center">
        {[
          { v: "847", l: "Chats", t: 72 },
          { v: "92%", l: "Resolved", t: 75 },
          { v: "3.2s", l: "Avg Reply", t: 78 },
        ].map((stat) => (
          <motion.div
            key={stat.l}
            initial={{ opacity: 0, y: 10 }}
            animate={stage(stat.t) ? { opacity: 1, y: 0 } : {}}
            className="glass rounded-lg p-1.5"
          >
            <div className="text-sm font-bold text-accent">{stat.v}</div>
            <div className="text-[8px] font-mono text-muted-foreground uppercase">
              {stat.l}
            </div>
          </motion.div>
        ))}
      </div>
    </Panel>

    {/* 9 & 10. Futuristic AI assistant with holographic data + automation network */}
    <AnimatePresence>
      {stage(85) && (
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            className="h-48 w-48 rounded-full border border-dashed border-primary/30"
          />
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
            className="absolute h-36 w-36 rounded-full border border-dashed border-accent/30"
          />
          <motion.div
            animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute h-24 w-24 rounded-full bg-primary/20 blur-xl flex items-center justify-center"
          >
            <Bot className="h-12 w-12 text-primary" />
          </motion.div>
          {Array.from({ length: 16 }).map((_, i) => (
            <motion.div
              key={i}
              animate={{ y: [0, -20, 0], opacity: [0, 1, 0] }}
              transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.12 }}
              className="absolute h-1 w-1 rounded-full bg-accent"
              style={{
                left: `${15 + ((i * 5) % 70)}%`,
                top: `${25 + (i % 4) * 18}%`,
              }}
            />
          ))}
          {/* Automation lines */}
          {[0, 1, 2, 3, 4].map((i) => (
            <motion.div
              key={i}
              animate={{ opacity: [0, 0.8, 0], scaleX: [0, 1, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.3 }}
              className="absolute h-px bg-gradient-to-r from-transparent via-primary to-transparent"
              style={{ width: "60%", top: `${30 + i * 12}%`, left: "20%" }}
            />
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  </div>
);
