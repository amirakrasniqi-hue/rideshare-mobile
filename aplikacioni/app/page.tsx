import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import Hyrja from "@/components/Hyrja";
import ListaMePreferime from "@/components/ListaMePreferime";
import { lexoPreferimet } from "@/lib/preferimet";
import { lexoUdhetimet, type Udhetim } from "@/lib/udhetimet";

export const dynamic = "force-dynamic";

export default async function Home() {
  const session = await getServerSession(authOptions);
  let udhetimet: Udhetim[];
  let preferimet: { ids: string[]; count: number; canSave: boolean } = {
    ids: [], count: 0, canSave: false,
  };

  try {
    udhetimet = await lexoUdhetimet();
    if (session) preferimet = await lexoPreferimet();
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
        <ListaMePreferime udhetimet={udhetimet}
          preferimetFillestare={preferimet.ids} canSave={preferimet.canSave} />
      )}
    </main>
  );
}
