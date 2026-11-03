/**
 * Hizmet / ürün tipi kataloğu: her öğe kendi sayfasıdır (src/pages/[slug].astro).
 *
 * İçerik kuralları:
 * - İşletmeye özgü iddia yalnızca kaynaklı bilgiyle: Instagram biyografisi (hizmet listesi,
 *   "imalat ve montaj"), gönderi açıklamaları ("her ölçü ve şekilde imalat", zemin uygulaması,
 *   6 cm flat tekne) ve uygulama fotoğraflarında görülenler.
 * - Sektör bilgisi genel bilgi olarak, "sektörde … bulunur" diliyle verilir; işletmenin her
 *   seçeneği sunduğu iddia edilmez.
 * - Fiyat, süre, garanti, puan, sayı YOK.
 */
import { photos, stock, type Photo } from "@/data/photos";

export type FamilyId = "dusakabin" | "cam-balkon";
export type Illustration = "kis-bahcesi" | "giyotin" | "pergole" | "aluminyum" | "surme" | "isicam";

export interface Faq {
  q: string;
  a: string;
}

export interface Service {
  slug: string;
  family: FamilyId;
  /** Menü, kart ve breadcrumb adı */
  name: string;
  metaTitle: string;
  metaDescription: string;
  lead: string;
  /** GEO: soruya doğrudan cevap veren ilk paragraf ("X nedir?") */
  answer: string;
  body: string[];
  suits: string[];
  considerations: string[];
  facts: { label: string; value: string }[];
  photos: Photo[];
  illustration?: Illustration;
  faqs: Faq[];
  /** WhatsApp ön dolu mesajındaki konu */
  waTopic: string;
  /** Kart üzerindeki tek satır */
  cardLine: string;
}

export interface Family {
  id: FamilyId;
  slug: string;
  name: string;
  navLabel: string;
  eyebrow: string;
  metaTitle: string;
  metaDescription: string;
  lead: string;
  answer: string;
  body: string[];
  heroPhoto: Photo;
  faqs: Faq[];
  /** Karşılaştırma tablosu (genel bilgi) */
  compare: { head: string[]; rows: { slug: string; cells: string[] }[] };
}

export const services: Service[] = [
  // ───────────────────────── DUŞAKABİN ─────────────────────────
  {
    slug: "kose-dusakabin",
    family: "dusakabin",
    name: "Köşe duşakabin",
    metaTitle: "Köşe Duşakabin, Tuzla · Ölçüye Göre | Tuzla Duş",
    metaDescription:
      "Tuzla'da kare ve dikdörtgen köşe duşakabin imalatı ve montajı. Siyah ve krom profil, şeffaf ve bantlı buzlu cam uygulamalarımızı inceleyin.",
    lead: "İki duvarın birleştiği köşeye kurulan kare ya da dikdörtgen kabin. Ölçünüze göre imal ediyor, yerine monte ediyoruz.",
    answer:
      "Köşe duşakabin, banyoda iki duvarın birleştiği köşeye yerleştirilen ve iki cam yüzü olan kabindir. Kare ya da dikdörtgen plan duş alanını köşeye toplar, banyonun geri kalanını serbest bırakır. Uygulamalarımızdaki köşe kabinlerde kapılar sürgülüdür ve ön köşeden açılır.",
    body: [
      "Köşenin iki kenarı eşitse kare, biri uzunsa dikdörtgen kabin yapılır. Hangisinin olacağını banyonun ölçüsü, kapının ve lavabonun konumu belirler. Hazır kalıba uymak yerine kabin köşenizin ölçüsüne göre imal edilir.",
      "Profil rengi ve cam tipi kabinin karakterini değiştirir. Siyah profil banyoda çizgiyi belirginleştirir, krom profil daha hafif durur. Şeffaf cam banyoyu geniş gösterir; bantlı buzlu cam ise görüşü keserken ışığı geçirir.",
      "Bazı uygulamalarımızda duşakabini zemin yenilemesiyle birlikte yaptık; düz (flat) tekneli örneklerimiz de var. Banyonuzun zemini değişecekse kabini bu işle birlikte planlamak, ölçünün doğru alınmasını kolaylaştırır.",
    ],
    suits: [
      "Kare ya da dikdörtgen planlı banyolar",
      "Duş alanını bir köşede toplamak isteyenler",
      "Kabinin iki yüzünün camla açık kalmasını isteyenler",
    ],
    considerations: [
      "Kabinin önünde kapının rahat kullanılabileceği bir geçiş alanı kalmalı.",
      "Duvarlar her zaman tam dik olmaz; kesin ölçü imalattan önce yerinde alınmalı.",
      "Teknesiz kurulumda zeminin gidere doğru eğimli olması gerekir.",
    ],
    facts: [
      { label: "Yerleşim", value: "İki duvarın köşesi" },
      { label: "Açılım", value: "Sürgülü (uygulamalarımızda)" },
      { label: "Profil", value: "Siyah · Krom" },
      { label: "Cam", value: "Şeffaf · Buzlu · Bantlı buzlu" },
      { label: "Ölçü", value: "Ölçünüze göre imalat" },
    ],
    photos: [photos.siyahBantliKose, photos.kromSeffafKose, photos.kromBantliKose, photos.kromBantliKoseAcik],
    faqs: [
      {
        q: "Kare mi, dikdörtgen köşe duşakabin mi seçmeliyim?",
        a: "Köşedeki iki duvarın kullanılabilir uzunluğuna bakılır. İki kenar eşitse kare, biri daha uzunsa dikdörtgen kabin alanı daha iyi kullanır. Kapının, lavabonun ve klozetin konumu da kabinin hangi yönden açılacağını belirler.",
      },
      {
        q: "Köşe duşakabin tekneli mi, teknesiz mi kurulur?",
        a: "İkisi de mümkündür. Teknesiz kurulumda suyun gidere akması için zeminin eğimli olması gerekir. Uygulamalarımızda düz (flat) tekneli ve zemin yenilemesiyle birlikte yapılmış köşe kabinler var.",
      },
      {
        q: "Bantlı buzlu cam ne işe yarar?",
        a: "Camın orta bölümündeki buzlu bant göz hizasında görüşü keser; üst ve alt kısım şeffaf kaldığı için ışık geçer. Tamamen buzlu cama göre banyo daha ferah görünür.",
      },
    ],
    waTopic: "köşe duşakabin",
    cardLine: "Kare ya da dikdörtgen; iki duvarın köşesine.",
  },
  {
    slug: "oval-dusakabin",
    family: "dusakabin",
    name: "Oval duşakabin",
    metaTitle: "Oval Duşakabin, Tuzla · Kavisli Köşe Kabin | Tuzla Duş",
    metaDescription:
      "Tuzla'da oval (çeyrek daire) duşakabin imalatı ve montajı. Kavisli ön yüz küçük banyolarda geçişi rahatlatır. Siyah ve krom profilli uygulamalarımız.",
    lead: "Ön yüzü çeyrek daire biçiminde kavisli köşe kabin. Kavis, kabinin önünde daha fazla geçiş alanı bırakır.",
    answer:
      "Oval duşakabin, iki duvarın birleştiği köşeye kurulan ve ön yüzü çeyrek daire biçiminde kavisli olan kabindir. Kavisli ön yüz, köşe kabine göre kabinin önündeki geçiş alanını biraz daha açık bırakır; bu yüzden küçük banyolarda sık tercih edilir. Kavisli kapılar ray üzerinde iki yana kayarak açılır.",
    body: [
      "Köşe kabinle aynı yere kurulur; fark ön yüzdedir. Köşe kabinin dik ön köşesi yerine kavis olduğu için banyoda dolaşırken kabinin köşesine takılmazsınız. Lavabo ya da klozet kabinin hemen önündeyse bu fark hissedilir.",
      "Uygulamalarımızda oval kabinleri siyah ve krom profille, buzlu ve bantlı buzlu camla yaptık. Buzlu cam kabini tamamen kapatır; bantlı cam ise yalnızca göz hizasını keser.",
      "Kavisli camlar ölçüye göre hazırlanır. Bu yüzden köşedeki iki duvarın açısı ve uzunluğu kesin olarak ölçülmeden imalata geçilmez.",
    ],
    suits: ["Küçük ve orta boy banyolar", "Kabinin önünde lavabo ya da klozet olan yerleşimler", "Yumuşak hatlı bir görünüm isteyenler"],
    considerations: [
      "Kavisli form köşedeki duş alanını köşe kabine göre biraz azaltır.",
      "Kavisli camlar ölçüye özel üretildiği için ölçü kesin alınmalı.",
      "Kapılar ray üzerinde kaydığı için ray temizliği kapının rahat çalışmasını sağlar.",
    ],
    facts: [
      { label: "Yerleşim", value: "İki duvarın köşesi" },
      { label: "Ön yüz", value: "Çeyrek daire, kavisli" },
      { label: "Açılım", value: "Kavisli sürgülü kapı" },
      { label: "Profil", value: "Siyah · Krom" },
      { label: "Cam", value: "Buzlu · Bantlı buzlu" },
    ],
    photos: [photos.siyahBuzluOval, photos.kromBantliOval, photos.kromBantliOvalAcik],
    faqs: [
      {
        q: "Oval duşakabin küçük banyoya uygun mu?",
        a: "Evet, oval kabin özellikle küçük banyolarda tercih edilir. Kavisli ön yüz kabinin önünde daha fazla geçiş alanı bırakır; kapılar sürgülü olduğu için önünde kapı açılma alanı gerekmez.",
      },
      {
        q: "Oval mi, köşe duşakabin mi?",
        a: "İkisi de aynı köşeye kurulur. Köşe kabin duş alanını tam kullanır, oval kabin ise önündeki geçişi rahatlatır. Kabinin önünde ne olduğuna bakarak karar vermek en doğrusudur.",
      },
      {
        q: "Oval kabinin kapıları nasıl açılır?",
        a: "Uygulamalarımızdaki oval kabinlerde kavisli iki kapı ray üzerinde yana kayarak ortadan açılır. Kapılar dışa açılmadığı için banyoda ek alan istemez.",
      },
    ],
    waTopic: "oval duşakabin",
    cardLine: "Kavisli ön yüz; küçük banyoda rahat geçiş.",
  },
  {
    slug: "iki-duvar-arasi-dusakabin",
    family: "dusakabin",
    name: "İki duvar arası duşakabin",
    metaTitle: "İki Duvar Arası Duşakabin, Tuzla · Niş Kabin | Tuzla Duş",
    metaDescription:
      "Tuzla'da iki duvar arasına (nişe) sürgülü duşakabin imalatı ve montajı. Sabit panel ve sürgülü kapılı, siyah ve beyaz profilli uygulamalarımız.",
    lead: "Karşılıklı iki duvarın arasındaki nişe kurulan, yalnızca ön yüzü camla kapatılan kabin.",
    answer:
      "İki duvar arası duşakabin, iki karşılıklı duvarın arasında kalan nişe (girintiye) kurulan ve yalnızca ön yüzü camla kapatılan kabindir. Yan duvarlar kabinin parçası olduğu için cam yüzey azalır. Geniş nişlerde ön yüz sabit panel ve sürgülü kapı olarak bölünür.",
    body: [
      "Banyonuzda duş için ayrılmış bir girinti, eski bir küvet yeri ya da iki duvar arasında kalan bir alan varsa en temiz çözüm iki duvar arası kabindir. Kabinin yalnızca ön yüzü olduğu için banyoda çok az yer kaplar.",
      "Uygulamalarımızda geniş nişleri sabit panel ve sürgülü kapıyla kapattık. Siyah profil ve bantlı buzlu camla yaptığımız örnekte panel ve kapı aynı çizgide durur; beyaz profilli geniş örnekte ise ön yüz birden fazla panele bölünmüştür.",
      "Duvarlar çoğu zaman tam paralel ve dik değildir. Duvara bağlanan profiller bu farkı belli bir ölçüde karşılar; yine de kesin ölçü imalattan önce yerinde alınmalıdır.",
    ],
    suits: ["Banyoda duş girintisi (niş) olanlar", "Eski küvet yerini duşa çevirmek isteyenler", "En az cam yüzeyle kapatmak isteyenler"],
    considerations: [
      "Niş genişledikçe ön yüz birden fazla panele bölünür.",
      "Duvarların paralel olmaması ölçüde dikkate alınmalı.",
      "Sürgülü kapının açıklığı panel sayısına göre değişir.",
    ],
    facts: [
      { label: "Yerleşim", value: "Karşılıklı iki duvar arası" },
      { label: "Ön yüz", value: "Sabit panel + sürgülü kapı" },
      { label: "Profil", value: "Siyah · Beyaz" },
      { label: "Cam", value: "Şeffaf · Bantlı buzlu" },
      { label: "Ölçü", value: "Niş ölçüsüne göre imalat" },
    ],
    photos: [photos.siyahIkiDuvar, photos.beyazIkiDuvar],
    faqs: [
      {
        q: "Niş çok genişse iki duvar arası kabin yapılabilir mi?",
        a: "Yapılabilir. Geniş nişlerde ön yüz birden fazla panele bölünür; bir kısmı sabit kalır, kapı sürgülü olur. Uygulamalarımızda geniş nişleri bu şekilde kapattık.",
      },
      {
        q: "Duvarlarım düz değilse ne olur?",
        a: "Duvara bağlanan profiller duvardaki küçük eğrilikleri belli bir ölçüde karşılar. Fark büyükse ölçü sırasında görülür ve kabin buna göre hazırlanır; bu yüzden kesin ölçü yerinde alınmalıdır.",
      },
      {
        q: "Eski küvetin yerine iki duvar arası kabin konur mu?",
        a: "Küvetin bulunduğu alan iki duvar arasındaysa evet, uygun bir yerdir. Küvet çıktıktan sonra zeminin ve giderin durumu kabinin nasıl kurulacağını belirler.",
      },
    ],
    waTopic: "iki duvar arası duşakabin",
    cardLine: "Nişe yalnızca ön yüz; en az cam.",
  },
  {
    slug: "desenli-siyah-profil-dusakabin",
    family: "dusakabin",
    name: "Desenli siyah profil duşakabin",
    metaTitle: "Desenli Siyah Profil Duşakabin · Kafes, Geometrik | Tuzla Duş",
    metaDescription:
      "Kafes ve geometrik desenli siyah profil duşakabin uygulamalarımız. Tuzla'da ölçüye göre imalat ve montaj; banyonuzu karakterli bir kabinle tamamlayın.",
    lead: "Camın üzerinde siyah çizgilerle kafes ya da geometrik desen oluşturan, banyonun odak noktası olan kabin.",
    answer:
      "Desenli siyah profil duşakabin, cam yüzeyde siyah çizgilerle kafes ya da geometrik bir desen oluşturan kabindir. Düz kabinin işlevini korurken banyoya endüstriyel ve modern bir karakter katar; kabin banyonun dekoratif odağı haline gelir.",
    body: [
      "Uygulamalarımızda iki farklı desen yaptık: dikey ve yatay çizgilerle bölünmüş kafes desen ve çapraz çizgilerin oluşturduğu geometrik desen. İkisinde de profil siyah, çizgiler kabinin çerçevesiyle aynı dili konuşur.",
      "Kafes desen şeffaf camla daha hafif, geometrik desen buzlu camla daha mahrem bir görünüm verir. Desen kabinin ne kadar görüleceğini değiştirmez; görüşü asıl belirleyen cam tipidir.",
      "Desenli kabinler açık renk fayanslı ve ahşap ya da mat dokulu banyolarda çok iyi durur. Farklı bir desen düşünüyorsanız ölçü sırasında birlikte konuşabiliriz.",
    ],
    suits: ["Endüstriyel ya da modern banyolar", "Kabini dekoratif bir öğe olarak kullanmak isteyenler", "Açık renk fayanslı banyolar"],
    considerations: [
      "Çizgiler camın yüzeyinde olduğu için temizlikte düz cam gibi silinir.",
      "Mahremiyeti desen değil cam tipi belirler; buzlu camla birlikte düşünün.",
      "Desen banyonun geri kalanıyla uyumlu seçilmeli; yoğun desenli fayansla yarışabilir.",
    ],
    facts: [
      { label: "Desen", value: "Kafes · Geometrik" },
      { label: "Profil", value: "Siyah" },
      { label: "Cam", value: "Şeffaf · Buzlu" },
      { label: "Yerleşim", value: "Köşe (uygulamalarımızda)" },
      { label: "Ölçü", value: "Ölçünüze göre imalat" },
    ],
    photos: [photos.geometrikKose, photos.kafesKose],
    faqs: [
      {
        q: "Desenli duşakabinin temizliği zor mu?",
        a: "Hayır. Desen çizgileri camın yüzeyinde olduğu için düz cam gibi silinir. Duştan sonra camdaki suyu çekmek, çizgi kenarlarında kireç birikmesini önler.",
      },
      {
        q: "Kafes desen mi, geometrik desen mi?",
        a: "Kafes desen düzenli ve sakin bir görünüm verir; şeffaf camla hafif durur. Geometrik desen daha hareketlidir; buzlu camla birlikte banyonun odak noktası olur.",
      },
      {
        q: "Desenli kabin hangi banyolara yakışır?",
        a: "Açık renk fayanslı, sade ya da endüstriyel çizgide banyolarda en iyi sonucu verir. Çok desenli fayanslı banyolarda desen kalabalık görünebilir.",
      },
    ],
    waTopic: "desenli siyah profil duşakabin",
    cardLine: "Kafes ya da geometrik desen; banyonun odağı.",
  },

  // ───────────────────────── CAM BALKON VE SİSTEMLERİ ─────────────────────────
  {
    slug: "surme-cam-balkon",
    family: "cam-balkon",
    name: "Sürme cam balkon",
    metaTitle: "Sürme Cam Balkon, Tuzla · İmalat ve Montaj | Tuzla Duş",
    metaDescription:
      "Tuzla'da sürme cam balkon imalatı ve montajı. Paneller ray üzerinde yana kayar, balkonunuz rüzgâr ve yağmura kapanır. Siyah profilli uygulamamızı görün.",
    lead: "Cam panellerin ray boyunca yana kayarak açıldığı, balkonu rüzgâra ve yağmura kapatan sistem.",
    answer:
      "Sürme cam balkon, cam panellerin üst ve alt ray boyunca yana kayarak açıldığı balkon kapatma sistemidir. Paneller katlanmaz; açıldığında bir kenarda üst üste toplanır. Balkonu rüzgâra, yağmura ve toza kapatırken manzarayı geniş camlarla açık bırakır.",
    body: [
      "Sürme sistemde her panel kendi rayında kayar. Paneller birbirinin önüne geçerek açıldığı için balkonun bir kısmı her zaman camla kaplı kalır; buna karşılık sistem sade, kullanımı kolaydır.",
      "Uygulamamızda siyah profil kullandık. Siyah profil dışarıdan ince bir çerçeve gibi görünür, içeriden manzarayı çerçeveler.",
      "Balkonun genişliği, korkuluğun durumu ve tavan yüksekliği panel sayısını ve ölçülerini belirler. Bu yüzden imalattan önce balkonun ölçüsü yerinde alınır.",
    ],
    suits: ["Rüzgâr ve yağmur alan balkonlar", "Sade ve kullanımı kolay bir sistem isteyenler", "Balkonu toza kapatmak isteyenler"],
    considerations: [
      "Paneller üst üste toplandığı için balkonun tamamı aynı anda açılmaz.",
      "Rayların temiz tutulması panellerin rahat kaymasını sağlar.",
      "Sektörde sürme sistemlerin tek camlı ve ısıcamlı türleri bulunur; seçim balkonun kullanımına göre yapılır.",
    ],
    facts: [
      { label: "Açılım", value: "Yana kayar (sürme)" },
      { label: "Toplanma", value: "Bir kenarda üst üste" },
      { label: "Profil", value: "Siyah (uygulamamızda)" },
      { label: "Ölçü", value: "Balkon ölçüsüne göre imalat" },
    ],
    photos: [photos.surmeBalkon],
    illustration: "surme",
    faqs: [
      {
        q: "Sürme cam balkon ile katlanır cam balkon arasındaki fark nedir?",
        a: "Sürme sistemde paneller ray üzerinde yana kayar ve üst üste toplanır; açıklık panellerin toplandığı kadar olur. Katlanır sistemde paneller katlanarak bir kenara toplanır ve balkon neredeyse tamamen açılabilir. Sürme sistem daha sadedir, katlanır sistem daha geniş açıklık verir.",
      },
      {
        q: "Sürme cam balkon ısıcamlı yapılabilir mi?",
        a: "Sektörde sürme sistemlerin tek camlı ve ısıcamlı türleri bulunur. Balkonu kışın da oda gibi kullanmak istiyorsanız ısıcamı, yalnızca rüzgâr ve yağmuru kesmek istiyorsanız tek camı düşünebilirsiniz. Hangisinin uygun olduğunu ölçü sırasında konuşuruz.",
      },
      {
        q: "Sürme cam balkonun bakımı nasıl yapılır?",
        a: "Rayların içindeki toz ve kum zamanla panellerin kaymasını zorlaştırır; rayları ara ara temizlemek yeterlidir. Camlar normal cam temizleyicisiyle silinir.",
      },
    ],
    waTopic: "sürme cam balkon",
    cardLine: "Paneller yana kayar; sade ve kolay kullanım.",
  },
  {
    slug: "isicamli-cam-balkon",
    family: "cam-balkon",
    name: "Isıcamlı cam balkon",
    metaTitle: "Isıcamlı Cam Balkon, Tuzla · Çift Camlı | Tuzla Duş",
    metaDescription:
      "Tuzla'da ısıcamlı cam balkon imalatı ve montajı. Çift camlı paneller ısı geçişini azaltır, balkonu kışın da kullanılır kılar. Uygulamamızı inceleyin.",
    lead: "Panellerinde tek cam yerine arasında boşluk bulunan çift cam kullanılan, balkonu yıl boyu kullanılır kılan sistem.",
    answer:
      "Isıcamlı cam balkon, panellerinde tek cam yerine arasında boşluk bulunan çift cam (ısıcam) kullanılan cam balkondur. Camlar arasındaki boşluk ısı geçişini azaltır; balkon kışın daha geç soğur, yazın daha geç ısınır. Balkonu yıl boyu oda gibi kullanmak isteyenler için uygundur.",
    body: [
      "Tek camlı cam balkon rüzgârı ve yağmuru keser ama ısıyı tutmaz. Isıcamda iki cam arasındaki boşluk bir yalıtım katmanı gibi çalışır. Bu yüzden ısıcamlı balkon, salonun ya da mutfağın bir uzantısı olarak kullanılabilir.",
      "Uygulamamızda köşe bir balkonu siyah profilli ısıcamlı panellerle kapattık. Köşe balkonlarda iki yüzün birleştiği nokta ölçünün en dikkat isteyen yeridir.",
      "Isıcamlı paneller tek camlılardan daha ağırdır; profil ve ray seçimi buna göre yapılır. Balkonun korkuluğu ve tavanı da ölçü sırasında birlikte değerlendirilir.",
    ],
    suits: ["Balkonu kışın da kullanmak isteyenler", "Balkonu salon ya da mutfakla birleştirmek isteyenler", "Gürültü ve soğuk alan cepheler"],
    considerations: [
      "Isıcam yoğuşmayı tek cama göre azaltır ama tamamen ortadan kaldırmaz; havalandırma önemlidir.",
      "Paneller daha ağır olduğu için profil ve ray buna uygun olmalı.",
      "Köşe balkonlarda birleşim noktası ölçünün en kritik yeridir.",
    ],
    facts: [
      { label: "Cam", value: "Çift cam (ısıcam)" },
      { label: "Kullanım", value: "Yıl boyu" },
      { label: "Profil", value: "Siyah (uygulamamızda)" },
      { label: "Yerleşim", value: "Düz ve köşe balkon" },
    ],
    photos: [photos.isicamBalkon],
    illustration: "isicam",
    faqs: [
      {
        q: "Isıcam ile tek cam arasındaki fark nedir?",
        a: "Isıcamda iki cam arasında bir boşluk bulunur ve bu boşluk ısı geçişini azaltır. Tek cam rüzgârı ve yağmuru keser ama ısı yalıtımı sınırlıdır. Balkonu kışın kullanmak istiyorsanız ısıcam fark yaratır.",
      },
      {
        q: "Isıcamlı cam balkon yoğuşmayı önler mi?",
        a: "Tek cama göre iç yüzey daha sıcak kaldığı için yoğuşma azalır, ancak tamamen önlenmez. Balkonda çamaşır kurutmak ya da yemek pişirmek nemi artırır; zaman zaman havalandırmak gerekir.",
      },
      {
        q: "Köşe balkona ısıcamlı cam balkon yapılır mı?",
        a: "Evet. Uygulamalarımızdan biri köşe balkondur. Köşede iki yüzün birleştiği nokta ölçü ve montajda en çok dikkat isteyen yerdir.",
      },
    ],
    waTopic: "ısıcamlı cam balkon",
    cardLine: "Çift camlı paneller; balkon yıl boyu kullanılır.",
  },
  {
    slug: "giyotin-cam-sistemleri",
    family: "cam-balkon",
    name: "Giyotin cam sistemleri",
    metaTitle: "Giyotin Cam Sistemleri, Tuzla · İmalat ve Montaj | Tuzla Duş",
    metaDescription:
      "Tuzla'da giyotin cam sistemi imalatı ve montajı. Paneller dikey hareket eder, açıldığında korkuluk hizasında toplanır. Balkon ve teraslar için bilgi alın.",
    lead: "Cam panellerin yukarı ve aşağı, dikey hareket ederek açılıp kapandığı sistem.",
    answer:
      "Giyotin cam sistemi, cam panellerin dikey yönde, yukarı ve aşağı hareket ederek açılıp kapandığı sistemdir. Paneller açıldığında alt hizada üst üste toplanır; balkon ya da terasın üst kısmı tamamen açık kalırken korkuluk hizası camla korunur. Sektörde motorlu (kumandalı) ve elle çalışan türleri bulunur.",
    body: [
      "Yatay kayan sistemlerden farkı, açıklığın yukarıdan oluşmasıdır. Paneller indiğinde manzara tamamen açılır, kaldırıldığında balkon rüzgâra ve yağmura kapanır. İstenirse yalnızca bir panel kaldırılarak kısmi kapatma yapılabilir.",
      "Giyotin sistemler balkonların yanında teras, kafe ve restoran cephelerinde de kullanılır. Panellerin dikey hareket etmesi için üstte ve yanlarda yeterli alan olmalıdır.",
      "Hangi tür sistemin uygun olduğu alanın ölçüsüne, korkuluğun durumuna ve kullanım şekline göre belirlenir. Bu konuları ölçü sırasında birlikte konuşuruz.",
    ],
    suits: ["Manzarayı tamamen açmak isteyen balkon ve teraslar", "Kafe ve restoran cepheleri", "Kısmi kapatma isteyen alanlar"],
    considerations: [
      "Panellerin dikey hareketi için üstte ve yanlarda yeterli alan gerekir.",
      "Motorlu sistemlerde elektrik bağlantısı planlanmalıdır.",
      "Bina ya da site yönetiminin cephe kurallarına bakılmalıdır.",
    ],
    facts: [
      { label: "Açılım", value: "Dikey (yukarı / aşağı)" },
      { label: "Toplanma", value: "Alt hizada üst üste" },
      { label: "Kullanım", value: "Balkon · Teras · Cephe" },
      { label: "Ölçü", value: "Alan ölçüsüne göre imalat" },
    ],
    photos: [],
    illustration: "giyotin",
    faqs: [
      {
        q: "Giyotin cam sistemi nasıl çalışır?",
        a: "Paneller yanlardaki dikmeler boyunca yukarı ve aşağı hareket eder. İndirildiğinde paneller korkuluk hizasında üst üste toplanır ve üst kısım açılır; kaldırıldığında alan kapanır.",
      },
      {
        q: "Giyotin cam mı, sürme cam balkon mu?",
        a: "Sürme sistemde paneller yana kayar ve bir kısmı her zaman önde kalır. Giyotin sistemde ise üst kısım tamamen açılabilir. Manzarayı tamamen açmak istiyorsanız giyotin, sade ve kolay kullanım istiyorsanız sürme sistem öne çıkar.",
      },
      {
        q: "Giyotin cam sistemi motorlu mu çalışır?",
        a: "Sektörde motorlu (kumandalı) ve elle çalışan giyotin sistemler bulunur. Motorlu sistemde elektrik bağlantısı gerekir. Hangisinin uygun olduğunu alanınızı görerek konuşuruz.",
      },
    ],
    waTopic: "giyotin cam sistemleri",
    cardLine: "Paneller dikey kayar; üst kısım tamamen açılır.",
  },
  {
    slug: "kis-bahcesi",
    family: "cam-balkon",
    name: "Kış bahçesi",
    metaTitle: "Kış Bahçesi, Tuzla · Teras ve Bahçe Kapatma | Tuzla Duş",
    metaDescription:
      "Tuzla'da kış bahçesi imalatı ve montajı: teras, bahçe ya da çatı katını cam ve alüminyum sistemlerle dört mevsim kullanılan bir alana dönüştürün.",
    lead: "Açık bir teras, bahçe ya da çatı alanını cam ve alüminyum sistemlerle dört mevsim kullanılan bir yaşam alanına çevirir.",
    answer:
      "Kış bahçesi, teras, bahçe ya da çatı gibi açık bir alanın üstü ve yanları cam ve alüminyum sistemlerle kapatılarak dört mevsim kullanılabilen bir yaşam alanına dönüştürülmesidir. Balkon kapatmadan farkı, çoğu zaman bir çatı sistemini de içermesidir.",
    body: [
      "Kış bahçesi yanlarda cam sistemlerinden, üstte bir çatı sisteminden oluşur. Yanlar sürme, katlanır ya da giyotin sistemlerle; çatı ise alanın durumuna göre seçilen bir örtüyle kapatılır.",
      "Sektörde kış bahçesi çatılarında cam, polikarbonat ve yalıtımlı panel gibi seçenekler kullanılır. Hangisinin uygun olduğu alanın büyüklüğüne, güneş alma durumuna ve kullanım amacına göre belirlenir.",
      "Kış bahçesi büyük bir yapı değişikliği olabilir. Başlamadan önce bina ya da site yönetiminizle görüşmenizi, alanın durumunu birlikte değerlendirmemizi öneririz.",
    ],
    suits: ["Teras ve çatı katları", "Bahçe katı daireler ve müstakil evler", "Açık alanı yıl boyu kullanmak isteyenler"],
    considerations: [
      "Bina ya da site yönetiminin izni gerekebilir.",
      "Çatı seçimi güneş alma durumuna ve yağmur suyunun tahliyesine göre yapılmalıdır.",
      "Yaz aylarında havalandırma ve gölgelendirme planlanmalıdır.",
    ],
    facts: [
      { label: "Kapsam", value: "Yan cam + çatı sistemi" },
      { label: "Kullanım", value: "Teras · Bahçe · Çatı" },
      { label: "Malzeme", value: "Cam ve alüminyum" },
      { label: "Ölçü", value: "Alana özel imalat" },
    ],
    photos: [stock.kbCamTavan, stock.kbCamOda],
    illustration: "kis-bahcesi",
    faqs: [
      {
        q: "Kış bahçesi ile cam balkon arasındaki fark nedir?",
        a: "Cam balkon mevcut bir balkonun yanlarını camla kapatır; balkonun tavanı zaten vardır. Kış bahçesinde ise genellikle açık bir alanın üstü de bir çatı sistemiyle kapatılır.",
      },
      {
        q: "Kış bahçesi için izin gerekir mi?",
        a: "Binanın ve alanın durumuna göre bina ya da site yönetiminin izni gerekebilir. Başlamadan önce yönetiminizle görüşmenizi öneririz.",
      },
      {
        q: "Kış bahçesi yazın çok ısınır mı?",
        a: "Güneş alan cam alanlar yazın ısınır. Açılabilir yan paneller, havalandırma ve gölgelendirme bu yüzden baştan planlanmalıdır.",
      },
    ],
    waTopic: "kış bahçesi",
    cardLine: "Teras ya da bahçe; dört mevsim kullanılan alan.",
  },
  {
    slug: "pergole-sistemleri",
    family: "cam-balkon",
    name: "Pergole sistemleri",
    metaTitle: "Pergole Sistemleri, Tuzla · Teras ve Bahçe | Tuzla Duş",
    metaDescription:
      "Tuzla'da pergole imalatı ve montajı. Teras ve bahçeniz için gölge ve yağmur koruması sağlayan pergole sistemleri hakkında bilgi ve teklif alın.",
    lead: "Teras ya da bahçede gölge ve yağmur koruması için kurulan, taşıyıcı çerçeve ve üst örtüden oluşan sistem.",
    answer:
      "Pergole, teras ya da bahçede gölge ve yağmur koruması sağlamak için kurulan, taşıyıcı bir çerçeve ve üst örtüden oluşan sistemdir. Sektörde üst örtü kumaş, hareketli lamel ya da sabit panel olabilir; yanlar isteğe göre cam ya da perde sistemleriyle kapatılabilir.",
    body: [
      "Pergole, açık alanı tamamen kapatmadan kullanılır hale getirir. Güneşli günlerde gölge, yağmurda koruma sağlar; yanlar açık kaldığı için alan bahçenin ya da terasın parçası olmaya devam eder.",
      "Yanları cam sistemlerle kapatılan bir pergole zamanla kış bahçesine dönüşebilir. Bu yüzden pergole kurulurken ileride yan kapatma yapılıp yapılmayacağı da düşünülmelidir.",
      "Taşıyıcının bağlanacağı duvar ve zemin, alanın rüzgâr alma durumu ve yağmur suyunun nereye akacağı ölçü sırasında birlikte değerlendirilir.",
    ],
    suits: ["Teras ve bahçeler", "Kafe ve restoranların açık alanları", "Gölge ve yağmur koruması isteyenler"],
    considerations: [
      "Rüzgâr alan yerlerde taşıyıcının sabitlenmesi önemlidir.",
      "Yağmur suyunun tahliyesi baştan planlanmalıdır.",
      "İleride yanları camla kapatmayı düşünüyorsanız bunu baştan söyleyin.",
    ],
    facts: [
      { label: "Kapsam", value: "Taşıyıcı çerçeve + üst örtü" },
      { label: "Kullanım", value: "Teras · Bahçe · Açık alan" },
      { label: "Yanlar", value: "Açık ya da camla kapatılabilir" },
      { label: "Ölçü", value: "Alana özel imalat" },
    ],
    photos: [stock.pgSiyah, stock.pgLamel],
    illustration: "pergole",
    faqs: [
      {
        q: "Pergole ile kış bahçesi arasındaki fark nedir?",
        a: "Pergole üstü örtülü, yanları genellikle açık bir sistemdir; gölge ve yağmur koruması sağlar. Kış bahçesinde ise yanlar da camla kapatılır ve alan dört mevsim kullanılır.",
      },
      {
        q: "Pergolenin yanları sonradan kapatılabilir mi?",
        a: "Evet, yanları cam sistemleriyle kapatılabilir. Bunu baştan biliyorsanız taşıyıcı ve ölçüler buna göre planlanır.",
      },
      {
        q: "Pergole rüzgârlı yerlere kurulur mu?",
        a: "Kurulur, ancak taşıyıcının sağlam sabitlenmesi gerekir. Alanın rüzgâr alma durumu ölçü sırasında değerlendirilir.",
      },
    ],
    waTopic: "pergole sistemleri",
    cardLine: "Teras ve bahçeye gölge ve yağmur koruması.",
  },
  {
    slug: "aluminyum-dograma",
    family: "cam-balkon",
    name: "Alüminyum doğrama",
    metaTitle: "Alüminyum Doğrama, Tuzla · Kapı, Pencere | Tuzla Duş",
    metaDescription:
      "Tuzla'da alüminyum doğrama imalatı ve montajı: kapı, pencere ve cephe açıklıkları için alüminyum profil sistemleri. Bilgi ve teklif için bize ulaşın.",
    lead: "Kapı, pencere ve cephe açıklıklarının alüminyum profillerle üretilen çerçeve ve kanatlarla kapatılması.",
    answer:
      "Alüminyum doğrama, pencere, kapı ve cephe gibi açıklıkların alüminyum profillerle üretilen çerçeve ve kanatlarla kapatılmasıdır. Alüminyum hafif ve paslanmayan bir malzemedir; ince profillerle geniş cam yüzeylere imkân verir.",
    body: [
      "Alüminyum doğrama; pencere, balkon kapısı, dükkân vitrini ve bölme gibi pek çok açıklıkta kullanılır. İnce profilleri sayesinde aynı açıklıkta daha fazla cam yüzey, dolayısıyla daha fazla ışık sağlar.",
      "Sektörde ısı yalıtımlı (ısı bariyerli) ve yalıtımsız alüminyum profiller bulunur. Isıtılan bir mekânın pencere ve kapılarında ısı yalıtımlı profiller tercih edilir; yalıtım gerekmeyen bölmelerde yalıtımsız profiller yeterlidir.",
      "Profil rengi, açılım şekli (sabit, açılır, sürme) ve cam tipi açıklığın kullanımına göre seçilir. Ölçü yerinde alınır, doğrama ölçüye göre imal edilir.",
    ],
    suits: ["Pencere ve balkon kapıları", "Dükkân vitrinleri ve girişleri", "İç mekân bölmeleri"],
    considerations: [
      "Isıtılan mekânlarda ısı yalıtımlı profil düşünülmelidir.",
      "Açılım şekli (sabit, açılır, sürme) kullanım alanına göre seçilmelidir.",
      "Mevcut doğramanın sökümü ve duvar düzeltmesi ölçü sırasında konuşulmalıdır.",
    ],
    facts: [
      { label: "Kullanım", value: "Pencere · Kapı · Cephe · Bölme" },
      { label: "Malzeme", value: "Alüminyum profil + cam" },
      { label: "Açılım", value: "Sabit · Açılır · Sürme" },
      { label: "Ölçü", value: "Açıklığa göre imalat" },
    ],
    photos: [stock.alGenis, stock.alSiyah],
    illustration: "aluminyum",
    faqs: [
      {
        q: "Alüminyum doğrama ile PVC arasındaki fark nedir?",
        a: "Alüminyum daha ince profillerle daha geniş cam yüzey sağlar ve paslanmaz. PVC ise kendi içinde yalıtımlıdır. Alüminyumda yalıtım isteniyorsa ısı yalıtımlı (ısı bariyerli) profiller kullanılır.",
      },
      {
        q: "Alüminyum doğrama ısı yalıtımı sağlar mı?",
        a: "Isı yalıtımlı (ısı bariyerli) profillerle evet. Yalıtımsız profiller iç bölmeler ve ısıtılmayan alanlar için uygundur.",
      },
      {
        q: "Alüminyum doğrama hangi renklerde olur?",
        a: "Sektörde alüminyum profiller boyalı ve eloksallı pek çok renkte üretilir. İstediğiniz rengi ölçü sırasında birlikte belirleriz.",
      },
    ],
    waTopic: "alüminyum doğrama",
    cardLine: "Kapı, pencere ve cephe; ince profil, geniş cam.",
  },
];

export const familyList: Family[] = [
  {
    id: "dusakabin",
    slug: "dusakabin-modelleri",
    name: "Duşakabin modelleri",
    navLabel: "Duşakabin",
    eyebrow: "Banyo",
    metaTitle: "Duşakabin Modelleri, Tuzla · Köşe, Oval, Niş | Tuzla Duş",
    metaDescription:
      "Köşe, oval, iki duvar arası ve desenli siyah profil duşakabin modellerini karşılaştırın. Tuzla'da ölçüye göre imalat ve montaj; gerçek uygulamalarımız.",
    lead: "Banyonun şekli kabini belirler. Köşeye, nişe ya da kavisli forma göre, ölçünüzde imal ediyor ve monte ediyoruz.",
    answer:
      "Duşakabin seçimi önce banyonun şekline göre yapılır: iki duvarın köşesi varsa köşe ya da oval kabin, iki duvar arasında bir niş varsa iki duvar arası kabin uygundur. Ardından açılım, profil rengi ve cam tipi seçilir. Tüm kabinlerimiz ölçüye göre imal edilir.",
    body: [
      "Aşağıdaki karşılaştırma, banyonuza hangi tipin uyacağını hızlıca görmenize yardımcı olur. Her tipin sayfasında uygulamalarımızdan fotoğraflar ve o tipe özel sorular var.",
    ],
    heroPhoto: photos.siyahIkiDuvar,
    faqs: [
      {
        q: "Banyoma hangi duşakabin uyar?",
        a: "Banyoda iki duvarın birleştiği bir köşe varsa köşe ya da oval kabin, karşılıklı iki duvar arasında bir niş varsa iki duvar arası kabin uygundur. Kabinin önündeki geçiş alanı dar ise kavisli oval kabin rahatlık sağlar.",
      },
      {
        q: "Duşakabin hazır ölçü mü, özel ölçü mü?",
        a: "Kabinlerimizi banyonuzun ölçüsüne göre imal ediyoruz. Duvarlar her zaman tam dik olmadığı için kesin ölçü imalattan önce yerinde alınır.",
      },
      {
        q: "Duşakabinde hangi profil renkleri var?",
        a: "Uygulamalarımızda siyah, krom ve beyaz profil kullandık. Farklı bir renk arıyorsanız bize sorabilirsiniz.",
      },
    ],
    compare: {
      head: ["Tip", "Nereye kurulur", "Ön yüz", "Öne çıkan"],
      rows: [
        { slug: "kose-dusakabin", cells: ["İki duvarın köşesi", "Dik köşe, iki cam yüz", "Duş alanını tam kullanır"] },
        { slug: "oval-dusakabin", cells: ["İki duvarın köşesi", "Çeyrek daire, kavisli", "Önünde daha fazla geçiş alanı"] },
        { slug: "iki-duvar-arasi-dusakabin", cells: ["İki duvar arası (niş)", "Tek ön yüz", "En az cam, en az yer"] },
        { slug: "desenli-siyah-profil-dusakabin", cells: ["Köşe ya da niş", "Kafes / geometrik desen", "Dekoratif odak"] },
      ],
    },
  },
  {
    id: "cam-balkon",
    slug: "cam-balkon-sistemleri",
    name: "Cam balkon ve cam sistemleri",
    navLabel: "Cam Balkon",
    eyebrow: "Balkon & Teras",
    metaTitle: "Cam Balkon Sistemleri, Tuzla · Sürme, Isıcam | Tuzla Duş",
    metaDescription:
      "Tuzla'da sürme ve ısıcamlı cam balkon, giyotin cam, kış bahçesi, pergole ve alüminyum doğrama. Sistemleri karşılaştırın, balkonunuz için teklif alın.",
    lead: "Balkonu rüzgâra ve yağmura kapatan cam balkonlardan teras ve bahçeleri dört mevsim kullanılır kılan sistemlere kadar.",
    answer:
      "Cam balkon sistemi seçerken iki soru belirleyicidir: paneller nasıl açılsın ve balkon kışın da kullanılsın mı? Sürme sistemde paneller yana kayar, giyotinde dikey hareket eder. Isıcam balkonu yıl boyu kullanılır kılar. Teras ve bahçeler için kış bahçesi ve pergole sistemleri vardır.",
    body: [
      "Aşağıdaki karşılaştırma sistemlerin temel farklarını özetler. Her sistemin sayfasında nasıl çalıştığını, nerede uygun olduğunu ve sık sorulan soruları bulabilirsiniz.",
    ],
    heroPhoto: photos.isicamBalkon,
    faqs: [
      {
        q: "Balkonum için hangi cam sistemi uygun?",
        a: "Balkonu yalnızca rüzgâr ve yağmura kapatmak istiyorsanız sürme cam balkon, kışın da oda gibi kullanmak istiyorsanız ısıcamlı cam balkon öne çıkar. Manzarayı tamamen açabilmek istiyorsanız giyotin sistemi düşünebilirsiniz.",
      },
      {
        q: "Cam balkon için yönetim izni gerekir mi?",
        a: "Binanın ve sitenin kurallarına göre değişir. Cephe görünümünü değiştiren işlerde yönetiminizle önceden görüşmenizi öneririz.",
      },
      {
        q: "Cam balkon ölçüsü nasıl alınır?",
        a: "Balkonun genişliği, korkuluk ve tavan yüksekliği, köşe varsa birleşim açısı ölçülür. Duvar ve tavanlar her zaman düz olmadığı için kesin ölçü imalattan önce yerinde alınır.",
      },
    ],
    compare: {
      head: ["Sistem", "Nasıl açılır", "Nerede", "Öne çıkan"],
      rows: [
        { slug: "surme-cam-balkon", cells: ["Paneller yana kayar", "Balkon", "Sade, kolay kullanım"] },
        { slug: "isicamli-cam-balkon", cells: ["Çift camlı paneller", "Balkon", "Yıl boyu kullanım"] },
        { slug: "giyotin-cam-sistemleri", cells: ["Paneller dikey kayar", "Balkon, teras, cephe", "Üst kısım tamamen açılır"] },
        { slug: "kis-bahcesi", cells: ["Yan cam + çatı", "Teras, bahçe, çatı", "Dört mevsim yaşam alanı"] },
        { slug: "pergole-sistemleri", cells: ["Üst örtü, yanlar açık", "Teras, bahçe", "Gölge ve yağmur koruması"] },
        { slug: "aluminyum-dograma", cells: ["Sabit, açılır, sürme", "Pencere, kapı, cephe", "İnce profil, geniş cam"] },
      ],
    },
  },
];

export const servicesOf = (f: FamilyId) => services.filter((s) => s.family === f);
export const familyOf = (f: FamilyId) => familyList.find((x) => x.id === f)!;
export const serviceBySlug = (slug: string) => services.find((s) => s.slug === slug);
