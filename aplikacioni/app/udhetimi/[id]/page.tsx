import Link from "next/link";
import { notFound } from "next/navigation";
import { gjejUdhetimin } from "@/lib/udhetimet";
import Vendtakimi from "@/components/Vendtakimi";
import GjendjaUdhetimit from "@/components/GjendjaUdhetimit";

export const dynamic = "force-dynamic";

export default async function Detajet({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  let udhetim;

  try {
    udhetim = await gjejUdhetimin(id);
  } catch {
    return (
      <main>
        <h1>RideShare</h1>
        <p role="alert">Nuk u lidhëm me databazën. Provo përsëri.</p>
        <Link href="/">← Kthehu te lista</Link>
      </main>
    );
  }

  if (!udhetim) notFound();

  return (
    <main>
      <Link href="/">← Kthehu te lista</Link>
      <p>ID e udhëtimit: {udhetim.id}</p>
      <h1>
        {udhetim.nisja} – {udhetim.destinacioni}
      </h1>
      <p>Ora: {udhetim.ora}</p>
      <p>Vendtakimi: {udhetim.vendtakimi}</p>
      <GjendjaUdhetimit fillimi={udhetim} />

      <Vendtakimi />

    </main>
  );
}
