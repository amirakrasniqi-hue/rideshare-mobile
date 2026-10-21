# Java 5 · Hyrja me GitHub dhe ndryshimi me leje

## Puna e përgatitur

- Shtova hyrjen me GitHub përmes NextAuth 4.24.15.
- Shtova profilin në Neon dhe kontrollin në server për rolin `shofer` dhe pronësinë e udhëtimit.
- Formulari i panelit kërkon ndryshimin e orës së udhëtimit ID 2; kërkesa për ID 1 refuzohet kur pronari është tjetër.
- Shtova `schema-java05.sql` për tabelën `profilet` dhe kolonën e pronarit.
- Sekretet e OAuth dhe lidhja e Neon-it mbeten në `.env.local`, i cili përjashtohet nga Git.

## Rezultatet e provave

Provat u kryen lokalisht me OAuth App-in dhe databazën Neon të projektit.

### Prova 1 · Sesioni

Hapa `/panel`, u kyça me GitHub dhe rifreskova panelin; emri, ID-ja dhe roli `shofer` u shfaqën pas hyrjes.

### Prova 2 · Ruajtja e lejuar

Vendosa orën 08:25 për udhëtimin ID 2 dhe klikova “Ruaj orën”; aplikacioni shfaqi suksesin dhe karta e udhëtimit tregoi 08:25. Pastaj e riktheva ID 2 në 08:15.

### Prova 3 · Refuzimi i ndryshimit pa pronësi

Në DevTools ndryshova ID-në e fshehur të formularit nga 2 në 1 dhe provova të ruaja 08:25; serveri refuzoi kërkesën me “Nuk ke leje për këtë udhëtim. Ora nuk ndryshoi.” Kontrolli në Neon tregoi ID 1 në 08:00 dhe ID 2 në 08:15.

## Konfigurimi lokal që kërkohet

Krijo OAuth App me callback `http://localhost:3000/api/auth/callback/github`, vendos `GITHUB_ID`, `GITHUB_SECRET`, `NEXTAUTH_SECRET`, `NEXTAUTH_URL` dhe `DATABASE_URL` në `aplikacioni/.env.local`, pastaj ekzekuto `schema-java05.sql` në Neon. Cakto profilin tënd shofer dhe caktoje pronar të ID 2 sipas udhëzimit të ushtrimit. Mos i shto sekretet këtij raporti.
