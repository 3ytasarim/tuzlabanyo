/**
 * Ana sayfa uygulamaları: dikey kaydırma yatay harekete dönüşür (pinned horizontal scroll, Aceternity /
 * 21st.dev kalıbı). Masaüstünde sabitlenir; mobilde yerel yatay kaydırma. Kareye tıklayınca paylaşımlı
 * geçişle lightbox açılır; imlecin yanında "Gör" halkası.
 */
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { BlurText, Pic } from "./primitives";
import { Lightbox } from "./Lightbox";
import { CursorFollower } from "./CursorFollower";
import type { Img } from "@/utils/img";

export default function HorizontalGallery({ items, instagram }: { items: Img[]; instagram: string }) {
  const section = useRef<HTMLElement>(null);
  const track = useRef<HTMLUListElement>(null);
  const [dist, setDist] = useState(0);
  const [lb, setLb] = useState<number | null>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: section, offset: ["start start", "end end"] });
  const x = useTransform(scrollYProgress, [0, 1], [0, -dist]);

  useEffect(() => {
    const calc = () => {
      if (!track.current) return;
      const desktop = matchMedia("(min-width: 1024px)").matches && !reduce;
      setDist(desktop ? Math.max(0, track.current.scrollWidth - window.innerWidth + 80) : 0);
    };
    calc();
    window.addEventListener("resize", calc);
    return () => window.removeEventListener("resize", calc);
  }, [reduce]);

  return (
    <section ref={section} id="uygulamalar" aria-labelledby="uyg-title" className="relative" style={{ height: dist ? `calc(100vh + ${dist}px)` : "auto" }}>
      <div className={dist ? "sticky top-0 flex h-screen flex-col justify-center overflow-hidden" : "py-24"}>
        <div className="mx-auto mb-12 flex w-full max-w-[82.5rem] flex-col gap-6 px-5 sm:px-8 lg:flex-row lg:items-end lg:justify-between lg:px-10">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#8ec5ff]">Uygulamalarımız</p>
            <BlurText id="uyg-title" text="Katalogdan değil," accent="işlerimizden." className="mt-5 text-[clamp(2.25rem,1.4rem+3vw,4.25rem)] font-semibold leading-[1.02] tracking-[-0.045em] text-white" />
          </div>
          <div className="flex items-center gap-5">
            <a href="/uygulamalarimiz/" className="inline-flex min-h-11 items-center gap-2 rounded-full border border-white/12 bg-white/[0.04] px-5 text-sm font-semibold text-white backdrop-blur hover:bg-white hover:text-black">
              Tüm uygulamalar <ArrowUpRight aria-hidden className="size-4" />
            </a>
            <a href={instagram} rel="noopener" target="_blank" className="text-sm font-medium text-white/60 hover:text-white">
              Instagram<span className="sr-only"> (yeni sekmede açılır)</span>
            </a>
          </div>
        </div>
        <motion.ul ref={track} style={{ x: dist ? x : 0 }} className={`flex gap-5 px-5 sm:px-8 lg:px-10 ${dist ? "" : "snap-x snap-mandatory overflow-x-auto pb-4"}`}>
          {items.map((it, i) => (
            <li key={it.id} className="shrink-0 snap-start">
              <motion.button
                type="button"
                {...(reduce ? {} : { layoutId: `home-${it.id}` })}
                onClick={() => setLb(i)}
                data-cursor
                className={`group relative block overflow-hidden rounded-[1.5rem] border border-white/10 ${i % 3 === 1 ? "h-[min(60vh,32rem)] w-[min(78vw,26rem)]" : "h-[min(52vh,28rem)] w-[min(70vw,21rem)] lg:mt-16"}`}
              >
                <Pic img={it} sizes="(min-width:1024px) 26rem, 78vw" imgClassName="transition-transform duration-[1400ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.06]" />
                <span className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-80 transition-opacity group-hover:opacity-100" />
                <span className="absolute bottom-4 left-4 right-4 text-left">
                  <span className="block text-[0.6875rem] font-semibold uppercase tracking-[0.18em] text-[#8ec5ff]">{it.type}</span>
                  <span className="mt-1 block text-[0.9375rem] font-medium text-white">{it.caption}</span>
                  <span className="sr-only"> (büyüt)</span>
                </span>
              </motion.button>
            </li>
          ))}
        </motion.ul>
      </div>
      <CursorFollower target={section} />
      <Lightbox items={items} index={lb} onClose={() => setLb(null)} onIndex={setLb} group="home" />
    </section>
  );
}
