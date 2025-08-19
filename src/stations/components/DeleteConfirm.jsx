export default function DeleteConfirm({ name, onCancel, onConfirm, loading }) {
  return (
    <div className="space-y-4">
      <p>
        ¿Eliminar la estación <span className="font-semibold">{name}</span>?
      </p>
      <div className="flex justify-end gap-2">
        <button className="border rounded px-3 py-2 dark:border-gray-700 dark:hover:bg-gray-700" onClick={onCancel}>
          Cancelar
        </button>
        <button
          onClick={onConfirm}
          disabled={loading}
          className="rounded px-4 py-2 bg-red-600 text-white hover:bg-red-700 disabled:opacity-60"
        >
          {loading ? "Eliminando…" : "Eliminar"}
        </button>
      </div>
    </div>
  );
}
