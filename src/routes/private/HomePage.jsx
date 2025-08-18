import { useState } from "react";
import { useStations } from "../../stations/StationContext";

export default function HomePage() {
  const { stations, loading, error, create, update, remove, refresh } = useStations();
  const [draft, setDraft] = useState(null); // para modal (Add/Edit) en el punto 8

  if (loading) return <div>Cargando estaciones…</div>;
  if (error)   return <div className="text-red-600">Error: {error}</div>;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Estaciones</h1>
        <div className="flex gap-2">
          <button className="border rounded px-3 py-2" onClick={() => setDraft({ status: "active" })}>
            Agregar estación
          </button>
          <button className="border rounded px-3 py-2" onClick={refresh}>
            Recargar
          </button>
        </div>
      </div>

      <div className="overflow-x-auto border rounded">
        <table className="w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              {["ID","Nombre","Ubicación","Estado","Latitud","Longitud","Tipo","Última Lectura","Temp. Actual","Acciones"].map((c) =>
                <th key={c} className="text-left p-2 border-b">{c}</th>
              )}
            </tr>
          </thead>
          <tbody>
            {stations.map((r) => (
              <tr key={r.id} className="border-b">
                <td className="p-2">{r.id}</td>
                <td className="p-2">{r.name}</td>
                <td className="p-2">{r.location}</td>
                <td className="p-2">{r.status}</td>
                <td className="p-2">{r.latitude}</td>
                <td className="p-2">{r.longitude}</td>
                <td className="p-2">{r.type}</td>
                <td className="p-2">{r.last_answer}</td>
                <td className="p-2">{r.temp}</td>
                <td className="p-2">
                  <div className="flex gap-2">
                    <button className="border rounded px-2 py-1" onClick={() => setDraft(r)}>Editar</button>
                    <button className="border rounded px-2 py-1" onClick={() => remove(r.id)}>Eliminar</button>
                  </div>
                </td>
              </tr>
            ))}
            {stations.length === 0 && (
              <tr><td colSpan={10} className="p-4 text-center text-gray-500">Sin datos</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {/* En el punto 8 colocarás tu Modal + StationForm (Zod) usando draft + create/update */}
    </div>
  );
}
