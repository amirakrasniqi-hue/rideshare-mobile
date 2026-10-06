# Java 3 – RideShare

## Përshkrimi

Në këtë ushtrim u ndërtua një rrjedhë e thjeshtë RideShare me të dhëna fiktive. Aplikacioni përmban listën e udhëtimeve, faqen e detajeve dhe faqen e kërkesës së simuluar.

## Prova 1 – Lista në telefon

U testua faqja kryesore në telefon. U shfaqën saktësisht tri karta me udhëtimet dhe nuk pati lëvizje horizontale.

Rezultati: Prova kaloi me sukses.

## Prova 2 – Detajet e udhëtimit

U hap karta e dytë dhe adresa u ndryshua në `/udhetimi/2`. U shfaqën detajet e udhëtimit Fushë Kosovë – AAB, ora 08:15, vendtakimi Te stacioni kryesor dhe 1 vend i lirë.

U testua edhe karta e tretë me 0 vende dhe u shfaq mesazhi “Nuk ka vende të lira”. Gjithashtu u testua adresa `/udhetimi/99` dhe u shfaq “Udhëtimi nuk u gjet”.

Rezultati: Prova kaloi me sukses.

## Prova 3 – Kërkesa dhe kthimi

Nga udhëtimi i dytë u klikua “Kërko vend” dhe u hap faqja e kërkesës me mesazhin “Simulim: Në pritje”. Kërkesa nuk ruhet dhe nuk kryhet rezervim real. U testua edhe kthimi te detajet dhe kthimi te lista.

Rezultati: Prova kaloi me sukses.

## Përfundimi

Rrjedha RideShare funksionon me të dhëna fiktive: lista → detajet → kërkesa e simuluar. U testua edhe përdorimi në telefon dhe rruga për një udhëtim që nuk ekziston.