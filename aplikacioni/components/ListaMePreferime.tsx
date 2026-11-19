"use client";

import { useState } from "react";
import { KartaUdhetimi } from "@/components/KartaUdhetimi";
import type { Udhetim } from "@/lib/udhetimet";

export default function ListaMePreferime({
  udhetimet,
  preferimetFillestare,
  canSave,
}: {
  udhetimet: Udhetim[];
  preferimetFillestare: string[];
  canSave: boolean;
}) {
  const [preferimet, setPreferimet] = useState(() => new Set(preferimetFillestare));
  const [pending, setPending] = useState(() => new Set<string>());
  const [gabimet, setGabimet] = useState<Record<string, string>>({});

  async function ruaj(id: string) {
    if (pending.has(id) || preferimet.has(id) || !canSave) return;
    setPending((current) => new Set(current).add(id));
    setPreferimet((current) => new Set(current).add(id));
    setGabimet((current) => ({ ...current, [id]: "" }));
    try {
      const response = await fetch(`/api/preferimet/${id}`, { method: "POST" });
      const result = await response.json() as { ok: boolean };
      if (!response.ok || !result.ok) throw new Error("refuzuar");
    } catch {
      setPreferimet((current) => {
        const next = new Set(current);
        next.delete(id);
        return next;
      });
      setGabimet((current) => ({ ...current, [id]: "Nuk u ruajt. Provo përsëri." }));
    } finally {
      setPending((current) => {
        const next = new Set(current);
        next.delete(id);
        return next;
      });
    }
  }

  return (
    <>
      <p>Të preferuarat: <strong>{preferimet.size}</strong></p>
      <p>Preferim personal · jo rezervim</p>
      <div className="trip-list">
        {udhetimet.map((udhetim) => (
          <KartaUdhetimi
            key={udhetim.id}
            udhetim={udhetim}
            preferuar={preferimet.has(udhetim.id)}
            pending={pending.has(udhetim.id)}
            canSave={canSave}
            message={gabimet[udhetim.id] ?? ""}
            onSave={() => void ruaj(udhetim.id)}
          />
        ))}
      </div>
    </>
  );
}
