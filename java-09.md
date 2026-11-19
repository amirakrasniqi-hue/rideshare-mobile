# Java 9 · Udhëtimet e preferuara

## Çfarë u ndërtua

Kur udhëtari është i kyçur, faqja lexon ID-të e preferimeve të tij nga Neon. Klikimi i yllit përditëson menjëherë yllin dhe numrin, shfaq gjendjen “Po ruhet…” dhe dërgon një `POST` në server. Pas suksesit shfaqet “I ruajtur”. Në gabim, ylli dhe numri kthehen te vlerat e mëparshme dhe shfaqet mundësia për riprovim.

Serveri merr ID-në e udhëtarit nga sesioni, jo nga kërkesa e shfletuesit. Tabela `udhetimet_preferuara` lidh udhëtimin me përdoruesin; kufizimi unik dhe `ON CONFLICT DO NOTHING` e bëjnë ruajtjen idempotente. Preferimi nuk ndryshon vendet e lira dhe nuk krijon kërkesë rezervimi. Heqja e preferimit nuk u përfshi, sepse është zgjerim opsional.

## Çfarë u verifikua teknikisht

- `npm run lint` kaloi.
- `npx tsc --noEmit` kaloi.
- `npm run build` kaloi.
- Migrimi `aplikacioni/schema-java09.sql` u ekzekutua në Neon. U verifikuan tabela `udhetimet_preferuara` dhe kufizimi unik për çiftin përdorues–udhëtim.

Këto kontrolle nuk zëvendësojnë provat me sesionin e udhëtarit në shfletues. Provat e mëposhtme manuale nuk janë kryer në këtë mjedis, prandaj rezultatet reale lihen të paplotësuara.

## Tri provat manuale

Përdor një llogari udhëtari të kyçur dhe një ID ekzistuese udhëtimi. Shëno ID-në që përdore dhe çfarë pe në ndërfaqe/Network. Për të kontrolluar numrin në Neon, zëvendëso `ID_GITHUB_UDHETAR` me ID-në tënde të provës dhe `ID_UDHETIMI` me udhëtimin e përdorur:

```sql
SELECT count(*) AS preferime
FROM udhetimet_preferuara
WHERE udhetar_id = 'ID_GITHUB_UDHETAR'
  AND udhetim_id = 'ID_UDHETIMI';
```

| Rasti | Hapat dhe rezultati i pritur | Vëzhgimi real |
| --- | --- | --- |
| 1 · Ruajtja dhe rifreskimi | Nis pa preferimin. Kliko yllin; shfaqet “Po ruhet…”, pastaj “I ruajtur”. Rifresko faqen: ylli mbetet i mbushur dhe pyetja SQL kthen `1`. Vendet e udhëtimit nuk ndryshojnë. | Për t’u plotësuar pas provës. ID udhëtimi: — |
| 2 · Refuzim i kontrolluar | Në `.env.local` vendos `JAVA09_REFUZO_PREFERIMIN=true` dhe rinis `npm run dev`. Për një udhëtim të paruajtur, provo yllin: pas përgjigjes së refuzuar ylli mbetet bosh, numri rikthehet dhe shfaqet “Nuk u ruajt. Provo përsëri.” Ktheje opsionin në `false`/hiqe, rinis serverin dhe riprovo: ruajtja duhet të ketë sukses. | Për t’u plotësuar pas provës. ID udhëtimi: — |
| 3 · Përsëritja | Gjatë pritjes, butoni çaktivizohet. Pas ruajtjes, përsërite të njëjtin `POST` në DevTools për të njëjtin udhëtim. Shkrimi i përsëritur duhet të kthehet me sukses pa shtuar rresht të dytë; pyetja SQL vazhdon të kthejë `1`. | Për t’u plotësuar pas provës. ID udhëtimi: — |

Për ta përsëritur rastin 3 nga Console-i i shfletuesit ku je kyçur, përdor të njëjtën ID udhëtimi dy herë:

```js
const id = 'SHKRUAJ_ID_E_UDHETIMIT';
await Promise.all([
  fetch(`/api/preferimet/${id}`, { method: 'POST' }),
  fetch(`/api/preferimet/${id}`, { method: 'POST' }),
]);
```

## Skedarët kryesorë

- `aplikacioni/schema-java09.sql` · tabela, foreign keys dhe kufizimi unik.
- `aplikacioni/lib/preferimet.ts` · leximi/shkrimi; identiteti merret nga sesioni.
- `aplikacioni/app/api/preferimet/[id]/route.ts` · endpoint-i i ruajtjes dhe refuzimi i kontrolluar vetëm jashtë production.
- `aplikacioni/components/ListaMePreferime.tsx` dhe `KartaUdhetimi.tsx` · gjendja optimiste, pritja dhe rollback-u pas gabimit.
- `aplikacioni/app/page.tsx` · ngarkimi fillestar i udhëtimeve dhe preferimeve nga serveri.

## Pse ylli i mbushur nuk provon ruajtjen?

Ylli përditësohet në pajisje para se serveri të përgjigjet. Nëse kërkesa ose databaza dështon, pamja optimiste duhet të kthehet. Ruajtjen e provojnë përgjigjja e suksesshme e serverit dhe leximi pas rifreskimit, jo pamja e çastit.

Ndihma nga AI u përdor për të shqyrtuar projektin, zbatuar ndryshimet dhe përmirësuar raportin. Rezultatet e provave manuale duhet të plotësohen nga vëzhgimi real.
