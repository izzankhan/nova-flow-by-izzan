import { useRef, useEffect } from "react";
import type { SceneType } from "./AnimatedVideoScene";

// Narration cues synced to scene timeline (progress %, text)
// 75s total → 10 cues at 0,10,20,...,90 (each ~7.5s apart)
const narrationScripts: Record<SceneType, { at: number; text: string }[]> = {
  funnel: [
    {
      at: 0,
      text: "Welcome. Let's walk through how our AI funnel engine works.",
    },
    {
      at: 10,
      text: "We enter a futuristic command center with holographic screens monitoring your entire business.",
    },
    {
      at: 20,
      text: "Your sales funnel dashboard appears as floating three-dimensional panels.",
    },
    {
      at: 30,
      text: "Landing page blocks are assembled automatically by AI, no coding required.",
    },
    {
      at: 40,
      text: "Lead forms connect directly to your CRM with glowing data lines in real time.",
    },
    {
      at: 50,
      text: "Automation workflow nodes light up one by one — trigger, filter, email, and SMS.",
    },
    {
      at: 60,
      text: "Appointment bookings flow seamlessly into your calendar, fully automated.",
    },
    {
      at: 70,
      text: "Email and SMS campaigns animate through the funnel, nurturing every lead.",
    },
    {
      at: 80,
      text: "Analytics dashboards display increasing conversions as the system optimizes itself.",
    },
    {
      at: 90,
      text: "AI optimizes the funnel automatically. Your business now runs on autopilot.",
    },
  ],
  crm: [
    { at: 0, text: "Now let's see CRM automation in action." },
    {
      at: 10,
      text: "We zoom into a floating CRM dashboard — your central command center.",
    },
    {
      at: 20,
      text: "New leads appear automatically the moment they're captured.",
    },
    {
      at: 30,
      text: "Contact cards move through your sales pipeline stages automatically.",
    },
    {
      at: 40,
      text: "AI tags and organizes every contact intelligently, no manual work needed.",
    },
    {
      at: 50,
      text: "Email automation triggers instantly, reaching leads at the perfect moment.",
    },
    {
      at: 60,
      text: "SMS automation sends reminders in real time, keeping appointments full.",
    },
    {
      at: 70,
      text: "Tasks are assigned automatically to your team, and calendar appointments sync seamlessly.",
    },
    {
      at: 80,
      text: "Your pipeline value increases with every automated interaction.",
    },
    {
      at: 90,
      text: "A healthy, fully automated business workflow — running without you lifting a finger.",
    },
  ],
  chatbot: [
    { at: 0, text: "Finally, watch our AI chatbot in action." },
    {
      at: 10,
      text: "A glowing AI chatbot avatar appears in a futuristic interface, ready to help.",
    },
    { at: 20, text: "A visitor opens the live chat window." },
    {
      at: 30,
      text: "The chatbot responds instantly with smooth, natural message animations.",
    },
    {
      at: 40,
      text: "Customer information flows automatically into your CRM, captured and organized.",
    },
    {
      at: 50,
      text: "The chatbot schedules a meeting directly on your calendar.",
    },
    {
      at: 60,
      text: "Email confirmation and SMS reminders are triggered instantly.",
    },
    {
      at: 70,
      text: "AI answers multiple customer questions simultaneously, twenty-four seven.",
    },
    {
      at: 80,
      text: "Business analytics update in real time as every conversation converts.",
    },
    {
      at: 90,
      text: "Your AI assistant works around the clock, surrounded by holographic data and automation networks.",
    },
  ],
};

let cachedVoice: SpeechSynthesisVoice | null = null;

const pickVoice = (): SpeechSynthesisVoice | null => {
  if (cachedVoice) return cachedVoice;
  if (typeof window === "undefined" || !window.speechSynthesis) return null;
  const voices = window.speechSynthesis.getVoices();
  if (!voices.length) return null;
  // Prefer a natural English voice
  const preferred =
    voices.find((v) =>
      /Google US English|Samantha|Daniel|Alex|Microsoft.*(Aria|Guy|Jenny)/i.test(
        v.name,
      ),
    ) ||
    voices.find(
      (v) => v.lang.startsWith("en") && v.name.toLowerCase().includes("female"),
    ) ||
    voices.find((v) => v.lang.startsWith("en")) ||
    voices[0];
  cachedVoice = preferred;
  return preferred;
};

export const useVideoNarration = (
  sceneType: SceneType,
  isPlaying: boolean,
  progress: number,
  isMuted: boolean,
) => {
  const spokenRef = useRef<Set<number>>(new Set());
  const prevProgressRef = useRef(0);

  // Warm up voices (some browsers load async)
  useEffect(() => {
    if (typeof window !== "undefined" && window.speechSynthesis) {
      window.speechSynthesis.getVoices();
      window.speechSynthesis.onvoiceschanged = () => pickVoice();
    }
    return () => {
      if (typeof window !== "undefined" && window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  // Reset spoken cues when scene changes
  useEffect(() => {
    spokenRef.current = new Set();
    prevProgressRef.current = 0;
    if (typeof window !== "undefined" && window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
  }, [sceneType]);

  // Stop narration when paused or muted
  useEffect(() => {
    if (!isPlaying || isMuted) {
      if (typeof window !== "undefined" && window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    }
  }, [isPlaying, isMuted]);

  // If user seeks backward, clear cues that are now ahead of progress
  useEffect(() => {
    if (progress < prevProgressRef.current - 5) {
      const script = narrationScripts[sceneType];
      const stillValid = new Set<number>();
      for (const cue of script) {
        if (cue.at <= progress) stillValid.add(cue.at);
      }
      spokenRef.current = stillValid;
    }
    prevProgressRef.current = progress;
  }, [progress, sceneType]);

  // Speak cues as progress crosses thresholds
  useEffect(() => {
    if (!isPlaying || isMuted) return;
    if (typeof window === "undefined" || !window.speechSynthesis) return;

    const script = narrationScripts[sceneType];
    const voice = pickVoice();

    for (const cue of script) {
      if (progress >= cue.at && !spokenRef.current.has(cue.at)) {
        spokenRef.current.add(cue.at);
        const utterance = new SpeechSynthesisUtterance(cue.text);
        utterance.rate = 0.92;
        utterance.pitch = 1;
        utterance.volume = 1;
        if (voice) utterance.voice = voice;
        window.speechSynthesis.speak(utterance);
      }
    }
  }, [progress, isPlaying, isMuted, sceneType]);

  // Reset when video restarts from 0
  useEffect(() => {
    if (progress === 0) {
      spokenRef.current = new Set();
      if (typeof window !== "undefined" && window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    }
  }, [progress]);
};
