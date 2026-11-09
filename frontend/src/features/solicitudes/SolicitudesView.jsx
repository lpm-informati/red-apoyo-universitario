import { useMemo, useState } from "react";
import Badge from "../../components/ui/Badge.jsx";
import Button from "../../components/ui/Button.jsx";
import NuevaSolicitudModal from "./NuevaSolicitudModal.jsx";
import DetalleSolicitudModal from "./DetalleSolicitudModal.jsx";
import { formatearFecha, ordenarPorUrgencia } from "../../utils/format.js";

export default function SolicitudesView({
  solicitudes,
  sedes,
  tipos,
  profesionales,
  onCrear,
  onClasificar,
  onAsignar,
  onAgendarCita,
  onAgregarObservacion,
  onNotificar,
  onCerrar,
  onVerDetalle,
}) {
  const [filtros, setFiltros] = useState({ estado: "", tipo: "", urgencia: "", sedeId: "" });
  const [mostrarNuevo, setMostrarNuevo] = useState(false);
  const [detalleId, setDetalleId] = useState(null);

  const sedeNombre = Object.fromEntries(sedes.map((s) => [s.id, s.nombre]));

  const listado = useMemo(() => {
    let lista = solicitudes;
    if (filtros.estado) lista = lista.filter((s) => s.estado === filtros.estado);
    if (filtros.tipo) lista = lista.filter((s) => s.tipo === filtros.tipo);
    if (filtros.urgencia) lista = lista.filter((s) => s.urgencia === filtros.urgencia);
    if (filtros.sedeId) lista = lista.filter((s) => s.sedeId === filtros.sedeId);
    return ordenarPorUrgencia(lista);
  }, [solicitudes, filtros]);

  const solicitudSeleccionada = detalleId ? solicitudes.find((s) => s.id === detalleId) : null;

  function abrirDetalle(id) {
    onVerDetalle(id);
    setDetalleId(id);
  }

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 className="font-display text-2xl text-brand-deep">Solicitudes de apoyo</h2>
          <p className="text-sm text-ink-soft">Prioriza, clasifica, deriva y da seguimiento a cada solicitud.</p>
        </div>
        <Button onClick={() => setMostrarNuevo(true)}>+ Registrar solicitud</Button>
      </div>

      <div className="flex flex-wrap gap-2">
        <select className="rounded-md border border-stone-300 px-3 py-2 text-sm" value={filtros.estado} onChange={(e) => setFiltros({ ...filtros, estado: e.target.value })}>
          <option value="">Todos los estados</option>
          {["Nueva", "Clasificada", "Asignada", "En seguimiento", "Cerrada"].map((e) => <option key={e}>{e}</option>)}
        </select>
        <select className="rounded-md border border-stone-300 px-3 py-2 text-sm" value={filtros.tipo} onChange={(e) => setFiltros({ ...filtros, tipo: e.target.value })}>
          <option value="">Todos los tipos</option>
          {tipos.map((t) => <option key={t}>{t}</option>)}
        </select>
        <select className="rounded-md border border-stone-300 px-3 py-2 text-sm" value={filtros.urgencia} onChange={(e) => setFiltros({ ...filtros, urgencia: e.target.value })}>
          <option value="">Toda urgencia</option>
          {["Alta", "Media", "Baja"].map((u) => <option key={u}>{u}</option>)}
        </select>
        <select className="rounded-md border border-stone-300 px-3 py-2 text-sm" value={filtros.sedeId} onChange={(e) => setFiltros({ ...filtros, sedeId: e.target.value })}>
          <option value="">Todas las sedes</option>
          {sedes.map((s) => <option key={s.id} value={s.id}>{s.nombre}</option>)}
        </select>
      </div>

      <section className="rounded-md border border-stone-300 bg-surface p-5">
        {listado.length === 0 ? (
          <p className="text-sm text-ink-soft">No hay solicitudes que coincidan con los filtros seleccionados.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[720px] text-sm">
              <thead>
                <tr className="border-b border-stone-200 text-left text-xs text-ink-soft">
                  <th className="py-2">Motivo</th>
                  <th className="py-2">Tipo</th>
                  <th className="py-2">Urgencia</th>
                  <th className="py-2">Estado</th>
                  <th className="py-2">Sede</th>
                  <th className="py-2">Origen</th>
                  <th className="py-2">Recibida</th>
                  <th className="py-2"></th>
                </tr>
              </thead>
              <tbody>
                {listado.map((s) => (
                  <tr key={s.id} className="border-b border-stone-100">
                    <td className="py-2">{s.motivo}</td>
                    <td className="py-2">{s.tipo}</td>
                    <td className="py-2"><Badge texto={s.urgencia} /></td>
                    <td className="py-2"><Badge texto={s.estado} /></td>
                    <td className="py-2">{sedeNombre[s.sedeId] || "—"}</td>
                    <td className="py-2">{s.origen}</td>
                    <td className="py-2">{formatearFecha(s.fechaCreacion)}</td>
                    <td className="py-2">
                      <Button variant="link" small onClick={() => abrirDetalle(s.id)}>Gestionar</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      {mostrarNuevo && (
        <NuevaSolicitudModal sedes={sedes} tipos={tipos} onClose={() => setMostrarNuevo(false)} onCrear={onCrear} />
      )}

      {solicitudSeleccionada && (
        <DetalleSolicitudModal
          solicitud={solicitudSeleccionada}
          sedes={sedes}
          tipos={tipos}
          profesionales={profesionales}
          onClose={() => setDetalleId(null)}
          onClasificar={onClasificar}
          onAsignar={onAsignar}
          onAgendarCita={onAgendarCita}
          onAgregarObservacion={onAgregarObservacion}
          onNotificar={onNotificar}
          onCerrar={(id, motivo, derivacion) => { onCerrar(id, motivo, derivacion); setDetalleId(null); }}
        />
      )}
    </div>
  );
}
