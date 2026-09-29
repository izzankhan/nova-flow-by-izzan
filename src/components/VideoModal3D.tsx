import { motion, AnimatePresence } from "framer-motion";
import {
  Play,
  Pause,
  X,
  Volume2,
  VolumeX,
  Maximize,
  RotateCcw,
  Gauge,
  Settings2,
  Check,
  Download,
} from "lucide-react";
import { useState, useRef, useEffect, useCallback } from "react";
import { AnimatedVideoScene, type SceneType } from "./AnimatedVideoScene";
import { useVideoNarration } from "./useVideoNarration";
import { useVideoSound } from "./useVideoSound";

interface VideoModal3DProps {
  isOpen: boolean;
  onClose: () => void;
  videoTitle: string;
  videoSrc?: string;
  posterImage?: string;
  sceneType?: SceneType;
}

export const VideoModal3D = ({
  isOpen,
  onClose,
  videoTitle,
  posterImage,
  sceneType = "funnel",
}: VideoModal3DProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState("0:00");
  const [duration, setDuration] = useState("1:15");
  const [speed, setSpeed] = useState(1);
  const [showSpeedMenu, setShowSpeedMenu] = useState(false);
  const [quality, setQuality] = useState("Auto");
  const [showQualityMenu, setShowQualityMenu] = useState(false);
  const [seekPct, setSeekPct] = useState<number | null>(null);
  const speeds = [0.5, 0.75, 1, 1.25, 1.5, 2];
  const qualities = ["Auto", "1080p", "720p", "480p"];
  const TOTAL = 75;

  // AI voice narration synced to scene timeline
  useVideoNarration(sceneType, isPlaying, progress, isMuted);

  // Cinematic sound effects synced to scene timeline
  useVideoSound(sceneType, isPlaying, progress, isMuted);

  useEffect(() => {
    if (!isOpen) return;
    setIsPlaying(false);
    setProgress(0);
    setCurrentTime("0:00");
    setDuration("1:15");
    setSpeed(1);
    setShowSpeedMenu(false);
    setShowQualityMenu(false);
    setIsMuted(false);
  }, [isOpen, sceneType]);

  const formatTime = (t: number) => {
    const m = Math.floor(t / 60);
    const s = Math.floor(t % 60);
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  const handleProgress = useCallback(
    (pct: number, currentSec: number, totalSec: number) => {
      setProgress(pct);
      setCurrentTime(formatTime(currentSec));
      setDuration(formatTime(totalSec));
    },
    [],
  );

  const handleEnded = useCallback(() => {
    setIsPlaying(false);
  }, []);

  const handleSeekHandled = useCallback(() => {
    setSeekPct(null);
  }, []);

  const togglePlay = () => {
    // Ensure AudioContext is resumed on user gesture (browser autoplay policy)
    if (typeof window !== "undefined") {
      const AC =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext })
          .webkitAudioContext;
      if (AC) {
        // The useVideoSound hook will create its own context, but we can unlock audio here
        try {
          const ctx = new AC();
          if (ctx.state === "suspended") ctx.resume();
          ctx.close();
        } catch {
          /* ignore */
        }
      }
      // Also resume speech synthesis
      if (window.speechSynthesis) {
        try {
          window.speechSynthesis.resume();
        } catch {
          /* ignore */
        }
      }
    }
    setIsPlaying((p) => !p);
  };

  const toggleMute = () => setIsMuted((m) => !m);

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setProgress(val);
    setSeekPct(val);
    setCurrentTime(formatTime((val / 100) * TOTAL));
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[200] flex items-center justify-center bg-black/90 backdrop-blur-md p-4 sm:p-6 md:p-10"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="relative w-full max-w-4xl glass-card rounded-2xl p-4 border border-primary/40 shadow-[0_0_60px_rgba(201,168,76,0.2)] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-2 py-2 mb-3 border-b border-white/10">
              <span className="text-sm font-semibold text-white truncate pr-4">
                {videoTitle}
              </span>
              <button
                onClick={onClose}
                className="h-8 w-8 rounded-full glass hover:bg-primary/20 flex items-center justify-center text-white/80 hover:text-white transition-all shrink-0"
                aria-label="Close video player"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Video Viewport — animated scene */}
            <div className="relative group overflow-hidden rounded-xl bg-black border border-primary/20 aspect-video">
              {/* Poster image overlay before play */}
              {!isPlaying && progress === 0 && posterImage && (
                <img
                  src={posterImage}
                  alt={videoTitle}
                  className="absolute inset-0 h-full w-full object-cover opacity-40"
                />
              )}

              {/* Animated scene */}
              <AnimatedVideoScene
                sceneType={sceneType}
                isPlaying={isPlaying}
                onProgress={handleProgress}
                onEnded={handleEnded}
                seekPct={seekPct}
                onSeekHandled={handleSeekHandled}
              />

              {/* Mute indicator — narration is muted */}
              {isPlaying && isMuted && (
                <button
                  onClick={toggleMute}
                  className="absolute top-4 left-1/2 -translate-x-1/2 glass-card rounded-full px-4 py-2 text-xs font-semibold text-white border border-primary/40 flex items-center gap-2 hover:scale-105 transition-transform z-10"
                >
                  <VolumeX className="h-3.5 w-3.5 text-primary" /> Tap to Enable
                  Voice
                </button>
              )}

              {/* Center Play Button when paused */}
              {!isPlaying && (
                <div
                  className="absolute inset-0 bg-black/40 backdrop-blur-sm flex flex-col items-center justify-center cursor-pointer z-10"
                  onClick={togglePlay}
                >
                  <button
                    className="h-20 w-20 rounded-full btn-gradient flex items-center justify-center shadow-[0_0_50px_rgba(201,168,76,0.6)] text-black mb-3 hover:scale-110 transition-transform"
                    aria-label="Play video"
                  >
                    <Play className="h-9 w-9 fill-black ml-1.5" />
                  </button>
                  <span className="text-sm font-semibold tracking-wider text-white uppercase">
                    Click To Play
                  </span>
                </div>
              )}

              {/* Bottom Control Bar */}
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/95 via-black/70 to-transparent p-4 flex flex-col gap-2 opacity-90 group-hover:opacity-100 transition-opacity z-10">
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={progress}
                  onChange={handleSeek}
                  className="w-full h-1.5 bg-white/20 rounded-lg appearance-none cursor-pointer accent-primary focus:outline-none"
                />
                <div className="flex items-center justify-between text-xs font-mono text-white/80 pt-1">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={togglePlay}
                      className="p-2 rounded-full hover:bg-primary/20 text-white transition-colors"
                      aria-label={isPlaying ? "Pause" : "Play"}
                    >
                      {isPlaying ? (
                        <Pause className="h-4 w-4 text-primary" />
                      ) : (
                        <Play className="h-4 w-4 text-primary fill-primary" />
                      )}
                    </button>
                    <button
                      onClick={toggleMute}
                      className="p-2 rounded-full hover:bg-primary/20 text-white transition-colors"
                      aria-label={isMuted ? "Unmute" : "Mute"}
                    >
                      {isMuted ? (
                        <VolumeX className="h-4 w-4 text-destructive" />
                      ) : (
                        <Volume2 className="h-4 w-4 text-primary" />
                      )}
                    </button>
                    <span className="text-white/60">
                      {currentTime} / {duration}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    {/* Speed Switcher */}
                    <div className="relative">
                      <button
                        onClick={() => {
                          setShowSpeedMenu(!showSpeedMenu);
                          setShowQualityMenu(false);
                        }}
                        className="p-1.5 rounded-lg hover:bg-white/10 text-white/70 hover:text-white transition-colors flex items-center gap-1"
                        title="Playback Speed"
                      >
                        <Gauge className="h-3.5 w-3.5" />
                        <span className="text-[10px] font-mono">{speed}x</span>
                      </button>
                      <AnimatePresence>
                        {showSpeedMenu && (
                          <motion.div
                            initial={{ opacity: 0, y: 10, rotateX: -15 }}
                            animate={{ opacity: 1, y: 0, rotateX: 0 }}
                            exit={{ opacity: 0, y: 10, rotateX: -15 }}
                            transition={{ duration: 0.2 }}
                            style={{ transformPerspective: 300 }}
                            className="absolute bottom-full right-0 mb-2 glass-card rounded-xl border border-primary/30 p-1.5 min-w-[100px] shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
                          >
                            <div className="text-[9px] uppercase tracking-wider text-primary/70 px-2 py-1 font-semibold flex items-center gap-1">
                              <Gauge className="h-2.5 w-2.5" /> Speed
                            </div>
                            {speeds.map((s) => (
                              <button
                                key={s}
                                onClick={() => {
                                  setSpeed(s);
                                  setShowSpeedMenu(false);
                                }}
                                className="w-full flex items-center justify-between px-2 py-1.5 rounded-lg hover:bg-primary/20 text-xs font-mono text-white/80 hover:text-white transition-colors"
                              >
                                {s}x
                                {speed === s && (
                                  <Check className="h-3 w-3 text-primary" />
                                )}
                              </button>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* Quality Switcher */}
                    <div className="relative">
                      <button
                        onClick={() => {
                          setShowQualityMenu(!showQualityMenu);
                          setShowSpeedMenu(false);
                        }}
                        className="p-1.5 rounded-lg hover:bg-white/10 text-white/70 hover:text-white transition-colors flex items-center gap-1"
                        title="Video Quality"
                      >
                        <Settings2 className="h-3.5 w-3.5" />
                        <span className="text-[10px] font-mono">{quality}</span>
                      </button>
                      <AnimatePresence>
                        {showQualityMenu && (
                          <motion.div
                            initial={{ opacity: 0, y: 10, rotateX: -15 }}
                            animate={{ opacity: 1, y: 0, rotateX: 0 }}
                            exit={{ opacity: 0, y: 10, rotateX: -15 }}
                            transition={{ duration: 0.2 }}
                            style={{ transformPerspective: 300 }}
                            className="absolute bottom-full right-0 mb-2 glass-card rounded-xl border border-primary/30 p-1.5 min-w-[100px] shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
                          >
                            <div className="text-[9px] uppercase tracking-wider text-primary/70 px-2 py-1 font-semibold flex items-center gap-1">
                              <Settings2 className="h-2.5 w-2.5" /> Quality
                            </div>
                            {qualities.map((q) => (
                              <button
                                key={q}
                                onClick={() => {
                                  setQuality(q);
                                  setShowQualityMenu(false);
                                }}
                                className="w-full flex items-center justify-between px-2 py-1.5 rounded-lg hover:bg-primary/20 text-xs font-mono text-white/80 hover:text-white transition-colors"
                              >
                                {q}
                                {quality === q && (
                                  <Check className="h-3 w-3 text-primary" />
                                )}
                              </button>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    <button
                      onClick={() => {
                        setProgress(0);
                        setSeekPct(0);
                      }}
                      className="p-1.5 rounded-lg hover:bg-white/10 text-white/70 hover:text-white transition-colors"
                      title="Restart"
                    >
                      <RotateCcw className="h-3.5 w-3.5" />
                    </button>
                    <button
                      onClick={() => {
                        const canvas = document.querySelector("canvas");
                        if (canvas) {
                          const link = document.createElement("a");
                          link.download = `${videoTitle.replace(/\s+/g, "_")}.png`;
                          link.href = canvas.toDataURL("image/png");
                          link.click();
                        }
                      }}
                      className="p-1.5 rounded-lg hover:bg-primary/20 text-white/70 hover:text-primary transition-colors"
                      title="Download Video"
                    >
                      <Download className="h-3.5 w-3.5" />
                    </button>
                    <button
                      onClick={() => {
                        const el = document.querySelector(
                          ".video-viewport-fullscreen",
                        );
                        if (el?.requestFullscreen) el.requestFullscreen();
                      }}
                      className="p-1.5 rounded-lg hover:bg-white/10 text-white/70 hover:text-white transition-colors"
                      title="Fullscreen"
                    >
                      <Maximize className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
