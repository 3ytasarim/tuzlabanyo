/**
 * Hareket ilkelleri (21st.dev / Magic UI / Aceternity kalıplarından uyarlandı, motion ile).
 * Tümü `prefers-reduced-motion`'a uyar (useReducedMotion → animasyonsuz, içerik görünür).
 */
import { motion, useMotionTemplate, useMotionValue, useReducedMotion, useSpring, type Variants } from "motion/react";
import { useRef, type ReactNode, type MouseEvent, type AnchorHTMLAttributes } from "react";
import type { Img } from "@/utils/img";

export const EASE = [0.16, 1, 0.3, 1] as const;

/** Kelime kelime bulanıklıktan netleşen başlık (Magic UI "BlurText" kalıbı). Metin SSR'da tam ve okunur. */
export function BlurText({
  text,
  accent,
  as: Tag = "h2",
  className = "",
  delay = 0,
  once = true,
  id,
}: {
  text: string;
  accent?: string | undefined;
  as?: "h1" | "h2" | "h3" | "p";
  className?: string;
  delay?: number;
  once?: boolean;
  id?: string | undefined;
}) {
  const reduce = useReducedMotion();
  const words = [...text.split(" ").map((w) => ({ w, a: false })), ...(accent ? accent.split(" ").map((w) => ({ w, a: true })) : [])];
  const MotionTag = motion[Tag];
  const item: Variants = {
    hidden: { opacity: 0, filter: "blur(12px)", y: "0.35em" },
    show: { opacity: 1, filter: "blur(0px)", y: 0, transition: { duration: 0.9, ease: EASE } },
  };
  return (
    <MotionTag
      id={id}
      className={className}
      initial={reduce ? false : "hidden"}
      whileInView="show"
      viewport={{ once, margin: "0px 0px -10% 0px" }}
      transition={{ staggerChildren: 0.06, delayChildren: delay }}
    >
      {words.map(({ w, a }, i) => (
        <motion.span key={i} variants={item} className={`inline-block ${a ? "text-gradient" : ""}`}>
          {w}
          {i < words.length - 1 ? " " : ""}
        </motion.span>
      ))}
    </MotionTag>
  );
}

/** Görününce yumuşak giriş (yukarı + bulanıklıktan). */
export function Reveal({ children, className = "", delay = 0, y = 28 }: { children: ReactNode; className?: string; delay?: number; y?: number }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y, filter: "blur(8px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "0px 0px -8% 0px" }}
      transition={{ duration: 1, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  );
}

/** İmleci takip eden ışık halesi olan kart (Magic UI "MagicCard" kalıbı). */
export function SpotlightCard({ children, className = "", glow = "rgba(142,197,255,0.16)" }: { children: ReactNode; className?: string; glow?: string }) {
  const x = useMotionValue(-400);
  const y = useMotionValue(-400);
  const bg = useMotionTemplate`radial-gradient(420px circle at ${x}px ${y}px, ${glow}, transparent 65%)`;
  const border = useMotionTemplate`radial-gradient(260px circle at ${x}px ${y}px, rgba(142,197,255,0.55), transparent 60%)`;
  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    x.set(e.clientX - r.left);
    y.set(e.clientY - r.top);
  };
  return (
    <div onMouseMove={onMove} onMouseLeave={() => (x.set(-400), y.set(-400))} className={`group/spot relative isolate overflow-hidden rounded-[1.25rem] ${className}`}>
      <motion.div aria-hidden className="pointer-events-none absolute inset-0 -z-10 rounded-[inherit] p-px" style={{ background: border, WebkitMask: "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)", WebkitMaskComposite: "xor", maskComposite: "exclude" }} />
      <motion.div aria-hidden className="pointer-events-none absolute inset-0 z-10 rounded-[inherit] opacity-0 transition-opacity duration-500 group-hover/spot:opacity-100" style={{ background: bg }} />
      {children}
    </div>
  );
}

/** Üzerinden ışık geçen birincil buton (Magic UI "ShimmerButton" kalıbı). */
export function ShimmerLink({ children, className = "", tone = "light", ...rest }: AnchorHTMLAttributes<HTMLAnchorElement> & { tone?: "light" | "green" | "blue" }) {
  const base =
    tone === "green"
      ? "bg-[#15803d] text-white shadow-[0_0_0_1px_rgba(255,255,255,0.12)_inset,0_12px_40px_-12px_rgba(21,128,61,0.8)]"
      : tone === "blue"
        ? "bg-[#1e65b5] text-white shadow-[0_0_0_1px_rgba(255,255,255,0.14)_inset,0_12px_40px_-12px_rgba(47,125,225,0.9)]"
        : "bg-[#f2f5f7] text-[#06080a] shadow-[0_0_0_1px_rgba(255,255,255,0.6)_inset,0_12px_40px_-12px_rgba(142,197,255,0.6)]";
  return (
    <a {...rest} className={`shimmer group relative inline-flex min-h-14 items-center justify-center gap-2.5 overflow-hidden rounded-full px-7 font-semibold tracking-[-0.01em] transition-transform duration-300 hover:scale-[1.02] active:scale-[0.98] ${base} ${className}`}>
      <span aria-hidden className="shimmer-sweep pointer-events-none absolute inset-0" />
      <span className="relative z-10 inline-flex items-center gap-2.5">{children}</span>
    </a>
  );
}

/** İmlece hafifçe çekilen sarmalayıcı (yalnız ince imleçli cihazlarda etkili). */
export function Magnetic({ children, strength = 0.25, className = "" }: { children: ReactNode; strength?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useSpring(0, { stiffness: 220, damping: 18, mass: 0.4 });
  const y = useSpring(0, { stiffness: 220, damping: 18, mass: 0.4 });
  const reduce = useReducedMotion();
  return (
    <motion.div
      ref={ref}
      className={`inline-block ${className}`}
      style={{ x, y }}
      onMouseMove={(e) => {
        if (reduce || !ref.current) return;
        const r = ref.current.getBoundingClientRect();
        x.set((e.clientX - r.left - r.width / 2) * strength);
        y.set((e.clientY - r.top - r.height / 2) * strength);
      }}
      onMouseLeave={() => (x.set(0), y.set(0))}
    >
      {children}
    </motion.div>
  );
}

/** Optimize <picture>. */
export function Pic({ img, sizes, className = "", imgClassName = "", priority = false, style }: { img: Img; sizes: string; className?: string; imgClassName?: string; priority?: boolean; style?: React.CSSProperties }) {
  return (
    <picture className={className}>
      <source type="image/avif" srcSet={img.avifSrcSet} sizes={sizes} />
      <img
        src={img.src}
        srcSet={img.srcSet}
        sizes={sizes}
        width={img.width}
        height={img.height}
        alt={img.alt}
        loading={priority ? "eager" : "lazy"}
        decoding={priority ? "sync" : "async"}
        {...(priority ? { fetchPriority: "high" as const } : {})}
        className={`h-full w-full object-cover ${imgClassName}`}
        style={style}
      />
    </picture>
  );
}
