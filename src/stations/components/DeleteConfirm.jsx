export default function DeleteConfirm({ name, onCancel, onConfirm, loading }) {
  return (
    <div className="space-y-4">
      <p>
        ¿Eliminar la estación <span className="font-semibold">{name}</span>?
      </p>
      <div className="flex justify-end gap-2">
        <button className="btn btn-secondary" onClick={onCancel}>
          Cancelar
        </button>
        <button
          onClick={onConfirm}
          disabled={loading}
          className="btn bg-red-600 text-white hover:bg-red-700"
        >
          {loading ? "Eliminando…" : "Eliminar"}
        </button>
      </div>
    </div>
  );
}
