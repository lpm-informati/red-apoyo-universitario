import { useState } from "react";
import Modal from "../../components/ui/Modal.jsx";
import Badge from "../../components/ui/Badge.jsx";
import Button from "../../components/ui/Button.jsx";
import Icon from "../../components/ui/Icon.jsx";
import { formatearFecha } from "../../utils/format.js";

const MOTIVOS_CIERRE = [
  "Objetivos de apoyo cumplidos",
  "Derivado a otra unidad o red externa",
  "Estudiante no responde",
  "Solicitud retirada por el estudiante",
  "Otro",
];
const DERIVACIONES = [
  "Sin derivación adicional",
  "Salud mental externa",
  "Servicio social",
  "Unidad académica",
  "Beneficios económicos",
];

function Tarjeta({ icono, titulo, children, className = "" }) {
  return (
    <section className={`min-w-0 rounded-xl border border-stone-200 bg-white p-4 shadow-sm ${className}`}>
      <h4 className="mb-3 flex items-center gap-2 font-medium text-ink">
        <span className="text-brand"><Icon nombre={icono} /></span>
        {titulo}
      </h4>
      {children}
    </section>
  );
}

function LineaTiempo({ items, vacio }) {
  if (!items.length) return <p className="text-ink-soft">{vacio}</p>;
  return (
    <ul className="ml-1 flex flex-col gap-2.5 border-l-2 border-sage pl-5">
      {items.map((it, i) => (
        <li key={i} className="relative">
          <span className="absolute -left-[1.65rem] top-1.5 h-2.5 w-2.5 rounded-full bg-brand ring-2 ring-white" />
          <strong>{formatearFecha(it.fecha)}</strong> — {it.texto}
        </li>
      ))}
    </ul>
  );
}

// rol decide qué se puede hacer:
//  consejero      -> clasifica, asigna, notifica y cierra
//  profesional    -> agenda citas, escribe observaciones (solo las ve el administrador), notifica y cierra
//  administrador  -> cierra casos y lee las observaciones; el resto es solo consulta
export default function DetalleSolicitudModal({
  solicitud,
  sedes,
  tipos,
  profesionales,
  rol,
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
  const puedeClasificar = rol === "consejero" && !cerrada;
  const puedeAsignar = rol === "consejero" && !cerrada;
  const puedeAgendar = rol === "profesional" && !cerrada; // citas y observaciones
  const puedeNotificar = (rol === "consejero" || rol === "profesional") && !cerrada;
  const puedeCerrar = !cerrada; // consejero, profesional y administrador
  const verObservaciones = rol === "administrador"; // el profesional las escribe, solo el administrador las lee
  const soloLectura = rol === "administrador";

  const sedeNombre = Object.fromEntries(sedes.map((s) => [s.id, s.nombre]));
  const profesional = profesionales.find((p) => p.id === solicitud.profesionalId);

  // Citas y observaciones en una sola línea de tiempo
  const seguimiento = [
    ...solicitud.citas.map((c) => ({ fecha: c.fecha, texto: `Cita ${c.estado.toLowerCase()}${c.nota ? `: ${c.nota}` : ""}` })),
    ...(verObservaciones ? solicitud.observaciones.map((o) => ({ fecha: o.fecha, texto: `Observación de ${o.autor}: ${o.texto}` })) : []),
  ].sort((a, b) => new Date(a.fecha) - new Date(b.fecha));

  const claseControl = "min-w-0 flex-1 rounded-md border border-stone-300 bg-white px-3 py-2 text-sm";

  const pie = (
    <>
      <Button variant="ghost" onClick={onClose}>{puedeCerrar ? "Cancelar" : "Cerrar ventana"}</Button>
      {puedeCerrar && (
        <Button variant="danger" onClick={() => onCerrar(solicitud.id, cierreMotivo, cierreDerivacion)}>
          <span className="inline-flex items-center gap-2"><Icon nombre="check" className="h-4 w-4" />Cerrar caso</span>
        </Button>
      )}
    </>
  );

  return (
    <Modal titulo={`Solicitud de ${solicitud.estudianteIniciales}`} icono="calendar" ancho="max-w-3xl" pie={pie} onClose={onClose}>
      <div className="flex flex-col gap-4 text-sm">
        <div className="flex flex-wrap items-center gap-3">
          <Badge texto={solicitud.urgencia} />
          <Badge texto={solicitud.estado} />
          <span className="h-5 w-px bg-stone-300" />
          <span className="text-ink-soft">Sede: {sedeNombre[solicitud.sedeId] || "—"} · Origen: {solicitud.origen}</span>
        </div>

        {soloLectura && (
          <p className="flex items-center gap-2 rounded-md bg-sage-soft px-3 py-2 text-xs text-brand-deep">
            <Icon nombre="eye" className="h-4 w-4 shrink-0" />
            Como administrador puedes cerrar casos y leer las observaciones de seguimiento; el resto es solo consulta.
          </p>
        )}

        {/* Resumen del caso */}
        <div className="grid grid-cols-1 gap-3 rounded-xl border border-stone-200 bg-crema px-4 py-3 sm:grid-cols-[1fr_auto]">
          <div className="flex gap-3">
            <span className="mt-0.5 text-gold"><Icon nombre="info" className="h-6 w-6" /></span>
            <div>
              <p><strong>Motivo:</strong> {solicitud.motivo}</p>
              <p className="mt-1 text-ink-soft">{solicitud.descripcion || "Sin descripción adicional."}</p>
            </div>
          </div>
          <div className="flex flex-col gap-1.5 border-stone-300 sm:border-l sm:pl-4">
            <p className="flex items-start gap-2">
              <span className="text-gold"><Icon nombre="calendar" className="h-4 w-4" /></span>
              <span className="text-ink-soft">Recibida el<br /><strong className="text-ink">{formatearFecha(solicitud.fechaCreacion)}</strong></span>
            </p>
            <p className="flex items-center gap-2 text-ink-soft">
              <span className="text-gold"><Icon nombre="tag" className="h-4 w-4" /></span>
              Clasificación: {solicitud.tipo}
            </p>
          </div>
        </div>

        {/* RF4 + RF5 */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Tarjeta icono="graduation" titulo="Clasificación (RF4)">
            {puedeClasificar ? (
              <div className="flex gap-2">
                <select className={claseControl} value={tipoSeleccionado} onChange={(e) => setTipoSeleccionado(e.target.value)}>
                  {tipos.map((t) => <option key={t}>{t}</option>)}
                </select>
                <Button small className="shrink-0" onClick={() => onClasificar(solicitud.id, tipoSeleccionado)}>Clasificar</Button>
              </div>
            ) : (
              <p>{solicitud.tipo}</p>
            )}
          </Tarjeta>
          <Tarjeta icono="user" titulo="Profesional asignado (RF5)">
            {puedeAsignar ? (
              <div className="flex gap-2">
                <select className={claseControl} value={profesionalSeleccionado} onChange={(e) => setProfesionalSeleccionado(e.target.value)}>
                  <option value="">Sin asignar</option>
                  {profesionales.map((p) => (
                    <option key={p.id} value={p.id}>{p.nombre} — {p.especialidad}</option>
                  ))}
                </select>
                <Button small className="shrink-0" onClick={() => onAsignar(solicitud.id, profesionalSeleccionado)}>Asignar</Button>
              </div>
            ) : (
              <p>{profesional ? `${profesional.nombre} — ${profesional.especialidad}` : "Sin asignar"}</p>
            )}
          </Tarjeta>
        </div>

        {/* RF6 */}
        <Tarjeta icono="binoculars" titulo="Seguimiento (RF6)">
          <LineaTiempo items={seguimiento} vacio={verObservaciones ? "Sin citas ni observaciones registradas." : "Sin citas registradas."} />
          {puedeAgendar && (
            <div className="mt-3 flex flex-col gap-2">
              <div className="flex flex-wrap gap-2">
                <input type="datetime-local" className="rounded-md border border-stone-300 px-3 py-2 text-sm" value={citaFecha} onChange={(e) => setCitaFecha(e.target.value)} />
                <input type="text" placeholder="Nota breve de la cita" className={claseControl} value={citaNota} onChange={(e) => setCitaNota(e.target.value)} />
                <Button small className="shrink-0" onClick={() => onAgendarCita(solicitud.id, citaFecha, citaNota)}>
                  <span className="inline-flex items-center gap-1.5"><Icon nombre="calendar" className="h-4 w-4" />Agendar cita</span>
                </Button>
              </div>
              <div className="flex gap-2">
                <input type="text" placeholder="Agregar observación de seguimiento…" className={claseControl} value={observacion} onChange={(e) => setObservacion(e.target.value)} />
                <Button small className="shrink-0" onClick={() => { onAgregarObservacion(solicitud.id, observacion); setObservacion(""); }}>Guardar observación</Button>
              </div>
            </div>
          )}
          <p className="mt-3 flex items-center gap-2 rounded-md bg-sage-soft px-3 py-1.5 text-xs text-brand-deep">
            <Icon nombre="lock" className="h-4 w-4 shrink-0" />
            Las observaciones de seguimiento son visibles solo para el administrador.
          </p>
        </Tarjeta>

        {/* RF7 */}
        <Tarjeta icono="bell" titulo="Notificaciones al estudiante (RF7)">
          <LineaTiempo items={solicitud.notificaciones.map((n) => ({ fecha: n.fecha, texto: n.tipo }))} vacio="Sin notificaciones." />
          {puedeNotificar && (
            <Button small className="mt-3" onClick={() => onNotificar(solicitud.id, "Cambio de estado")}>
              <span className="inline-flex items-center gap-2"><Icon nombre="refresh" className="h-4 w-4" />Notificar cambio de estado</span>
            </Button>
          )}
        </Tarjeta>

        {/* RF11 */}
        {cerrada && solicitud.cierre && (
          <Tarjeta icono="ban" titulo="Caso cerrado (RF11)">
            <p><strong>Motivo:</strong> {solicitud.cierre.motivo}</p>
            <p><strong>Derivación:</strong> {solicitud.cierre.derivacion}</p>
            <p className="text-xs text-ink-soft">Cerrado el {formatearFecha(solicitud.cierre.fecha)}</p>
          </Tarjeta>
        )}
        {puedeCerrar && (
          <Tarjeta icono="ban" titulo="Cerrar caso (RF11)">
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              <select className={claseControl} value={cierreMotivo} onChange={(e) => setCierreMotivo(e.target.value)}>
                <option value="">Motivo de cierre</option>
                {MOTIVOS_CIERRE.map((m) => <option key={m}>{m}</option>)}
              </select>
              <select className={claseControl} value={cierreDerivacion} onChange={(e) => setCierreDerivacion(e.target.value)}>
                <option value="">Derivación realizada (opcional)</option>
                {DERIVACIONES.map((d) => <option key={d}>{d}</option>)}
              </select>
            </div>
          </Tarjeta>
        )}
      </div>
    </Modal>
  );
}
