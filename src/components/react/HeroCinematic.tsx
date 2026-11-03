/**
 * Ana sayfa hero: büyük bulanıklıktan netleşen başlık + 3B eğilen fotoğraf kompozisyonu (HeroVisual), mavi ışık hâlesi ve
 * akan hizmet bandı (Magic UI "Marquee"). Fotoğrafların hepsi işletmenin kendi uygulamalarıdır.
 */
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { ArrowRight, MessageCircle } from "lucide-react";
import { useRef } from "react";
import { BlurText, EASE, Magnetic, ShimmerLink } from "./primitives";
import HeroVisual from "./HeroVisual";
import AuroraBackground from "./AuroraBackground";
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
  const fade = useTransform(scrollYProgress, [0, 0.6], [1, reduce ? 1 : 0.2]);
  const fadeIn = (d: number) => ({
    initial: reduce ? false : ({ opacity: 0, y: 18, filter: "blur(8px)" } as const),
    animate: { opacity: 1, y: 0, filter: "blur(0px)" },
    transition: { duration: 1, ease: EASE, delay: d },
  });

  return (
    <section ref={ref} aria-labelledby="hero-title" className="relative isolate overflow-hidden pt-28 sm:pt-32">
      {/* arka plan: spotlight + aurora */}
      <AuroraBackground />

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

        {/* 3B fotoğraf kompozisyonu */}
        <div className="relative lg:col-span-6">
          <HeroVisual images={images} sectionRef={ref} />
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
