/**
 * Gerçek uygulama fotoğrafları.
 * Tümü işletmenin Instagram hesabından (@tuzladus); açıklamalar fotoğrafta görülenle sınırlıdır.
 * Konum (semt) bilgisi işletme bildirmedikçe yazılmaz.
 */
import type { ImageMetadata } from "astro";

import kromSeffafKose from "@/assets/photos/krom-profil-seffaf-cam-kose-dusakabin.jpg";
import siyahBuzluOval from "@/assets/photos/siyah-profil-buzlu-cam-oval-dusakabin.jpg";
import kromBantliOval from "@/assets/photos/krom-profil-bantli-cam-oval-dusakabin.jpg";
import kromBantliOvalAcik from "@/assets/photos/krom-profil-bantli-cam-oval-dusakabin-acik.jpg";
import beyazIkiDuvar from "@/assets/photos/beyaz-profil-iki-duvar-arasi-surgulu-dusakabin.jpg";
import siyahBantliKose from "@/assets/photos/siyah-profil-bantli-cam-kose-dusakabin.jpg";
import geometrikKose from "@/assets/photos/geometrik-desenli-siyah-profil-kose-dusakabin.jpg";
import kromBantliKose from "@/assets/photos/krom-profil-bantli-cam-kose-dusakabin.jpg";
import kromBantliKoseAcik from "@/assets/photos/krom-profil-bantli-cam-kose-dusakabin-acik.jpg";
import kafesKose from "@/assets/photos/kafes-desenli-siyah-profil-kose-dusakabin.jpg";
import siyahIkiDuvar from "@/assets/photos/siyah-profil-iki-duvar-arasi-surgulu-dusakabin.jpg";
import surmeBalkon from "@/assets/photos/siyah-profil-surme-cam-balkon.jpg";
import isicamBalkon from "@/assets/photos/isicamli-siyah-profil-kose-cam-balkon.jpg";
// Lisanslı stok görseller (Unsplash Lisansı)
import kbCamTavan from "@/assets/photos/kis-bahcesi-cam-tavanli-oturma-alani.jpg";
import kbCamOda from "@/assets/photos/kis-bahcesi-eve-bitisik-cam-oda.jpg";
import pgSiyah from "@/assets/photos/pergole-siyah-aluminyum-bahce.jpg";
import pgLamel from "@/assets/photos/pergole-lamelli-bahce-oturma.jpg";
import alGenis from "@/assets/photos/aluminyum-dograma-genis-pencereler.jpg";
import alSiyah from "@/assets/photos/aluminyum-dograma-siyah-pencere.jpg";

export type Family = "dusakabin" | "cam-balkon";

export interface Photo {
  id: string;
  src: ImageMetadata;
  alt: string;
  /** Kısa başlık (galeri ve lightbox) */
  caption: string;
  family: Family;
  type: string;
  /** Instagram gönderi tarihi */
  date: string;
  /** "stock": lisanslı görsel; uygulama galerisine, "örneklerimiz" bölümlerine ve ImageObject şemasına girmez */
  source?: "own" | "stock";
}

export const photos = {
  geometrikKose: { id: "geometrik-kose", src: geometrikKose, family: "dusakabin", type: "Desenli siyah profil", date: "2026-06-10",
    caption: "Geometrik desenli köşe duşakabin",
    alt: "Siyah profilli, geometrik desenli buzlu camlı köşe duşakabin; yanında klozet ve ahşap kapı" },
  kafesKose: { id: "kafes-kose", src: kafesKose, family: "dusakabin", type: "Desenli siyah profil", date: "2026-07-21",
    caption: "Kafes desenli siyah profil köşe duşakabin",
    alt: "Kafes desenli siyah profilli, şeffaf camlı köşe duşakabin, açık renk fayanslı banyoda" },
  siyahIkiDuvar: { id: "siyah-iki-duvar", src: siyahIkiDuvar, family: "dusakabin", type: "İki duvar arası", date: "2026-10-03",
    caption: "Sabit panelli, sürgülü iki duvar arası duşakabin",
    alt: "Siyah profilli, sabit panel ve sürgülü kapıdan oluşan, bantlı buzlu camlı iki duvar arası duşakabin" },
  siyahBantliKose: { id: "siyah-bantli-kose", src: siyahBantliKose, family: "dusakabin", type: "Köşe", date: "2026-05-14",
    caption: "Siyah profil, bantlı cam köşe duşakabin",
    alt: "Siyah profilli, ortası buzlu bantlı camlı kare köşe duşakabin, koyu mermer desenli fayanslar önünde" },
  siyahBuzluOval: { id: "siyah-buzlu-oval", src: siyahBuzluOval, family: "dusakabin", type: "Oval", date: "2026-04-03",
    caption: "Siyah profil, buzlu cam oval duşakabin",
    alt: "Siyah profilli, buzlu camlı oval duşakabin, açık mermer desenli banyoda" },
  beyazIkiDuvar: { id: "beyaz-iki-duvar", src: beyazIkiDuvar, family: "dusakabin", type: "İki duvar arası", date: "2026-05-06",
    caption: "Geniş iki duvar arası sürgülü duşakabin",
    alt: "Beyaz profilli, iki duvar arasına kurulmuş geniş sürgülü cam duşakabin, koyu zemin fayanslı banyo" },
  kromSeffafKose: { id: "krom-seffaf-kose", src: kromSeffafKose, family: "dusakabin", type: "Köşe", date: "2026-04-07",
    caption: "Krom profil, şeffaf cam köşe duşakabin",
    alt: "Krom profilli, şeffaf camlı kare köşe duşakabin ve yenilenmiş banyo zemini" },
  kromBantliOval: { id: "krom-bantli-oval", src: kromBantliOval, family: "dusakabin", type: "Oval", date: "2026-04-20",
    caption: "Krom profil, bantlı cam oval duşakabin",
    alt: "Krom profilli, bantlı buzlu camlı oval duşakabin, kapılar kapalı" },
  kromBantliOvalAcik: { id: "krom-bantli-oval-acik", src: kromBantliOvalAcik, family: "dusakabin", type: "Oval", date: "2026-04-20",
    caption: "Aynı oval kabin, kapılar açık",
    alt: "Krom profilli, bantlı buzlu camlı oval duşakabin, sürgülü kapılar açık" },
  kromBantliKose: { id: "krom-bantli-kose", src: kromBantliKose, family: "dusakabin", type: "Köşe", date: "2026-06-25",
    caption: "Krom profil, bantlı cam köşe duşakabin",
    alt: "Krom profilli, bantlı buzlu camlı köşe duşakabin, çamaşır makinesinin yanında" },
  kromBantliKoseAcik: { id: "krom-bantli-kose-acik", src: kromBantliKoseAcik, family: "dusakabin", type: "Köşe", date: "2026-06-25",
    caption: "Aynı köşe kabin, kapılar açık",
    alt: "Krom profilli, bantlı buzlu camlı köşe duşakabin, sürgülü kapılar açık" },
  isicamBalkon: { id: "isicam-balkon", src: isicamBalkon, family: "cam-balkon", type: "Isıcamlı", date: "2026-05-17",
    caption: "Isıcamlı köşe cam balkon",
    alt: "Isıcamlı, siyah profilli köşe cam balkon, içeriden ağaçlara bakan görünüm" },
  surmeBalkon: { id: "surme-balkon", src: surmeBalkon, family: "cam-balkon", type: "Sürme", date: "2026-05-01",
    caption: "Siyah profil sürme cam balkon",
    alt: "Siyah profilli sürme cam balkon, içeriden şehir manzarasına bakan görünüm" },
} satisfies Record<string, Photo>;

/** İşletmenin kendi uygulama fotoğrafları (galeriler, şema, görsel site haritası yalnızca bunları kullanır). */
export const allPhotos: Photo[] = Object.values(photos);

/** Lisanslı stok görseller: yalnızca fotoğrafı olmayan hizmet sayfalarının görseli. */
export const stock = {
  kbCamTavan: { id: "st-kb-cam-tavan", src: kbCamTavan, family: "cam-balkon", type: "Kış bahçesi", date: "", source: "stock",
    caption: "Cam tavanlı kış bahçesi", alt: "Cam tavanlı, alüminyum çerçeveli kış bahçesinde hasır koltuklar ve bahçe manzarası" },
  kbCamOda: { id: "st-kb-cam-oda", src: kbCamOda, family: "cam-balkon", type: "Kış bahçesi", date: "", source: "stock",
    caption: "Eve bitişik cam oda", alt: "Ağaçlarla çevrili bir evin yanına eklenmiş camlı kış bahçesi" },
  pgSiyah: { id: "st-pg-siyah", src: pgSiyah, family: "cam-balkon", type: "Pergole", date: "", source: "stock",
    caption: "Bahçede siyah alüminyum pergole", alt: "Bahçede siyah alüminyum taşıyıcılı lamelli pergole ve altında oturma grubu" },
  pgLamel: { id: "st-pg-lamel", src: pgLamel, family: "cam-balkon", type: "Pergole", date: "", source: "stock",
    caption: "Lamelli pergole altında oturma alanı", alt: "Ahşap çit önünde lamelli pergole altında hasır oturma grubu" },
  alGenis: { id: "st-al-genis", src: alGenis, family: "cam-balkon", type: "Alüminyum doğrama", date: "", source: "stock",
    caption: "Geniş alüminyum pencereler", alt: "İnce alüminyum profilli, ağaçlara bakan geniş pencereler" },
  alSiyah: { id: "st-al-siyah", src: alSiyah, family: "cam-balkon", type: "Alüminyum doğrama", date: "", source: "stock",
    caption: "Siyah profilli açılır pencere", alt: "Mermer kaplı duvarda siyah ince profilli açılır pencere" },
} satisfies Record<string, Photo>;

export const isOwn = (p: Photo) => p.source !== "stock";
