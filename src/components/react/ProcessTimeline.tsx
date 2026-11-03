/**
 * Süreç zaman çizelgesi (Aceternity "Timeline" kalıbı): kaydırdıkça dolan ışık hattı, sırayla beliren
 * adım kartları ve büyük sayılar.
 */
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "motion/react";
import { useRef } from "react";
import { BlurText, EASE } from "./primitives";

export default function ProcessTimeline({ steps, title = "Ölçüden montaja,", accent = "beş adım." }: { steps: { title: string; text: string }[]; title?: string; accent?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 70%", "end 60%"] });
  const h = useSpring(useTransform(scrollYProgress, [0, 1], ["0%", "100%"]), { stiffness: 90, damping: 26 });

  return (
    <section id="surec" aria-labelledby="surec-title" className="relative mx-auto max-w-[82.5rem] px-5 py-24 sm:px-8 lg:px-10 lg:py-36">
      <div className="grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-32">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#8ec5ff]">Süreç</p>
            <BlurText id="surec-title" text={title} accent={accent} className="mt-5 text-[clamp(2.25rem,1.4rem+3vw,4.25rem)] font-semibold leading-[1.02] tracking-[-0.045em] text-white" />
            <p className="mt-6 max-w-md text-lg leading-relaxed text-white/60">Hazır ölçü değil, sizin alanınız esas alınır. Bu yüzden süreç ölçüyle başlar ve montajla biter.</p>
          </div>
        </div>
        <div ref={ref} className="relative lg:col-span-6 lg:col-start-7">
          <div aria-hidden className="absolute bottom-0 left-[1.6rem] top-0 w-px bg-white/10">
            <motion.div style={{ height: reduce ? "100%" : h }} className="w-px bg-gradient-to-b from-[#8ec5ff] via-[#2f7de1] to-transparent shadow-[0_0_18px_2px_rgba(47,125,225,0.6)]" />
          </div>
          <ol className="space-y-6">
            {steps.map((s, i) => (
              <motion.li
                key={s.title}
                initial={reduce ? false : { opacity: 0, x: 24, filter: "blur(8px)" }}
                whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                viewport={{ once: true, margin: "0px 0px -15% 0px" }}
                transition={{ duration: 0.9, ease: EASE }}
                className="relative pl-16"
              >
                <span className="absolute left-0 top-6 flex size-[3.25rem] items-center justify-center rounded-full border border-white/12 bg-[#0a0e11] font-mono text-sm text-[#8ec5ff] shadow-[0_0_0_6px_#06080a]">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <article className="rounded-[1.5rem] border border-white/[0.08] bg-gradient-to-br from-white/[0.06] to-white/[0.01] p-7 backdrop-blur">
                  <h3 className="text-2xl font-semibold tracking-[-0.03em] text-white">{s.title}</h3>
                  <p className="mt-3 leading-relaxed text-white/60">{s.text}</p>
                </article>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
