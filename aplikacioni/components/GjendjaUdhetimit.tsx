"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { Udhetim } from "@/lib/udhetimet";

type Kerkese = { id: number | string; statusi: "ne_pritje" | "pranuar"; udhetar_id?: string };
type Gjendja = { trip: Udhetim & { eshte_shofer: boolean }; requests: Kerkese[] };

const etiketa: Record<string, string> = {
  ne_pritje: "Në pritje",
  pranuar: "U pranua",
  derguar: "Kërkesa u dërgua",
  ekziston: "Kërkesa jote ekziston tashmë",
  pa_vende: "Nuk ka vende të lira",
  hyr: "Hyr në llogari për të vazhduar",
  ndaluar: "Ky veprim nuk lejohet për rolin tënd",
  pranuar_me_pare: "Kërkesa ishte pranuar më parë",
  mungon: "Kërkesa nuk u gjet",
  fushe: "ID e kërkesës nuk është e vlefshme",
  databaza: "Veprimi nuk u ruajt. Provo sërish kur të rikthehet lidhja.",
};

export default function GjendjaUdhetimit({ fillimi }: { fillimi: Udhetim }) {
  const [state, setState] = useState<Gjendja | null>(null);
  const [offline, setOffline] = useState(false);
  const [pending, setPending] = useState(false);
  const [message, setMessage] = useState("");
  const [requestMessage, setRequestMessage] = useState("");
  const inFlight = useRef(false);
  const controller = useRef<AbortController | null>(null);

  const refresh = useCallback(async () => {
    if (inFlight.current) return;
    if (!navigator.onLine) { setOffline(true); return; }
    inFlight.current = true;
    const current = new AbortController();
    controller.current = current;
    try {
      const response = await fetch(`/api/udhetimet/${fillimi.id}/gjendja`, {
        cache: "no-store", signal: current.signal,
      });
      if (!response.ok) throw new Error(response.status === 401 ? "hyr" : "databaza");
      const next = (await response.json()) as Gjendja;
      setState(next);
      setOffline(false);
    } catch (error) {
      if (error instanceof Error && error.name === "AbortError") return;
      setOffline(true);
    } finally {
      inFlight.current = false;
      controller.current = null;
    }
  }, [fillimi.id]);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    let disposed = false;
    let polling = false;
    const poll = async () => {
      if (polling) return;
      polling = true;
      await refresh();
      polling = false;
      if (!disposed) timer = setTimeout(poll, 5000);
    };
    const online = () => {
      clearTimeout(timer);
      if (!polling) void poll();
    };
    const offlineEvent = () => setOffline(true);
    void poll();
    window.addEventListener("online", online);
    window.addEventListener("offline", offlineEvent);
    return () => {
      disposed = true;
      clearTimeout(timer);
      controller.current?.abort();
      window.removeEventListener("online", online);
      window.removeEventListener("offline", offlineEvent);
    };
  }, [refresh]);

  async function act(url: string, target: "request" | "accept") {
    setPending(true);
    setMessage("");
    try {
      const response = await fetch(url, { method: "POST" });
      const result = await response.json() as { ok: boolean; reason: string };
      const text = etiketa[result.reason] ?? (result.ok ? "Veprimi u ruajt." : "Veprimi dështoi.");
      if (target === "request") setRequestMessage(text);
      else setMessage(text);
      await refresh();
    } catch {
      if (target === "request") setRequestMessage(etiketa.databaza);
      else setMessage(etiketa.databaza);
      setOffline(true);
    } finally {
      setPending(false);
    }
  }

  const trip = state?.trip ?? { ...fillimi, eshte_shofer: false };
  const ownRequest = state?.requests[0];
  return (
    <section aria-live="polite">
      <p>Vende të lira: <strong>{trip.vende}</strong></p>
      <p>Statusi: Aktiv</p>
      {offline && <p role="alert">Po rilidhemi · të dhënat mund të jenë të vjetra</p>}
      <p>Gjendja u lexua nga serveri · përditësim automatik çdo 5 sekonda</p>
      {trip.eshte_shofer ? (
        <div>
          <h2>Kërkesat për udhëtimin</h2>
          {!state?.requests.length && <p>Ende pa kërkesa</p>}
          {state?.requests.map((request) => (
            <article key={request.id}>
              <p>Kërkesa · udhëtari {request.udhetar_id}</p>
              <p>{etiketa[request.statusi]}</p>
              {request.statusi === "ne_pritje" && (
                <button disabled={pending || trip.vende < 1 || offline}
                  onClick={() => void act(`/api/kerkesa/${request.id}/prano`, "accept")}>
                  Prano kërkesën
                </button>
              )}
            </article>
          ))}
          {message && <p role="status">{message}</p>}
        </div>
      ) : (
        <div>
          <h2>Kërkesa ime</h2>
          <p>{ownRequest ? etiketa[ownRequest.statusi] : "Pa kërkesë"}</p>
          {!ownRequest && trip.vende > 0 && (
            <button disabled={pending || offline}
              onClick={() => void act(`/api/udhetimet/${fillimi.id}/kerkesa`, "request")}>
              Kërko një vend
            </button>
          )}
          {ownRequest?.statusi === "pranuar" && <p>Vendi u konfirmua</p>}
          {requestMessage && <p role="status">{requestMessage}</p>}
        </div>
      )}
    </section>
  );
}
