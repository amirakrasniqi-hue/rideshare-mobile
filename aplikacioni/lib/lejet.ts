import "server-only";
import { getServerSession } from "next-auth";
import { authOptions } from "./auth";
import { getSql } from "./db";

type Profil = { id: string; emri: string; roli: "udhetar" | "shofer" };

export async function profiliIm(): Promise<Profil | null> {
  const session = await getServerSession(authOptions);
  const id = session?.user?.id;
  if (!id || !/^\d+$/.test(id)) return null;

  const sql = getSql();
  await sql`INSERT INTO profilet (github_id, emri)
    VALUES (${id}, ${session.user.name ?? "Student"})
    ON CONFLICT (github_id) DO NOTHING`;
  const rows = await sql`
    SELECT github_id AS id, emri, roli FROM profilet WHERE github_id = ${id}
  `;
  return (rows[0] as Profil | undefined) ?? null;
}

export async function ndryshoOren(id: string, ora: string) {
  const p = await profiliIm();
  if (!p) return "hyr";
  if (p.roli !== "shofer") return "ndaluar";
  if (!/^[123]$/.test(id) || !/^([01][0-9]|2[0-3]):[0-5][0-9]$/.test(ora)) {
    return "fushe";
  }

  const sql = getSql();
  const rows = await sql`
    UPDATE udhetimet SET ora = ${ora}
    WHERE id = ${id} AND shofer_id = ${p.id}
      AND EXISTS (
        SELECT 1 FROM profilet WHERE github_id = ${p.id} AND roli = 'shofer'
      )
    RETURNING id
  `;
  return rows.length === 1 ? "ruajtur" : "ndaluar";
}

export async function kerkoVend(udhetimId: string) {
  const p = await profiliIm();
  if (!p) return { ok: false as const, reason: "hyr" };
  if (p.roli !== "udhetar") return { ok: false as const, reason: "ndaluar" };
  if (!/^\d+$/.test(udhetimId)) return { ok: false as const, reason: "udhetim" };

  const sql = getSql();
  const rows = await sql`
    INSERT INTO kerkesa_vendet (udhetim_id, udhetar_id, statusi)
    SELECT u.id, ${p.id}, 'ne_pritje'
    FROM udhetimet u
    WHERE u.id = ${udhetimId} AND u.vende > 0
    ON CONFLICT (udhetim_id, udhetar_id) DO NOTHING
    RETURNING id
  `;
  if (rows.length === 1) return { ok: true as const, reason: "derguar" };

  const existing = await sql`
    SELECT k.statusi FROM kerkesa_vendet k
    JOIN udhetimet u ON u.id = k.udhetim_id
    WHERE k.udhetim_id = ${udhetimId} AND k.udhetar_id = ${p.id}
  `;
  if (existing.length) return { ok: true as const, reason: "ekziston" };
  return { ok: false as const, reason: "pa_vende" };
}

export async function pranoKerkesen(kerkesaId: string) {
  const p = await profiliIm();
  if (!p) return "hyr";
  if (p.roli !== "shofer") return "ndaluar";
  if (!/^\d+$/.test(kerkesaId)) return "fushe";
  const sql = getSql();
  const rows = await sql`
    SELECT prano_kerkese_vendi(${kerkesaId}::BIGINT, ${p.id}) AS rezultat
  `;
  return String(rows[0]?.rezultat ?? "gabim");
}

export async function gjendjaUdhetimit(udhetimId: string) {
  const p = await profiliIm();
  if (!p) return { error: "hyr" as const };
  const sql = getSql();
  const trips = await sql`
    SELECT u.id, u.nisja, u.destinacioni, u.ora, u.vendtakimi, u.vende,
      (u.shofer_id = ${p.id}) AS eshte_shofer
    FROM udhetimet u WHERE u.id = ${udhetimId}
  `;
  if (!trips.length) return { error: "udhetim" as const };
  const trip = trips[0] as Record<string, unknown>;
  const isDriver = trip.eshte_shofer === true && p.roli === "shofer";
  const requests = isDriver
    ? await sql`SELECT id, udhetar_id, statusi FROM kerkesa_vendet WHERE udhetim_id = ${udhetimId} ORDER BY id`
    : await sql`SELECT id, statusi FROM kerkesa_vendet WHERE udhetim_id = ${udhetimId} AND udhetar_id = ${p.id} ORDER BY id LIMIT 1`;
  return { trip: { ...trip, eshte_shofer: isDriver }, requests };
}
