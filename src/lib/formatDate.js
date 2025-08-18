export function formatDate(value, opts = {}) {
  if (!value) return "-";

  const date = value instanceof Date ? value : new Date(value);

  const options = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    ...opts,
  };

  try {
    return date.toLocaleString("es-ES", options);
  } catch {
    return String(value);
  }
}
