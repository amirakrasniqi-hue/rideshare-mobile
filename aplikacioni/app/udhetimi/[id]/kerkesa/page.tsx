import { KartaUdhetimi } from "@/components/KartaUdhetimi";
import { lexoUdhetimet } from "@/app/lib/udhetimet";

export default async function Home() {
  let udhetimet;

  try {
    udhetimet = await lexoUdhetimet();
  } catch {
    return (
      <main>
        <h1>RideShare</h1>
        <p role="alert">
          Nuk u lidhëm me databazën. Provo përsëri.
        </p>
      </main>
    );
  }

  return (
    <main>
      <h1>RideShare · Udhëtimet për AAB</h1>
      <p>Zgjidh një nisje dhe lexo detajet para kërkesës.</p>

      {udhetimet.length === 0 ? (
        <p>Nuk ka udhëtime për momentin.</p>
      ) : (
        <div className="trip-list">
          {udhetimet.map((udhetim) => (
            <KartaUdhetimi key={udhetim.id} udhetim={udhetim} />
          ))}
        </div>
      )}
    </main>
  );
}