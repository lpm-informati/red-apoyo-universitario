import KpiCard from "../../components/ui/KpiCard.jsx";
import Badge from "../../components/ui/Badge.jsx";
import Button from "../../components/ui/Button.jsx";
import { formatearFecha, generarResumen, ordenarPorUrgencia } from "../../utils/format.js";

export default function InicioView({ solicitudes, sedes, onNavigate }) {
  const resumen = generarResumen(solicitudes, sedes);
  const urgentes = ordenarPorUrgencia(solicitudes)
    .filter((s) => s.urgencia === "Alta" && s.estado !== "Cerrada")
    .slice(0, 5);

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="font-display text-2xl text-brand-deep">Panorama general</h2>
        <p className="text-sm text-ink-soft">Estado actual de las solicitudes de apoyo y actividades preventivas.</p>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <KpiCard valor={resumen.total} etiqueta="Solicitudes totales" />
        <KpiCard valor={resumen.abiertas} etiqueta="Casos abiertos" />
        <KpiCard valor={resumen.altaUrgenciaSinAsignar} etiqueta="Urgencia alta sin asignar" alerta />
        <KpiCard valor={`${resumen.tiempoPromedioHoras} h`} etiqueta="Tiempo promedio de asignación" />
      </div>

      <section className="rounded-md border border-stone-300 bg-surface p-5">
        <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
          <h3 className="font-display text-lg text-brand-deep">Casos de urgencia alta que requieren atención</h3>
          <Button variant="link" onClick={() => onNavigate("solicitudes")}>
            Ver todas las solicitudes →
          </Button>
        </div>

        {urgentes.length === 0 ? (
          <p className="text-sm text-ink-soft">No hay casos de urgencia alta pendientes en este momento.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[520px] text-sm">
              <thead>
                <tr className="border-b border-stone-200 text-left text-xs text-ink-soft">
                  <th className="py-2">Motivo</th>
                  <th className="py-2">Tipo</th>
                  <th className="py-2">Estado</th>
                  <th className="py-2">Recibida</th>
                  <th className="py-2">Urgencia</th>
                </tr>
              </thead>
              <tbody>
                {urgentes.map((s) => (
                  <tr key={s.id} className="border-b border-stone-100">
                    <td className="py-2">{s.motivo}</td>
                    <td className="py-2">{s.tipo}</td>
                    <td className="py-2"><Badge texto={s.estado} /></td>
                    <td className="py-2">{formatearFecha(s.fechaCreacion)}</td>
                    <td className="py-2"><Badge texto={s.urgencia} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}
