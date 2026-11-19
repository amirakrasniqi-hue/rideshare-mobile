"use client";

import Link from "next/link";
import type { Udhetim } from "@/lib/udhetimet";

export function KartaUdhetimi({
  udhetim,
  preferuar,
  pending,
  canSave,
  message,
  onSave,
}: {
  udhetim: Udhetim;
  preferuar: boolean;
  pending: boolean;
  canSave: boolean;
  message: string;
  onSave: () => void;
}) {
  return (
    <article className="trip-card">
      <h2>
        {udhetim.nisja} – {udhetim.destinacioni}
      </h2>

      <p>ID e udhëtimit: {udhetim.id}</p>
      <p>
        Ora: {udhetim.ora} · Vende të lira: {udhetim.vende}
      </p>

      <button className="favorite-button" type="button"
        disabled={!canSave || pending || preferuar} onClick={onSave}
        aria-pressed={preferuar}>
        {pending ? "★ Po ruhet…" : preferuar ? "★ I ruajtur" : message ? "☆ Provo përsëri" : "☆ Ruaj udhëtimin"}
      </button>
      {message && <p role="status">{message}</p>}
      {!canSave && <p>Hyr si udhëtar për ta ruajtur te të preferuarat.</p>}

      <Link
        className="action"
        href={`/udhetimi/${udhetim.id}`}
      >
        Shiko detajet
      </Link>
    </article>
  );
}
