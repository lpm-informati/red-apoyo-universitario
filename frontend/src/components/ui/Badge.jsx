const ESTILOS = {
  alta: "bg-alert-soft text-alert",
  media: "bg-gold-soft text-gold",
  baja: "bg-sage-soft text-brand-deep",
  nueva: "bg-stone-200 text-ink-soft",
  clasificada: "bg-gold-soft text-gold",
  asignada: "bg-sage-soft text-brand-deep",
  "en seguimiento": "bg-sky-100 text-sky-800",
  cerrada: "bg-stone-200 text-ink-soft",
  activo: "bg-sage-soft text-brand-deep",
  inactivo: "bg-stone-200 text-ink-soft",
};

export default function Badge({ texto }) {
  const clase = ESTILOS[(texto || "").toLowerCase()] || "bg-stone-200 text-ink-soft";
  return <span className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-medium ${clase}`}>{texto}</span>;
}
