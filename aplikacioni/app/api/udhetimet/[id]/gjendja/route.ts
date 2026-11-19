import { gjendjaUdhetimit } from "@/lib/lejet";

export const dynamic = "force-dynamic";

const headers = { "Cache-Control": "no-store, max-age=0" };

export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const state = await gjendjaUdhetimit(id);
    if ("error" in state) {
      return Response.json({ error: state.error }, { status: state.error === "hyr" ? 401 : 404, headers });
    }
    return Response.json(state, { headers });
  } catch {
    return Response.json({ error: "databaza" }, { status: 503, headers });
  }
}
