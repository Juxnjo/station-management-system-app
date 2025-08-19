import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { stationSchema } from "../../validation/stationSchemas";

export default function StationForm({
  initialValues,
  onSubmit,
  onCancel,
  submitLabel = "Guardar",
}) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm({
    resolver: zodResolver(stationSchema),
    defaultValues: initialValues,
  });

  const submit = async (data) => {
    try {
      await onSubmit(data);
    } catch (e) {
      setError("root", {
        message: e.message || "No se pudo procesar la solicitud",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(submit)} className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-1">Nombre</label>
        <input
          className="w-full rounded-md border px-3 py-2 dark:bg-gray-800 dark:border-gray-700"
          {...register("name")}
        />
        {errors.name && (
          <p className="text-red-600 text-sm">{errors.name.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Ubicación</label>
        <input
          className="w-full rounded-md border px-3 py-2 dark:bg-gray-800 dark:border-gray-700"
          {...register("location")}
        />
        {errors.location && (
          <p className="text-red-600 text-sm">{errors.location.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Estado</label>
        <select
          className="w-full rounded-md border px-3 py-2 dark:bg-gray-800 dark:border-gray-700"
          {...register("status")}
        >
          <option value="active">Activa</option>
          <option value="inactive">Inactiva</option>
          <option value="maintenance">Mantenimiento</option>
        </select>
        {errors.status && (
          <p className="text-red-600 text-sm">{errors.status.message}</p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div>
          <label className="block text-sm font-medium mb-1">Latitud</label>
          <input
            className="w-full rounded-md border px-3 py-2 dark:bg-gray-800 dark:border-gray-700"
            {...register("latitude")}
          />
          {errors.latitude && (
            <p className="text-red-600 text-sm">{errors.latitude.message}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Longitud</label>
          <input
            className="w-full rounded-md border px-3 py-2 dark:bg-gray-800 dark:border-gray-700"
            {...register("longitude")}
          />
          {errors.longitude && (
            <p className="text-red-600 text-sm">{errors.longitude.message}</p>
          )}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Tipo</label>
        <input
          className="w-full rounded-md border px-3 py-2 dark:bg-gray-800 dark:border-gray-700"
          {...register("type")}
        />
        {errors.type && (
          <p className="text-red-600 text-sm">{errors.type.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Última lectura</label>
        <input
          className="w-full rounded-md border px-3 py-2 dark:bg-gray-800 dark:border-gray-700"
          placeholder="2025-08-16T14:30:00Z"
          type="datetime-local"
          {...register("last_answer")}
        />
        {errors.last_answer && (
          <p className="text-red-600 text-sm">{errors.last_answer.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">
          Temperatura actual (°C)
        </label>
        <input
          className="w-full rounded-md border px-3 py-2 dark:bg-gray-800 dark:border-gray-700"
          {...register("temp")}
        />
        {errors.temp && (
          <p className="text-red-600 text-sm">
            {errors.temp.message}
          </p>
        )}
      </div>

      {/* Error global */}
      {errors.root && (
        <p className="text-sm text-red-700 bg-red-50 border border-red-200 rounded p-2 dark:bg-red-900/40 dark:border-red-800">
          {errors.root.message}
        </p>
      )}

      <div className="flex justify-end gap-2 pt-2">
        <button
          type="button"
          className="border rounded px-3 py-2 dark:border-gray-700 dark:hover:bg-gray-700"
          onClick={onCancel}
        >
          Cancelar
        </button>
        <button
          disabled={isSubmitting}
          className="rounded px-4 py-2 bg-gray-900 text-white hover:bg-black disabled:opacity-60"
        >
          {submitLabel}
        </button>
      </div>
    </form>
  );
}
