import Link from "next/link";
import Vendtakimi from "@/components/Vendtakimi";

export default function Java08Test() {
  return (
    <main data-testid="java-08-test">
      <Link href="/">← Kthehu te lista</Link>
      <h1>Prova Java 8 · Vendtakimi</h1>
      <p>Simulim për klasë · të dhëna fiktive · ndryshimet ruhen vetëm në këtë ekran.</p>
      <article data-testid="udhetimi-fiktiv">
        <h2>Arta · udhëtimi i Dritonit · ID 2</h2>
        <p>Ferizaj → AAB · Nisja 08:15</p>
        <p>Dritoni nuk i merr këto të dhëna; ato nuk dërgohen te serveri.</p>
      </article>
      <Vendtakimi simulim />
    </main>
  );
}
