import { motion } from "framer-motion";
import {
  Play,
  Sparkles,
  Send,
  Bot,
  MonitorPlay,
  Layers,
  Cpu,
} from "lucide-react";
import { SectionHeader } from "./SectionHeader";
import { useState } from "react";
import { VideoModal3D } from "./VideoModal3D";
import type { SceneType } from "./AnimatedVideoScene";

export const VideoShowcase = () => {
  const [selectedVideo, setSelectedVideo] = useState<{
    title: string;
    image: string;
    sceneType: SceneType;
  } | null>(null);

  const videos: {
    title: string;
    duration: string;
    image: string;
    tag: string;
    sceneType: SceneType;
  }[] = [
    {
      title: "AI Funnel Walkthrough",
      duration: "1:15",
      image:
        "https://vibe.filesafe.space/1786109541213169282/assets/e12be3eb-ce0f-4e07-8895-8961b62d75bb.png",
      tag: "Funnel Engine v4.2",
      sceneType: "funnel",
    },
    {
      title: "CRM Automation Demo",
      duration: "1:15",
      image:
        "https://vibe.filesafe.space/1786109541213169282/assets/64fddc82-953e-45ef-b115-be03444b86e2.png",
      tag: "Live Pipeline Neural",
      sceneType: "crm",
    },
    {
      title: "AI Chatbot in Action",
      duration: "1:15",
      image:
        "https://vibe.filesafe.space/1786109541213169282/assets/3f702b70-5928-43cd-8353-31e3acf0edc7.png",
      tag: "Conversational NLP",
      sceneType: "chatbot",
    },
  ];

  return (
    <section className="relative py-8">
      <div className="container">
        <SectionHeader
          eyebrow="Video Showcase"
          title={
            <>
              See the <span className="text-gradient">Systems in Motion</span>
            </>
          }
          description="Watch how our AI systems capture, nurture, and convert leads in real time."
        />
        <div className="mt-8 grid gap-6 lg:grid-cols-3">
          {videos.map((v, i) => (
            <motion.div
              key={v.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group relative overflow-hidden rounded-2xl glass-card cursor-pointer border border-primary/20 hover:border-primary/50 transition-all"
              onClick={() =>
                setSelectedVideo({
                  title: v.title,
                  image: v.image,
                  sceneType: v.sceneType,
                })
              }
            >
              <div className="relative h-56 overflow-hidden">
                <img
                  src={v.image}
                  alt={v.title}
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
                <div className="absolute top-3 left-3 glass px-2.5 py-1 rounded-full text-[10px] font-mono text-primary border border-primary/30 flex items-center gap-1.5">
                  <Cpu className="h-3 w-3" /> {v.tag}
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="h-14 w-14 rounded-full btn-gradient flex items-center justify-center shadow-[0_0_30px_rgba(201,168,76,0.5)]">
                    <Play className="h-6 w-6 text-black fill-black ml-0.5" />
                  </div>
                </div>
                <div className="absolute bottom-3 right-3 glass rounded-full px-2.5 py-1 text-xs font-mono border border-white/10">
                  {v.duration}
                </div>
              </div>
              <div className="p-4 flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-white">{v.title}</h3>
                  <p className="text-xs text-muted-foreground mt-0.5 flex items-center gap-1">
                    <MonitorPlay className="h-3 w-3 text-accent" /> Click to
                    play full video
                  </p>
                </div>
                <div className="h-8 w-8 rounded-full glass flex items-center justify-center text-primary">
                  <Layers className="h-4 w-4" />
                </div>
              </div>
            </motion.div>
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

export const AIDemo = () => {
  const [messages, setMessages] = useState([
    {
      role: "bot",
      text: "Hi! I'm Nova Automate. Ask me anything about automating your business.",
    },
  ]);
  const [input, setInput] = useState("");

  const send = () => {
    if (!input.trim()) return;
    setMessages((m) => [...m, { role: "user", text: input }]);
    setInput("");
    setTimeout(() => {
      setMessages((m) => [
        ...m,
        {
          role: "bot",
          text: "Great question! Our AI systems can automate that entire process — from lead capture to follow-up. Want to see a live demo? Book a strategy call and we'll show you exactly how.",
        },
      ]);
    }, 800);
  };

  return (
    <section className="relative py-8">
      <div className="container">
        <SectionHeader
          eyebrow="AI Demo"
          title={
            <>
              Talk to <span className="text-gradient">Our AI Assistant</span>
            </>
          }
          description="Experience the same conversational AI we deploy for our clients — live, right here."
        />
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-8 mx-auto max-w-2xl glass-card rounded-3xl p-6"
        >
          <div className="flex items-center gap-3 mb-4 pb-4 border-b border-border">
            <div className="h-10 w-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
              <Bot className="h-5 w-5 text-white" />
            </div>
            <div>
              <div className="text-sm font-semibold">
                Nova Automate Assistant
              </div>
              <div className="flex items-center gap-1.5 text-xs text-accent">
                <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />{" "}
                Online
              </div>
            </div>
          </div>
          <div className="space-y-3 min-h-[200px] max-h-[300px] overflow-y-auto">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm ${m.role === "user" ? "btn-gradient text-white" : "glass text-foreground"}`}
                >
                  {m.text}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 flex gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && send()}
              placeholder="Ask about automation..."
              className="flex-1 glass rounded-full px-5 py-3 text-sm outline-none focus:border-primary/50"
            />
            <button
              onClick={send}
              className="btn-gradient rounded-full p-3 text-white"
            >
              <Send className="h-4 w-4" />
            </button>
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            {[
              "How do you generate leads?",
              "What's your pricing?",
              "Can you automate my CRM?",
            ].map((q) => (
              <button
                key={q}
                onClick={() => {
                  setInput(q);
                  setMessages((m) => [...m, { role: "user", text: q }]);
                  setTimeout(() => {
                    setMessages((m) => [
                      ...m,
                      {
                        role: "bot",
                        text: "Great question! Our AI systems can automate that entire process — from lead capture to follow-up. Want to see a live demo? Book a strategy call and we'll show you exactly how.",
                      },
                    ]);
                  }, 800);
                }}
                className="glass rounded-full px-3 py-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
              >
                <Sparkles className="inline h-3 w-3 mr-1 text-primary" />
                {q}
              </button>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
