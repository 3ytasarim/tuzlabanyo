/** Galeri üzerinde imleci izleyen "Gör" halkası (yalnız ince imleçli cihazlarda; dekoratif). */
import { AnimatePresence, motion, useMotionValue, useSpring } from "motion/react";
import { useEffect, useState, type RefObject } from "react";

export function CursorFollower({ target, label = "Gör" }: { target: RefObject<HTMLElement | null>; label?: string }) {
  const [show, setShow] = useState(false);
  const x = useSpring(useMotionValue(0), { stiffness: 500, damping: 40, mass: 0.4 });
  const y = useSpring(useMotionValue(0), { stiffness: 500, damping: 40, mass: 0.4 });

  useEffect(() => {
    const el = target.current;
    if (!el || !matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    const move = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setShow(!!(e.target as HTMLElement).closest("[data-cursor]"));
    };
    const leave = () => setShow(false);
    el.addEventListener("pointermove", move);
    el.addEventListener("pointerleave", leave);
    return () => {
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerleave", leave);
    };
  }, [target, x, y]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          aria-hidden
          className="pointer-events-none fixed left-0 top-0 z-[60] flex size-20 items-center justify-center rounded-full border border-white/25 bg-white/15 text-sm font-semibold text-white backdrop-blur-md"
          style={{ x, y, translateX: "-50%", translateY: "-50%" }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          transition={{ type: "spring", stiffness: 400, damping: 28 }}
        >
          {label}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
