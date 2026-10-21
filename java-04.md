# RideShare — Java 4 · Neon dhe PostgreSQL

## Çfarë ndërtova

E lidha aplikacionin RideShare me databazën Neon. Lista dhe detajet e udhëtimeve i marrin të dhënat nga databaza dhe i shfaqin në aplikacion.

## Provat që bëra

### Prova 1: Ndryshimi në databazë shfaqet në aplikacion

Ndryshova orën e udhëtimit me ID 2 nga 08:15 në 08:25 në Neon. Pas rifreskimit kontrollova nëse ora ndryshoi në listë dhe te detajet. Pastaj e ktheva përsëri në 08:15.

### Prova 2: Lista bosh dhe rikthimi

Shtova `WHERE false` te pyetja `lexoUdhetimet` për ta bërë listën bosh. Kontrollova mesazhin që u shfaq. Pastaj e hoqa dhe kontrollova nëse u kthyen tri kartat.

### Prova 3: Lidhja mungon, rikthimi dhe siguria

Ndryshova përkohësisht emrin `DATABASE_URL` në `.env.local` dhe rinisa serverin për të parë çfarë ndodh kur mungon lidhja me databazën. Pastaj e ktheva emrin e saktë dhe rinisa serverin. Kontrollova gjithashtu nëse `.env.local` mungon në listën e skedarëve për publikim në GitHub Desktop.

## Ku gjendet puna

* `schema.sql` – struktura e databazës.
* `aplikacioni/app/lib/udhetimet.ts` – funksionet për leximin e udhëtimeve.
* `aplikacioni/app/page.tsx` – lista e udhëtimeve.
* `aplikacioni/app/udhetimi/[id]/page.tsx` – detajet e udhëtimit.
* `.env.local` – është skedar lokal dhe nuk publikohet në GitHub.

**Repository në GitHub:** [https://github.com/amirakrasniqi-hue/rideshare-mobile]

## Çfarë mbetet për përmirësim

Kërkesa për udhëtim me statusin “Në pritje” është vetëm simulim. Në të ardhmen dua ta bëj funksionale, që kërkesat të ruhen në databazë dhe shoferi të mund t'i pranojë ose refuzojë.

## Ndihma nga AI

Përdora AI për të kuptuar kodin dhe për të rregulluar gabimet. Pastaj kontrollova vetë aplikacionin dhe funksionimin e faqeve.
