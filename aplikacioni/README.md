# RideShare

Aplikacion Next.js me Neon PostgreSQL dhe hyrje GitHub.

## Nisja

1. Konfiguro `DATABASE_URL`, `NEXTAUTH_URL`, `NEXTAUTH_SECRET`, `GITHUB_ID` dhe `GITHUB_SECRET` në `.env.local` (mos e publiko këtë skedar).
2. Në Neon ekzekuto `schema.sql`, pastaj migrimet e javëve të mëparshme sipas rendit, përfshirë `schema-java05.sql`.
3. Ekzekuto `schema-java09.sql`, pastaj `schema-java10.sql` në Neon SQL Editor.
4. Sigurohu që llogaria e shoferit ka rolin `shofer` dhe që `udhetimet.shofer_id` tregon ID-në e saj GitHub. Llogaria tjetër mbetet `udhetar`.
5. `npm install` dhe `npm run dev`; të dy llogaritë hapin të njëjtin URL `/udhetimi/{id}` në sesione të ndara.

Për ta lidhur një llogari ekzistuese me udhëtimin e provës, zëvendëso `GITHUB_ID_SHOFER` me ID numerike të GitHub-it të shoferit dhe ekzekuto në Neon:

```sql
UPDATE profilet SET roli = 'shofer' WHERE github_id = 'GITHUB_ID_SHOFER';
UPDATE udhetimet SET shofer_id = 'GITHUB_ID_SHOFER' WHERE id = '1';
```

Udhëtimi `1` ka dy vende në të dhënat fillestare. Llogaria e dytë duhet të ketë rolin `udhetar`.

## Java 10

Kërkesat ruhen në `kerkesa_vendet`; serveri merr identitetin nga sesioni. API-ja e gjendjes nuk ruan cache dhe kthen vetëm kërkesat që i përkasin udhëtarit ose shoferit pronar. Faqja rilexon gjendjen çdo 5 sekonda, ruan pamjen e fundit kur leximi dështon dhe rilexon pas rikthimit online.

Pranimi zbatohet nga funksioni PostgreSQL `prano_kerkese_vendi`, që kontrollon pronësinë dhe ndryshon statusin/vendet në një transaksion. Ekzekuto testet me dy llogari dhe regjistro vëzhgimet te `../java-10.md`.

## Java 9

Preferimet ruhen veçmas nga kërkesat e rezervimit në `udhetimet_preferuara`. Endpoint-i merr përdoruesin nga sesioni dhe `UNIQUE (udhetar_id, udhetim_id)` e bën ruajtjen të përsëritshme pa krijuar dublikatë. Për të provuar dështimin në zhvillim, vendos përkohësisht `JAVA09_REFUZO_PREFERIMIN=true` në `.env.local` dhe rinis serverin; aplikacioni refuzon ruajtjen para shkrimit në databazë. Hiqe/ktheje në `false` për provën e suksesit.
