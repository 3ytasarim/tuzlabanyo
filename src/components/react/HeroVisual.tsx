/**
 * Hero görsel kompozisyonu: fareyle 3B eğilen ana fotoğraf kartı (21st.dev "3D Card Effect"),
 * arkada dönük ikinci kart, önde taşan küçük kart ve yavaşça süzülen cam bilgi rozetleri.
 * Fotoğraflar tam görünür (object-cover, kart oranına göre kırpılmış). Hareket azaltılmışsa sabit.
 */
import { motion, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform, type MotionValue } from "motion/react";
import { Ruler, MapPin, Sparkles } from "lucide-react";
import { useEffect, useRef, useState, type RefObject } from "react";
import { EASE, Pic } from "./primitives";
import type { Img } from "@/utils/img";

function Badge({ icon, title, text, className, delay, float }: { icon: React.ReactNode; title: string; text: string; className: string; delay: number; float: number }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      aria-hidden
      initial={reduce ? false : { opacity: 0, y: 16, scale: 0.92, filter: "blur(8px)" }}
      animate={reduce ? { opacity: 1 } : { opacity: 1, scale: 1, filter: "blur(0px)", y: [0, -float, 0] }}
      transition={reduce ? {} : { opacity: { duration: 0.9, delay, ease: EASE }, scale: { duration: 0.9, delay, ease: EASE }, filter: { duration: 0.9, delay }, y: { duration: 6, delay: delay + 0.9, repeat: Infinity, ease: "easeInOut" } }}
      className={`absolute z-30 items-center gap-3 rounded-2xl border border-white/15 bg-[#0a0e11]/60 py-2.5 pl-2.5 pr-4 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.8),inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-xl ${className}`}
    >
      <span className="inline-flex size-9 items-center justify-center rounded-xl bg-gradient-to-br from-[#8ec5ff] to-[#2f7de1] text-[#06080a]">{icon}</span>
      <span className="leading-tight">
        <span className="block text-[0.8125rem] font-semibold text-white">{title}</span>
        <span className="block text-[0.6875rem] text-white/60">{text}</span>
      </span>
    </motion.div>
  );
}

export default function HeroVisual({ images, sectionRef }: { images: [Img, Img, Img]; sectionRef: RefObject<HTMLElement | null> }) {
  const reduce = useReducedMotion();
  const box = useRef<HTMLDivElement>(null);
  const [lg, setLg] = useState(false);
  useEffect(() => {
    const mq = matchMedia("(min-width: 1024px)");
    const on = () => setLg(mq.matches);
    on();
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);
  const still = reduce || !lg;
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [7, -7]), { stiffness: 150, damping: 18 });
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-9, 9]), { stiffness: 150, damping: 18 });
  const glareX = useTransform(mx, [-0.5, 0.5], ["20%", "80%"]);
  const glareY = useTransform(my, [-0.5, 0.5], ["10%", "90%"]);
  const glare = useTransform([glareX, glareY], ([x, y]) => `radial-gradient(circle at ${x} ${y}, rgba(255,255,255,0.45), transparent 55%)`);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });
  const yBack: MotionValue<number> = useTransform(scrollYProgress, [0, 1], [0, still ? 0 : -90]);
  const yFront: MotionValue<number> = useTransform(scrollYProgress, [0, 1], [0, still ? 0 : -160]);

  const [main, back, front] = [images[1], images[0], images[2]];

  return (
    <div
      ref={box}
      className="relative mx-auto h-[33rem] w-full max-w-[34rem] [perspective:1400px] sm:h-[40rem] lg:h-[44rem] lg:max-w-none"
      onMouseMove={(e) => {
        if (reduce || !box.current) return;
        const r = box.current.getBoundingClientRect();
        mx.set((e.clientX - r.left) / r.width - 0.5);
        my.set((e.clientY - r.top) / r.height - 0.5);
      }}
      onMouseLeave={() => (mx.set(0), my.set(0))}
    >
      {/* arka kart */}
      <motion.figure
        style={{ y: yBack }}
        initial={reduce ? false : { opacity: 0, rotate: -2, x: 40 }}
        animate={{ opacity: 1, rotate: -8, x: 0 }}
        transition={{ duration: 1.4, ease: EASE, delay: 0.25 }}
        className="absolute left-0 top-10 hidden h-[62%] w-[46%] overflow-hidden sm:block rounded-[1.75rem] border border-white/10 opacity-90 shadow-[0_40px_80px_-30px_rgba(0,0,0,0.9)] sm:left-2"
      >
        <Pic img={back} sizes="(min-width:1024px) 16rem, 40vw" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/55 to-transparent" />
      </motion.figure>

      {/* ana kart (3B eğim) */}
      <motion.div
        initial={reduce ? false : { opacity: 0, y: 50, scale: 0.94 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 1.3, ease: EASE, delay: 0.1 }}
        style={{ rotateX: rx, rotateY: ry, transformStyle: "preserve-3d" }}
        className="absolute right-0 top-0 z-20 h-[80%] w-[82%] sm:right-4 sm:h-[86%] sm:w-[68%]"
      >
        <figure className="relative h-full w-full overflow-hidden rounded-[2rem] border border-white/15 shadow-[0_60px_120px_-30px_rgba(0,0,0,0.95)]">
          <Pic img={main} sizes="(min-width:1320px) 26rem, (min-width:1024px) 32vw, 66vw" priority />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          {!reduce && (
            <motion.div
              aria-hidden
              className="pointer-events-none absolute inset-0 mix-blend-soft-light"
              style={{ background: glare }}
            />
          )}
          <figcaption className="absolute left-4 right-4 top-4 flex items-center justify-between gap-3 rounded-2xl border border-white/15 bg-black/35 px-4 py-3 backdrop-blur-xl" style={{ transform: "translateZ(40px)" }}>
            <span>
              <span className="block text-[0.6875rem] font-semibold uppercase tracking-[0.18em] text-[#8ec5ff]">{main.type}</span>
              <span className="mt-0.5 block text-sm font-medium text-white">{main.caption}</span>
            </span>
            <span className="font-mono text-[0.6875rem] text-white/50">Uygulamamız</span>
          </figcaption>
        </figure>
      </motion.div>

      {/* ön küçük kart */}
      <motion.figure
        style={{ y: yFront }}
        initial={reduce ? false : { opacity: 0, y: 60, rotate: 10 }}
        animate={{ opacity: 1, rotate: 5 }}
        transition={{ duration: 1.3, ease: EASE, delay: 0.55 }}
        className="absolute bottom-0 left-0 z-30 h-[34%] w-[46%] overflow-hidden sm:left-[6%] sm:h-[38%] sm:w-[40%] rounded-[1.5rem] border-[5px] border-[#0a0e11] shadow-[0_40px_80px_-25px_rgba(0,0,0,0.95)]"
      >
        <Pic img={front} sizes="(min-width:1024px) 14rem, 38vw" />
        <figcaption className="absolute bottom-2 left-2 rounded-full bg-black/45 px-2.5 py-1 text-[0.6875rem] font-medium text-white backdrop-blur-md">{front.type}</figcaption>
      </motion.figure>

      {/* süzülen rozetler */}
      <Badge icon={<Ruler className="size-4" />} title="Her ölçüye imalat" text="Alanınızın ölçüsünde" className="-left-6 top-[46%] hidden sm:flex" delay={1} float={10} />
      <Badge icon={<MapPin className="size-4" />} title="Tuzla, İstanbul" text="Yayla Mahallesi" className="hidden sm:-right-4 sm:top-[40%] sm:flex" delay={1.2} float={8} />
      <Badge icon={<Sparkles className="size-4" />} title="Duş · Cam balkon" text="Tek elden montaj" className="bottom-[3%] right-0 flex sm:bottom-[6%] sm:right-[2%]" delay={1.4} float={12} />

      {/* zemin ışığı */}
      <div aria-hidden className="pointer-events-none absolute bottom-[-4rem] left-1/2 -z-10 h-40 w-[80%] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse,rgba(47,125,225,0.35),transparent_70%)] blur-2xl" />
    </div>
  );
}
