import { Outlet } from "react-router-dom";
import Navbar from "../../components/ui/Navbar";

export default function AppLayout() {
  return (
    <div className="min-h-dvh flex flex-col">
      <Navbar />
      <main className="flex-1">
        <div className="mx-auto max-w-6xl px-4 py-6">
          <Outlet /> 
        </div>
      </main>
      <footer className="border-t text-xs text-slate-500 py-3 text-center">
        &copy; 2025
      </footer>
    </div>
  );
}
