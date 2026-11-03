/**
 * Arka plan: Aceternity "Spotlight" (yukarıdan çapraz inen yumuşak ışık hüzmeleri) + "Aurora"
 * (yavaşça hareket eden, bulanık renk bulutları) + ince film greni. Izgara/desen yok.
 * Dekoratif (aria-hidden); hareket azaltılmışsa sabit.
 */
import { motion, useReducedMotion } from "motion/react";
import { useId } from "react";

export default function AuroraBackground({ intensity = 1 }: { intensity?: number }) {
  const reduce = useReducedMotion();
  const u = useId().replace(/:/g, "");
  const drift = (x: number[], y: number[], d: number) =>
    reduce ? {} : { animate: { x, y }, transition: { duration: d, repeat: Infinity, repeatType: "mirror" as const, ease: "easeInOut" as const } };

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      {/* Spotlight hüzmeleri */}
      <motion.svg
        className="absolute -left-[10%] -top-[30%] h-[160%] w-[90%] opacity-0"
        viewBox="0 0 3787 2842"
        fill="none"
        initial={reduce ? { opacity: 0.9 * intensity } : { opacity: 0, x: -80, y: -60 }}
        animate={{ opacity: 0.9 * intensity, x: 0, y: 0 }}
        transition={{ duration: 2, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
      >
        <g filter={`url(#${u}b1)`}>
          <ellipse cx="1924.71" cy="273.501" rx="1924.71" ry="273.501" transform="matrix(-0.822377 -0.568943 -0.568943 0.822377 3631.88 2291.09)" fill={`url(#${u}f1)`} fillOpacity="0.21" />
        </g>
        <defs>
          <filter id={`${u}b1`} x="0.860352" y="0.838989" width="3785.16" height="2840.26" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
            <feGaussianBlur stdDeviation="151" />
          </filter>
          <linearGradient id={`${u}f1`} x1="0" y1="0" x2="1" y2="0">
            <stop stopColor="#cfe6ff" />
            <stop offset="1" stopColor="#8ec5ff" />
          </linearGradient>
        </defs>
      </motion.svg>
      <motion.svg
        className="absolute -right-[20%] -top-[40%] h-[150%] w-[80%] scale-x-[-1]"
        viewBox="0 0 3787 2842"
        fill="none"
        initial={reduce ? { opacity: 0.5 * intensity } : { opacity: 0 }}
        animate={{ opacity: 0.5 * intensity }}
        transition={{ duration: 2.4, delay: 0.8 }}
      >
        <g filter={`url(#${u}b2)`}>
          <ellipse cx="1924.71" cy="273.501" rx="1924.71" ry="273.501" transform="matrix(-0.822377 -0.568943 -0.568943 0.822377 3631.88 2291.09)" fill="#2f7de1" fillOpacity="0.22" />
        </g>
        <defs>
          <filter id={`${u}b2`} x="0.860352" y="0.838989" width="3785.16" height="2840.26" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
            <feGaussianBlur stdDeviation="151" />
          </filter>
        </defs>
      </motion.svg>

      {/* Aurora bulutları */}
      <motion.div {...drift([0, 120, -40], [0, 60, 20], 18)} className="absolute right-[-8%] top-[-10%] h-[38rem] w-[38rem] rounded-full bg-[radial-gradient(circle,rgba(47,125,225,0.30),transparent_65%)] blur-3xl" style={{ opacity: intensity }} />
      <motion.div {...drift([0, -90, 30], [0, 80, -30], 22)} className="absolute bottom-[-20%] left-[-10%] h-[34rem] w-[34rem] rounded-full bg-[radial-gradient(circle,rgba(142,197,255,0.14),transparent_65%)] blur-3xl" style={{ opacity: intensity }} />
      <motion.div {...drift([0, 60, -60], [0, -50, 40], 26)} className="absolute left-[35%] top-[30%] h-[26rem] w-[26rem] rounded-full bg-[radial-gradient(circle,rgba(99,102,241,0.12),transparent_65%)] blur-3xl" style={{ opacity: intensity }} />

      {/* film greni + alt kararma */}
      <div className="grain absolute inset-0" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-[#06080a]" />
    </div>
  );
}
