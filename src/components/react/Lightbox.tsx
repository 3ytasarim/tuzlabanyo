/**
 * Paylaşımlı geçişli lightbox: küçük kare layoutId ile tam ekrana büyür (Aceternity "expandable card" /
 * motion shared layout). Ok tuşları, Esc, odak tuzağı ve geri dönüş odağı.
 */
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useCallback, useEffect, useRef } from "react";
import { EASE } from "./primitives";
import type { Img } from "@/utils/img";

export function Lightbox({ items, index, onClose, onIndex, group }: { items: Img[]; index: number | null; onClose: () => void; onIndex: (i: number) => void; group: string }) {
  const reduce = useReducedMotion();
  const closeRef = useRef<HTMLButtonElement>(null);
  const opener = useRef<HTMLElement | null>(null);
  const open = index !== null;

  const go = useCallback((d: number) => index !== null && onIndex((index + d + items.length) % items.length), [index, items.length, onIndex]);

  useEffect(() => {
    if (!open) return;
    opener.current = document.activeElement as HTMLElement;
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
      if (e.key === "Tab") {
        const f = document.querySelectorAll<HTMLElement>("[data-lb-focus]");
        if (!f.length) return;
        const first = f[0]!, last = f[f.length - 1]!;
        if (e.shiftKey && document.activeElement === first) (e.preventDefault(), last.focus());
        else if (!e.shiftKey && document.activeElement === last) (e.preventDefault(), first.focus());
      }
    };
    document.documentElement.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.documentElement.style.overflow = "";
      opener.current?.focus();
    };
  }, [open, go, onClose]);

  const it = index !== null ? items[index] : null;
  return (
    <AnimatePresence>
      {it && (
        <motion.div role="dialog" aria-modal="true" aria-label="Fotoğraf görüntüleyici" className="fixed inset-0 z-[80] flex items-center justify-center p-4 sm:p-10" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <motion.button aria-hidden tabIndex={-1} className="absolute inset-0 bg-black/90 backdrop-blur-xl" onClick={onClose} />
          <motion.figure {...(reduce ? {} : { layoutId: `${group}-${it.id}` })} transition={{ duration: 0.6, ease: EASE }} className="relative z-10 flex max-h-full max-w-full flex-col items-center">
            <img src={it.full} width={it.fullW} height={it.fullH} alt={it.alt} className="max-h-[80vh] w-auto max-w-full rounded-2xl object-contain shadow-[0_60px_120px_-30px_rgba(0,0,0,0.9)]" />
            <motion.figcaption initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }} className="mt-4 text-center text-sm text-white/75">
              {it.caption} <span className="ml-2 font-mono text-white/40">{index! + 1} / {items.length}</span>
            </motion.figcaption>
          </motion.figure>
          <button ref={closeRef} data-lb-focus type="button" aria-label="Kapat" onClick={onClose} className="absolute right-4 top-4 z-20 inline-flex size-12 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white backdrop-blur-md hover:bg-white hover:text-black">
            <X aria-hidden className="size-5" />
          </button>
          {items.length > 1 && (
            <>
              <button data-lb-focus type="button" aria-label="Önceki fotoğraf" onClick={() => go(-1)} className="absolute left-4 top-1/2 z-20 inline-flex size-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white backdrop-blur-md hover:bg-white hover:text-black">
                <ChevronLeft aria-hidden className="size-5" />
              </button>
              <button data-lb-focus type="button" aria-label="Sonraki fotoğraf" onClick={() => go(1)} className="absolute right-4 top-1/2 z-20 inline-flex size-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white backdrop-blur-md hover:bg-white hover:text-black">
                <ChevronRight aria-hidden className="size-5" />
              </button>
            </>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
