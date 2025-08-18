import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../auth/AuthContext";

const linkBase =
  "px-3 py-2 rounded-md text-sm font-medium transition-colors";
const linkClass = ({ isActive }) =>
  isActive
    ? `${linkBase} bg-sky-600 text-white`
    : `${linkBase} text-sky-700 hover:bg-sky-100`;

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { logout, session } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  return (
    <header className="border-b bg-white">
      <nav
        className="mx-auto max-w-6xl px-4 py-3 flex items-center gap-3"
        aria-label="Main"
      >
        {/* Marca */}
        <div className="flex items-center gap-2">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded bg-sky-600 text-white font-bold">
            A
          </span>
          <span className="font-semibold">App</span>
        </div>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-1 ml-4">
          <NavLink to="/app/home" className={linkClass}>
            Inicio
          </NavLink>
          <NavLink to="/app/profile" className={linkClass}>
            Perfil
          </NavLink>
        </div>

        {/* Spacer */}
        <div className="flex-1" />

        {/* Usuario + acciones */}
        <div className="hidden md:flex items-center gap-3">
          {session?.email && (
            <span className="text-sm text-slate-600">Hola, {session.email}</span>
          )}
          <button onClick={handleLogout} className="btn btn-secondary">
            Cerrar sesión
          </button>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden ml-auto btn btn-secondary"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label="Abrir menú"
        >
          ☰
        </button>
      </nav>

      {/* Mobile menu */}
      <div
        id="mobile-menu"
        className={`md:hidden border-t ${open ? "block" : "hidden"}`}
      >
        <div className="px-4 py-3 flex flex-col gap-2">
          <NavLink
            to="/app/home"
            className={linkClass}
            onClick={() => setOpen(false)}
          >
            Inicio
          </NavLink>
          <NavLink
            to="/app/profile"
            className={linkClass}
            onClick={() => setOpen(false)}
          >
            Perfil
          </NavLink>

          <div className="h-px bg-sky-200 my-2" />

          {session?.email && (
            <div className="text-sm text-slate-600">Hola, {session.email}</div>
          )}
          <button
            onClick={() => {
              setOpen(false);
              handleLogout();
            }}
            className="btn btn-secondary w-full justify-start"
          >
            Cerrar sesión
          </button>
        </div>
      </div>
    </header>
  );
}
