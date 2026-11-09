export default function Modal({ titulo, onClose, children }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-brand-deep/45 p-4 sm:p-10"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="w-full max-w-xl rounded-md bg-surface shadow-xl">
        <div className="flex items-center justify-between border-b border-stone-200 px-5 py-4">
          <h3 className="font-display text-lg text-brand-deep">{titulo}</h3>
          <button
            onClick={onClose}
            aria-label="Cerrar"
            className="text-ink-soft hover:text-ink"
          >
            ✕
          </button>
        </div>
        <div className="px-5 py-5">{children}</div>
      </div>
    </div>
  );
}
