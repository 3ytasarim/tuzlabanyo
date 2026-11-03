/** Lenis yumuşak kaydırma (hareket azaltılmışsa devre dışı). Çapa bağlantıları Lenis ile kayar. */
import Lenis from "lenis";
import { useEffect } from "react";

export default function SmoothScroll() {
  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const lenis = new Lenis({ duration: 1.15, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), smoothWheel: true });
    let raf = 0;
    const loop = (t: number) => {
      lenis.raf(t);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement).closest<HTMLAnchorElement>('a[href^="#"], a[href^="/#"]');
      if (!a) return;
      const id = a.getAttribute("href")!.split("#")[1];
      const el = id && document.getElementById(id);
      if (el && (a.pathname === location.pathname || a.getAttribute("href")!.startsWith("#"))) {
        e.preventDefault();
        lenis.scrollTo(el, { offset: -90 });
        history.replaceState(null, "", `#${id}`);
      }
    };
    document.addEventListener("click", onClick);
    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener("click", onClick);
      lenis.destroy();
    };
  }, []);
  return null;
}
