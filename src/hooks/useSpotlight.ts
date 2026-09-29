import { useRef, useCallback } from "react";

/**
 * Magnetic cursor spotlight — sets `--spot-x` and `--spot-y` CSS variables
 * (in percent) on the element so a radial-gradient glow follows the mouse.
 */
export function useSpotlight<T extends HTMLElement>() {
  const ref = useRef<T>(null);

  const onMouseMove = useCallback((e: React.MouseEvent<T>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    el.style.setProperty("--spot-x", `${x}%`);
    el.style.setProperty("--spot-y", `${y}%`);
    el.style.setProperty("--spot-opacity", "1");
  }, []);

  const onMouseLeave = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty("--spot-opacity", "0");
  }, []);

  return { ref, onMouseMove, onMouseLeave };
}
