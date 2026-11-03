/**
 * Hizmetler: sekmeli (Banyo / Balkon & Teras) bento ızgara. Sekme değişince kartlar layout animasyonuyla
 * yer değiştirir (21st.dev "animated tabs" + Magic UI "Bento grid" + "MagicCard" kalıpları).
 */
import { AnimatePresence, LayoutGroup, motion, useReducedMotion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { useState } from "react";
import { BlurText, EASE, Pic, SpotlightCard } from "./primitives";
import type { Img } from "@/utils/img";

export interface BentoItem {
  name: string;
  href: string;
  line: string;
  img: Img | null;
}
export interface BentoGroup {
  id: string;
  label: string;
  eyebrow: string;
  hubHref: string;
  hubLabel: string;
  items: BentoItem[];
}

const spans = ["sm:col-span-2 sm:row-span-2", "", "", "sm:col-span-2", "", ""];

export default function ServicesBento({ groups }: { groups: BentoGroup[] }) {
  const [active, setActive] = useState(0);
  const reduce = useReducedMotion();
  const g = groups[active]!;

  return (
    <section id="hizmetler" aria-labelledby="hizmetler-title" className="relative mx-auto max-w-[82.5rem] px-5 py-24 sm:px-8 lg:px-10 lg:py-36">
      <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#8ec5ff]">Hizmetler</p>
          <BlurText id="hizmetler-title" text="Banyodan terasa," accent="tek elden cam." className="mt-5 text-[clamp(2.25rem,1.4rem+3vw,4.25rem)] font-semibold leading-[1.02] tracking-[-0.045em] text-white" />
        </div>
        <LayoutGroup id="svc-tabs">
          <div role="tablist" aria-label="Hizmet grupları" className="inline-flex w-fit rounded-full border border-white/10 bg-white/[0.03] p-1.5 backdrop-blur">
            {groups.map((t, i) => (
              <button
                key={t.id}
                role="tab"
                id={`tab-${t.id}`}
                aria-selected={active === i}
                aria-controls={`panel-${t.id}`}
                onClick={() => setActive(i)}
                className={`relative min-h-11 rounded-full px-5 text-sm font-semibold transition-colors ${active === i ? "text-[#06080a]" : "text-white/70 hover:text-white"}`}
              >
                {active === i && <motion.span layoutId="svc-tab-pill" className="absolute inset-0 -z-0 rounded-full bg-[#f2f5f7]" transition={{ type: "spring", stiffness: 400, damping: 34 }} />}
                <span className="relative">{t.label}</span>
              </button>
            ))}
          </div>
        </LayoutGroup>
      </div>

      <div id={`panel-${g.id}`} role="tabpanel" aria-labelledby={`tab-${g.id}`} className="mt-14">
        <AnimatePresence mode="wait">
          <motion.ul
            key={g.id}
            className="grid auto-rows-[15rem] grid-cols-1 gap-4 sm:grid-cols-2 lg:auto-rows-[17rem] lg:grid-cols-4"
            initial={reduce ? false : "hidden"}
            animate="show"
            exit="exit"
            variants={{ show: { transition: { staggerChildren: 0.06 } } }}
          >
            {g.items.map((it, i) => (
              <motion.li
                key={it.href}
                className={`${spans[i % spans.length]} ${i === 0 ? "lg:col-span-2 lg:row-span-2" : ""}`}
                variants={{
                  hidden: { opacity: 0, y: 30, filter: "blur(10px)" },
                  show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.8, ease: EASE } },
                  exit: { opacity: 0, y: -10, filter: "blur(6px)", transition: { duration: 0.25 } },
                }}
              >
                <SpotlightCard className="h-full bg-white/[0.03]">
                  <a href={it.href} className="group relative flex h-full flex-col justify-end overflow-hidden rounded-[inherit] p-6">
                    {it.img ? (
                      <Pic img={it.img} sizes={i === 0 ? "(min-width:1024px) 40vw, 100vw" : "(min-width:1024px) 20vw, 50vw"} className="absolute inset-0" imgClassName="transition-transform duration-[1400ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.07]" />
                    ) : (
                      <div aria-hidden className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,rgba(47,125,225,0.35),transparent_60%)]">
                        <div className="hero-grid-bg absolute inset-0" />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />
                    <div className="relative z-10 flex items-end justify-between gap-4">
                      <div>
                        <h3 className={`font-semibold tracking-[-0.03em] text-white ${i === 0 ? "text-3xl" : "text-xl"}`}>{it.name}</h3>
                        <p className="mt-1.5 max-w-xs text-sm text-white/70">{it.line}</p>
                      </div>
                      <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-md transition-all duration-500 group-hover:rotate-45 group-hover:bg-white group-hover:text-black">
                        <ArrowUpRight aria-hidden className="size-5" />
                      </span>
                    </div>
                  </a>
                </SpotlightCard>
              </motion.li>
            ))}
          </motion.ul>
        </AnimatePresence>
        <a href={g.hubHref} className="mt-8 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-[#8ec5ff] hover:text-white">
          {g.hubLabel} <ArrowUpRight aria-hidden className="size-4" />
        </a>
      </div>
    </section>
  );
}
