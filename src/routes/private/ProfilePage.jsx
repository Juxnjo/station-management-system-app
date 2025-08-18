import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { changePasswordSchema } from "../../validation/userSchemas";
import { useAuth } from "../../auth/AuthContext";

export default function ProfilePage() {
  const { session, changePassword } = useAuth();
  const { register, handleSubmit, formState: { errors, isSubmitting }, setError, reset } =
    useForm({ resolver: zodResolver(changePasswordSchema) });

  const onSubmit = async (data) => {
    try {
      await changePassword({ current: data.current, next: data.next });
      reset({ current: "", next: "", confirm: "" });
      alert("Contraseña actualizada correctamente");
    } catch (e) {
      setError("root", { message: e.message });
    }
  };

  return (
    <div className="max-w-xl space-y-6">
      <section className="bg-white border rounded-xl shadow-sm p-6">
        <h1 className="text-xl font-semibold mb-2">Perfil</h1>
        <p className="text-gray-600 text-sm">Usuario: <span className="font-medium">{session?.email}</span></p>
      </section>

      <section className="bg-white border rounded-xl shadow-sm p-6">
        <h2 className="text-lg font-semibold mb-4">Cambiar contraseña</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Contraseña actual</label>
            <input type="password" className="w-full rounded-md border px-3 py-2" {...register("current")} />
            {errors.current && <p className="text-red-600 text-sm">{errors.current.message}</p>}
          </div>
          <div className="grid md:grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium mb-1">Nueva contraseña</label>
              <input type="password" className="w-full rounded-md border px-3 py-2" {...register("next")} />
              {errors.next && <p className="text-red-600 text-sm">{errors.next.message}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Confirmar nueva contraseña</label>
              <input type="password" className="w-full rounded-md border px-3 py-2" {...register("confirm")} />
              {errors.confirm && <p className="text-red-600 text-sm">{errors.confirm.message}</p>}
            </div>
          </div>

          {errors.root && (
            <p className="text-sm text-red-700 bg-red-50 border border-red-200 rounded p-2">
              {errors.root.message}
            </p>
          )}

          <div className="flex justify-end gap-2">
            <button type="submit" disabled={isSubmitting}
              className="rounded px-4 py-2 bg-gray-900 text-white hover:bg-black disabled:opacity-60">
              Guardar cambios
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}
