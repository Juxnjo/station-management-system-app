import { useState, useMemo } from "react";
import { useStations } from "../../stations/StationContext";
import Modal from "../../components/ui/Modal";
import StationForm from "../../stations/components/StationForm";
import DeleteConfirm from "../../stations/components/DeleteConfirm";
import { formatDate } from "../../lib/formatDate";
import * as XLSX from "xlsx";

export default function HomePage() {
  const { stations, loading, error, create, update, remove, refresh } = useStations();

  // Paginación (client-side) 
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const total = stations.length;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const pageClamped = Math.min(page, totalPages);

  const pageData = useMemo(() => {
    const start = (pageClamped - 1) * pageSize;
    return stations.slice(start, start + pageSize);
  }, [stations, pageClamped, pageSize]);

  const goFirst = () => setPage(1);
  const goPrev  = () => setPage((p) => Math.max(1, p - 1));
  const goNext  = () => setPage((p) => Math.min(totalPages, p + 1));
  const goLast  = () => setPage(totalPages);

  // Reset a página 1 si cambia el tamaño de página
  const onChangePageSize = (e) => { setPageSize(Number(e.target.value)); setPage(1); };

  // acciones CRUD
  const [openForm, setOpenForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const [openDelete, setOpenDelete] = useState(false);
  const [toDelete, setToDelete] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const onAdd = () => { setEditing(null); setOpenForm(true); };
  const onEdit = (row) => { setEditing(row); setOpenForm(true); };
  const onDelete = (row) => { setToDelete(row); setOpenDelete(true); };

  const exportToExcel = () => {
    const data = stations.map((r) => ({
      ID: r.id,
      Nombre: r.name,
      "Ubicación": r.location,
      Estado: r.status,
      Latitud: r.latitude,
      Longitud: r.longitude,
      Tipo: r.type,
      "Última Lectura": formatDate(r.last_answer),
      "Temp. Actual": r.temp,
    }));
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Estaciones");
    XLSX.writeFile(workbook, "estaciones.xlsx");
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
      // Si borraste la última fila de la última página, ajusta la página
      const newTotal = total - 1;
      const newTotalPages = Math.max(1, Math.ceil(newTotal / pageSize));
      if (page > newTotalPages) setPage(newTotalPages);
    } finally {
      setDeleting(false);
    }
  };

  if (loading) return <div>Cargando estaciones…</div>;
  if (error)   return <div className="text-red-600">Error: {error}</div>;

  return (
    <div className="space-y-4">
      {/* Header + acciones */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        <h1 className="text-xl font-semibold">Estaciones</h1>
        <div className="flex items-center gap-2">
          <label className="text-sm text-gray-600">Filas por página</label>
          <select
            className="border rounded px-2 py-1"
            value={pageSize}
            onChange={onChangePageSize}
          >
            {[5,10,20,50].map(n => <option key={n} value={n}>{n}</option>)}
          </select>
          <button className="border rounded px-3 py-2" onClick={onAdd}>Agregar estación</button>
          <button className="border rounded px-3 py-2" onClick={exportToExcel}>Exportar Excel</button>
          <button className="border rounded px-3 py-2" onClick={refresh}>Recargar</button>
        </div>
      </div>

      {/* Tabla */}
      <div className="overflow-x-auto border rounded">
        <table className="w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              {["ID","Nombre","Ubicación","Estado","Latitud","Longitud","Tipo","Última Lectura","Temp. Actual","Acciones"]
                .map((c) => <th key={c} className="text-left p-2 border-b">{c}</th>)}
            </tr>
          </thead>
          <tbody>
            {pageData.map((r) => (
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
                    <button className="border rounded px-2 py-1" onClick={() => onEdit(r)}>Editar</button>
                    <button className="border rounded px-2 py-1" onClick={() => onDelete(r)}>Eliminar</button>
                  </div>
                </td>
              </tr>
            ))}
            {pageData.length === 0 && (
              <tr>
                <td colSpan={10} className="p-4 text-center text-gray-500">Sin datos</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Controles de paginación */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        <p className="text-sm text-gray-600">
          Mostrando {(pageClamped - 1) * pageSize + 1}–
          {Math.min(pageClamped * pageSize, total)} de {total}
        </p>
        <div className="flex items-center gap-2">
          <button className="border rounded px-3 py-1" onClick={goFirst} disabled={pageClamped === 1}>« Primero</button>
          <button className="border rounded px-3 py-1" onClick={goPrev}  disabled={pageClamped === 1}>‹ Anterior</button>
          <span className="text-sm text-gray-700">Página {pageClamped} de {totalPages}</span>
          <button className="border rounded px-3 py-1" onClick={goNext}  disabled={pageClamped === totalPages}>Siguiente ›</button>
          <button className="border rounded px-3 py-1" onClick={goLast}  disabled={pageClamped === totalPages}>Última »</button>
        </div>
      </div>

      {/* Modal Add/Edit */}
      <Modal open={openForm} title={editing ? "Editar estación" : "Nueva estación"} onClose={() => setOpenForm(false)}>
        <StationForm
          initialValues={editing || { status: "active" }}
          onSubmit={handleSubmit}
          onCancel={() => setOpenForm(false)}
          submitLabel={editing ? "Guardar cambios" : "Crear"}
        />
      </Modal>

      {/* Modal Delete */}
      <Modal open={openDelete} title="Confirmar eliminación" onClose={() => setOpenDelete(false)}>
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
