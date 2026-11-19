import "server-only";
import { profiliIm } from "./lejet";
import { getSql } from "./db";

export async function lexoPreferimet() {
  const profile = await profiliIm();
  if (!profile || profile.roli !== "udhetar") {
    return { ids: [] as string[], count: 0, canSave: false };
  }
  const sql = getSql();
  const rows = await sql`
    SELECT udhetim_id FROM udhetimet_preferuara
    WHERE udhetar_id = ${profile.id}
    ORDER BY krijuar_me DESC
  `;
  const ids = rows.map((row) => String(row.udhetim_id));
  return { ids, count: ids.length, canSave: true };
}

export async function ruajPreferim(udhetimId: string, refuzo = false) {
  const profile = await profiliIm();
  if (!profile) return { ok: false as const, reason: "hyr" };
  if (profile.roli !== "udhetar") return { ok: false as const, reason: "ndaluar" };
  if (!/^\d+$/.test(udhetimId)) return { ok: false as const, reason: "udhetim" };
  if (refuzo) return { ok: false as const, reason: "refuzuar_per_prove" };

  const sql = getSql();
  const rows = await sql`
    INSERT INTO udhetimet_preferuara (udhetim_id, udhetar_id)
    SELECT u.id, ${profile.id} FROM udhetimet u WHERE u.id = ${udhetimId}
    ON CONFLICT (udhetar_id, udhetim_id) DO NOTHING
    RETURNING id
  `;
  if (rows.length) return { ok: true as const, reason: "ruajtur" };

  const existing = await sql`
    SELECT id FROM udhetimet_preferuara
    WHERE udhetim_id = ${udhetimId} AND udhetar_id = ${profile.id}
  `;
  if (existing.length) return { ok: true as const, reason: "ekziston" };
  return { ok: false as const, reason: "udhetim" };
}
