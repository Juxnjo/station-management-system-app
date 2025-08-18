import { useState } from "react";
import { useStations } from "../../stations/StationContext";
import Modal from "../../components/ui/Modal";
import StationForm from "../../stations/components/StationForm";
import DeleteConfirm from "../../stations/components/DeleteConfirm";
import { formatDate } from "../../lib/formatDate";

export default function HomePage() {
  const { stations, loading, error, create, update, remove, refresh } =
    useStations();
  const [openForm, setOpenForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const [openDelete, setOpenDelete] = useState(false);
  const [toDelete, setToDelete] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const onAdd = () => {
    setEditing(null);
    setOpenForm(true);
  };
  const onEdit = (row) => {
    setEditing(row);
    setOpenForm(true);
  };
  const onDelete = (row) => {
    setToDelete(row);
    setOpenDelete(true);
  };

  const handleSubmit = async (data) => {
    if (editing) await update(editing.id, data);
    else await create(data);
    setOpenForm(false);
  };

  const handleConfirmDelete = async () => {
    try {
      setDeleting(true);
      await remove(toDelete.id);
      setOpenDelete(false);
      setToDelete(null);
    } finally {
      setDeleting(false);
    }
  };

  if (loading) return <div>Cargando estaciones…</div>;
  if (error) return <div className="text-red-600">Error: {error}</div>;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Estaciones</h1>
        <div className="flex gap-2">
          <button className="border rounded px-3 py-2" onClick={onAdd}>
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
              {[
                "ID",
                "Nombre",
                "Ubicación",
                "Estado",
                "Latitud",
                "Longitud",
                "Tipo",
                "Última Lectura",
                "Temp. Actual",
                "Acciones",
              ].map((c) => (
                <th key={c} className="text-left p-2 border-b">
                  {c}
                </th>
              ))}
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
                <td className="p-2">{formatDate(r.last_answer)}</td>
                <td className="p-2">{r.temp}</td>
                <td className="p-2">
                  <div className="flex gap-2">
                    <button
                      className="border rounded px-2 py-1"
                      onClick={() => onEdit(r)}
                    >
                      Editar
                    </button>
                    <button
                      className="border rounded px-2 py-1"
                      onClick={() => onDelete(r)}
                    >
                      Eliminar
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {stations.length === 0 && (
              <tr>
                <td colSpan={10} className="p-4 text-center text-gray-500">
                  Sin datos
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal Add/Edit */}
      <Modal
        open={openForm}
        title={editing ? "Editar estación" : "Nueva estación"}
        onClose={() => setOpenForm(false)}
      >
        <StationForm
          initialValues={editing || { status: "active" }}
          onSubmit={handleSubmit}
          onCancel={() => setOpenForm(false)}
          submitLabel={editing ? "Guardar cambios" : "Crear"}
        />
      </Modal>

      {/* Modal Delete */}
      <Modal
        open={openDelete}
        title="Confirmar eliminación"
        onClose={() => setOpenDelete(false)}
      >
        <DeleteConfirm
          name={toDelete?.name}
          loading={deleting}
          onCancel={() => setOpenDelete(false)}
          onConfirm={handleConfirmDelete}
        />
      </Modal>
    </div>
  );
}
