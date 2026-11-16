# Java 8 · Vendtakimi në RideShare

## Ndryshimi

Komponenti `aplikacioni/components/Vendtakimi.tsx` lejon shkrimin dhe konfirmimin lokal të vendtakimit. Kërkesa për vendndodhje nis vetëm kur përdoruesi klikon butonin përkatës. Faqja `/java-08-test` përdor udhëtim fiktiv dhe ka një buton që simulon timeout-in. Simulimi nuk shfaqet në faqen normale të detajeve.

Vendtakimi mbahet vetëm në gjendjen React të ekranit dhe humbet pas rifreskimit. Koordinatat nuk ruhen dhe nuk i dërgohen serverit, shoferit apo databazës.

### Prova 1 — Hapja pa kërkesë lejeje dhe pranimi pas klikimit

**Hapat:** Nisa aplikacionin lokal dhe hapa `http://127.0.0.1:3000/java-08-test`. Kontrollova gjendjen fillestare pa klikuar butonin e vendndodhjes. Pastaj hapa kodin e `perdorVendndodhjen()` për të kontrolluar kur thirret Geolocation API. Për provën e plotë në shfletues, hapat janë: kliko “Përdor vendndodhjen time” dhe prano lejen.

**Pritshmëria:** Para klikimit shfletuesi nuk kërkon leje. Pas klikimit dhe pranimit, pritja përfundon, shfaqet saktësia e raportuar dhe përdoruesi mund ta shkruajë e konfirmojë emrin e vendtakimit.

**Vëzhgimi real:** Kërkesa HTTP lokale për faqen u përgjigj me `200`. Faqja kishte fushën e vendtakimit, butonin e konfirmimit dhe butonin e vendndodhjes; gjendja fillestare ishte “Ende nuk është zgjedhur”. Në kod, `getCurrentPosition()` thirret vetëm brenda funksionit të lidhur me klikimin, prandaj ngarkimi i faqes nuk e nis vetë kërkesën. Nuk arrita të ekzekutoj klikimin dhe pranimin në shfletues: shfletuesi headless në këtë mjedis u mbyll me gabim të procesit grafik. Pranimi real i lejes dhe shfaqja e saktësisë mbeten për t’u provuar në shfletues/pajisje.

### Prova 2 — Refuzimi, vendtakimi manual dhe timeout-i

**Hapat:** Për provën e refuzimit në shfletues, kliko “Përdor vendndodhjen time” dhe refuzo lejen. Shkruaj `Parkingu` dhe kliko “Konfirmo në telefon”. Në faqen `/java-08-test`, kliko “Simulo përfundimin e kohës”, pastaj shkruaj `Biblioteka` dhe konfirmoje.

**Pritshmëria:** Pas refuzimit shfaqet udhëzimi për shkrimin manual. Pas konfirmimit, `Parkingu` paraqitet si vendtakim i zgjedhur në këtë telefon. Simulimi i timeout-it e mbyll gjendjen e pritjes, tregon se koha mbaroi dhe lejon provë të re ose zgjedhje manuale. Butoni simulon `error.code === 3`; ai nuk provon timeout real të pajisjes.

**Vëzhgimi real:** Nuk arrita t’i klikoj këto kontrolle në shfletues për shkak të gabimit të nisjes së shfletuesit headless. Nga leximi i komponentit, refuzimi (`error.code === 1`) vendos mesazhin “Leja u refuzua. Shkruaj vendtakimin vetë.”; konfirmimi ruan tekstin vetëm në state-in lokal, kurse butoni i provës kalon `error.code === 3` dhe çaktivizon pritjen. Këto janë sjellje të verifikuara në kod, jo rezultate të një klikimi real; duhen konfirmuar në pajisje.

### Prova 3 — Kontrolli i privatësisë

**Hapat:** Kontrollova komponentin dhe faqen e testimit për kërkesa rrjeti, ruajtje në browser, koordinata të futura si të dhëna fikse dhe sekrete. Kontrollova gjithashtu nëse `aplikacioni/.env.local` ndiqet nga Git dhe nëse përjashtohet nga `.gitignore`.

**Pritshmëria:** Kodi i vendtakimit nuk dërgon koordinata ose adresë te serveri dhe nuk përfshin sekrete. Skedari lokal i mjedisit nuk publikohet në repository.

**Vëzhgimi real:** Në `Vendtakimi.tsx` dhe faqen `/java-08-test` nuk gjeta `fetch`, `sendBeacon`, `localStorage` ose `sessionStorage`. Koordinatat përdoren vetëm për të llogaritur metrat e saktësisë në mesazhin e faqes; emri i vendit shkruhet veçmas nga përdoruesi. `git ls-files --error-unmatch aplikacioni/.env.local` konfirmoi se skedari nuk ndiqet nga Git, ndërsa `git check-ignore` tregoi se përjashtohet. Ky kontroll shqyrtoi kodin dhe konfigurimin; nuk kapi kërkesa rrjeti nga klikim i vërtetë, sepse ndërveprimet e shfletuesit nuk u ekzekutuan.

## Prova me një hyrje të re

### Hyrja që provova

Hapa rrugën `/java-08-test` në serverin lokal dhe kontrollova faqen fillestare, fushën e zbrazët dhe kontrollet e vendtakimit. Nuk bëra klikim që të dërgojë kërkesë për leje.

### Parashikimi im para klikimit

Faqja do të hapej pa kërkuar vendndodhje. Vetëm pas klikimit të butonit do të niste kërkesa e shfletuesit. Nëse përdoruesi refuzon, mund të shkruajë një emër vendi dhe ta konfirmojë lokalisht.

### Çfarë pashë realisht

Kërkesa lokale ktheu `200`; faqja shfaqi udhëtimin fiktiv, fushën manuale dhe dy butonat. Vendtakimi fillestar ishte bosh. Nuk e verifikova në shfletues prompt-in e lejes, pranimin/refuzimin, mesazhin pas klikimit ose konfirmimin e tekstit, sepse Chromium/Edge headless nuk u nisën me sukses në këtë mjedis.

### Skedari dhe funksioni që e shpjegojnë

`aplikacioni/components/Vendtakimi.tsx`: `perdorVendndodhjen()` thërret API-në vetëm pas klikimit; `kurDeshtonLeximi()` trajton refuzimin dhe timeout-in; `konfirmo()` vendos emrin e shkruar në state-in lokal. `aplikacioni/app/java-08-test/page.tsx` shfaq komponentin me të dhëna fiktive dhe aktivizon simulimin.

### Çfarë kuptova ose korrigjova

E ndava kontrollin statik nga prova ndërvepruese: ngarkimi i faqes dhe kodi tregojnë se leja nuk kërkohet vetvetiu, por pranimi/refuzimi dhe timeout-i duhet të provohen duke klikuar në shfletues real. Koordinatat nuk janë emër vendi dhe nuk dërgohen nga ky komponent; vendtakimi manual mbetet zgjedhja e qartë e përdoruesit.

## Privatësia dhe kufizimet

Geolocation API kërkon kontekst të sigurt (`localhost` ose HTTPS) dhe leje nga shfletuesi. Saktësia varet nga pajisja. Vendtakimi i konfirmuar është lokal në ekran, humbet pas rifreskimit dhe nuk ruhet në server. Faqja e testimit përdor të dhëna fiktive; simulimi i timeout-it nuk provon sjelljen e pajisjes në rrjet të dobët.

## Ndihma nga AI

AI ndihmoi në rishikimin e rrjedhës së lejes, ndarjen e rezultateve të leximit nga konfirmimi manual dhe strukturimin e raportit. Kontrollova vetë përgjigjen HTTP lokale, përmbajtjen fillestare të faqes, kodin e komponentit dhe përjashtimin e `.env.local`. Klikimet dhe rezultatet e lejes reale mbeten për t’u provuar në shfletues/pajisje.
