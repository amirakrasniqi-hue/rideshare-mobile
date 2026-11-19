import { pranoKerkesen } from "@/lib/lejet";

export async function POST(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const result = await pranoKerkesen(id);
    const ok = result === "pranuar" || result === "pranuar_me_pare";
    return Response.json({ ok, reason: result }, {
      status: ok ? 200 : result === "hyr" ? 401 : result === "ndaluar" ? 403 : 409,
      headers: { "Cache-Control": "no-store" },
    });
  } catch {
    return Response.json({ ok: false, reason: "databaza" }, { status: 503 });
  }
}
