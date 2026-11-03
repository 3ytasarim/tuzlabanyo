/**
 * Tek kaynak: işletme kimliği, iletişim ve doğrulama durumları.
 * Kural: bileşenler ve şema üreticileri yalnızca `verified: true` alanları kullanır (bkz. `verified()`).
 * `tests/build/verify-dist.mjs`, doğrulanmamış değerlerin build çıktısına sızmadığını denetler.
 */

export interface Fact<T> {
  value: T;
  verified: boolean;
  /** Bilginin nereden geldiği (dokümantasyon ve denetim için). */
  source: string;
}

export interface PostalAddress {
  street: string;
  district: string;
  city: string;
  postalCode: string;
  country: "TR";
}

export const site = {
  name: "Tuzla Duş",
  tagline: "Duş · Cam Balkon",
  url: "https://tuzladus.com.tr",
  locale: "tr-TR",
  instagram: "https://www.instagram.com/tuzladus/",
  /** İşletmenin bulunduğu ilçe. Sokak adresi doğrulanana kadar yalnızca bu gösterilir. */
  district: "Tuzla",
  city: "İstanbul",

  phone: {
    landline: {
      value: "+902163954241",
      verified: true,
      source: "Firma logosu; dizin kayıtları",
    } satisfies Fact<string>,
    mobile: {
      value: "+905413954241",
      verified: true,
      source: "Firma teyidi (WhatsApp hattı)",
    } satisfies Fact<string>,
  },

  whatsapp: {
    value: "+905413954241",
    verified: true,
    source: "Firma teyidi",
  } as Fact<string | null>,

  address: {
    value: {
      street: "Yayla Mahallesi, Lütuf Sokak No:6",
      district: "Tuzla",
      city: "İstanbul",
      postalCode: "34944",
      country: "TR",
    },
    verified: true,
    source: "Firma teyidi",
  } satisfies Fact<PostalAddress>,

  hours: {
    value: null,
    verified: false,
    source: "Doğrulanmadı",
  } as Fact<string | null>,

  /** Hizmet bölgeleri. Doğrulanana kadar ana sayfada bölge bölümü render edilmez. */
  areas: {
    value: ["Tuzla"],
    verified: false,
    source: "Doğrulanmadı",
  } satisfies Fact<string[]>,
} as const;

/** Doğrulanmışsa değeri, değilse `null` döndürür. */
export function verified<T>(fact: Fact<T>): T | null {
  return fact.verified ? fact.value : null;
}

/** "+902163954241" → "0216 395 42 41" */
export function formatPhone(e164: string): string {
  const d = e164.replace(/^\+90/, "0");
  return `${d.slice(0, 4)} ${d.slice(4, 7)} ${d.slice(7, 9)} ${d.slice(9, 11)}`;
}

/** Birincil telefon (doğrulanmış sabit hat). */
export function primaryPhone(): { href: string; label: string } | null {
  const v = verified(site.phone.landline);
  return v ? { href: `tel:${v}`, label: formatPhone(v) } : null;
}

/**
 * WhatsApp bağlantısı. Numara doğrulanmadan HİÇBİR bağlantı üretilmez.
 * `topic` verilirse mesaja eklenir (ör. "köşe duşakabin").
 */
export function whatsappHref(topic?: string): string | null {
  const n = verified(site.whatsapp);
  if (!n) return null;
  const text = topic
    ? `Merhaba Tuzla Duş, ${topic} hakkında bilgi ve fiyat teklifi almak istiyorum.`
    : "Merhaba Tuzla Duş, banyom/balkonum için bilgi ve fiyat teklifi almak istiyorum.";
  return `https://wa.me/${n.replace(/^\+/, "")}?text=${encodeURIComponent(text)}`;
}

/** Google Haritalar arama bağlantısı (iframe yok, çerez yok). Adres doğrulanmadıysa ilçe. */
export function mapsUrl(): string {
  const a = verified(site.address);
  const q = a ? `${a.street}, ${a.postalCode} ${a.district}/${a.city}` : `${site.district}, ${site.city}`;
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(q)}`;
}

/** Doğrulanmış GSM (WhatsApp hattı) — görünür etiketiyle. */
export function mobilePhone(): { href: string; label: string } | null {
  const v = verified(site.phone.mobile);
  return v ? { href: `tel:${v}`, label: formatPhone(v) } : null;
}
