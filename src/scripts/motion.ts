/**
 * Sayfa geneli hareket sistemi (bağımlılıksız, ~2 KB).
 * - [data-reveal], [data-split="view"]: görünür olunca bir kez .is-visible
 * - [data-split="immediate"]: ilk karede .is-visible
 * - .scroll-progress: --progress (0–1)
 * - [data-header]: aşağı kaydırınca gizle, yukarıda göster
 * - [data-magnetic]: ince imleçli cihazda imlece hafif yaklaşma
 * - [data-parallax="px"]: imleç konumuna göre küçük kayma
 * Hareket azaltılmışsa yalnızca görünürlük sınıfları eklenir.
 */

const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
const finePointer = matchMedia("(hover: hover) and (pointer: fine)").matches;

// Görünürlük
const viewEls = document.querySelectorAll<HTMLElement>('[data-reveal], [data-split="view"], [data-observe]');
if ("IntersectionObserver" in window && !reduce) {
  const io = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (e.isIntersecting) {
          e.target.classList.add("is-visible");
          io.unobserve(e.target);
        }
      }
    },
    { rootMargin: "0px 0px -10% 0px", threshold: 0.12 },
  );
  viewEls.forEach((el) => io.observe(el));
} else {
  viewEls.forEach((el) => el.classList.add("is-visible"));
}
requestAnimationFrame(() =>
  document.querySelectorAll('[data-split="immediate"]').forEach((el) => el.classList.add("is-visible")),
);

// Kaydırma: ilerleme çizgisi + header
const bar = document.querySelector<HTMLElement>(".scroll-progress");
const header = document.querySelector<HTMLElement>("[data-header]");
let lastY = window.scrollY;
let ticking = false;
const onScroll = () => {
  const y = window.scrollY;
  const max = document.documentElement.scrollHeight - window.innerHeight;
  if (bar) bar.style.setProperty("--progress", String(max > 0 ? Math.min(1, y / max) : 0));
  if (header) {
    const menuOpen = document.documentElement.style.overflow === "hidden";
    header.classList.toggle("is-scrolled", y > 8);
    if (!menuOpen && !header.matches(":focus-within")) {
      header.classList.toggle("is-hidden", y > lastY && y > 320);
    }
  }
  lastY = y;
  ticking = false;
};
window.addEventListener(
  "scroll",
  () => {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(onScroll);
    }
  },
  { passive: true },
);
onScroll();

if (!reduce && finePointer) {
  // Mıknatıslı butonlar
  document.querySelectorAll<HTMLElement>("[data-magnetic]").forEach((el) => {
    el.addEventListener("pointermove", (e) => {
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left - r.width / 2) * 0.18;
      const y = (e.clientY - r.top - r.height / 2) * 0.28;
      el.style.transform = `translate(${x}px, ${y}px)`;
    });
    el.addEventListener("pointerleave", () => (el.style.transform = ""));
  });

  // İmleç paralaksı
  const par = document.querySelectorAll<HTMLElement>("[data-parallax]");
  if (par.length) {
    let raf = 0;
    window.addEventListener("pointermove", (e) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const nx = e.clientX / window.innerWidth - 0.5;
        const ny = e.clientY / window.innerHeight - 0.5;
        par.forEach((el) => {
          const k = Number(el.dataset.parallax) || 10;
          el.style.translate = `${(-nx * k).toFixed(1)}px ${(-ny * k).toFixed(1)}px`;
        });
      });
    });
  }
}

export {};
