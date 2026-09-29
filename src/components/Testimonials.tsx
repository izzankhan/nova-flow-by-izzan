import { motion, AnimatePresence } from "framer-motion";
import { Star, Quote, X } from "lucide-react";
import { SectionHeader } from "./SectionHeader";
import { useState } from "react";
import type { SceneType } from "./AnimatedVideoScene";
import { useSpotlight } from "@/hooks/useSpotlight";

const testimonials = [
  {
    name: "Sarah Chen",
    role: "CEO, TechFlow",
    text: "Nova Automate transformed our entire sales process. We went from 120 leads a month to nearly 1,000 — and the quality improved too. Their automation runs our marketing while we focus on product.",
    rating: 5,
    avatar:
      "https://vibe.filesafe.space/1786109541213169282/assets/131e2b52-e1e8-41c3-a96c-b0f1967d910b.png",
  },
  {
    name: "Marcus Reid",
    role: "Founder, LuxRealty",
    text: "The AI chatbot alone booked us 3x more showings. Their CRM automation means no lead ever falls through the cracks. This is the future of real estate marketing.",
    rating: 5,
    avatar:
      "https://vibe.filesafe.space/1786109541213169282/assets/73aab8a3-fb3c-4c6e-971d-23b3c8d90bb1.png",
  },
  {
    name: "Dr. Amara Patel",
    role: "Director, MedCare",
    text: "Appointment automation cut our no-show rate by 68%. Patients love the SMS reminders. Nova Automate understood healthcare compliance and delivered flawlessly.",
    rating: 5,
    avatar:
      "https://vibe.filesafe.space/1786109541213169282/assets/2e8af3d7-f21f-49eb-820b-8ee4120f7bce.png",
  },
  {
    name: "James Carter",
    role: "CMO, FitChain",
    text: "Our email + SMS automation now drives 40% of repeat revenue. The AI subject line optimization alone paid for the entire system in the first month.",
    rating: 5,
    avatar:
      "https://vibe.filesafe.space/1786109541213169282/assets/05db9372-ee26-4973-87dc-29097852e564.png",
  },
];

const TestimonialCard = ({
  t,
  i,
}: {
  t: (typeof testimonials)[number];
  i: number;
}) => {
  const { ref, onMouseMove, onMouseLeave } = useSpotlight<HTMLDivElement>();
  return (
    <motion.div
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: i * 0.1 }}
      whileHover={{ y: -6 }}
      className="glass-card neon-trace spotlight rounded-3xl p-8 relative overflow-hidden"
    >
      <Quote className="absolute -top-2 -right-2 h-20 w-20 text-primary/5" />
      <div className="flex gap-1 mb-4">
        {Array.from({ length: t.rating }).map((_, j) => (
          <Star key={j} className="h-4 w-4 fill-accent text-accent" />
        ))}
      </div>
      <p className="text-sm text-muted-foreground leading-relaxed mb-6 relative">
        {t.text}
      </p>
      <div className="flex items-center gap-3">
        <img
          src={t.avatar}
          alt={t.name}
          className="h-12 w-12 rounded-full object-cover"
          loading="lazy"
        />
        <div>
          <div className="text-sm font-semibold">{t.name}</div>
          <div className="text-xs text-muted-foreground">{t.role}</div>
        </div>
      </div>
    </motion.div>
  );
};

export const Testimonials = () => {
  return (
    <section className="relative py-8">
      <div className="absolute inset-0 grid-bg opacity-20" />
      <div className="container relative">
        <SectionHeader
          eyebrow="Testimonials"
          title={
            <>
              What Our <span className="text-gradient">Clients Say</span>
            </>
          }
          description="Real words from real founders who trusted us to automate their growth."
        />
        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          {testimonials.map((t, i) => (
            <TestimonialCard key={t.name} t={t} i={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

const videoTestimonials: {
  name: string;
  company: string;
  image: string;
  sceneType: SceneType;
}[] = [
  {
    name: "Sarah Chen",
    company: "TechFlow",
    image:
      "https://vibe.filesafe.space/1786109541213169282/assets/131e2b52-e1e8-41c3-a96c-b0f1967d910b.png",
    sceneType: "funnel",
  },
  {
    name: "Marcus Reid",
    company: "LuxRealty",
    image:
      "https://vibe.filesafe.space/1786109541213169282/assets/73aab8a3-fb3c-4c6e-971d-23b3c8d90bb1.png",
    sceneType: "crm",
  },
  {
    name: "Amara Patel",
    company: "MedCare",
    image:
      "https://vibe.filesafe.space/1786109541213169282/assets/2e8af3d7-f21f-49eb-820b-8ee4120f7bce.png",
    sceneType: "chatbot",
  },
];

import { VideoModal3D } from "./VideoModal3D";

const VideoTestimonialCard = ({
  v,
  i,
  onClick,
}: {
  v: (typeof videoTestimonials)[number];
  i: number;
  onClick: () => void;
}) => {
  const { ref, onMouseMove, onMouseLeave } = useSpotlight<HTMLDivElement>();
  return (
    <motion.div
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: i * 0.1 }}
      className="group relative overflow-hidden rounded-2xl glass-card neon-trace spotlight cursor-pointer border border-primary/20 hover:border-primary/50 transition-all"
      onClick={onClick}
    >
      <div className="relative h-72">
        <img
          src={v.image}
          alt={v.name}
          className="h-full w-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="h-14 w-14 rounded-full btn-gradient flex items-center justify-center shadow-[0_0_30px_rgba(201,168,76,0.5)]">
            <div className="h-0 w-0 border-y-7 border-y-transparent border-l-[12px] border-l-black ml-1" />
          </div>
        </div>
        <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
          <div>
            <div className="text-base font-semibold text-white">{v.name}</div>
            <div className="text-xs text-muted-foreground">{v.company}</div>
          </div>
          <span className="text-[10px] font-mono glass px-2.5 py-1 rounded-full text-accent border border-primary/30">
            Testimonial
          </span>
        </div>
      </div>
    </motion.div>
  );
};

export const VideoTestimonials = () => {
  const [selectedVideo, setSelectedVideo] = useState<{
    title: string;
    image: string;
    sceneType: SceneType;
  } | null>(null);

  return (
    <section className="relative py-8">
      <div className="container">
        <SectionHeader
          eyebrow="Video Testimonials"
          title={
            <>
              Hear It <span className="text-gradient">From Them</span>
            </>
          }
          description="Watch our clients share their transformation stories in their own words."
        />
        <div className="mt-8 grid gap-6 sm:grid-cols-3">
          {videoTestimonials.map((v, i) => (
            <VideoTestimonialCard
              key={v.name}
              v={v}
              i={i}
              onClick={() =>
                setSelectedVideo({
                  title: `${v.name} — ${v.company}`,
                  image: v.image,
                  sceneType: v.sceneType,
                })
              }
            />
          ))}
        </div>
      </div>

      <VideoModal3D
        isOpen={!!selectedVideo}
        onClose={() => setSelectedVideo(null)}
        videoTitle={selectedVideo?.title || ""}
        posterImage={selectedVideo?.image}
        sceneType={selectedVideo?.sceneType}
      />
    </section>
  );
};
