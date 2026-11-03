/**
 * Ana sayfa hero: büyük bulanıklıktan netleşen başlık + kaydırmaya bağlı paralaks fotoğraf sütunları
 * (Aceternity "parallax scroll" / 21st.dev "hero with image columns" kalıbı), mavi ışık hâlesi ve
 * akan hizmet bandı (Magic UI "Marquee"). Fotoğrafların hepsi işletmenin kendi uygulamalarıdır.
 */
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { ArrowRight, MessageCircle } from "lucide-react";
import { useRef } from "react";
import { BlurText, EASE, Magnetic, Pic, ShimmerLink } from "./primitives";
import type { Img } from "@/utils/img";

interface Props {
  images: [Img, Img, Img];
  wa: string | null;
  services: string[];
}

export default function HeroCinematic({ images, wa, services }: Props) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y1 = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -140]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -260]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -60]);
  const fade = useTransform(scrollYProgress, [0, 0.6], [1, reduce ? 1 : 0.2]);
  const fadeIn = (d: number) => ({
    initial: reduce ? false : ({ opacity: 0, y: 18, filter: "blur(8px)" } as const),
    animate: { opacity: 1, y: 0, filter: "blur(0px)" },
    transition: { duration: 1, ease: EASE, delay: d },
  });

  return (
    <section ref={ref} aria-labelledby="hero-title" className="relative isolate overflow-hidden pt-28 sm:pt-32">
      {/* arka plan: ızgara + ışık */}
      <div aria-hidden className="hero-grid-bg pointer-events-none absolute inset-0 -z-10" />
      <div aria-hidden className="pointer-events-none absolute -top-40 right-[-10%] -z-10 h-[46rem] w-[46rem] rounded-full bg-[radial-gradient(circle,rgba(47,125,225,0.32),transparent_62%)] blur-2xl" />
      <div aria-hidden className="pointer-events-none absolute left-[-15%] top-[30%] -z-10 h-[30rem] w-[30rem] rounded-full bg-[radial-gradient(circle,rgba(142,197,255,0.12),transparent_65%)] blur-2xl" />

      <div className="mx-auto grid max-w-[82.5rem] gap-14 px-5 pb-20 sm:px-8 lg:grid-cols-12 lg:gap-6 lg:px-10 lg:pb-28">
        <motion.div style={{ opacity: fade }} className="flex flex-col justify-center lg:col-span-6 lg:pr-6">
          <motion.p {...fadeIn(0)} className="inline-flex w-fit items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.04] py-1.5 pl-2 pr-4 text-[0.8125rem] text-white/70 backdrop-blur">
            <span className="relative flex size-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#8ec5ff] opacity-60" />
              <span className="relative inline-flex size-2.5 rounded-full bg-[#8ec5ff]" />
            </span>
            Tuzla · İstanbul — ölçüye göre imalat ve montaj
          </motion.p>

          <h1 id="hero-title" className="mt-7">
            <motion.span {...fadeIn(0.05)} className="block text-lg font-medium tracking-[-0.01em] text-white/55 sm:text-xl">
              Tuzla'da duşakabin ve cam balkon
            </motion.span>
            <span className="sr-only">Banyoda ve balkonda, camın temiz çizgisi.</span>
          </h1>
          <BlurText
            as="p"
            text="Banyoda ve balkonda,"
            accent="camın temiz çizgisi."
            delay={0.15}
            className="mt-3 text-[clamp(2.75rem,1.6rem+4.6vw,6rem)] font-semibold leading-[1] tracking-[-0.045em] text-white"
          />
          <motion.p {...fadeIn(0.6)} className="mt-8 max-w-lg text-[1.125rem] leading-relaxed text-white/60">
            Duşakabin, cam balkon ve cam sistemlerini her ölçüye imal ediyor, yerinde monte ediyoruz. Ölçüden montaja işin tamamı bizde.
          </motion.p>
          <motion.div {...fadeIn(0.75)} className="mt-10 flex flex-wrap items-center gap-3">
            <Magnetic>
              <ShimmerLink href="/teklif-al/" data-event="quote_click" data-event-location="hero">
                Teklif alın <ArrowRight aria-hidden className="size-4 transition-transform group-hover:translate-x-1" />
              </ShimmerLink>
            </Magnetic>
            {wa && (
              <Magnetic>
                <a href={wa} rel="noopener" target="_blank" data-event="whatsapp_click" data-event-location="hero" className="inline-flex min-h-14 items-center gap-2.5 rounded-full border border-white/12 bg-white/[0.04] px-6 font-semibold text-white backdrop-blur transition-colors hover:border-[#4ade80]/50 hover:bg-[#15803d]/20">
                  <MessageCircle aria-hidden className="size-5 text-[#4ade80]" /> WhatsApp'tan yazın
                  <span className="sr-only">(yeni sekmede açılır)</span>
                </a>
              </Magnetic>
            )}
          </motion.div>
        </motion.div>

        {/* Paralaks fotoğraf sütunları */}
        <div className="relative grid h-[34rem] grid-cols-3 gap-3 sm:h-[40rem] sm:gap-4 lg:col-span-6 lg:h-[46rem]">
          {[
            { img: images[0], y: y1, cls: "mt-16", d: 0.2 },
            { img: images[1], y: y2, cls: "mt-0", d: 0.35 },
            { img: images[2], y: y3, cls: "mt-28", d: 0.5 },
          ].map(({ img, y, cls, d }, i) => (
            <motion.figure
              key={img.id}
              style={{ y }}
              initial={reduce ? false : { opacity: 0, y: 60, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.3, ease: EASE, delay: d }}
              className={`relative h-[78%] overflow-hidden rounded-[1.5rem] border border-white/10 shadow-[0_40px_80px_-30px_rgba(0,0,0,0.8)] ${cls}`}
            >
              <Pic img={img} sizes="(min-width:1024px) 15vw, 32vw" priority={i === 1} imgClassName="scale-[1.06]" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <figcaption className="absolute bottom-3 left-3 right-3 rounded-full border border-white/15 bg-black/35 px-3 py-1.5 text-[0.6875rem] font-medium text-white/85 backdrop-blur-md sm:text-xs">
                {img.type}
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>

      {/* Akan hizmet bandı */}
      <div className="marquee-mask relative overflow-hidden border-y border-white/[0.07] py-5" id="urunler">
        <div className="marquee-track flex w-max gap-12">
          {[0, 1].map((c) => (
            <ul key={c} aria-hidden={c === 1 ? true : undefined} aria-label={c === 0 ? "Hizmetlerimiz" : undefined} className="flex shrink-0 items-center gap-12">
              {services.map((s) => (
                <li key={s} className="flex items-center gap-12 whitespace-nowrap text-xl font-medium tracking-[-0.02em] text-white/45 sm:text-2xl">
                  {s}
                  <span aria-hidden className="size-1.5 rounded-full bg-[#8ec5ff]/70" />
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
    </section>
  );
}
