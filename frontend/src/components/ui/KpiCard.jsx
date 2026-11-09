export default function KpiCard({ valor, etiqueta, alerta = false }) {
  return (
    <article
      className={`rounded-md border p-4 sm:p-5 ${
        alerta ? "border-alert bg-alert-soft" : "border-stone-300 bg-surface"
      }`}
    >
      <p className={`font-display text-3xl ${alerta ? "text-alert" : "text-brand-deep"}`}>{valor}</p>
      <p className="mt-1 text-sm text-ink-soft">{etiqueta}</p>
    </article>
  );
}
