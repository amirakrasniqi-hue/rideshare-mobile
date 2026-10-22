# Java 6 · PWA dhe leximi offline

## Puna e përgatitur

- Shtova manifestin e RideShare AAB dhe ikonat PNG 192×192 dhe 512×512.
- Shtova `GET /api/udhetimet`, i cili përdor të njëjtin `lexoUdhetimet()` dhe kthen vetëm fushat publike të udhëtimit.
- Shtova service worker-in me cache të kufizuar te faqja e leximit, ikonat dhe kopja e listës publike. Paneli, hyrja dhe kërkesat POST nuk ruhen.
- Shtova `offline.html`: kartat ndërtohen me `textContent`, shfaqet koha/burimi i kopjes dhe butoni për kërkesë vendi është i çaktivizuar.
- Regjistrimi i worker-it është në layout-in ekzistues; metadata, CSS dhe faqet e Java 5 mbeten të paprekura.
- Nuk shtova paketa ose sekrete. `.env.local` vazhdon të përjashtohet nga Git.

## Provat

Provat e mëposhtme u kryen në shfletuesin lokal me Neon-in e projektit. Rezultatet reale janë shënuar pas secilës provë.

### Prova 1 · Manifesti dhe vizita online

Hap `/manifest.webmanifest`, `/icons/icon-192.png` dhe `/icons/icon-512.png`. Pastaj hap faqen kryesore me internet dhe kontrollo te DevTools → Application → Service Workers që `/sw.js` është aktiv. Te Cache Storage → `rideshare-public-v1` kontrollo `/api/udhetimet`; hape edhe `/offline.html`.

**Pritet:** emri RideShare AAB, ikonat me madhësitë përkatëse, tri udhëtime në listën publike, kohë ruajtjeje dhe burimi `network`.

**Rezultati real:** `/manifest.webmanifest` ktheu manifestin me emrin RideShare AAB dhe ikonat e deklaruara 192×192 e 512×512. Në faqen e leximit u shfaqën tri udhëtime: Prishtinë 08:00 (2 vende), Fushë Kosovë 08:15 (1 vend) dhe Lipjan 07:45 (0 vende). Burimi u shënua `network`. Te DevTools → Application → Cache Storage u konfirmua `rideshare-public-v1` me katër hyrje: `/api/udhetimet`, dy ikonat PNG dhe `/offline.html`. Në pamjen e fundit, koha e ruajtjes ishte 22.10.2026, 15:13:30.

### Prova 2 · Pa internet dhe pas rifreskimit

Në DevTools për tab-in RideShare zgjidh Network → Offline. Hape ose rifresko `/`; pastaj lexo listën dhe kohën e kopjes në faqen offline.

**Pritet:** dokumenti offline dhe tri kartat hapen nga cache pas rifreskimit, burimi tregon kopjen e ruajtur dhe butoni “Kërko vend” mbetet i çaktivizuar.

**Rezultati real:** Zgjodha Network → Offline dhe rifreskova `/offline.html`. Faqja u hap pas rifreskimit; mesazhi tregoi “Lista e fundit e ruajtur · Mund të jetë vjetruar. Serveri nuk u arrit.” Koha e kopjes mbeti 22.10.2026, 15:13:30 dhe u shfaqën tri kartat: Prishtinë 08:00 (2 vende), Fushë Kosovë 08:15 (1 vend) dhe Lipjan 07:45 (0 vende). DevTools shënoi vetëm kërkesën `favicon.ico` si të dështuar; lista u lexua nga cache.

### Prova 3 · Përditësimi pas rikthimit të lidhjes

Me RideShare ende offline, ndrysho në Neon orën e udhëtimit ID 2 në `08:25`. Rikthe rrjetin në tab-in RideShare dhe kliko “Rifresko listën”. Pastaj rikthe orën në `08:15` në Neon dhe rifresko sërish.

**Pritet:** kopja offline e vjetër shfaq `08:15`; pas rifreskimit online shfaqet `08:25` me burimin `network` dhe kohë të re. Pas rikthimit të vlerës në Neon, lista tregon `08:15`.

**Rezultati real:** Me RideShare offline, në Neon ndryshova orën e ID 2 në `08:25`. Pas zgjedhjes së No throttling dhe rifreskimit, karta e Fushë Kosovës tregoi `08:25`, mesazhi konfirmoi burimin `network`, dhe koha e kopjes u përditësua në 22.10.2026, 15:23:53. Më pas ID 2 u rikthye në Neon në `08:15` dhe lista u rifreskua sërish; ekrani pas rikthimit tregoi orën aktuale nga serveri.

## Konfigurimi dhe dorëzimi

Përdor të njëjtin `.env.local` dhe Neon të Java 5. Mos publiko sekretet. Pas plotësimit të rezultateve, bëj commit me mesazhin `Java 6: PWA dhe lexim offline` dhe push në repository personal; më pas dorëzo linkun e repository-t sipas udhëzimit të kursit.
