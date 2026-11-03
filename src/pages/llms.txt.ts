/**
 * llms.txt (GEO): yapay zekâ arama sistemleri için kısa, doğrulanmış işletme özeti ve sayfa haritası.
 * Yalnızca doğrulanmış bilgiler; içerik src/data ve src/config'ten üretilir.
 */
import type { APIRoute } from "astro";
import { site, verified, formatPhone } from "@/config/site";
import { familyList, servicesOf } from "@/data/services";

export const GET: APIRoute = () => {
  const phone = verified(site.phone.landline);
  const wa = verified(site.whatsapp);
  const a = verified(site.address);
  const lines = [
    `# ${site.name}`,
    "",
    `> ${site.name}, ${site.district} / ${site.city} merkezli; duşakabin, cam balkon ve cam sistemleri imalatı ve montajı yapan bir işletmedir. Ürünler ölçüye göre imal edilir.`,
    "",
    "## İletişim",
    ...(phone ? [`- Telefon: ${formatPhone(phone)}`] : []),
    ...(wa ? [`- WhatsApp: ${formatPhone(wa)}`] : []),
    ...(a ? [`- Adres: ${a.street}, ${a.postalCode} ${a.district} / ${a.city}`] : []),
    `- Instagram: ${site.instagram}`,
    "",
    ...familyList.flatMap((f) => [
      `## ${f.name.charAt(0).toLocaleUpperCase("tr") + f.name.slice(1)}`,
      `- [${f.name}](${site.url}/${f.slug}/): ${f.answer}`,
      ...servicesOf(f.id).map((s) => `- [${s.name}](${site.url}/${s.slug}/): ${s.answer}`),
      "",
    ]),
    "## Diğer sayfalar",
    `- [Uygulamalarımız](${site.url}/uygulamalarimiz/): Gerçek uygulama fotoğrafları.`,
    `- [Hizmetlerimiz](${site.url}/hizmetlerimiz/): Ölçü, imalat ve montaj.`,
    `- [Sık sorulan sorular](${site.url}/sss/)`,
    `- [Teklif al](${site.url}/teklif-al/)`,
    `- [İletişim](${site.url}/iletisim/)`,
    "",
    "## Notlar",
    "- Sitede fiyat, süre ve garanti bilgisi verilmez; bunlar ölçü ve seçimlere göre işletmeyle konuşulur.",
    "- İşletmenin kendi uygulama fotoğrafları Uygulamalarımız sayfasında ve hizmet sayfalarının örnekler bölümündedir.",
    "",
  ];
  return new Response(lines.join("\n"), { headers: { "Content-Type": "text/plain; charset=utf-8" } });
};
