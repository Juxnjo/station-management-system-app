import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { StationsAPI } from "./api";

const StationCtx = createContext(null);
export const useStations = () => useContext(StationCtx);

export function StationProvider({ children }) {
  const [stations, setStations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const refresh = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await StationsAPI.list();
      setStations(Array.isArray(data) ? data : []);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  // CRUD
  const create = async (payload) => {
    const created = await StationsAPI.create(payload);
    setStations((s) => [created, ...s]);
  };

  const update = async (id, payload) => {
    const updated = await StationsAPI.update(id, payload);
    setStations((s) => s.map((row) => (row.id === id ? updated : row)));
  };

  const remove = async (id) => {
    await StationsAPI.remove(id);
    setStations((s) => s.filter((row) => row.id !== id));
  };

  useEffect(() => {
    refresh();
  }, []);

  const value = useMemo(
    () => ({
      stations,
      loading,
      error,
      refresh,
      create,
      update,
      remove,
    }),
    [stations, loading, error]
  );

  return <StationCtx.Provider value={value}>{children}</StationCtx.Provider>;
}
