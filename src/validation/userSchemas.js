import { z } from "zod";

//login
export const loginSchema = z.object({
  email: z.string().email("Email inválido"),
  password: z.string().min(6, "Mínimo 6 caracteres"),
});

//registro
export const registerSchema = loginSchema
  .extend({
    confirm: z.string().min(6, "Mínimo 6 caracteres"),
  })
  .refine((data) => data.password === data.confirm, {
    message: "Las contraseñas no coinciden",
    path: ["confirm"],
  });

//cambio de contraseña
export const changePasswordSchema = z
  .object({
    current: z.string().min(6, "La contraseña actual es obligatoria"),
    next: z.string().min(6, "Mínimo 6 caracteres"),
    confirm: z.string().min(6, "Confirma nueva contraseña"),
  })
  .refine((data) => data.next === data.confirm, {
    message: "Las contraseñas no coinciden",
    path: ["confirm"],
  });
