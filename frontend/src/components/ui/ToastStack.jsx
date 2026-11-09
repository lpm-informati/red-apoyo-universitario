const ESTILOS = {
  info: "bg-brand-deep",
  exito: "bg-brand",
  error: "bg-alert",
};

export default function ToastStack({ toasts }) {
  return (
    <div className="fixed bottom-5 right-5 z-[100] flex flex-col gap-2">
      {toasts.map((t) => (
        <div key={t.id} className={`rounded-md px-4 py-3 text-sm text-white shadow-md ${ESTILOS[t.tipo] || ESTILOS.info}`}>
          {t.mensaje}
        </div>
      ))}
    </div>
  );
}
