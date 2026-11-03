/**
 * İç sayfa galerisi: filtre (animasyonlu sekme) + layout animasyonlu masonry ızgara + paylaşımlı geçişli lightbox.
 * Yalnızca işletmenin kendi uygulama fotoğrafları verilir.
 */
import { AnimatePresence, LayoutGroup, motion, useReducedMotion } from "motion/react";
import { useMemo, useRef, useState } from "react";
import { EASE, Pic } from "./primitives";
import { Lightbox } from "./Lightbox";
import { CursorFollower } from "./CursorFollower";
import type { Img } from "@/utils/img";

export default function PhotoGallery({ items, filters, keys, group }: { items: Img[]; filters?: { id: string; label: string }[]; keys?: string[]; group: string }) {
  const [f, setF] = useState("all");
  const [lb, setLb] = useState<number | null>(null);
  const reduce = useReducedMotion();
  const root = useRef<HTMLDivElement>(null);
  const keyOf = (i: number) => keys?.[i] ?? items[i]!.family;
  const visible = useMemo(() => items.map((it, i) => ({ it, k: keyOf(i) })).filter((x) => f === "all" || x.k === f).map((x) => x.it), [f, items]);
  const all = [{ id: "all", label: "Tümü" }, ...(filters ?? [])].filter((x) => x.id === "all" || items.some((_, i) => keyOf(i) === x.id));

  return (
    <div ref={root}>
      {filters && all.length > 2 && (
        <LayoutGroup id={`${group}-filters`}>
          <div role="group" aria-label="Fotoğrafları filtrele" className="mb-10 inline-flex flex-wrap gap-1 rounded-full border border-white/10 bg-white/[0.03] p-1.5">
            {all.map((x) => (
              <button key={x.id} type="button" aria-pressed={f === x.id} onClick={() => setF(x.id)} className={`relative min-h-10 rounded-full px-4 text-sm font-semibold transition-colors ${f === x.id ? "text-[#06080a]" : "text-white/70 hover:text-white"}`}>
                {f === x.id && <motion.span layoutId={`${group}-pill`} className="absolute inset-0 rounded-full bg-[#f2f5f7]" transition={{ type: "spring", stiffness: 400, damping: 34 }} />}
                <span className="relative">{x.label}</span>
              </button>
            ))}
          </div>
        </LayoutGroup>
      )}
      <motion.ul layout className="columns-2 gap-4 lg:columns-3">
        <AnimatePresence mode="popLayout">
          {visible.map((it) => (
            <motion.li
              key={it.id}
              layout
              initial={reduce ? false : { opacity: 0, y: 24, filter: "blur(8px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, margin: "0px 0px -6% 0px" }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.8, ease: EASE }}
              className="mb-4 break-inside-avoid"
            >
              <figure>
                <motion.button
                  type="button"
                  {...(reduce ? {} : { layoutId: `${group}-${it.id}` })}
                  onClick={() => setLb(visible.indexOf(it))}
                  data-cursor
                  aria-label={`${it.caption}: büyüt`}
                  className="group relative block w-full overflow-hidden rounded-[1.25rem] border border-white/10"
                  style={{ aspectRatio: `${it.width} / ${it.height}` }}
                >
                  <Pic img={it} sizes="(min-width:1320px) 420px, (min-width:1024px) 31vw, 48vw" imgClassName="transition-transform duration-[1400ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.05]" />
                  <span className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                </motion.button>
                <figcaption className="mt-2.5 text-sm text-white/55">{it.caption}</figcaption>
              </figure>
            </motion.li>
          ))}
        </AnimatePresence>
      </motion.ul>
      <CursorFollower target={root} />
      <Lightbox items={visible} index={lb} onClose={() => setLb(null)} onIndex={setLb} group={group} />
    </div>
  );
}
