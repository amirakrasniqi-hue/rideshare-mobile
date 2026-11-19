# Java 9 · Udhëtimet e preferuara

## Çfarë u ndërtua

- U shtua ruajtja e preferimeve për përdoruesin e kyçur në tabelën `udhetimet_preferuara`.
- Faqja lexon preferimet nga serveri; ylli dhe numri reagojnë menjëherë gjatë ruajtjes.
- Përgjigjja e suksesshme konfirmon ruajtjen. Gabimi e kthen yllin dhe numrin në gjendjen e mëparshme dhe ofron riprovim.
- `UNIQUE (udhetar_id, udhetim_id)` dhe `ON CONFLICT DO NOTHING` pengojnë dublikatat edhe kur i njëjti veprim dërgohet sërish.
- Preferimi është personal dhe nuk ndryshon vendet ose kërkesat për rezervim.

## Tri provat

Provat që kërkojnë llogarinë GitHub dhe databazën Neon nuk janë kryer ende; këtu nuk po paraqes rezultate të pavëzhguara si sukses.

| Rasti | Si provohet | Vëzhgimi real |
| --- | --- | --- |
| 1 · Ruaj dhe rifresko | Me udhëtarin të kyçur, ruaj udhëtimin 2 dhe rifresko faqen. Kontrollo rreshtin në Neon. | Për t'u plotësuar pas provës. Udhëtimi: — |
| 2 · Refuzim prove | Në zhvillim, vendos `JAVA09_REFUZO_PREFERIMIN=true`, rinis serverin dhe ruaj një udhëtim të paruajtur; pastaj çaktivizoje dhe provo sërish. | Për t'u plotësuar pas provës. Udhëtimi: — |
| 3 · Përsëritja | Bëj klikime të shpejta dhe përsërit POST-in për të njëjtin ID; kontrollo që ekziston vetëm një rresht. | Për t'u plotësuar pas provës. Udhëtimi: — |

## Skedarët dhe kufizimet

- `aplikacioni/schema-java09.sql` · tabela, foreign keys dhe kufizimi unik.
- `aplikacioni/lib/preferimet.ts` · leximi dhe shkrimi me identitetin nga sesioni.
- `aplikacioni/app/api/preferimet/[id]/route.ts` · endpoint-i POST.
- `aplikacioni/components/ListaMePreferime.tsx` dhe `KartaUdhetimi.tsx` · gjendja optimiste dhe rikthimi pas gabimit.
- `aplikacioni/app/page.tsx` · ngarkimi fillestar nga serveri.

Heqja e preferimit nuk është përfshirë, sepse është zgjerim opsional. Ndihma nga AI: u përdor për të shqyrtuar projektin, zbatuar kodin dhe përgatitur këtë raport. Provat manuale duhen bërë me llogari dhe Neon të projektit.

## Pse ylli i mbushur nuk provon ruajtjen?

Ylli reagon në pajisje para përgjigjes së serverit. Nëse shkrimi dështon, duhet të kthehet gjendja e mëparshme. Vetëm konfirmimi i serverit dhe leximi pas rifreskimit provojnë se preferimi është ruajtur në databazë.
