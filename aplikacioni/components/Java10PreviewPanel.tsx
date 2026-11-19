import Link from "next/link";
import styles from "@/app/java-10-preview/preview.module.css";
import PhonePreview from "@/app/java-10-preview/PhonePreview";

export default function Java10PreviewPanel() {
  return (
    <section className={styles.page}>
      <div className={styles.board}>
        <p className={styles.eyebrow}>JAVA 10 · PAMJE DEMONSTRIMI</p>
        <h1>Dy ekrane, një gjendje</h1>
        <p className={styles.intro}>
          Shiko dhe provo rrjedhën e kërkesës dhe pranimit te telefonat e
          Dritonit dhe Artës.
        </p>
        <PhonePreview />
        <p className={styles.note}>
          Kjo është pamje shembull. Për provën reale me Neon, hape{" "}
          <Link href="/udhetimi/1">udhëtimin 1</Link> në dy sesione të ndara.
        </p>
      </div>
    </section>
  );
}
