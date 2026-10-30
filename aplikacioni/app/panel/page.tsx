import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import Hyrja from "@/components/Hyrja";
import { profiliIm } from "@/lib/lejet";
import { ruajOren } from "./actions";

export const dynamic = "force-dynamic";

const mesazhet: Record<string, string> = {
  hyr: "Hyr në llogari para se të ndryshosh udhëtimin.",
  ndaluar: "Nuk ke leje për këtë udhëtim. Ora nuk ndryshoi.",
  fushe: "Shkruaj një orë të vlefshme, p.sh. 08:25. ID duhet të jetë 1, 2 ose 3.",
  ruajtur: "Ora u ruajt me sukses. Kontrollo listën dhe detajet.",
  databaza: "Nuk u lidhëm me databazën. Kontrollo Neon dhe provo përsëri.",
};

export default async function Panel({
  searchParams,
}: {
  searchParams: Promise<{ m?: string }>;
}) {
  const { m } = await searchParams;
  const session = await getServerSession(authOptions);
  let p = null;
  let gabimDatabaze = false;

  if (session) {
    try {
      p = await profiliIm();
    } catch {
      gabimDatabaze = true;
    }
  }

  return (
    <main className="app-shell">
      <h1>Paneli im</h1>
      {m && mesazhet[m] && <p role="status">{mesazhet[m]}</p>}
      {gabimDatabaze && (
        <p role="alert">
          {mesazhet.databaza} Hyrja me GitHub mbetet aktive; provo sërish më vonë.
        </p>
      )}
      {!p ? (
        <p>
          {session
            ? `Përshëndetje, ${session.user?.name ?? "përdorues"}. Profili dhe lejet do të ngarkohen kur databaza të jetë e arritshme.`
            : "Lista është publike. Për panelin hyr me llogarinë tënde GitHub."}
        </p>
      ) : (
        <>
          <p>
            Përshëndetje, {p.emri}. Roli: <strong>{p.roli}</strong>.
          </p>
          <p>ID ime GitHub: <code>{p.id}</code></p>
        </>
      )}
      <Hyrja brenda={Boolean(session)} />
      {p?.roli === "shofer" ? (
        <form action={ruajOren}>
          <h2>Ndrysho orën e udhëtimit tim</h2>
          <input type="hidden" name="id" value="2" />
          <label htmlFor="ora">Ora e re</label>{" "}
          <input id="ora" name="ora" type="time" defaultValue="08:15" required />{" "}
          <button type="submit">Ruaj orën</button>
          <p>
            Formulari i laboratorit provon ID 2. Serveri verifikon pronarin edhe
            nëse ID ndryshohet.
          </p>
        </form>
      ) : p ? (
        <p>Si udhëtar mund të shohësh udhëtimet; nuk mund të ndryshosh orën e shoferit.</p>
      ) : null}
      <p><Link href="/">Kthehu te udhëtimet</Link></p>
      <p>Kërkesa për vend mbetet simulim këtë javë.</p>
    </main>
  );
}
