/**
 * React adacıklarına (islands) hazır görsel verisi: Astro'da build sırasında optimize edilir,
 * bileşene düz nesne olarak geçer. AVIF/WebP srcset + büyük (lightbox) sürüm.
 */
import { getImage } from "astro:assets";
import type { Photo } from "@/data/photos";

export interface Img {
  id: string;
  src: string;
  srcSet: string;
  avifSrcSet: string;
  width: number;
  height: number;
  alt: string;
  caption: string;
  family: Photo["family"];
  type: string;
  full: string;
  fullW: number;
  fullH: number;
}

const WIDTHS = [480, 720, 960, 1280, 1600, 2000];

export async function toImg(p: Photo, opts: { widths?: number[]; ratio?: number; quality?: number } = {}): Promise<Img> {
  const usable = (opts.widths ?? WIDTHS).filter((w) => w <= p.src.width);
  const widths = usable.length ? usable : [p.src.width];
  const max = Math.max(...widths);
  const crop = opts.ratio ? { height: Math.round(max / opts.ratio), fit: "cover" as const } : {};
  const q = opts.quality ?? 72;
  const [webp, avif, full] = await Promise.all([
    getImage({ src: p.src, widths, width: max, format: "webp", quality: q, ...crop }),
    getImage({ src: p.src, widths, width: max, format: "avif", quality: q - 8, ...crop }),
    getImage({ src: p.src, width: Math.min(2000, p.src.width), format: "webp", quality: 80 }),
  ]);
  return {
    id: p.id,
    src: webp.src,
    srcSet: webp.srcSet.attribute,
    avifSrcSet: avif.srcSet.attribute,
    width: Number(webp.attributes.width),
    height: Number(webp.attributes.height),
    alt: p.alt,
    caption: p.caption,
    family: p.family,
    type: p.type,
    full: full.src,
    fullW: Number(full.attributes.width),
    fullH: Number(full.attributes.height),
  };
}

export const toImgs = (ps: Photo[], opts?: Parameters<typeof toImg>[1]) => Promise.all(ps.map((p) => toImg(p, opts)));
