import ThemeSwitch from "../../components/ui/ThemeSwitch";

export default function AuthLayout({ title, subtitle, children }) {
  return (
    <div className="min-h-dvh bg-gray-50 dark:bg-gray-950 flex items-center">
      <div className="mx-auto w-full max-w-6xl px-4">
        <header className="flex items-center justify-between py-6">
          <div className="flex items-center gap-2">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded bg-gray-900 text-white font-bold">
              ☁︎
            </span>
            <span className="font-semibold">App</span>
          </div>
          <ThemeSwitch />
        </header>

        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="hidden md:block">
            <h1 className="text-3xl font-semibold tracking-tight">{title}</h1>
            {subtitle && <p className="mt-2 text-gray-600 dark:text-gray-400">{subtitle}</p>}
          </div>

          <div className="md:ml-auto">
            <div className="bg-white border rounded-xl shadow-sm p-6 md:p-8 dark:bg-gray-900 dark:border-gray-700">
              {children}
            </div>
          </div>
        </div>

        <footer className="py-6 text-xs text-gray-500 text-center dark:text-gray-400">

        </footer>
      </div>
    </div>
  );
}
