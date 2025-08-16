import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "../../validation/userSchemas";
import { useAuth } from "../../auth/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import AuthLayout from "./AuthLayout";

export default function LoginPage() {
  const { isAuthenticated, login } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) navigate("/app/home", { replace: true });
  }, [isAuthenticated, navigate]);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm({ resolver: zodResolver(loginSchema) });

  const onSubmit = async (data) => {
    try {
      await login(data);
      navigate("/app/home");
    } catch (e) {
      setError("root", { message: e.message });
    }
  };

  return (
    <AuthLayout
      title="Bienvenido"
      subtitle="Inicia sesión para acceder"
    >
      <h2 className="text-xl font-semibold">Inicia sesión</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            className="w-full rounded-md border px-3 py-2 outline-none focus:ring-2 focus:ring-gray-900"
            {...register("email")}
            placeholder="tu@correo.com"
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Contraseña</label>
          <input
            type="password"
            className="w-full rounded-md border px-3 py-2 outline-none focus:ring-2 focus:ring-gray-900"
            {...register("password")}
            placeholder="••••••••"
          />
          {errors.password && (
            <p className="mt-1 text-sm text-red-600">
              {errors.password.message}
            </p>
          )}
        </div>

        {errors.root && (
          <p className="text-sm text-red-700 bg-red-50 border border-red-200 rounded p-2">
            {errors.root.message}
          </p>
        )}

        <button
          disabled={isSubmitting}
          className="w-full inline-flex justify-center items-center rounded-md bg-gray-900 text-white px-4 py-2 font-medium hover:bg-black disabled:opacity-60"
        >
          Entrar
        </button>
      </form>

      <p className="mt-4 text-sm text-gray-600">
        ¿No tienes cuenta?{" "}
        <Link
          className="font-medium underline underline-offset-4"
          to="/register"
        >
          Regístrate
        </Link>
      </p>
    </AuthLayout>
  );
}
