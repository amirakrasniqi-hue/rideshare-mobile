import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import Hyrja from "@/components/Hyrja";
import { KartaUdhetimi } from "@/components/KartaUdhetimi";
import { lexoUdhetimet, type Udhetim } from "@/lib/udhetimet";

export const dynamic = "force-dynamic";

export default async function Home() {
  const session = await getServerSession(authOptions);
  let udhetimet: Udhetim[];

  try {
    udhetimet = await lexoUdhetimet();
  } catch {
    return (
      <main>
        <h1>RideShare</h1>
        <Hyrja brenda={Boolean(session)} />
        <p><Link href="/panel">Hyr / Paneli im</Link></p>
        <p role="alert">Nuk u lidhëm me databazën. Provo përsëri.</p>
      </main>
    );
  }

  return (
    <main>
      <h1>RideShare · Udhëtimet për AAB</h1>
      <Hyrja brenda={Boolean(session)} />
      <p><Link href="/panel">Hyr / Paneli im</Link></p>
      <p>Burimi: Neon · të dhëna fiktive për ushtrime</p>

      <p>
        Zgjidh një nisje dhe lexo detajet para kërkesës.
      </p>

      {udhetimet.length === 0 ? (
        <p>Nuk ka udhëtime për momentin.</p>
      ) : (
        <div className="trip-list">
          {udhetimet.map((udhetim) => (
            <KartaUdhetimi key={udhetim.id} udhetim={udhetim} />
          ))}
        </div>
      )}
    </main>
  );
}
