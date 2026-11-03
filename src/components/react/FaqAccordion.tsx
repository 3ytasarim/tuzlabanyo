/** Animasyonlu SSS akordeonu (shadcn Accordion + motion yükseklik). Cevaplar SSR'da HTML'de bulunur. */
import { motion } from "motion/react";
import { Plus } from "lucide-react";
import { useId, useState } from "react";
import { BlurText, EASE } from "./primitives";

export default function FaqAccordion({ items, eyebrow = "Sık sorulanlar", title = "Karar vermeden önce", accent = "bilinmesi gerekenler.", headingId = "sss-title" }: { items: { q: string; a: string }[]; eyebrow?: string; title?: string; accent?: string; headingId?: string }) {
  const [open, setOpen] = useState<number | null>(0);
  const uid = useId();
  return (
    <section aria-labelledby={headingId} className="relative mx-auto grid max-w-[82.5rem] gap-12 px-5 py-24 sm:px-8 lg:grid-cols-12 lg:px-10 lg:py-36">
      <div className="lg:col-span-4">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#8ec5ff]">{eyebrow}</p>
        <BlurText id={headingId} text={title} accent={accent} className="mt-5 text-[clamp(2rem,1.3rem+2.4vw,3.5rem)] font-semibold leading-[1.05] tracking-[-0.045em] text-white" />
      </div>
      <ul className="lg:col-span-7 lg:col-start-6">
        {items.map((it, i) => {
          const isOpen = open === i;
          return (
            <li key={it.q} className="border-b border-white/10">
              <h3>
                <button
                  type="button"
                  id={`${uid}-q${i}`}
                  aria-expanded={isOpen}
                  aria-controls={`${uid}-a${i}`}
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-6 py-6 text-left text-lg font-medium tracking-[-0.02em] text-white sm:text-xl"
                >
                  {it.q}
                  <motion.span animate={{ rotate: isOpen ? 45 : 0 }} transition={{ duration: 0.4, ease: EASE }} className={`inline-flex size-10 shrink-0 items-center justify-center rounded-full border transition-colors ${isOpen ? "border-[#8ec5ff] bg-[#8ec5ff] text-[#06080a]" : "border-white/15 text-white"}`}>
                    <Plus aria-hidden className="size-5" />
                  </motion.span>
                </button>
              </h3>
              {/* Cevap her zaman HTML'de (SEO / FAQ şeması); kapalıyken yükseklik 0 ve inert */}
              <motion.div
                    id={`${uid}-a${i}`}
                    role="region"
                    aria-labelledby={`${uid}-q${i}`}
                initial={false}
                animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
                inert={!isOpen}
                    transition={{ duration: 0.5, ease: EASE }}
                    className="overflow-hidden"
                  >
                    <p className="max-w-2xl pb-7 leading-relaxed text-white/60">{it.a}</p>
              </motion.div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
