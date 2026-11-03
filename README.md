# Tuzla Duş — tuzladus.com.tr

Tuzla Duş'un kurumsal web sitesi: duşakabin, cam balkon ve cam sistemleri.

- **Altyapı:** Astro (statik çıktı) · React adacıkları · motion · Tailwind CSS · TypeScript
- **Çıktı:** `dist/` (cPanel / FTP ile yayınlanabilir; sunucuda Node gerekmez)

## Komutlar

```bash
npm install
npm run dev        # geliştirme sunucusu (http://localhost:4321)
npm run build      # üretim derlemesi + build denetimi
npm run check      # tip kontrolü
npm run test:e2e   # Playwright testleri (kurulu Chrome ile)
```

## İçerik

- İletişim bilgileri ve doğrulama durumları: `src/config/site.ts`
- Hizmet sayfaları (tek katalog): `src/data/services.ts`
- Uygulama fotoğrafları: `src/data/photos.ts` (yeni fotoğraf: `src/assets/photos/` + kayıt)
- SSS: `src/data/faqs.ts`, süreç: `src/data/process.ts`
