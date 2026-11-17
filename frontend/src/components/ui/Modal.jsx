import Icon from "./Icon.jsx";

// icono: nombre de Icon.jsx · ancho: clase tailwind (max-w-xl por defecto) · pie: botones fijos al final
export default function Modal({ titulo, icono, ancho = "max-w-xl", pie, onClose, children }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-brand-deep/45 p-4 sm:p-10"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className={`w-full ${ancho} overflow-hidden rounded-2xl bg-surface shadow-xl`}>
        <div className="flex items-center justify-between gap-3 bg-paper px-6 py-4">
          <h3 className="flex items-center gap-3 font-display text-xl text-brand-deep">
            {icono && <span className="text-brand"><Icon nombre={icono} className="h-7 w-7" /></span>}
            {titulo}
          </h3>
          <button onClick={onClose} aria-label="Cerrar" className="rounded-md p-1 text-ink-soft hover:bg-stone-200 hover:text-ink">
            <Icon nombre="x" className="h-5 w-5" />
          </button>
        </div>
        <div className="px-6 py-5">{children}</div>
        {pie && <div className="flex justify-end gap-2 border-t border-stone-200 bg-paper px-6 py-4">{pie}</div>}
      </div>
    </div>
  );
}
