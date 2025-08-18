/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { ls } from "./ls";
import { USERS_KEY, SESSION_KEY } from "./keys";

const AuthCtx = createContext(null);
export const useAuth = () => useContext(AuthCtx);

//hashing
const hash = (s) => btoa(unescape(encodeURIComponent(s)));

export function AuthProvider({ children }) {
  const [session, setSession] = useState(null);

  useEffect(() => {
    const s = ls.get(SESSION_KEY, null);
    if (s) setSession(s);
  }, []);

  const register = ({ email, password }) => {
    const users = ls.get(USERS_KEY, []);
    if (users.some(u => u.email === email)) {
      throw new Error("El usuario ya existe");
    }
    const user = { id: crypto.randomUUID(), email, passwordHash: hash(password) };
    ls.set(USERS_KEY, [...users, user]);

    const sess = { userId: user.id, email: user.email, token: crypto.randomUUID() };
    ls.set(SESSION_KEY, sess);
    setSession(sess);
  };

  const login = ({ email, password }) => {
    const users = ls.get(USERS_KEY, []);
    const user = users.find(u => u.email === email && u.passwordHash === hash(password));
    if (!user) throw new Error("Credenciales inválidas");

    const sess = { userId: user.id, email: user.email, token: crypto.randomUUID() };
    ls.set(SESSION_KEY, sess);
    setSession(sess);
  };

  const logout = () => {
    ls.remove(SESSION_KEY);
    setSession(null);
  };

  const changePassword = ({ current, next }) => {
    if (!session) throw new Error("Sesión inválida");
    const users = ls.get(USERS_KEY, []);
    const idx = users.findIndex(u => u.id === session.userId);
    if (idx === -1) throw new Error("Usuario no encontrado");
    if (users[idx].passwordHash !== hash(current)) throw new Error("Contraseña actual incorrecta");
    users[idx].passwordHash = hash(next);
    ls.set(USERS_KEY, users);
  };

  const value = useMemo(
    () => ({
      session,
      isAuthenticated: !!session,
      register,
      login,
      logout,
      changePassword,
    }),
    [session, register, login, logout, changePassword]
  );

  return <AuthCtx.Provider value={value}>{children}</AuthCtx.Provider>;
}
