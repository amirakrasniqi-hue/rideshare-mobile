"use client";

import { useState, type ReactNode } from "react";
import styles from "./preview.module.css";

type Status = "none" | "pending" | "accepted";

export default function PhonePreview() {
  const [status, setStatus] = useState<Status>("none");
  const [busy, setBusy] = useState(false);
  const seats = status === "accepted" ? 1 : 2;

  function sendRequest() {
    if (busy || status !== "none") return;
    setBusy(true);
    window.setTimeout(() => {
      setStatus("pending");
      setBusy(false);
    }, 450);
  }

  function acceptRequest() {
    if (busy || status !== "pending" || seats < 1) return;
    setBusy(true);
    window.setTimeout(() => {
      setStatus("accepted");
      setBusy(false);
    }, 450);
  }

  const requestLabel = status === "none" ? "Pa kërkesë" : status === "pending" ? "Në pritje" : "U pranua";
  return (
    <>
      <div className={styles.phones}>
        <Phone title="Shoferi · Dritoni" name="Dritoni · Shofer">
          <Trip seats={seats} />
          <div className={styles.request}>
            <span>KËRKESA E ARTËS</span>
            <strong>{requestLabel}</strong>
          </div>
          {status === "pending" ? (
            <button className={styles.button} onClick={acceptRequest} disabled={busy || seats < 1}>
              {busy ? "Po ruhet…" : "Prano kërkesën"}
            </button>
          ) : (
            <div className={styles.buttonMuted}>
              {status === "accepted" ? "Pranimi u ruajt" : "Ende pa kërkesë"}
            </div>
          )}
          {status === "accepted" && <p className={styles.success}>Pranimi u ruajt</p>}
        </Phone>

        <Phone title="Udhëtarja · Arta" name="Arta · Udhëtare">
          <Trip seats={seats} />
          <div className={styles.request}>
            <span>KËRKESA IME</span>
            <strong>{requestLabel}</strong>
          </div>
          {status === "none" ? (
            <button className={styles.button} onClick={sendRequest} disabled={busy}>
              {busy ? "Po dërgohet…" : "Kërko një vend"}
            </button>
          ) : (
            <div className={styles.buttonMuted}>
              {status === "accepted" ? "Vendi u konfirmua" : "Kërkesa u dërgua"}
            </div>
          )}
          {status === "accepted" && <p className={styles.success}>Vendi u konfirmua</p>}
        </Phone>
      </div>
      <div className={styles.controls}>
        <p>Demonstrim lokal · gjendje shembull vetëm në këtë faqe</p>
        <button className={styles.reset} onClick={() => { setStatus("none"); setBusy(false); }}>
          Fillo demonstrimin nga fillimi
        </button>
      </div>
    </>
  );
}

function Phone({ title, name, children }: { title: string; name: string; children: ReactNode }) {
  return (
    <section className={styles.phoneGroup} aria-label={title}>
      <h2>{title}</h2>
      <div className={styles.phone}>
        <div className={styles.speaker} />
        <header className={styles.phoneHeader}>
          <strong>RideShare</strong>
          <span>{name}</span>
        </header>
        <p className={styles.tripId}>UDHËTIMI 2</p>
        {children}
        <p className={styles.phoneFooter}>Pamje demonstrimi · jo gjendje nga serveri</p>
        <div className={styles.homeBar} />
      </div>
    </section>
  );
}

function Trip({ seats }: { seats: number }) {
  return (
    <article className={styles.trip}>
      <span>FERIZAJ → AAB</span>
      <h3>Nisja 08:15</h3>
      <p>Dritoni</p>
      <div className={styles.tripMeta}>
        <div><span>Vende të lira</span><strong>{seats}</strong></div>
        <div><span>Statusi</span><strong>Aktiv</strong></div>
      </div>
    </article>
  );
}
