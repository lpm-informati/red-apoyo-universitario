import KpiCard from "../../components/ui/KpiCard.jsx";
import { generarResumen } from "../../utils/format.js";

function BarraSeccion({ titulo, datos }) {
  const entradas = Object.entries(datos);
  const max = Math.max(1, ...entradas.map(([, n]) => n));
  return (
    <section className="rounded-md border border-stone-300 bg-surface p-5">
      <h3 className="mb-3 font-display text-lg text-brand-deep">{titulo}</h3>
      <div className="flex flex-col gap-2.5">
        {entradas.map(([etiqueta, valor]) => (
          <div key={etiqueta} className="grid grid-cols-[100px_1fr_28px] items-center gap-2 text-sm">
            <span className="truncate text-ink-soft">{etiqueta}</span>
            <div className="h-2.5 overflow-hidden rounded-full bg-sage-soft">
              <div className="h-full bg-clay" style={{ width: `${(valor / max) * 100}%` }} />
            </div>
            <span className="text-right text-ink-soft">{valor}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

export default function ReportesView({ solicitudes, sedes }) {
  const resumen = generarResumen(solicitudes, sedes);

  return (
    <div className="flex flex-col gap-5">
      <div>
        <h2 className="font-display text-2xl text-brand-deep">Reportes agregados</h2>
        <p className="text-sm text-ink-soft">Indicadores institucionales sin exposición de datos personales. Solo se muestran conteos y promedios.</p>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        <KpiCard valor={resumen.total} etiqueta="Solicitudes totales" />
        <KpiCard valor={resumen.cerradas} etiqueta="Casos cerrados" />
        <KpiCard valor={`${resumen.tiempoPromedioHoras} h`} etiqueta="Tiempo promedio de asignación" />
      </div>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        <BarraSeccion titulo="Por tipo de solicitud" datos={resumen.porTipo} />
        <BarraSeccion titulo="Por estado" datos={resumen.porEstado} />
        <BarraSeccion titulo="Por urgencia" datos={resumen.porUrgencia} />
        <BarraSeccion titulo="Por sede" datos={resumen.porSede} />
      </div>
    </div>
  );
}
