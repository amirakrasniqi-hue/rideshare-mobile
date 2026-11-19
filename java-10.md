# Java 10 · Dy ekrane, një gjendje

## Zbatimi

- Kërkesa e udhëtarit ruhet në tabelën `kerkesa_vendet` në Neon.
- Udhëtari lexon kërkesën e vet; shoferi pronar lexon kërkesat e udhëtimit të vet.
- Gjendja dhe vendet lexohen në API pa cache çdo 5 sekonda. Pas dështimit ruhet pamja e fundit dhe shfaqet paralajmërimi i rilidhjes; eventi `online` nis lexim të ri.
- Pranimi verifikohet dhe ruhet në funksionin atomik `prano_kerkese_vendi`. Pranimi i përsëritur nuk i ul vendet përsëri dhe vendet nuk kalojnë nën zero.

## Provat me dy sesione

Këto prova kërkojnë konfigurimin e Neon-it të këtij projekti dhe dy llogari GitHub të ndara. Nuk mund të shënoj rezultate si të vëzhguara pa i kryer në shfletues me ato llogari.

| Rasti | Parashikimi | Vëzhgimi real |
| --- | --- | --- |
| 1 · Kërkesa në udhëtim me 2 vende | Udhëtari sheh “Në pritje”; shoferi e sheh pas leximit periodik; mbeten 2 vende. | Për t'u plotësuar pas provës në Neon. ID udhëtimi: — |
| 2 · Pranimi | Të dy shohin “U pranua” dhe 1 vend; pranimi i dytë nuk ndryshon numrin. | Për t'u plotësuar pas provës në Neon. ID udhëtimi: — |
| 3 · Offline dhe rilidhja | Udhëtari mban pamjen e fundit dhe sheh paralajmërimin offline; online pa Refresh merr statusin/vendet e reja. | Për t'u plotësuar pas provës në Neon. ID udhëtimi: — |

## Pse timer-i nuk mjafton për rezervim të saktë?

Timer-i vetëm shpërndan leximet dhe mund të shfaqë përkohësisht të dhëna të vjetra. Dy shoferë mund të pranojnë njëkohësisht, ose i njëjti veprim mund të dërgohet dy herë. Prandaj serveri duhet t'i kontrollojë pronësinë, statusin dhe vendet në transaksion atomik. Funksioni SQL i migrimit e bën këtë kontroll dhe uljen e vendeve bashkë.

## Skedarët kryesorë

- `aplikacioni/schema-java10.sql` · tabela, kufizimet dhe funksioni atomik.
- `aplikacioni/lib/lejet.ts` · identiteti/roli nga sesioni dhe qasja ndaj të dhënave.
- `aplikacioni/components/GjendjaUdhetimit.tsx` · rifreskimi, gjendja offline dhe veprimet e dy roleve.
- `aplikacioni/app/api/` · endpoint-et e leximit, kërkesës dhe pranimit.
