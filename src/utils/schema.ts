/**
 * JSON-LD üreticileri. Yalnızca doğrulanmış (`verified`) işletme bilgileri yazılır;
 * puan, yorum, fiyat, stok ve garanti verisi hiçbir zaman üretilmez.
 */
import { site, verified, mapsUrl } from "@/config/site";

type Json = Record<string, unknown>;

const businessId = `${site.url}/#business`;
const websiteId = `${site.url}/#website`;

export function businessSchema(logoUrl: string, imageUrls: string[], catalog: { name: string; url: string }[] = []): Json {
  const telephone = verified(site.phone.landline);
  const address = verified(site.address);
  const areas = verified(site.areas);
  const hours = verified(site.hours);

  return {
    "@type": "HomeAndConstructionBusiness",
    "@id": businessId,
    name: site.name,
    url: `${site.url}/`,
    logo: logoUrl,
    image: imageUrls,
    sameAs: [site.instagram],
    ...(telephone ? { telephone } : {}),
    ...(address
      ? {
          address: {
            "@type": "PostalAddress",
            streetAddress: address.street,
            addressLocality: address.district,
            addressRegion: address.city,
            postalCode: address.postalCode,
            addressCountry: address.country,
          },
        }
      : {
          address: {
            "@type": "PostalAddress",
            addressLocality: site.district,
            addressRegion: site.city,
            addressCountry: "TR",
          },
        }),
    ...(areas ? { areaServed: areas.map((name) => ({ "@type": "City", name })) } : {}),
    ...(hours ? { openingHours: hours } : {}),
    ...(address ? { hasMap: mapsUrl() } : {}),
    knowsAbout: ["Duşakabin", "Cam balkon", "Kış bahçesi", "Giyotin cam", "Pergole", "Alüminyum doğrama"],
    ...(catalog.length
      ? {
          hasOfferCatalog: {
            "@type": "OfferCatalog",
            name: "Hizmetler",
            itemListElement: catalog.map((c) => ({
              "@type": "Offer",
              itemOffered: { "@type": "Service", name: c.name, url: c.url },
            })),
          },
        }
      : {}),
  };
}

export function websiteSchema(): Json {
  return {
    "@type": "WebSite",
    "@id": websiteId,
    url: `${site.url}/`,
    name: site.name,
    inLanguage: site.locale,
    publisher: { "@id": businessId },
  };
}

export function breadcrumbSchema(items: { name: string; url: string }[], id?: string): Json {
  return {
    "@type": "BreadcrumbList",
    ...(id ? { "@id": id } : {}),
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: it.url,
    })),
  };
}

export function faqSchema(items: { q: string; a: string }[]): Json {
  return {
    "@type": "FAQPage",
    mainEntity: items.map(({ q, a }) => ({
      "@type": "Question",
      name: q,
      acceptedAnswer: { "@type": "Answer", text: a },
    })),
  };
}

export function graph(nodes: Json[]): Json {
  return { "@context": "https://schema.org", "@graph": nodes };
}

export const BUSINESS_ID = businessId;

export function webPageSchema(opts: {
  type?: "WebPage" | "CollectionPage" | "AboutPage" | "ContactPage" | "FAQPage";
  url: string;
  name: string;
  description: string;
  image?: string | undefined;
  breadcrumbId?: string | undefined;
}): Json {
  return {
    "@type": opts.type ?? "WebPage",
    "@id": `${opts.url}#webpage`,
    url: opts.url,
    name: opts.name,
    description: opts.description,
    inLanguage: site.locale,
    isPartOf: { "@id": websiteId },
    about: { "@id": businessId },
    ...(opts.image ? { primaryImageOfPage: { "@type": "ImageObject", contentUrl: opts.image } } : {}),
    ...(opts.breadcrumbId ? { breadcrumb: { "@id": opts.breadcrumbId } } : {}),
  };
}

export function serviceSchema(opts: { url: string; name: string; description: string; serviceType: string; images: string[] }): Json {
  const areas = verified(site.areas);
  return {
    "@type": "Service",
    "@id": `${opts.url}#service`,
    name: opts.name,
    serviceType: opts.serviceType,
    description: opts.description,
    url: opts.url,
    provider: { "@id": businessId },
    areaServed: areas ? areas.map((name) => ({ "@type": "City", name })) : { "@type": "City", name: site.district },
    ...(opts.images.length ? { image: opts.images } : {}),
  };
}

export function itemListSchema(items: { name: string; url: string }[]): Json {
  return {
    "@type": "ItemList",
    itemListElement: items.map((it, i) => ({ "@type": "ListItem", position: i + 1, name: it.name, url: it.url })),
  };
}

export function imageObjectSchema(img: { url: string; caption: string; width?: number; height?: number }): Json {
  return {
    "@type": "ImageObject",
    contentUrl: img.url,
    caption: img.caption,
    ...(img.width ? { width: img.width, height: img.height } : {}),
    creator: { "@id": businessId },
    copyrightHolder: { "@id": businessId },
    creditText: site.name,
  };
}
