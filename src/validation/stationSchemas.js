import { z } from "zod";
export const stationSchema = z.object({
  name: z.string().min(1, "Nombre requerido"),
  location: z.string().min(1, "Ubicación requerida"),
  status: z.enum(["active", "inactive", "maintenance"], {
    errorMap: () => ({ message: "Estado inválido" }),
  }),
  latitude: z.coerce.number({ invalid_type_error: "Latitud numérica" }),
  longitude: z.coerce.number({ invalid_type_error: "Longitud numérica" }),
  type: z.string().min(1, "Tipo requerido"),
  last_answer: z.string().min(1, "Fecha requerida"),
  temp: z.coerce.number({
    invalid_type_error: "Temperatura numérica",
  }),
});
