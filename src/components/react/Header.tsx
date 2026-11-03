/**
 * Yüzen cam navbar (21st.dev "floating navbar" + Aceternity "navbar menu" kalıpları):
 * - Kaydırınca daralır ve cama döner; aşağı kaydırınca gizlenir, yukarıda gelir.
 * - Masaüstü mega menü: hizmet listesi + üzerine gelinen hizmetin görseli (AnimatePresence).
 * - Mobil: tam ekran menü, kademeli giriş. Esc kapatır, odak yönetilir.
 */
import { AnimatePresence, motion, useMotionValueEvent, useReducedMotion, useScroll } from "motion/react";
import { ArrowUpRight, ChevronDown, FileText, Menu, Phone, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { EASE } from "./primitives";

export interface NavItem {
  label: string;
  href: string;
  line?: string;
  thumb?: string | null;
}
export interface NavFamily {
  label: string;
  hubLabel: string;
  hubHref: string;
  blurb: string;
  items: NavItem[];
}

interface Props {
  logo: { src: string; srcSet: string; width: number; height: number };
  families: NavFamily[];
  links: { label: string; href: string }[];
  phone: { href: string; label: string } | null;
  current: string;
}

export default function Header({ logo, families, links, phone, current }: Props) {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState<number | null>(null);
  const [hover, setHover] = useState(0);
  const [mobile, setMobile] = useState(false);
  const reduce = useReducedMotion();
  const closeTimer = useRef<number | undefined>(undefined);
  const menuBtn = useRef<HTMLButtonElement>(null);

  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setScrolled(y > 24);
    if (open === null && !mobile) setHidden(y > prev && y > 400);
  });

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(null);
        if (mobile) {
          setMobile(false);
          menuBtn.current?.focus();
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [mobile]);

  useEffect(() => {
    document.documentElement.style.overflow = mobile ? "hidden" : "";
  }, [mobile]);

  const openMenu = (i: number) => {
    window.clearTimeout(closeTimer.current);
    setOpen(i);
    setHover(0);
  };
  const scheduleClose = () => {
    closeTimer.current = window.setTimeout(() => setOpen(null), 160);
  };

  const isActive = (href: string) => current === href || (href !== "/" && current.startsWith(href));
  const fam = open !== null ? families[open] : null;

  return (
    <>
      <a href="#icerik" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[70] focus:rounded-full focus:bg-white focus:px-5 focus:py-3 focus:text-black">
        İçeriğe geç
      </a>
      <motion.header
        className="fixed inset-x-0 top-0 z-50 flex justify-center px-3 pt-3 sm:px-5"
        animate={{ y: hidden ? -110 : 0 }}
        transition={{ duration: 0.5, ease: EASE }}
        onMouseLeave={scheduleClose}
      >
        <motion.nav
          aria-label="Ana menü"
          className="relative flex w-full items-center justify-between gap-4 rounded-full border px-3 py-2 sm:px-4"
          animate={{
            maxWidth: scrolled ? 1180 : 1320,
            backgroundColor: scrolled ? "rgba(10,14,17,0.72)" : "rgba(10,14,17,0)",
            borderColor: scrolled ? "rgba(255,255,255,0.09)" : "rgba(255,255,255,0)",
            boxShadow: scrolled ? "0 20px 50px -20px rgba(0,0,0,0.7), inset 0 1px 0 rgba(255,255,255,0.06)" : "0 0 0 rgba(0,0,0,0)",
          }}
          transition={{ duration: 0.5, ease: EASE }}
          style={{ backdropFilter: scrolled ? "blur(20px) saturate(1.4)" : "none", WebkitBackdropFilter: scrolled ? "blur(20px) saturate(1.4)" : "none" }}
        >
          <a href="/" aria-label="Tuzla Duş ana sayfa" className="shrink-0 pl-1">
            <img src={logo.src} srcSet={logo.srcSet} width={logo.width} height={logo.height} alt="Tuzla Duş · Duş, Cam Balkon" className="h-10 w-auto xl:h-11" />
          </a>

          <ul className="hidden items-center gap-1 text-[0.9375rem] font-medium lg:flex">
            {families.map((f, i) => (
              <li key={f.label} onMouseEnter={() => openMenu(i)}>
                <button
                  type="button"
                  aria-expanded={open === i}
                  aria-controls={`mega-${i}`}
                  onClick={() => (open === i ? setOpen(null) : openMenu(i))}
                  onFocus={() => openMenu(i)}
                  className={`relative flex min-h-11 items-center gap-1 rounded-full px-4 transition-colors hover:text-white ${open === i || isActive(f.hubHref) ? "text-white" : "text-white/70"}`}
                >
                  {open === i && <motion.span layoutId="nav-pill" className="absolute inset-0 -z-10 rounded-full bg-white/[0.08]" transition={{ type: "spring", stiffness: 380, damping: 32 }} />}
                  {f.label}
                  <ChevronDown aria-hidden className={`size-4 transition-transform duration-300 ${open === i ? "rotate-180" : ""}`} />
                </button>
              </li>
            ))}
            {links.map((l, i) => (
              <li key={l.href} onMouseEnter={() => setOpen(null)} className={i > 1 ? "hidden xl:block" : ""}>
                <a href={l.href} aria-current={isActive(l.href) ? "page" : undefined} className={`relative flex min-h-11 items-center rounded-full px-4 transition-colors hover:text-white ${isActive(l.href) ? "text-white" : "text-white/70"}`}>
                  {isActive(l.href) && <span className="absolute inset-x-4 -bottom-0.5 h-px bg-gradient-to-r from-transparent via-[#8ec5ff] to-transparent" />}
                  {l.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            {phone && (
              <a href={phone.href} data-event="call_click" data-event-location="header" className="hidden min-h-11 items-center gap-2 rounded-full px-4 text-[0.9375rem] font-medium text-white/80 transition-colors hover:text-white sm:inline-flex">
                <Phone aria-hidden className="size-4" />
                <span className="hidden 2xl:inline">{phone.label}</span>
                <span className="2xl:hidden">Ara</span>
              </a>
            )}
            <a href="/teklif-al/" data-event="quote_click" data-event-location="header" className="shimmer group relative hidden min-h-11 items-center gap-2 overflow-hidden rounded-full bg-[#f2f5f7] px-5 text-[0.9375rem] font-semibold text-[#06080a] transition-transform hover:scale-[1.03] sm:inline-flex">
              <span aria-hidden className="shimmer-sweep pointer-events-none absolute inset-0" />
              <FileText aria-hidden className="relative size-4" />
              <span className="relative">Teklif al</span>
            </a>
            <button
              ref={menuBtn}
              type="button"
              aria-label={mobile ? "Menüyü kapat" : "Menüyü aç"}
              aria-expanded={mobile}
              aria-controls="mobil-menu"
              onClick={() => setMobile((m) => !m)}
              className="inline-flex size-11 items-center justify-center rounded-full bg-white/[0.06] text-white lg:hidden"
            >
              {mobile ? <X aria-hidden className="size-5" /> : <Menu aria-hidden className="size-5" />}
            </button>
          </div>

          {/* Mega menü */}
          <AnimatePresence>
            {fam && open !== null && (
              <motion.div
                id={`mega-${open}`}
                key={open}
                onMouseEnter={() => window.clearTimeout(closeTimer.current)}
                initial={reduce ? false : { opacity: 0, y: 10, scale: 0.98, filter: "blur(6px)" }}
                animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: 8, scale: 0.98, filter: "blur(6px)" }}
                transition={{ duration: 0.35, ease: EASE }}
                className="absolute left-1/2 top-[calc(100%+0.75rem)] hidden w-[min(56rem,calc(100vw-2rem))] -translate-x-1/2 overflow-hidden rounded-[1.75rem] border border-white/10 bg-[#0a0e11]/90 p-3 shadow-[0_40px_80px_-30px_rgba(0,0,0,0.85)] backdrop-blur-2xl lg:block"
              >
                <div className="grid grid-cols-[1.1fr_1fr] gap-3">
                  <div className="p-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/45">{fam.label}</p>
                    <p className="mt-2 max-w-sm text-sm leading-relaxed text-white/60">{fam.blurb}</p>
                    <ul className="mt-5 space-y-0.5">
                      {fam.items.map((it, k) => (
                        <li key={it.href} onMouseEnter={() => setHover(k)} onFocus={() => setHover(k)}>
                          <a href={it.href} className="group flex items-center justify-between gap-4 rounded-xl px-3 py-2.5 transition-colors hover:bg-white/[0.05]">
                            <span>
                              <span className="block font-medium text-white">{it.label}</span>
                              {it.line && <span className="block text-[0.8125rem] text-white/50">{it.line}</span>}
                            </span>
                            <ArrowUpRight aria-hidden className="size-4 text-white/40 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[#8ec5ff]" />
                          </a>
                        </li>
                      ))}
                    </ul>
                    <a href={fam.hubHref} className="mt-4 inline-flex items-center gap-1.5 px-3 text-sm font-semibold text-[#8ec5ff] hover:text-white">
                      {fam.hubLabel} <ArrowUpRight aria-hidden className="size-4" />
                    </a>
                  </div>
                  <div className="relative min-h-[22rem] overflow-hidden rounded-[1.25rem] bg-white/[0.03]">
                    <AnimatePresence mode="popLayout">
                      {fam.items[hover]?.thumb ? (
                        <motion.img
                          key={fam.items[hover]!.href}
                          src={fam.items[hover]!.thumb!}
                          alt=""
                          className="absolute inset-0 h-full w-full object-cover"
                          initial={{ opacity: 0, scale: 1.08 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.6, ease: EASE }}
                        />
                      ) : null}
                    </AnimatePresence>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                    <p className="absolute bottom-4 left-5 right-5 text-sm font-medium text-white">{fam.items[hover]?.label}</p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.nav>
      </motion.header>

      {/* Mobil tam ekran menü */}
      <AnimatePresence>
        {mobile && (
          <motion.div
            id="mobil-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Menü"
            className="fixed inset-0 z-40 overflow-y-auto bg-[#06080a]/95 px-6 pb-32 pt-28 backdrop-blur-2xl lg:hidden"
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.ul initial="hidden" animate="show" transition={{ staggerChildren: 0.05, delayChildren: 0.05 }}>
              {[...families.map((f) => ({ label: f.label, href: f.hubHref, sub: f.items })), ...links.map((l) => ({ label: l.label, href: l.href, sub: [] as NavItem[] }))].map((g) => (
                <motion.li
                  key={g.href}
                  variants={{ hidden: { opacity: 0, y: 24, filter: "blur(8px)" }, show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.6, ease: EASE } } }}
                  className="border-b border-white/10"
                >
                  <a href={g.href} onClick={() => setMobile(false)} className="flex min-h-16 items-center justify-between text-[1.75rem] font-semibold tracking-[-0.03em] text-white">
                    {g.label}
                    <ArrowUpRight aria-hidden className="size-6 text-[#8ec5ff]" />
                  </a>
                  {g.sub.length > 0 && (
                    <ul className="flex flex-wrap gap-2 pb-5">
                      {g.sub.map((s) => (
                        <li key={s.href}>
                          <a href={s.href} onClick={() => setMobile(false)} className="inline-flex min-h-10 items-center rounded-full border border-white/12 px-4 text-sm text-white/75">
                            {s.label}
                          </a>
                        </li>
                      ))}
                    </ul>
                  )}
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
