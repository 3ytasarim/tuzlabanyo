// Build çıktısı denetimi: `npm run build` sonunda çalışır, sorun varsa exit 1.
// Kontroller: canonical, tek H1, title/description, img alt, JSON-LD geçerliliği,
// kırık iç bağlantı ve çapalar, doğrulanmamış iletişim verisinin sızması.
import { readFileSync, readdirSync, statSync, existsSync } from "node:fs";
import { join, relative, sep } from "node:path";
import { fileURLToPath } from "node:url";

const DIST = fileURLToPath(new URL("../../dist/", import.meta.url));
const SITE = "https://tuzladus.com.tr";

// Yayına girmemesi gereken değerler. (GSM, adres ve WhatsApp işletme tarafından doğrulandı.)
const FORBIDDEN = [
  { re: /localhost|127\.0\.0\.1/, why: "yerel adres" },
];

const walk = (dir) =>
  readdirSync(dir).flatMap((f) => {
    const p = join(dir, f);
    return statSync(p).isDirectory() ? walk(p) : [p];
  });

const htmlFiles = walk(DIST).filter((f) => f.endsWith(".html"));
const errors = [];
const err = (file, msg) => errors.push(`${relative(DIST, file).split(sep).join("/")}: ${msg}`);

const routeExists = (pathname) => {
  const clean = decodeURIComponent(pathname.split("#")[0].split("?")[0]);
  if (clean === "/") return existsSync(join(DIST, "index.html"));
  const p = join(DIST, clean);
  return existsSync(p) && (statSync(p).isFile() || existsSync(join(p, "index.html")));
};

const pages = new Map();
for (const file of htmlFiles) {
  const html = readFileSync(file, "utf8");
  const rel = "/" + relative(DIST, file).split(sep).join("/").replace(/index\.html$/, "");
  pages.set(rel, html);
}

for (const file of htmlFiles) {
  const html = readFileSync(file, "utf8");
  const is404 = file.endsWith("404.html");

  const h1 = html.match(/<h1[\s>]/g)?.length ?? 0;
  if (h1 !== 1) err(file, `H1 sayısı ${h1} (1 olmalı)`);

  const title = html.match(/<title>([^<]*)<\/title>/)?.[1] ?? "";
  if (!title || title.length > 65) err(file, `title eksik ya da uzun (${title.length})`);
  const desc = html.match(/<meta name="description" content="([^"]*)"/)?.[1] ?? "";
  if (desc.length < 70 || desc.length > 160) err(file, `description uzunluğu ${desc.length} (70–160)`);

  const canonical = html.match(/<link rel="canonical" href="([^"]+)"/)?.[1];
  if (!canonical) err(file, "canonical yok");
  else if (!canonical.startsWith(`${SITE}/`)) err(file, `canonical yanlış host: ${canonical}`);
  else if (!is404 && !canonical.endsWith("/")) err(file, `canonical sonda / yok: ${canonical}`);

  if (!/property="og:image" content="https:\/\/tuzladus\.com\.tr\//.test(html)) err(file, "og:image mutlak değil");

  for (const img of html.matchAll(/<img\b[^>]*>/g)) {
    if (!/\salt="/.test(img[0])) err(file, `alt özniteliği olmayan img: ${img[0].slice(0, 80)}`);
    if (!/\swidth="\d+"/.test(img[0]) || !/\sheight="\d+"/.test(img[0])) err(file, `boyutsuz img: ${img[0].slice(0, 80)}`);
  }

  for (const m of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
    try {
      JSON.parse(m[1]);
    } catch {
      err(file, "geçersiz JSON-LD");
    }
  }

  const ids = new Set([...html.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1]));
  for (const m of html.matchAll(/\shref="([^"]+)"/g)) {
    const href = m[1];
    if (/^(https?:|tel:|mailto:|data:)/.test(href) && !href.startsWith(SITE)) continue;
    const path = href.startsWith(SITE) ? href.slice(SITE.length) || "/" : href;
    if (path.startsWith("#")) {
      if (path.length > 1 && !ids.has(path.slice(1))) err(file, `kırık çapa: ${href}`);
      continue;
    }
    const [p, hash] = path.split("#");
    if (!routeExists(p)) err(file, `kırık iç bağlantı: ${href}`);
    else if (hash) {
      const target = pages.get(p.endsWith("/") ? p : p + "/") ?? "";
      if (target && !new RegExp(`\\sid="${hash}"`).test(target)) err(file, `kırık çapa: ${href}`);
    }
  }

  for (const f of FORBIDDEN) if (f.re.test(html)) err(file, `${f.why} çıktıda geçiyor`);
}

// Lisanslı stok görseller "kendi işimiz" sayılan yerlerde olmamalı (ana sayfa, galeri, görsel site haritası)
const STOCK = /_astro\/(kis-bahcesi-|pergole-|aluminyum-dograma-)[^"\s]*\.(avif|webp|jpg)/;
for (const rel of ["uygulamalarimiz/index.html", "image-sitemap.xml"]) {
  const p = join(DIST, rel);
  // header adacığının props verisi (mega menü küçük resimleri) hariç: yalnızca sayfa içeriği denetlenir
  if (existsSync(p) && STOCK.test(readFileSync(p, "utf8").replace(/<astro-island[^>]*component-url="[^"]*Header[^"]*"[^>]*>/g, ""))) errors.push(`${rel}: stok görsel kendi uygulama alanında geçiyor`);
}

const sitemap = join(DIST, "sitemap-0.xml");
if (!existsSync(sitemap)) errors.push("sitemap-0.xml yok");
else if (/404/.test(readFileSync(sitemap, "utf8"))) errors.push("sitemap 404 sayfasını içeriyor");

if (errors.length) {
  console.error(`\n✗ dist denetimi: ${errors.length} sorun\n  - ${errors.join("\n  - ")}\n`);
  process.exit(1);
}
console.log(`✓ dist denetimi: ${htmlFiles.length} HTML dosyası, sorun yok`);
