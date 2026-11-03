/**
 * Görsel site haritası (Image SEO): her sayfa ve o sayfada yayınlanan gerçek uygulama fotoğrafları.
 * Görsel adresleri build'de üretilen optimize sürümlerdir (1200 px JPG; şemadaki adreslerle aynı).
 */
import type { APIRoute } from "astro";
import { getImage } from "astro:assets";
import { site } from "@/config/site";
import { services, familyList, servicesOf } from "@/data/services";
import { allPhotos, isOwn, type Photo } from "@/data/photos";

const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

export const GET: APIRoute = async () => {
  const pages: { loc: string; photos: Photo[] }[] = [
    { loc: "/", photos: allPhotos.slice(0, 8) },
    { loc: "/uygulamalarimiz/", photos: allPhotos },
    ...familyList.map((f) => ({ loc: `/${f.slug}/`, photos: [f.heroPhoto, ...servicesOf(f.id).flatMap((s) => s.photos.filter(isOwn))] })),
    ...services.filter((s) => s.photos.some(isOwn)).map((s) => ({ loc: `/${s.slug}/`, photos: s.photos.filter(isOwn) })),
  ];
  const urlFor = new Map<string, string>();
  for (const p of allPhotos) {
    const img = await getImage({ src: p.src, width: 1200, format: "jpg", quality: 80 });
    urlFor.set(p.id, new URL(img.src, site.url).href);
  }
  const body = pages
    .map(({ loc, photos }) => {
      const uniq = photos.filter((p, i) => photos.findIndex((q) => q.id === p.id) === i);
      return `  <url>\n    <loc>${site.url}${loc}</loc>\n${uniq
        .map((p) => `    <image:image>\n      <image:loc>${urlFor.get(p.id)}</image:loc>\n    </image:image>`)
        .join("\n")}\n  </url>`;
    })
    .join("\n");
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<!-- ${esc(site.name)} görsel site haritası -->\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n${body}\n</urlset>\n`;
  return new Response(xml, { headers: { "Content-Type": "application/xml; charset=utf-8" } });
};
