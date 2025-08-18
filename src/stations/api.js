const BASE_URL = "https://689e1ef63fed484cf876618e.mockapi.io";

const http = async (path, options = {}) => {
  const ctrl = new AbortController();
  const id = setTimeout(() => ctrl.abort(), 15000);

  try {
    const res = await fetch(`${BASE_URL}${path}`, {
      headers: { "Content-Type": "application/json" },
      signal: ctrl.signal,
      ...options,
    });

    if (!res.ok) {
      const details = await res.text().catch(() => "");
      const msg = `HTTP ${res.status}${details ? `: ${details}` : ""}`;
      throw new Error(msg);
    }

    const text = await res.text().catch(() => "");
    return text ? JSON.parse(text) : null;
  } catch (e) {
    if (e.name === "AbortError")
      throw new Error("La solicitud tardó demasiado");
    throw new Error(e.message || "Error de red");
  } finally {
    clearTimeout(id);
  }
};

export const StationsAPI = {
  list: () => http("/stations"),
  create: (data) =>
    http("/stations", { method: "POST", body: JSON.stringify(data) }),
  update: (id, data) =>
    http(`/stations/${id}`, { method: "PUT", body: JSON.stringify(data) }),
  remove: (id) => http(`/stations/${id}`, { method: "DELETE" }),
};
