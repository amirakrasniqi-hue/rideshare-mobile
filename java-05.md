# Java 5 · Hyrja me GitHub dhe ndryshimi me leje

## Puna e përgatitur

- Shtova hyrjen me GitHub përmes NextAuth 4.24.15.
- Shtova profilin në Neon dhe kontrollin në server për rolin `shofer` dhe pronësinë e udhëtimit.
- Formulari i panelit kërkon ndryshimin e orës së udhëtimit ID 2; kërkesa për ID 1 refuzohet kur pronari është tjetër.
- Shtova `schema-java05.sql` për tabelën `profilet` dhe kolonën e pronarit.
- Sekretet e OAuth dhe lidhja e Neon-it mbeten në `.env.local`, i cili përjashtohet nga Git.

## Rezultatet e provave

Provat u kryen lokalisht me OAuth App-in dhe databazën Neon të projektit.

1. **Sesioni:** Hyrja me GitHub funksionoi; paneli shfaqi profilin dhe rolin `shofer`.
2. **Ruajtja:** Ora e udhëtimit ID 2 u ndryshua në 08:25 dhe u shfaq në kartën e udhëtimit. Më pas u rikthye në 08:15.
3. **Refuzimi:** Pas ndryshimit të ID-së së formularit në 1, serveri shfaqi “Nuk ke leje për këtë udhëtim. Ora nuk ndryshoi.” Kontrolli përfundimtar në Neon tregoi ID 1 në 08:00 dhe ID 2 në 08:15.

## Konfigurimi lokal që kërkohet

Krijo OAuth App me callback `http://localhost:3000/api/auth/callback/github`, vendos `GITHUB_ID`, `GITHUB_SECRET`, `NEXTAUTH_SECRET`, `NEXTAUTH_URL` dhe `DATABASE_URL` në `aplikacioni/.env.local`, pastaj ekzekuto `schema-java05.sql` në Neon. Cakto profilin tënd shofer dhe caktoje pronar të ID 2 sipas udhëzimit të ushtrimit. Mos i shto sekretet këtij raporti.
