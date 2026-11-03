/**
 * Yapışkan vitrin (Aceternity "Sticky Scroll Reveal" kalıbı): solda tipler kaydıkça sağda sabit görsel
 * aktif tipin gerçek fotoğrafına geçer (clip-path + ölçek), ilerleme çizgisi dolar.
 */
import { AnimatePresence, motion, useReducedMotion, useScroll, useSpring } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { BlurText, EASE, Pic } from "./primitives";
import type { Img } from "@/utils/img";

export interface ShowcaseItem {
  name: string;
  text: string;
  href: string;
  facts: string[];
  img: Img;
}

export default function StickyShowcase({ eyebrow, title, accent, lead, items, id }: { eyebrow: string; title: string; accent: string; lead: string; items: ShowcaseItem[]; id: string }) {
  const [active, setActive] = useState(0);
  const refs = useRef<(HTMLLIElement | null)[]>([]);
  const wrap = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: wrap, offset: ["start center", "end center"] });
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(Number((e.target as HTMLElement).dataset.i))),
      { rootMargin: "-45% 0px -45% 0px" },
    );
    refs.current.forEach((r) => r && io.observe(r));
    return () => io.disconnect();
  }, []);

  return (
    <section id={id} aria-labelledby={`${id}-title`} className="relative mx-auto max-w-[82.5rem] px-5 py-24 sm:px-8 lg:px-10 lg:py-36">
      <div className="max-w-2xl">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#8ec5ff]">{eyebrow}</p>
        <BlurText id={`${id}-title`} text={title} accent={accent} className="mt-5 text-[clamp(2.25rem,1.4rem+3vw,4.25rem)] font-semibold leading-[1.02] tracking-[-0.045em] text-white" />
        <p className="mt-6 text-lg leading-relaxed text-white/60">{lead}</p>
      </div>

      <div ref={wrap} className="mt-16 grid gap-10 lg:grid-cols-12 lg:gap-12">
        <ol className="relative lg:col-span-5">
          <span aria-hidden className="absolute bottom-0 left-0 top-0 hidden w-px bg-white/10 lg:block">
            <motion.span className="absolute inset-x-0 top-0 block h-full origin-top bg-gradient-to-b from-[#8ec5ff] to-[#2f7de1]" style={{ scaleY: progress }} />
          </span>
          {items.map((it, i) => (
            <li key={it.href} data-i={i} ref={(el) => void (refs.current[i] = el)} className="lg:flex lg:min-h-[70vh] lg:items-center lg:pl-10">
              <div className={`relative transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${active === i ? "lg:translate-x-2" : ""}`}>
                <span aria-hidden className={`absolute -left-10 top-0 hidden h-full w-px origin-top bg-[#8ec5ff] transition-transform duration-700 lg:block ${active === i ? "scale-y-100" : "scale-y-0"}`} />
                <span className="font-mono text-sm text-[#8ec5ff]">{String(i + 1).padStart(2, "0")}</span>
                <h3 className={`mt-3 text-3xl font-semibold tracking-[-0.035em] transition-colors duration-500 sm:text-4xl ${active === i ? "text-white" : "text-white/70"}`}>{it.name}</h3>
                <p className="mt-4 max-w-md text-lg leading-relaxed text-white/60">{it.text}</p>
                <ul className="mt-6 flex flex-wrap gap-2">
                  {it.facts.map((f) => (
                    <li key={f} className="rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-1.5 text-[0.8125rem] text-white/75">{f}</li>
                  ))}
                </ul>
                <a href={it.href} className="group mt-8 inline-flex min-h-11 items-center gap-2 font-semibold text-white">
                  <span className="bg-[linear-gradient(currentColor,currentColor)] bg-[length:0%_1px] bg-left-bottom bg-no-repeat transition-[background-size] duration-500 group-hover:bg-[length:100%_1px]">{it.name} sayfası</span>
                  <ArrowUpRight aria-hidden className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </a>
                {/* mobil: her tipin görseli kendi altında */}
                <div className="mt-8 overflow-hidden rounded-[1.5rem] border border-white/10 lg:hidden" style={{ aspectRatio: "4/5" }}>
                  <Pic img={it.img} sizes="100vw" />
                </div>
              </div>
            </li>
          ))}
        </ol>

        <div className="relative hidden lg:col-span-7 lg:block">
          <div className="sticky top-28 overflow-hidden rounded-[2rem] border border-white/10 shadow-[0_60px_120px_-40px_rgba(0,0,0,0.9)]" style={{ aspectRatio: "4/5", maxHeight: "calc(100vh - 9rem)" }}>
            <AnimatePresence initial={false}>
              <motion.div
                key={active}
                className="absolute inset-0"
                initial={reduce ? false : { clipPath: "inset(100% 0% 0% 0%)", scale: 1.12 }}
                animate={{ clipPath: "inset(0% 0% 0% 0%)", scale: 1 }}
                exit={{ opacity: 0.6 }}
                transition={{ duration: 1.1, ease: EASE }}
              >
                <Pic img={items[active]!.img} sizes="(min-width:1320px) 720px, 55vw" />
              </motion.div>
            </AnimatePresence>
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between rounded-2xl border border-white/15 bg-black/35 px-5 py-3.5 backdrop-blur-xl">
              <span className="text-sm font-medium text-white">{items[active]!.img.caption}</span>
              <span className="font-mono text-xs text-white/60">
                {String(active + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
