# Java 6 · PWA dhe leximi offline

## Çfarë ndërtova

- Shtova manifestin e RideShare AAB dhe ikonat PNG 192×192 dhe 512×512. Instalimin nga menyja e shfletuesit nuk e testova; provat u bënë në localhost.
- Shtova `GET /api/udhetimet`, i cili përdor të njëjtin `lexoUdhetimet()` dhe kthen vetëm fushat publike të udhëtimit.
- Shtova service worker-in me cache të kufizuar te faqja e leximit, ikonat dhe kopja e listës publike. Paneli, hyrja dhe kërkesat POST nuk ruhen.
- Shtova `offline.html`: kartat ndërtohen me `textContent`, shfaqet koha/burimi i kopjes dhe butoni për kërkesë vendi është i çaktivizuar.
- Regjistrimi i worker-it është në layout-in ekzistues. Rregullat e hyrjes dhe lejeve të Java 5 u ruajtën; hyrja tani shfaqet edhe në faqen kryesore.
- Nuk shtova paketa ose sekrete. `.env.local` vazhdon të përjashtohet nga Git.

## Provat

Provat e mëposhtme u kryen në shfletuesin lokal me Neon-in e projektit. Rezultatet reale janë shënuar pas secilës provë.

### Prova 1 · Manifesti dhe vizita online

Hap `/manifest.webmanifest`, `/icons/icon-192.png` dhe `/icons/icon-512.png`. Pastaj hap faqen kryesore me internet dhe kontrollo te DevTools → Application → Service Workers që `/sw.js` është aktiv. Te Cache Storage → `rideshare-public-v1` kontrollo `/api/udhetimet`; hape edhe `/offline.html`.

**Pritet:** emri RideShare AAB, ikonat me madhësitë përkatëse, tri udhëtime në listën publike, kohë ruajtjeje dhe burimi `network`.

**Rezultati real:** `/manifest.webmanifest` ktheu manifestin me emrin RideShare AAB dhe ikonat e deklaruara 192×192 e 512×512. Në faqen e leximit u shfaqën tri udhëtime: Prishtinë 08:00 (2 vende), Fushë Kosovë 08:15 (1 vend) dhe Lipjan 07:45 (0 vende). Burimi u shënua `network`. Te DevTools → Application → Cache Storage u konfirmua `rideshare-public-v1` me katër hyrje: `/api/udhetimet`, dy ikonat PNG dhe `/offline.html`. Në pamjen e fundit, koha e ruajtjes ishte 22.10.2026, 15:13:30. Në kontrollin shtesë të 30.10.2026, manifesti, ikonat, `/sw.js`, `/offline.html` dhe API-ja u përgjigjën me `200`; ikonat kishin përmasat reale 192×192 dhe 512×512.

### Prova 2 · Pa internet dhe pas rifreskimit

Në DevTools për tab-in RideShare zgjidh Network → Offline. Hape ose rifresko `/`; pastaj lexo listën dhe kohën e kopjes në faqen offline.

**Pritet:** dokumenti offline dhe tri kartat hapen nga cache pas rifreskimit, burimi tregon kopjen e ruajtur dhe butoni “Kërko vend” mbetet i çaktivizuar.

**Rezultati real:** Zgjodha Network → Offline dhe rifreskova `/offline.html`. Faqja u hap pas rifreskimit; mesazhi tregoi “Lista e fundit e ruajtur · Mund të jetë vjetruar. Serveri nuk u arrit.” Koha e kopjes mbeti 22.10.2026, 15:13:30 dhe u shfaqën tri kartat: Prishtinë 08:00 (2 vende), Fushë Kosovë 08:15 (1 vend) dhe Lipjan 07:45 (0 vende). Butoni `Kërko vend` mbeti i çaktivizuar, sepse kopja offline shërben vetëm për lexim dhe nuk konfirmon rezervim. DevTools shënoi vetëm kërkesën `favicon.ico` si të dështuar; lista u lexua nga cache.

### Prova 3 · Përditësimi pas rikthimit të lidhjes

Me RideShare ende offline, ndrysho në Neon orën e udhëtimit ID 2 në `08:25`. Rikthe rrjetin në tab-in RideShare dhe kliko “Rifresko listën”. Pastaj rikthe orën në `08:15` në Neon dhe rifresko sërish.

**Pritet:** kopja offline e vjetër shfaq `08:15`; pas rifreskimit online shfaqet `08:25` me burimin `network` dhe kohë të re. Pas rikthimit të vlerës në Neon, lista tregon `08:15`.

**Rezultati real:** Me RideShare offline, në Neon ndryshova orën e ID 2 në `08:25`. Kopja offline vazhdoi të tregonte `08:15`. Pas zgjedhjes së No throttling dhe rifreskimit, karta e Fushë Kosovës tregoi `08:25`, mesazhi konfirmoi burimin `network`, dhe koha e kopjes u përditësua në 22.10.2026, 15:23:53. Më pas ID 2 u rikthye në Neon në `08:15` dhe lista u rifreskua sërish; ekrani tregoi `08:15` nga serveri.

## Ku gjendet puna

Repository: [amirakrasniqi-hue/rideshare-mobile](https://github.com/amirakrasniqi-hue/rideshare-mobile).

- `aplikacioni/app/manifest.ts` dhe `aplikacioni/public/icons/` — manifesti dhe ikonat.
- `aplikacioni/app/api/udhetimet/route.ts` — lista publike JSON.
- `aplikacioni/public/sw.js` dhe `aplikacioni/public/offline.html` — ruajtja dhe leximi offline.
- `aplikacioni/components/Pwa.tsx` dhe `aplikacioni/app/layout.tsx` — regjistrimi i service worker-it.

Demo në Vercel nuk u publikua; aplikacioni u provua në localhost.

## Çfarë mbetet për përmirësim

Në vizitën e parë pa internet nuk ka ende kopje, prandaj shfaqet mesazhi “Ende nuk ka listë të ruajtur”. Kopja mund të vjetrohet ose të fshihet nga shfletuesi; nuk zëvendëson databazën. Lexuesi offline nuk bën rezervime. Përdoruesi duhet të lidhet me internetin dhe të rifreskojë listën para se të mbështetet te orari ose numri i vendeve.

## Ndihma nga AI

Përdora AI për rishikimin e kodit dhe rregullimin e hyrjes: butoni GitHub ishte vetëm në panel, ndaj u shtua edhe në faqen kryesore. Kontrollova vetë faqet lokale, përgjigjen e API-së dhe përmasat e ikonave. Provat offline të mësipërme u kryen me hapat e DevTools dhe Neon të përshkruar në secilën provë.

## Konfigurimi dhe dorëzimi

Përdor të njëjtin `.env.local` dhe Neon të Java 5. Mos publiko sekretet. Pas plotësimit të rezultateve, bëj commit me mesazhin `Java 6: PWA dhe lexim offline` dhe push në repository personal; më pas dorëzo linkun e repository-t sipas udhëzimit të kursit.
