import { useState } from "react";
import Modal from "../../components/ui/Modal.jsx";
import Badge from "../../components/ui/Badge.jsx";
import Button from "../../components/ui/Button.jsx";
import { formatearFecha } from "../../utils/format.js";

export default function DetalleSolicitudModal({
  solicitud,
  sedes,
  tipos,
  profesionales,
  onClose,
  onClasificar,
  onAsignar,
  onAgendarCita,
  onAgregarObservacion,
  onNotificar,
  onCerrar,
}) {
  const [tipoSeleccionado, setTipoSeleccionado] = useState(solicitud.tipo);
  const [profesionalSeleccionado, setProfesionalSeleccionado] = useState(solicitud.profesionalId || "");
  const [citaFecha, setCitaFecha] = useState("");
  const [citaNota, setCitaNota] = useState("");
  const [observacion, setObservacion] = useState("");
  const [cierreMotivo, setCierreMotivo] = useState("");
  const [cierreDerivacion, setCierreDerivacion] = useState("");

  const cerrada = solicitud.estado === "Cerrada";
  const sedeNombre = Object.fromEntries(sedes.map((s) => [s.id, s.nombre]));

  return (
    <Modal titulo={`Solicitud de ${solicitud.estudianteIniciales}`} onClose={onClose}>
      <div className="flex flex-col gap-4 text-sm">
        <div className="flex flex-wrap items-center gap-2">
          <Badge texto={solicitud.urgencia} />
          <Badge texto={solicitud.estado} />
          <span className="text-ink-soft">
            Sede: {sedeNombre[solicitud.sedeId] || "—"} · Origen: {solicitud.origen}
          </span>
        </div>
        <p><strong>Motivo:</strong> {solicitud.motivo}</p>
        <p>{solicitud.descripcion || "Sin descripción adicional."}</p>
        <p className="text-xs text-ink-soft">Recibida el {formatearFecha(solicitud.fechaCreacion)}</p>

        {/* RF4 + RF5 */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="flex flex-col gap-1.5">
            <span className="text-ink-soft">Clasificación (RF4)</span>
            <div className="flex gap-2">
              <select
                className="flex-1 rounded-md border border-stone-300 px-2 py-1.5"
                value={tipoSeleccionado}
                disabled={cerrada}
                onChange={(e) => setTipoSeleccionado(e.target.value)}
              >
                {tipos.map((t) => <option key={t}>{t}</option>)}
              </select>
              <Button small disabled={cerrada} onClick={() => onClasificar(solicitud.id, tipoSeleccionado)}>Clasificar</Button>
            </div>
          </div>
          <div className="flex flex-col gap-1.5">
            <span className="text-ink-soft">Profesional asignado (RF5)</span>
            <div className="flex gap-2">
              <select
                className="flex-1 rounded-md border border-stone-300 px-2 py-1.5"
                value={profesionalSeleccionado}
                disabled={cerrada}
                onChange={(e) => setProfesionalSeleccionado(e.target.value)}
              >
                <option value="">Sin asignar</option>
                {profesionales.map((p) => (
                  <option key={p.id} value={p.id}>{p.nombre} — {p.especialidad}</option>
                ))}
              </select>
              <Button small disabled={cerrada} onClick={() => onAsignar(solicitud.id, profesionalSeleccionado)}>Asignar</Button>
            </div>
          </div>
        </div>

        {/* RF6 */}
        <div className="border-t border-stone-200 pt-3">
          <h4 className="mb-2 font-medium text-brand-deep">Seguimiento (RF6)</h4>
          <ul className="mb-2 flex flex-col gap-1 border-l-2 border-sage pl-3">
            {solicitud.citas.length ? (
              solicitud.citas.map((c, i) => (
                <li key={i}><strong>{formatearFecha(c.fecha)}</strong> — {c.estado}{c.nota ? `: ${c.nota}` : ""}</li>
              ))
            ) : (
              <li className="text-ink-soft">Sin citas registradas.</li>
            )}
          </ul>
          <div className="flex flex-wrap gap-2">
            <input
              type="datetime-local"
              className="rounded-md border border-stone-300 px-2 py-1.5 text-sm"
              value={citaFecha}
              disabled={cerrada}
              onChange={(e) => setCitaFecha(e.target.value)}
            />
            <input
              type="text"
              placeholder="Nota breve"
              className="flex-1 rounded-md border border-stone-300 px-2 py-1.5 text-sm"
              value={citaNota}
              disabled={cerrada}
              onChange={(e) => setCitaNota(e.target.value)}
            />
            <Button small disabled={cerrada} onClick={() => onAgendarCita(solicitud.id, citaFecha, citaNota)}>Agendar cita</Button>
          </div>

          <p className="my-3 rounded-md bg-sage-soft px-3 py-1.5 text-xs text-brand-deep">
            🔒 Observaciones visibles solo para perfiles autorizados.
          </p>
          <ul className="mb-2 flex flex-col gap-1 border-l-2 border-sage pl-3">
            {solicitud.observaciones.length ? (
              solicitud.observaciones.map((o, i) => (
                <li key={i}><strong>{formatearFecha(o.fecha)} · {o.autor}</strong> — {o.texto}</li>
              ))
            ) : (
              <li className="text-ink-soft">Sin observaciones registradas.</li>
            )}
          </ul>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Agregar observación de seguimiento"
              className="flex-1 rounded-md border border-stone-300 px-2 py-1.5 text-sm"
              value={observacion}
              disabled={cerrada}
              onChange={(e) => setObservacion(e.target.value)}
            />
            <Button small disabled={cerrada} onClick={() => { onAgregarObservacion(solicitud.id, observacion); setObservacion(""); }}>
              Guardar
            </Button>
          </div>
        </div>

        {/* RF7 */}
        <div className="border-t border-stone-200 pt-3">
          <h4 className="mb-2 font-medium text-brand-deep">Notificaciones al estudiante (RF7)</h4>
          <ul className="mb-2 flex flex-col gap-1 border-l-2 border-sage pl-3">
            {solicitud.notificaciones.map((n, i) => (
              <li key={i}><strong>{formatearFecha(n.fecha)}</strong> — {n.tipo}</li>
            ))}
          </ul>
          <Button small disabled={cerrada} onClick={() => onNotificar(solicitud.id, "Cambio de estado")}>
            Notificar cambio de estado
          </Button>
        </div>

        {/* RF11 */}
        <div className="border-t border-stone-200 pt-3">
          {cerrada ? (
            <>
              <h4 className="mb-1 font-medium text-brand-deep">Cierre de caso</h4>
              <p><strong>Motivo:</strong> {solicitud.cierre.motivo}</p>
              <p><strong>Derivación:</strong> {solicitud.cierre.derivacion}</p>
              <p className="text-xs text-ink-soft">Cerrado el {formatearFecha(solicitud.cierre.fecha)}</p>
            </>
          ) : (
            <>
              <h4 className="mb-2 font-medium text-brand-deep">Cerrar caso (RF11)</h4>
              <div className="flex flex-col gap-2">
                <input
                  type="text"
                  placeholder="Motivo de cierre"
                  className="rounded-md border border-stone-300 px-2 py-1.5 text-sm"
                  value={cierreMotivo}
                  onChange={(e) => setCierreMotivo(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Derivación realizada (opcional)"
                  className="rounded-md border border-stone-300 px-2 py-1.5 text-sm"
                  value={cierreDerivacion}
                  onChange={(e) => setCierreDerivacion(e.target.value)}
                />
                <Button variant="danger" onClick={() => onCerrar(solicitud.id, cierreMotivo, cierreDerivacion)}>
                  Cerrar caso
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
    </Modal>
  );
}
