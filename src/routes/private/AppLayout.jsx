import { Outlet } from "react-router-dom";
import Navbar from "../../components/ui/Navbar";

export default function AppLayout() {
  return (
    <div className="min-h-dvh flex flex-col bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100">
      <Navbar />
      <main className="flex-1">
        <div className="mx-auto max-w-6xl px-4 py-6">
          <Outlet />
        </div>
      </main>
      <footer className="border-t text-xs text-gray-500 py-3 text-center dark:border-gray-700 dark:text-gray-400">
        &copy; 2025
      </footer>
    </div>
  );
}
