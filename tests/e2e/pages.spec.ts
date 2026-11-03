import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

/** client:visible adacığının etkinleşmesini (hydrate) bekler. */
async function hydrated(page: import("@playwright/test").Page, selector: string) {
  await page.locator(selector).first().scrollIntoViewIfNeeded();
  await page.waitForFunction((sel) => {
    const el = document.querySelector(sel);
    const island = el?.closest("astro-island");
    return !!el && (!island || !island.hasAttribute("ssr"));
  }, selector);
}
import { readFileSync } from "node:fs";

// Sitemap'teki tüm sayfalar (build çıktısından)
const sitemap = readFileSync(new URL("../../dist/sitemap-0.xml", import.meta.url), "utf8");
const paths = [...sitemap.matchAll(/<loc>https:\/\/tuzladus\.com\.tr([^<]*)<\/loc>/g)].map((m) => m[1]!);
const servicePaths = paths.filter((p) => !["/", "/uygulamalarimiz/", "/hizmetlerimiz/", "/hakkimizda/", "/iletisim/", "/teklif-al/", "/sss/", "/gizlilik-politikasi/", "/dusakabin-modelleri/", "/cam-balkon-sistemleri/"].includes(p));

test("sitemap en az 20 sayfa içerir", () => {
  expect(paths.length).toBeGreaterThanOrEqual(20);
  expect(servicePaths.length).toBe(10);
});

test.describe("Her sayfa", () => {
  test.skip(({ isMobile }) => isMobile, "masaüstünde bir kez taranır");
  for (const p of paths) {
    test(`${p}: 200, tek H1, canonical, JSON-LD`, async ({ page }) => {
      const res = await page.goto(p);
      expect(res?.status()).toBe(200);
      await expect(page.locator("h1")).toHaveCount(1);
      await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", `https://tuzladus.com.tr${p}`);
      if (p !== "/gizlilik-politikasi/") {
        const ld = await page.locator('script[type="application/ld+json"]').first().textContent();
        expect(() => JSON.parse(ld ?? "")).not.toThrow();
      }
      if (p !== "/") await expect(page.locator('nav[aria-label="Sayfa konumu"]')).toHaveCount(1);
    });
  }
});

test.describe("Hizmet sayfaları", () => {
  test.skip(({ isMobile }) => isMobile, "masaüstü");
  for (const p of servicePaths) {
    test(`${p}: Service + BreadcrumbList + FAQPage şeması, WhatsApp mesajında konu`, async ({ page }) => {
      await page.goto(p);
      const graph = JSON.parse((await page.locator('script[type="application/ld+json"]').textContent()) ?? "{}")["@graph"] as { "@type": string | string[] }[];
      const types = graph.map((n) => n["@type"]).flat();
      for (const t of ["WebPage", "BreadcrumbList", "Service", "FAQPage"]) expect(types).toContain(t);
      const wa = await page.locator('.rail a[href*="wa.me"]').getAttribute("href");
      expect(wa).toMatch(/^https:\/\/wa\.me\/905413954241\?text=/);
      const name = (await page.locator("h1").innerText()).toLocaleLowerCase("tr").replace(/\s+/g, " ").trim();
      expect(decodeURIComponent(wa!.split("text=")[1]!)).toContain(name);
    });
  }
});

test("iletişim bağlantıları yalnızca doğrulanmış numaralara gider", async ({ page }) => {
  await page.goto("/iletisim/");
  for (const href of await page.locator('a[href^="tel:"]').evaluateAll((els) => els.map((e) => e.getAttribute("href")))) {
    expect(["tel:+902163954241", "tel:+905413954241"]).toContain(href);
  }
  for (const href of await page.locator('a[href*="wa.me"]').evaluateAll((els) => els.map((e) => e.getAttribute("href")))) {
    expect(href).toMatch(/^https:\/\/wa\.me\/905413954241/);
  }
});

test("teklif formu seçimlerden WhatsApp mesajı oluşturur, veri göndermez", async ({ page }) => {
  const posts: string[] = [];
  page.on("request", (r) => r.method() !== "GET" && posts.push(r.url()));
  await page.goto("/teklif-al/");
  await page.locator("label.q-chip", { hasText: "Isıcamlı cam balkon" }).click();
  await page.locator('input[name="width"]').fill("320");
  await page.locator('input[name="height"]').fill("240");
  await page.locator('input[name="area"]').fill("Tuzla, Aydınlı");
  await expect(page.locator("[data-quote-preview]")).toContainText("ısıcamlı cam balkon için fiyat teklifi");
  await expect(page.locator("[data-quote-preview]")).toContainText("320 x 240 cm");
  // window.open yakalanır (testte dış siteye gidilmez)
  await page.evaluate(() => {
    const w = window as unknown as { __opened: string[] };
    w.__opened = [];
    window.open = ((u: string) => (w.__opened.push(u), null)) as typeof window.open;
  });
  await page.getByRole("button", { name: "WhatsApp'ta gönder" }).click();
  const url = decodeURIComponent(await page.evaluate(() => (window as unknown as { __opened: string[] }).__opened[0] ?? ""));
  expect(url).toContain("905413954241");
  expect(url).toContain("Yer: Tuzla, Aydınlı");
  expect(posts).toEqual([]);
});

test("galeri sayfası: filtre ve lightbox", async ({ page }) => {
  await page.goto("/uygulamalarimiz/");
  await hydrated(page, '[aria-label="Fotoğrafları filtrele"]');
  const group = page.getByRole("group", { name: "Fotoğrafları filtrele" });
  await group.getByRole("button", { name: "Cam balkon" }).click();
  await expect(group.getByRole("button", { name: "Cam balkon" })).toHaveAttribute("aria-pressed", "true");
  await page.waitForTimeout(800);
  const cards = page.locator('section[aria-labelledby="galeri-title"] li button');
  expect(await cards.count()).toBe(2);
  await cards.first().click();
  await expect(page.getByRole("dialog", { name: "Fotoğraf görüntüleyici" })).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(page.getByRole("dialog", { name: "Fotoğraf görüntüleyici" })).toBeHidden();
});

test.describe("Yapışkan iletişim", () => {
  test("masaüstünde sağ kenar, mobilde alt çubuk görünür", async ({ page, isMobile }) => {
    await page.goto("/kose-dusakabin/");
    if (isMobile) {
      await expect(page.locator(".mobile-bar")).toBeVisible();
      await expect(page.locator(".mobile-bar a")).toHaveCount(3);
    } else {
      await expect(page.locator(".rail")).toBeVisible();
      await expect(page.locator(".rail a")).toHaveCount(3);
    }
  });
});

test.describe("Erişilebilirlik (axe, WCAG 2.2 AA)", () => {
  for (const p of ["/kose-dusakabin/", "/kis-bahcesi/", "/cam-balkon-sistemleri/", "/teklif-al/", "/iletisim/", "/uygulamalarimiz/", "/hakkimizda/", "/sss/"]) {
    test(p, async ({ page }) => {
      test.setTimeout(90_000);
      await page.goto(p);
      for (let y = 0; y < 9000; y += 700) {
        await page.evaluate((v) => window.scrollTo(0, v), y);
        await page.waitForTimeout(100);
      }
      await page.evaluate(() => window.scrollTo(0, 0));
      await page.waitForTimeout(1500);
      const r = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"]).analyze();
      expect(r.violations.map((v) => `${v.id}: ${v.nodes.map((n) => n.target.join(" ")).slice(0, 3).join(" | ")}`)).toEqual([]);
    });
  }
});

test.describe("Duyarlı düzen (iç sayfalar)", () => {
  test.skip(({ isMobile }) => isMobile, "masaüstü projesinde genişlik taranır");
  for (const w of [360, 768, 1024, 1440]) {
    for (const p of ["/kose-dusakabin/", "/cam-balkon-sistemleri/", "/teklif-al/", "/iletisim/"]) {
      test(`${w}px ${p}: yatay taşma yok`, async ({ page }) => {
        await page.setViewportSize({ width: w, height: 900 });
        await page.goto(p);
        expect(await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth)).toBeLessThanOrEqual(0);
      });
    }
  }
});
