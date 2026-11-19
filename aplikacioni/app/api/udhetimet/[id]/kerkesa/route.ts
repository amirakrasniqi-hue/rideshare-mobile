import { kerkoVend } from "@/lib/lejet";

export async function POST(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const result = await kerkoVend(id);
    if (result.ok) return Response.json(result, { headers: { "Cache-Control": "no-store" } });
    const status = result.reason === "hyr" ? 401 : result.reason === "ndaluar" ? 403 : 409;
    return Response.json(result, { status, headers: { "Cache-Control": "no-store" } });
  } catch {
    return Response.json({ ok: false, reason: "databaza" }, { status: 503 });
  }
}
