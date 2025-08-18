export default function Modal({ open, title, children, onClose }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50">
      <div
        className="absolute inset-0 bg-black/40"
        onClick={onClose}
        aria-hidden="true"
      />
      <div
        role="dialog"
        aria-modal="true"
        className="absolute inset-0 flex items-center justify-center p-4"
      >
        <div className="w-full max-w-lg bg-white rounded-xl border shadow-sm">
          <header className="flex items-center justify-between px-5 py-3 border-b">
            <h3 className="text-lg font-semibold">{title}</h3>
            <button className="px-2 py-1 text-gray-500" onClick={onClose}>
              ✕
            </button>
          </header>
          <div className="p-5">{children}</div>
        </div>
      </div>
    </div>
  );
}
