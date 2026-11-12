"use client";

import { useState } from "react";

type VendtakimiProps = {
  simulim?: boolean;
};

export default function Vendtakimi({ simulim = false }: VendtakimiProps) {
  const [teksti, setTeksti] = useState("");
  const [vendtakimi, setVendtakimi] = useState("");
  const [dukeKerkuar, setDukeKerkuar] = useState(false);
  const [mesazhi, setMesazhi] = useState("");

  function konfirmo() {
    const zgjedhja = teksti.trim();
    if (!zgjedhja) {
      setMesazhi("Shkruaj vendtakimin para se ta konfirmosh.");
      return;
    }
    setVendtakimi(zgjedhja);
    setMesazhi("Vendtakimi u konfirmua në këtë telefon.");
  }

  function kurDeshtonLeximi(error: { code?: number }) {
    setDukeKerkuar(false);
    if (error.code === 1) {
      setMesazhi("Leja u refuzua. Shkruaj vendtakimin vetë.");
    } else if (error.code === 2) {
      setMesazhi("Pozicioni nuk është i disponueshëm. Provo sërish ose shkruaj vendtakimin.");
    } else if (error.code === 3) {
      setMesazhi("Koha mbaroi. Provo sërish ose shkruaj vendtakimin.");
    } else {
      setMesazhi("Nuk u lexua pozicioni. Provo sërish ose shkruaj vendtakimin.");
    }
  }

  function perdorVendndodhjen() {
    if (!navigator.geolocation) {
      setDukeKerkuar(false);
      setMesazhi("Ky shfletues nuk mbështet vendndodhjen. Shkruaj vendtakimin vetë.");
      return;
    }

    setDukeKerkuar(true);
    setMesazhi("Po kërkojmë vendndodhjen…");
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setDukeKerkuar(false);
        setMesazhi(`Pozicioni u mor. Saktësia: rreth ${Math.round(position.coords.accuracy)} m. Shkruaj një emër vendi të dallueshëm.`);
      },
      kurDeshtonLeximi,
      { timeout: 10000 }
    );
  }

  return (
    <section aria-labelledby="vendtakimi-titulli" data-testid="vendtakimi">
      <h2 id="vendtakimi-titulli">Vendtakimi</h2>
      <label htmlFor="vendtakimi-tekst">Shkruaj vendtakimin</label>
      <input
        id="vendtakimi-tekst"
        data-testid="vendtakimi-input"
        type="text"
        value={teksti}
        onChange={(event) => setTeksti(event.target.value)}
        placeholder="p.sh. Biblioteka"
      />
      <div>
        <button type="button" data-testid="vendtakimi-konfirmo" onClick={konfirmo}>
          Konfirmo në telefon
        </button>{" "}
        <button type="button" data-testid="vendtakimi-geolocation" onClick={perdorVendndodhjen} disabled={dukeKerkuar}>
          {dukeKerkuar ? "Po kërkojmë vendndodhjen…" : "Përdor vendndodhjen time"}
        </button>
      </div>
      <p data-testid="vendtakimi-konfirmuar" aria-live="polite">
        Vendtakimi i konfirmuar: {vendtakimi || "Ende nuk është zgjedhur"}
      </p>
      <p data-testid="vendtakimi-mesazhi" role="status" aria-live="polite">{mesazhi}</p>
      {simulim && (
        <button type="button" data-testid="vendtakimi-simulim-timeout" onClick={() => kurDeshtonLeximi({ code: 3 })}>
          Simulo përfundimin e kohës
        </button>
      )}
    </section>
  );
}
