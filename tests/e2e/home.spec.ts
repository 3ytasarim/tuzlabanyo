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

const WIDTHS = [360, 375, 390, 768, 1024, 1440, 1920];

test.describe("Ana sayfa", () => {
  test("temel içerik ve SEO etiketleri", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveTitle(/Tuzla Duş/);
    await expect(page.locator("h1")).toHaveCount(1);
    await expect(page.locator("h1")).toContainText("Tuzla'da duşakabin ve cam balkon");
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", "https://tuzladus.com.tr/");
    const ld = await page.locator('script[type="application/ld+json"]').textContent();
    const graph = JSON.parse(ld ?? "{}")["@graph"] as { "@type": string }[];
    expect(graph.map((n) => n["@type"])).toEqual(["HomeAndConstructionBusiness", "WebSite"]);
  });

  test("hero görseli öncelikli yüklenir", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator('section[aria-labelledby="hero-title"] img[fetchpriority="high"]')).toHaveCount(1);
  });

  test("hizmet sekmeleri bento içeriğini değiştirir", async ({ page }) => {
    await page.goto("/");
    await hydrated(page, '[role="tablist"][aria-label="Hizmet grupları"]');
    const tabs = page.locator('[role="tablist"][aria-label="Hizmet grupları"]');
    await tabs.getByRole("tab", { name: "Balkon & Teras" }).click();
    await expect(page.locator('#hizmetler [role="tabpanel"] a[href="/kis-bahcesi/"]')).toBeVisible();
  });

  test("kabin stüdyosu: seçim çizimi, etiketi ve fotoğrafı değiştirir", async ({ page }) => {
    await page.goto("/");
    const studio = page.locator("[data-studio]");
    await studio.scrollIntoViewIfNeeded();
    const photo = studio.locator("[data-studio-photo]");
    const before = await photo.getAttribute("src");
    await studio.locator("label.chip", { hasText: "Krom" }).click();
    await studio.locator("label.chip", { hasText: "Şeffaf" }).click();
    await expect(studio.locator("svg.cabin")).toHaveAttribute("data-profile", "krom");
    await expect(studio.locator("[data-studio-label]")).toHaveText("Krom profil · şeffaf cam");
    await expect(photo).not.toHaveAttribute("src", before ?? "");
  });

  test("galeri: kare lightbox'ta açılır, ok tuşuyla gezinir, Esc ile kapanır", async ({ page }) => {
    await page.goto("/");
    await hydrated(page, "#uygulamalar li button");
    const btn = page.locator("#uygulamalar li button").first();
    await btn.click();
    const dialog = page.getByRole("dialog", { name: "Fotoğraf görüntüleyici" });
    await expect(dialog).toBeVisible();
    await expect(dialog).toContainText("1 /");
    await page.keyboard.press("ArrowRight");
    await expect(dialog).toContainText("2 /");
    await page.keyboard.press("Escape");
    await expect(dialog).toBeHidden();
  });

  test("SSS: cevaplar HTML'de, tıklayınca açılır", async ({ page }) => {
    await page.goto("/");
    await hydrated(page, 'section[aria-labelledby="sss-title"] button');
    const faq = page.locator('section[aria-labelledby="sss-title"]');
    expect(await faq.locator('[role="region"]').count()).toBeGreaterThanOrEqual(5);
    const q = faq.getByRole("button").nth(1);
    await q.click();
    await expect(q).toHaveAttribute("aria-expanded", "true");
  });

  test("axe: WCAG 2.2 AA ihlali yok", async ({ page }) => {
    test.setTimeout(90_000);
    await page.goto("/");
    for (let y = 0; y < 14000; y += 700) {
      await page.evaluate((v) => window.scrollTo(0, v), y);
      await page.waitForTimeout(120);
    }
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(1500);
    const r = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"]).analyze();
    expect(r.violations.map((v) => `${v.id}: ${v.nodes.map((n) => n.target.join(" ")).slice(0, 3).join(" | ")}`)).toEqual([]);
  });

  test("404 sayfası", async ({ page }) => {
    const res = await page.goto("/olmayan-sayfa/");
    expect(res?.status()).toBe(404);
    await expect(page.locator("h1")).toContainText("Bu sayfa yerinde yok");
  });
});

test.describe("Mobil menü", () => {
  test.skip(({ isMobile }) => !isMobile, "yalnız mobil");

  test("açılır ve Esc ile kapanır, odak düğmeye döner", async ({ page }) => {
    await page.goto("/");
    await hydrated(page, "header nav");
    const btn = page.getByRole("button", { name: "Menüyü aç" });
    await btn.click();
    const menu = page.locator("#mobil-menu");
    await expect(menu).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(menu).toBeHidden();
    await expect(page.getByRole("button", { name: "Menüyü aç" })).toBeFocused();
  });

  test("menü bağlantısı sayfaya gider", async ({ page }) => {
    await page.goto("/");
    await hydrated(page, "header nav");
    await page.getByRole("button", { name: "Menüyü aç" }).click();
    await page.locator("#mobil-menu > ul > li > a", { hasText: "Cam Balkon" }).click();
    await expect(page).toHaveURL(/\/cam-balkon-sistemleri\/$/);
  });

  test("altta sabit iletişim çubuğu görünür", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator(".mobile-bar")).toBeVisible();
  });
});

test.describe("Duyarlı düzen", () => {
  test.skip(({ isMobile }) => isMobile, "genişlikler masaüstü projesinde taranır");
  for (const width of WIDTHS) {
    test(`${width}px: yatay taşma yok`, async ({ page }) => {
      await page.setViewportSize({ width, height: 900 });
      await page.goto("/");
      await page.waitForTimeout(500);
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
      expect(overflow).toBeLessThanOrEqual(0);
    });
  }
});
