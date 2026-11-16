# PRD — RideShare AAB

**Versioni:** 0.1 · **Data:** 16 nëntor 2026 · **Statusi:** Draft për MVP

## 1. Përmbledhja

RideShare AAB ndihmon studentët të gjejnë udhëtime drejt kampusit dhe shoferët të ofrojnë vendet e lira. MVP-ja përqendrohet te zbulimi i një udhëtimi dhe dërgimi i një kërkese; aplikacioni aktual ka disa prej këtyre rrjedhave, ndërsa kërkesa mbetet simulim.

## 2. Problemi dhe përdoruesit

Studentët mund të mos kenë transport të besueshëm ose mund ta kenë të vështirë të gjejnë shoferë që udhëtojnë në të njëjtin drejtim. Shoferët kanë vende të lira, por u mungon një mënyrë e thjeshtë për t’ua ofruar studentëve dhe për të pranuar kërkesa.

- **Studenti/udhëtari:** kërkon udhëtim sipas nisjes dhe orarit, shqyrton detajet dhe kërkon vend.
- **Shoferi:** publikon ose menaxhon udhëtimin me nisjen, destinacionin, orarin dhe numrin e vendeve; shqyrton kërkesat.

## 3. Qëllimi dhe matja

Qëllimi i MVP-së është të verifikojë nëse studenti mund të gjejë udhëtim të përshtatshëm dhe të dërgojë kërkesë, dhe nëse shoferi mund ta kuptojë e trajtojë atë kërkesë.

**Treguesit e provës:**

- Përdoruesi mund të gjejë një udhëtim të disponueshëm pa ndihmë.
- Përdoruesi mund të dallojë udhëtimin me vende nga ai pa vende.
- Përdoruesi e përfundon kërkesën dhe kupton nëse ajo është në pritje, pranuar apo refuzuar.
- Shoferi mund të identifikojë dhe t’i përgjigjet kërkesës.

## 4. Fushëveprimi i MVP-së

1. Shfaq listën e udhëtimeve me nisjen, destinacionin, orarin dhe vendet e lira.
2. Shfaq detajet e udhëtimit të zgjedhur dhe blloko kërkesën kur nuk ka vende.
3. Lejo studentin të dërgojë kërkesë për një vend dhe të shohë statusin e saj.
4. Lejo shoferin të publikojë/menaxhojë udhëtimin dhe të pranojë ose refuzojë kërkesën.

## 5. Jashtë MVP-së

- Pagesat brenda aplikacionit.
- Biseda në kohë reale, vlerësime dhe shpërblime.
- Ndjekja e drejtpërdrejtë e automjetit në hartë.
- Algoritëm kompleks për përputhjen e itinerareve.

## 6. Kërkesat funksionale

| ID | Kërkesa | Kriteri i pranimit |
|---|---|---|
| F1 | Lista paraqet udhëtimet e disponueshme. | Çdo kartë tregon pikën e nisjes, destinacionin, orën dhe numrin e vendeve. Lista bosh ka mesazh të kuptueshëm. |
| F2 | Përdoruesi hap detajet e udhëtimit. | Detajet përputhen me ID-në e kartës; ID e pavlefshme jep mesazh dhe kthim te lista. |
| F3 | Përdoruesi kërkon një vend kur ka vende të lira. | Kërkesa krijohet me udhëtimin e duhur dhe shfaq konfirmim/status të qartë. |
| F4 | Nuk lejohet kërkesë kur udhëtimi është plot. | Butoni i kërkesës mungon ose është i çaktivizuar dhe shfaqet “Nuk ka vende të lira”. |
| F5 | Shoferi menaxhon vetëm udhëtimet e veta. | Ndryshimi nga pronari lejohet; ndryshimi i udhëtimit të dikujt tjetër refuzohet në server. |
| F6 | Shoferi vendos për kërkesën. | Pranimi/refuzimi shfaq statusin për udhëtarin dhe numri i vendeve përditësohet në mënyrë të qëndrueshme. |

## 7. Kërkesat jofunksionale dhe kufijtë

- Ndërfaqja duhet të jetë e përdorshme në ekran telefoni dhe të mos kërkojë lëvizje horizontale.
- Të dhënat dhe sekretet private nuk ekspozohen te klienti ose në repository.
- Kopja offline është vetëm për lexim; ajo nuk krijon ose konfirmon rezervime.
- Vendndodhja kërkohet vetëm pas veprimit të qartë të përdoruesit dhe zgjedhja manuale mbetet e mundur.

## 8. Si do ta provoj

### Prova A — Gjetja e udhëtimit

**Hapat:** Hape listën në telefon, zgjidh udhëtimin Fushë Kosovë–AAB dhe hap detajet.
**Pritet:** Shfaqen i njëjti udhëtim, ora, vendtakimi dhe vendet e lira; nuk ka përmbajtje që del jashtë ekranit.

### Prova B — Kërkesë me vend të lirë

**Hapat:** Nga udhëtimi me vende të lira, dërgo kërkesë për një vend.
**Pritet:** Kërkesa lidhet me udhëtimin e zgjedhur dhe përdoruesi sheh status të qartë. Në versionin aktual, shënohet se është simulim dhe nuk paraqitet si rezervim real.

### Prova C — Udhëtim pa vende

**Hapat:** Hape udhëtimin me zero vende.
**Pritet:** Shfaqet mungesa e vendeve dhe nuk mund të dërgohet kërkesë.

### Prova D — ID që nuk ekziston

**Hapat:** Hape një URL udhëtimi me ID të panjohur.
**Pritet:** Shfaqet mesazh i kuptueshëm dhe lidhje për kthim te lista.

### Prova E — Lejet e shoferit

**Hapat:** Provo të ndryshosh udhëtimin tënd, pastaj dërgo të njëjtin ndryshim me ID të një udhëtimi që nuk të përket.
**Pritet:** Ndryshimi i parë pranohet; i dyti refuzohet në server dhe të dhënat nuk ndryshojnë.

### Prova me përdorues

Jepu 3–5 studentëve detyrën “Gjej udhëtim për në AAB dhe kërko një vend”. Vëzhgo pa i udhëzuar. Regjistro nëse e përfundojnë, ku hezitojnë dhe çfarë kuptojnë nga statusi. Korrigjo paqartësitë dhe përsërite provën. Rezultatet reale plotësohen pas kryerjes; ky dokument nuk pretendon se provat janë kryer.

## 9. Rreziqe dhe pyetje të hapura

- Si verifikohet që udhëtarët dhe shoferët janë studentë/komunitet i AAB-së?
- Kush e zgjidh konfliktin nëse shoferi anulon udhëtimin pas pranimit?
- A u duhet përdoruesve mesazh ose njoftim kur ndryshon statusi?
- Si parandalohen rezervimet e dyfishta kur dy persona kërkojnë vendin e fundit në të njëjtën kohë?

## 10. Gjendja e dokumentimit

Dokumenti përcakton pritshmëritë dhe planin e provës. Rezultatet e provave të ardhshme duhet të shënohen me datë, pajisje/shfletues dhe vëzhgim real. Shablloni i dhënë nga lidhja e kursit nuk u hap në këtë mjedis; ky draft ndjek strukturë standarde PRD dhe informacionin e projektit në repository.
