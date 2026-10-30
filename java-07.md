# Java 7 · Prova dhe korrigjimi i RideShare

## Rasti im

Kodi personal: **P7-995**  
GitHub: @amirakrasniqi-hue  
Rasti 1 · Lista dhe detajet

## Parashikimi

Ky parashikim u hartua me ndihmën e AI-së, sipas kërkesës sime. Për një udhëtim ekzistues, pres që lidhja nga lista të hapë detajet e të njëjtit udhëtim dhe ID-ja të përputhet. Për një ID që nuk ekziston, pres mesazh të qartë që udhëtimi nuk u gjet dhe lidhje për t'u kthyer te lista.

## Ndryshimi i ri

Shtova ID-në e udhëtimit në kartën e listës dhe në faqen e detajeve. Kjo e bën të dukshme në të dy ekranet se cili udhëtim po hapet.

## Dy probleme

1. Kartat e listës dhe faqja e detajeve nuk e shfaqnin ID-në, prandaj ishte e vështirë të verifikohej se po ndiqej i njëjti udhëtim.
2. Kërkesa direkte për ID që mungon kthen 404, por përgjigjja e marrë në provë nuk përmbante tekstin e faqes së posaçme “Udhëtimi nuk u gjet” ose lidhjen për listën.

## Korrigjimi

Skedari: aplikacioni/components/KartaUdhetimi.tsx

Shtova rreshtin “ID e udhëtimit” në kartën e listës dhe te `aplikacioni/app/udhetimi/[id]/page.tsx`. Para ndryshimit përdoruesi shihte destinacionin, orën dhe vendet, por jo ID-në. Tani mund ta krahasojë ID-në në listë me atë në detaje. `npm run lint` përfundoi pa gabime.

## Versionet

Para: https://github.com/amirakrasniqi-hue/rideshare-mobile/commit/d4a90a12aab77ef46559a3dd29c1cdd1e3b9bb1c

Pas: https://github.com/amirakrasniqi-hue/rideshare-mobile/commit/876b97a55cbfcc23a3646833fc05fd2a19491ad8

### Prova 1 · ID nga lista te detajet

Hapat: Hap listën në localhost, kontrollo kartën e parë dhe hap `/udhetimi/1`.

Pritshmëria: Lista tregon ID 1 dhe lidhja hap detajet me ID 1 dhe të njëjtin udhëtim.

Vëzhgimi: Kaloi. Karta dhe detajet treguan ID 1; të dyja paraqitën Prishtinë – AAB, nisjen 08:00 dhe 2 vende.

### Prova 2 · ID që nuk ekziston

Hapat: Hape `http://localhost:3000/udhetimi/999999` dhe kontrollo statusin dhe përmbajtjen e përgjigjes.

Pritshmëria: Kërkesa kthen 404 me mesazhin “Udhëtimi nuk u gjet” dhe lidhje për t'u kthyer te lista.

Vëzhgimi: Nuk kaloi plotësisht. U kthye HTTP 404, por përgjigjja e marrë nuk përmbante mesazhin e faqes së posaçme ose lidhjen për listën.

### Prova 3 · Hyrje tjetër, pa vende

Hapat: Hape `/udhetimi/3`, udhëtimin tjetër në listë, me 0 vende të lira.

Pritshmëria: Detajet tregojnë ID 3 dhe 0 vende; nuk ofrohet lidhja “Kërko vend”.

Vëzhgimi: Kaloi. U shfaqën ID 3, Lipjan – AAB, 07:45 dhe 0 vende; në vend të lidhjes u shfaq “Nuk ka vende të lira”.

## Ndihma nga AI

AI ndihmoi në hartimin e parashikimit, identifikimin e paqartësive dhe ndryshimin e vogël në kod. Provat u kryen me kërkesa HTTP te serveri lokal; nuk u bë demonstrim me shfletues grafik.
