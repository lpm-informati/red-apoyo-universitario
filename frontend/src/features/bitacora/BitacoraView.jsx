import { formatearFecha } from "../../utils/format.js";

export default function BitacoraView({ bitacora }) {
  return (
    <div className="flex flex-col gap-5">
      <div>
        <h2 className="font-display text-2xl text-brand-deep">Bitácora de accesos y modificaciones</h2>
        <p className="text-sm text-ink-soft">Registro de trazabilidad de acciones sobre solicitudes y usuarios. Acceso exclusivo del administrador de bienestar.</p>
      </div>
      <section className="rounded-md border border-stone-300 bg-surface p-5">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[520px] text-sm">
            <thead>
              <tr className="border-b border-stone-200 text-left text-xs text-ink-soft">
                <th className="py-2">Fecha</th><th className="py-2">Usuario</th><th className="py-2">Acción</th><th className="py-2">Entidad</th>
              </tr>
            </thead>
            <tbody>
              {bitacora.map((r) => (
                <tr key={r.id} className="border-b border-stone-100">
                  <td className="py-2">{formatearFecha(r.fecha)}</td>
                  <td className="py-2">{r.usuario}</td>
                  <td className="py-2">{r.accion}</td>
                  <td className="py-2">{r.entidad}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
