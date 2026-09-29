import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export const Loader = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 3800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-background overflow-hidden"
        >
          {/* Zoom container — starts tiny, rotates, then zooms to full screen */}
          <motion.div
            initial={{ scale: 0.12, opacity: 0, rotate: 0 }}
            animate={{ scale: 1, opacity: 1, rotate: 360 }}
            transition={{
              rotate: { duration: 1.6, ease: "easeInOut" },
              scale: { duration: 3.2, ease: [0.22, 1, 0.36, 1] },
              opacity: { duration: 0.4 },
            }}
            className="relative flex flex-col items-center justify-center px-4"
          >
            {/* Outer rotating ring */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="absolute h-56 w-56 sm:h-72 sm:w-72 rounded-full border-2 border-transparent"
              style={{
                borderTopColor: "hsl(45 53% 54%)",
                borderRightColor: "hsl(48 77% 75%)",
              }}
            />
            {/* Inner counter-rotating ring */}
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
              className="absolute h-40 w-40 sm:h-52 sm:w-52 rounded-full border-2 border-transparent"
              style={{
                borderBottomColor: "hsl(40 52% 36%)",
                borderLeftColor: "hsl(48 77% 75%)",
              }}
            />
            {/* Glow */}
            <motion.div
              animate={{ opacity: [0.3, 0.8, 0.3], scale: [0.9, 1.1, 0.9] }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute h-36 w-36 sm:h-48 sm:w-48 rounded-full blur-2xl"
              style={{
                background:
                  "radial-gradient(circle, hsl(45 53% 54% / 0.4) 0%, transparent 70%)",
              }}
            />
            {/* Brand name inside circle */}
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{
                delay: 0.4,
                duration: 0.8,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="relative z-10 flex items-center justify-center"
            >
              <span
                className="text-base sm:text-2xl font-bold tracking-tight text-gradient whitespace-nowrap"
                style={{ fontFamily: "'Space Grotesk', system-ui, sans-serif" }}
              >
                Nova Automate
              </span>
            </motion.div>
          </motion.div>

          {/* Founder credit */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2, duration: 0.6, ease: "easeOut" }}
            className="absolute bottom-[14%] sm:bottom-[18%] text-[10px] sm:text-xs font-medium tracking-widest uppercase text-muted-foreground/70 whitespace-nowrap"
            style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
          >
            Founder by M IZZAN
          </motion.p>

          {/* Progress line */}
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: 220 }}
            transition={{ delay: 1.6, duration: 2, ease: "easeInOut" }}
            className="absolute bottom-[8%] sm:bottom-[10%] h-0.5 rounded-full max-w-[80vw]"
            style={{
              background:
                "linear-gradient(90deg, hsl(45 53% 54%), hsl(48 77% 75%))",
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};
