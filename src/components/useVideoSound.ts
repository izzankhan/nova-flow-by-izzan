import { useRef, useEffect, useCallback } from "react";
import type { SceneType } from "./AnimatedVideoScene";

// Sound effect cues synced to scene timeline (progress %)
// Each cue triggers a specific sound type matching the on-screen action
type SoundType =
  | "whoosh" // camera movement / panel appear
  | "beep" // UI interaction / button
  | "chime" // success / connection
  | "data" // data flowing / line connecting
  | "pop" // element appearing
  | "ding" // notification / lead captured
  | "tick" // typing / small interaction
  | "swoosh"; // transition

interface SoundCue {
  at: number;
  type: SoundType;
}

const soundCues: Record<SceneType, SoundCue[]> = {
  funnel: [
    { at: 0, type: "whoosh" },
    { at: 5, type: "pop" },
    { at: 10, type: "swoosh" },
    { at: 15, type: "beep" },
    { at: 20, type: "pop" },
    { at: 22, type: "pop" },
    { at: 25, type: "beep" },
    { at: 28, type: "pop" },
    { at: 30, type: "pop" },
    { at: 32, type: "pop" },
    { at: 34, type: "pop" },
    { at: 38, type: "data" },
    { at: 40, type: "data" },
    { at: 42, type: "data" },
    { at: 45, type: "chime" },
    { at: 50, type: "beep" },
    { at: 52, type: "beep" },
    { at: 54, type: "beep" },
    { at: 56, type: "beep" },
    { at: 60, type: "chime" },
    { at: 65, type: "ding" },
    { at: 70, type: "ding" },
    { at: 72, type: "ding" },
    { at: 75, type: "data" },
    { at: 80, type: "data" },
    { at: 83, type: "chime" },
    { at: 85, type: "chime" },
    { at: 90, type: "swoosh" },
    { at: 95, type: "chime" },
  ],
  crm: [
    { at: 0, type: "whoosh" },
    { at: 5, type: "pop" },
    { at: 10, type: "swoosh" },
    { at: 15, type: "beep" },
    { at: 20, type: "ding" },
    { at: 22, type: "ding" },
    { at: 25, type: "data" },
    { at: 30, type: "pop" },
    { at: 32, type: "pop" },
    { at: 34, type: "pop" },
    { at: 38, type: "beep" },
    { at: 40, type: "beep" },
    { at: 42, type: "beep" },
    { at: 45, type: "chime" },
    { at: 50, type: "data" },
    { at: 55, type: "ding" },
    { at: 60, type: "ding" },
    { at: 62, type: "ding" },
    { at: 65, type: "chime" },
    { at: 70, type: "chime" },
    { at: 72, type: "chime" },
    { at: 75, type: "data" },
    { at: 80, type: "data" },
    { at: 83, type: "chime" },
    { at: 85, type: "chime" },
    { at: 90, type: "swoosh" },
    { at: 95, type: "chime" },
  ],
  chatbot: [
    { at: 0, type: "whoosh" },
    { at: 5, type: "pop" },
    { at: 10, type: "pop" },
    { at: 15, type: "beep" },
    { at: 20, type: "beep" },
    { at: 25, type: "tick" },
    { at: 30, type: "tick" },
    { at: 32, type: "tick" },
    { at: 34, type: "tick" },
    { at: 38, type: "data" },
    { at: 40, type: "data" },
    { at: 45, type: "chime" },
    { at: 50, type: "chime" },
    { at: 55, type: "ding" },
    { at: 60, type: "ding" },
    { at: 62, type: "ding" },
    { at: 65, type: "beep" },
    { at: 70, type: "tick" },
    { at: 72, type: "tick" },
    { at: 74, type: "tick" },
    { at: 78, type: "data" },
    { at: 80, type: "data" },
    { at: 83, type: "chime" },
    { at: 85, type: "chime" },
    { at: 90, type: "swoosh" },
    { at: 95, type: "chime" },
  ],
};

export const useVideoSound = (
  sceneType: SceneType,
  isPlaying: boolean,
  progress: number,
  isMuted: boolean,
) => {
  const audioCtxRef = useRef<AudioContext | null>(null);
  const ambientRef = useRef<{ osc: OscillatorNode; gain: GainNode } | null>(
    null,
  );
  const playedRef = useRef<Set<string>>(new Set());
  const prevProgressRef = useRef(0);
  const isSpeakingRef = useRef(false);

  // Track whether narration voice is currently speaking — when it stops, boost sound volume
  useEffect(() => {
    if (typeof window === "undefined" || !window.speechSynthesis) return;
    const checkSpeaking = () => {
      isSpeakingRef.current = window.speechSynthesis.speaking;
    };
    const interval = setInterval(checkSpeaking, 200);
    return () => clearInterval(interval);
  }, []);

  // Volume multiplier: 1.0 when voice is speaking, 1.8 when voice is silent (boost sounds)
  const getVolBoost = useCallback(() => {
    return isSpeakingRef.current ? 1.0 : 1.8;
  }, []);

  // Lazy-init AudioContext (must be created after user gesture)
  const getCtx = useCallback((): AudioContext | null => {
    if (typeof window === "undefined") return null;
    if (!audioCtxRef.current) {
      const AC =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext })
          .webkitAudioContext;
      if (!AC) return null;
      audioCtxRef.current = new AC();
    }
    if (audioCtxRef.current.state === "suspended") {
      audioCtxRef.current.resume();
    }
    return audioCtxRef.current;
  }, []);

  // Play a single sound effect (volume boosted when voice narration is silent)
  const playSound = useCallback(
    (type: SoundType) => {
      const ctx = getCtx();
      if (!ctx) return;
      const now = ctx.currentTime;
      const boost = getVolBoost();

      const makeOsc = (
        freq: number,
        dur: number,
        vol: number,
        wave: OscillatorType = "sine",
        delay = 0,
      ) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = wave;
        osc.frequency.setValueAtTime(freq, now + delay);
        gain.gain.setValueAtTime(0, now + delay);
        gain.gain.linearRampToValueAtTime(vol * boost, now + delay + 0.01);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + delay + dur);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + delay);
        osc.stop(now + delay + dur + 0.05);
      };

      switch (type) {
        case "whoosh": {
          // Deep cinematic whoosh with shimmer layer
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          const filter = ctx.createBiquadFilter();
          osc.type = "sawtooth";
          osc.frequency.setValueAtTime(60, now);
          osc.frequency.exponentialRampToValueAtTime(500, now + 0.7);
          filter.type = "lowpass";
          filter.frequency.setValueAtTime(400, now);
          filter.frequency.exponentialRampToValueAtTime(3000, now + 0.7);
          gain.gain.setValueAtTime(0, now);
          gain.gain.linearRampToValueAtTime(0.12 * boost, now + 0.05);
          gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.85);
          osc.connect(filter);
          filter.connect(gain);
          gain.connect(ctx.destination);
          osc.start(now);
          osc.stop(now + 0.9);
          makeOsc(2000, 0.5, 0.02, "sine", 0.1);
          break;
        }
        case "swoosh": {
          // Bright transition swoosh with dual layers
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = "sine";
          osc.frequency.setValueAtTime(150, now);
          osc.frequency.exponentialRampToValueAtTime(1200, now + 0.4);
          gain.gain.setValueAtTime(0, now);
          gain.gain.linearRampToValueAtTime(0.08 * boost, now + 0.03);
          gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.55);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(now);
          osc.stop(now + 0.6);
          makeOsc(3000, 0.3, 0.015, "triangle", 0.05);
          break;
        }
        case "beep": {
          // Clean UI beep with subtle harmonics
          makeOsc(880, 0.12, 0.06, "square");
          makeOsc(1320, 0.1, 0.02, "sine", 0.01);
          break;
        }
        case "chime": {
          // Rich three-note chime (E-B-E arpeggio)
          makeOsc(659, 0.35, 0.05, "sine", 0); // E5
          makeOsc(988, 0.4, 0.04, "sine", 0.08); // B5
          makeOsc(1319, 0.5, 0.03, "sine", 0.16); // E6
          break;
        }
        case "data": {
          // Rapid data flow blips — ascending
          makeOsc(1000, 0.04, 0.035, "square", 0);
          makeOsc(1200, 0.04, 0.03, "square", 0.05);
          makeOsc(1500, 0.04, 0.025, "square", 0.1);
          makeOsc(1800, 0.04, 0.02, "square", 0.15);
          break;
        }
        case "pop": {
          // Soft pop with bounce
          makeOsc(300, 0.1, 0.05, "sine");
          makeOsc(500, 0.08, 0.035, "sine", 0.02);
          makeOsc(700, 0.06, 0.02, "sine", 0.04);
          break;
        }
        case "ding": {
          // Notification ding with harmonic
          makeOsc(1047, 0.3, 0.06, "sine", 0); // C6
          makeOsc(1568, 0.4, 0.04, "sine", 0.05); // G6
          makeOsc(2093, 0.3, 0.02, "sine", 0.08); // C7
          break;
        }
        case "tick": {
          // Quick typing tick
          makeOsc(2200, 0.02, 0.025, "square");
          makeOsc(1800, 0.02, 0.015, "square", 0.01);
          break;
        }
      }
    },
    [getCtx, getVolBoost],
  );

  // Start/stop layered ambient drone (volume boosted when voice narration is silent)
  useEffect(() => {
    if (isPlaying && !isMuted) {
      const ctx = getCtx();
      if (ctx && !ambientRef.current) {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        const filter = ctx.createBiquadFilter();
        osc.type = "sine";
        osc.frequency.setValueAtTime(55, ctx.currentTime); // Low ambient hum
        filter.type = "lowpass";
        filter.frequency.setValueAtTime(200, ctx.currentTime);
        const baseVol = isSpeakingRef.current ? 0.015 : 0.035; // Boost when voice silent
        gain.gain.setValueAtTime(0, ctx.currentTime);
        gain.gain.linearRampToValueAtTime(baseVol, ctx.currentTime + 1.5); // Fade in
        osc.connect(filter);
        filter.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        ambientRef.current = { osc, gain };

        // Second layer — higher harmonic for depth
        const osc2 = ctx.createOscillator();
        const gain2 = ctx.createGain();
        osc2.type = "triangle";
        osc2.frequency.setValueAtTime(110, ctx.currentTime); // Octave up
        gain2.gain.setValueAtTime(0, ctx.currentTime);
        gain2.gain.linearRampToValueAtTime(baseVol * 0.4, ctx.currentTime + 2);
        osc2.connect(gain2);
        gain2.connect(ctx.destination);
        osc2.start();
        // Store second osc for cleanup
        (
          ambientRef.current as {
            osc: OscillatorNode;
            gain: GainNode;
            osc2?: OscillatorNode;
          }
        ).osc2 = osc2;
      }
    }
    return () => {
      if (ambientRef.current) {
        try {
          ambientRef.current.gain.gain.exponentialRampToValueAtTime(
            0.0001,
            audioCtxRef.current?.currentTime ?? 0 + 0.3,
          );
          ambientRef.current.osc.stop(
            audioCtxRef.current?.currentTime ?? 0 + 0.4,
          );
          const a2 = (ambientRef.current as { osc2?: OscillatorNode }).osc2;
          if (a2) a2.stop(audioCtxRef.current?.currentTime ?? 0 + 0.4);
        } catch {
          /* ignore */
        }
        ambientRef.current = null;
      }
    };
  }, [isPlaying, isMuted, getCtx]);

  // Dynamically adjust ambient drone volume based on whether voice is speaking
  useEffect(() => {
    if (!isPlaying || isMuted) return;
    const ctx = audioCtxRef.current;
    if (!ctx || !ambientRef.current) return;
    const targetVol = isSpeakingRef.current ? 0.015 : 0.035; // Lower when voice active, boost when silent
    try {
      ambientRef.current.gain.gain.cancelScheduledValues(ctx.currentTime);
      ambientRef.current.gain.gain.setValueAtTime(
        ambientRef.current.gain.gain.value,
        ctx.currentTime,
      );
      ambientRef.current.gain.gain.linearRampToValueAtTime(
        targetVol,
        ctx.currentTime + 0.3,
      );
    } catch {
      /* ignore */
    }
  }, [progress, isPlaying, isMuted]);

  // Reset on scene change
  useEffect(() => {
    playedRef.current = new Set();
    prevProgressRef.current = 0;
  }, [sceneType]);

  // Stop all when paused or muted
  useEffect(() => {
    if (!isPlaying || isMuted) {
      playedRef.current = new Set();
    }
  }, [isPlaying, isMuted]);

  // Handle backward seek — clear future cues
  useEffect(() => {
    if (progress < prevProgressRef.current - 5) {
      const cues = soundCues[sceneType];
      const stillValid = new Set<string>();
      for (const cue of cues) {
        if (cue.at <= progress) stillValid.add(`${cue.at}-${cue.type}`);
      }
      playedRef.current = stillValid;
    }
    prevProgressRef.current = progress;
  }, [progress, sceneType]);

  // Trigger sound cues as progress crosses thresholds
  useEffect(() => {
    if (!isPlaying || isMuted) return;
    const cues = soundCues[sceneType];
    for (const cue of cues) {
      const key = `${cue.at}-${cue.type}`;
      if (progress >= cue.at && !playedRef.current.has(key)) {
        playedRef.current.add(key);
        playSound(cue.type);
      }
    }
  }, [progress, isPlaying, isMuted, sceneType, playSound]);

  // Reset on restart
  useEffect(() => {
    if (progress === 0) {
      playedRef.current = new Set();
    }
  }, [progress]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (ambientRef.current) {
        try {
          ambientRef.current.osc.stop();
        } catch {
          /* ignore */
        }
        ambientRef.current = null;
      }
      if (audioCtxRef.current) {
        audioCtxRef.current.close();
        audioCtxRef.current = null;
      }
    };
  }, []);
};
