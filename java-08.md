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

**Vëzhgimi real:** Në Firefox headless në localhost klikova “Simulo përfundimin e kohës”; u shfaq “Koha mbaroi. Provo sërish ose shkruaj vendtakimin.” Gjithashtu shkrova dhe konfirmova `Biblioteka e AAB-se`; ekrani tregoi “Vendtakimi i konfirmuar: Biblioteka e AAB-se” dhe “Vendtakimi u konfirmua në këtë telefon.” Refuzimin real të kërkesës për vendndodhje nuk e provova; pjesa e refuzimit më sipër përshkruan pritshmërinë e bazuar në kod dhe mbetet për provë në shfletues.

### Prova 3 — Kontrolli i privatësisë

**Hapat:** Kontrollova komponentin dhe faqen e testimit për kërkesa rrjeti, ruajtje në browser, koordinata të futura si të dhëna fikse dhe sekrete. Kontrollova gjithashtu nëse `aplikacioni/.env.local` ndiqet nga Git dhe nëse përjashtohet nga `.gitignore`.

**Pritshmëria:** Kodi i vendtakimit nuk dërgon koordinata ose adresë te serveri dhe nuk përfshin sekrete. Skedari lokal i mjedisit nuk publikohet në repository.

**Vëzhgimi real:** Në `Vendtakimi.tsx` dhe faqen `/java-08-test` nuk gjeta `fetch`, `sendBeacon`, `localStorage` ose `sessionStorage`. Koordinatat përdoren vetëm për të llogaritur metrat e saktësisë në mesazhin e faqes; emri i vendit shkruhet veçmas nga përdoruesi. `git ls-files --error-unmatch aplikacioni/.env.local` konfirmoi se skedari nuk ndiqet nga Git, ndërsa `git check-ignore` tregoi se përjashtohet. Ky kontroll shqyrtoi kodin dhe konfigurimin; nuk kapi kërkesa rrjeti nga klikim i vërtetë, sepse ndërveprimet e shfletuesit nuk u ekzekutuan.

## Prova me një hyrje të re

**Hyrja që provova:** Në Firefox hapa `http://127.0.0.1:3000/java-08-test`. Fillimisht klikova “Konfirmo në telefon” me fushën bosh. Pastaj shkrova hyrjen e re `Stacioni i Trenit` dhe klikova sërish “Konfirmo në telefon”.

**Parashikimi im para klikimit:** Me fushën bosh prisja paralajmërim që duhet shkruar vendtakimi. Pas shkrimit të `Stacioni i Trenit` prisja që aplikacioni ta shfaqte si vendtakim të konfirmuar. Asnjë nga këto veprime nuk duhej të kërkonte leje vendndodhjeje.

**Çfarë pashë realisht:** Para klikimeve ekrani tregoi “Vendtakimi i konfirmuar: Ende nuk është zgjedhur”. Klikimi me fushën bosh shfaqi “Shkruaj vendtakimin para se ta konfirmosh.” Pas shkrimit të `Stacioni i Trenit`, ekrani tregoi “Vendtakimi i konfirmuar: Stacioni i Trenit” dhe statusin “Vendtakimi u konfirmua në këtë telefon.” Nuk u shfaq kërkesë për leje, sepse përdora vetëm fushën manuale. Këto rezultate i pashë gjatë ndërveprimit me komponentin në Firefox headless.

**Skedari dhe funksioni që e shpjegojnë:** `aplikacioni/components/Vendtakimi.tsx`: `konfirmo()` lexon fushën, heq hapësirat në skaje dhe vendos vlerën në state-in lokal; `kurDeshtonLeximi()` trajton timeout-in. `aplikacioni/app/java-08-test/page.tsx` shfaq komponentin me të dhëna fiktive dhe aktivizon butonin e simulimit.

**Çfarë kuptova ose korrigjova:** Kur fusha është bosh, aplikacioni e ndalon konfirmimin dhe kërkon tekst. Pasi shkrova një hyrje të re, ajo u ruajt si vendtakim i konfirmuar në ekran. Kjo provë kontrolloi hyrjen manuale, jo GPS-in ose refuzimin e lejes.

## Privatësia dhe kufizimet

Geolocation API kërkon kontekst të sigurt (`localhost` ose HTTPS) dhe leje nga shfletuesi. Saktësia varet nga pajisja. Vendtakimi i konfirmuar është lokal në ekran, humbet pas rifreskimit dhe nuk ruhet në server. Faqja e testimit përdor të dhëna fiktive; simulimi i timeout-it nuk provon sjelljen e pajisjes në rrjet të dobët.

## Ndihma nga AI

AI ndihmoi në rishikimin e rrjedhës së lejes, ndarjen e rezultateve të leximit nga konfirmimi manual dhe strukturimin e raportit. Kontrollova vetë përgjigjen HTTP lokale, përmbajtjen fillestare të faqes, kodin e komponentit dhe përjashtimin e `.env.local`. Klikimet dhe rezultatet e lejes reale mbeten për t’u provuar në shfletues/pajisje.
