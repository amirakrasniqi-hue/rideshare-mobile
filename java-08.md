# Java 8 · Vendtakimi në RideShare

## Ndryshimi

Komponenti `aplikacioni/components/Vendtakimi.tsx` ofron fushë manuale, konfirmim lokal dhe kërkesë për vendndodhjen vetëm pas klikimit. Faqja e detajeve e përdor komponentin, ndërsa `/java-08-test` e paraqet me të dhëna fiktive dhe buton për simulimin e timeout-it. Simulimi nuk duhet të përdoret në faqen normale.

Konfirmimi mbahet vetëm në gjendjen React të ekranit dhe humbet pas rifreskimit. Koordinatat nuk kthehen në emër vendi dhe nuk dërgohen te Dritoni apo databaza.

## Prova 1 · Leja pranohet

Hapat: Hap faqen dhe kontrollo që nuk kërkohet leje vetvetiu. Kliko “Përdor vendndodhjen time” dhe prano lejen në localhost/HTTPS.

Pritshmëria: Kërkesa nis pas klikimit, pritja mbaron dhe shfaqen suksesi e saktësia në metra. Vendtakimin e emërton dhe e konfirmon manualisht.

Vëzhgimi: Prova reale në shfletues/pajisje nuk është kryer gjatë përgatitjes së kodit. Duhet shënuar rezultati pasi të pranohet leja.

## Prova 2 · Leja refuzohet

Hapat: Refuzo lejen, pastaj shkruaj “Parkingu” dhe konfirmo.

Pritshmëria: Shfaqet mesazhi i refuzimit, pritja mbaron dhe zgjedhja manuale konfirmohet.

Vëzhgimi: Prova në shfletues nuk është kryer gjatë përgatitjes së kodit. Duhet shënuar nëse shfaqet refuzimi dhe nëse konfirmohet “Parkingu”.

## Prova 3 · Nuk merret rezultat

Hapat: Te `/java-08-test` kliko “Simulo përfundimin e kohës”, provo sërish dhe konfirmo “Biblioteka”. Ky buton simulon `error.code === 3`; nuk provon timeout real.

Pritshmëria: Mesazhi tregon përfundimin e kohës, pritja mbyllet, kërkesa mund të provohet sërish dhe fusha manuale funksionon.

Vëzhgimi: Simulimi nuk është ekzekutuar gjatë përgatitjes së kodit. Pas ekzekutimit shëno mesazhin e parë dhe konfirmimin manual.

## Privatësia dhe kufizimet

Nuk janë shtuar koordinata, adresa personale ose sekrete. Vendtakimi është zgjedhje lokale e shfletuesit: nuk ruhet pas rifreskimit dhe nuk dërgohet te shoferi. Kërkohet leja e shfletuesit dhe kontekst i sigurt (localhost ose HTTPS). Saktësia është ajo që raporton pajisja.

## Ndihma nga AI

AI ndihmoi në ndarjen e tekstit në shkrim nga zgjedhja e konfirmuar, në trajtimin e rezultateve të Geolocation API dhe në përgatitjen e strukturës së raportit. Provat reale mbeten për t'u kryer dhe dokumentuar nga studenti.
