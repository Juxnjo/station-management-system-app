import { useTheme } from "../../theme/ThemeContext";

export default function ThemeSwitch() {
  const { theme, toggle } = useTheme();
  return (
    <button
      onClick={toggle}
      className="px-3 py-2 rounded-md text-sm border hover:bg-gray-100 dark:hover:bg-gray-700 dark:border-gray-700"
      aria-label="Alternar modo oscuro"
    >
      {theme === "dark" ? "☀️" : "🌙"}
    </button>
  );
}
