import Modal from "../../components/ui/Modal.jsx";
import Badge from "../../components/ui/Badge.jsx";
import Button from "../../components/ui/Button.jsx";
import Icon from "../../components/ui/Icon.jsx";
import { formatearFecha } from "../../utils/format.js";

// Detalle de solo lectura de una derivación. Muestra lo que el docente envió y las novedades
// del caso; nunca las observaciones internas del equipo de bienestar.
export default function DetalleDerivacionModal({ solicitud, sedes, onClose }) {
  const sede = sedes.find((s) => s.id === solicitud.sedeId);
  const pie = <Button variant="ghost" onClick={onClose}>Cerrar ventana</Button>;

  return (
    <Modal titulo={`Derivación de ${solicitud.estudianteIniciales}`} icono="clipboard" pie={pie} onClose={onClose}>
      <div className="flex flex-col gap-4 text-sm">
        <div className="flex flex-wrap items-center gap-3">
          <Badge texto={solicitud.urgencia} />
          <Badge texto={solicitud.estado} />
          <span className="h-5 w-px bg-stone-300" />
          <span className="text-ink-soft">Sede: {sede?.nombre || "—"}</span>
        </div>

        <div className="grid grid-cols-1 gap-3 rounded-xl border border-stone-200 bg-crema px-4 py-3 sm:grid-cols-[1fr_auto]">
          <div className="flex gap-3">
            <span className="mt-0.5 text-gold"><Icon nombre="info" className="h-6 w-6" /></span>
            <div>
              <p><strong>Motivo:</strong> {solicitud.motivo}</p>
              <p className="mt-1 text-ink-soft">{solicitud.descripcion || "Sin observación adicional."}</p>
            </div>
          </div>
          <p className="flex items-start gap-2 sm:border-l sm:border-stone-300 sm:pl-4">
            <span className="text-gold"><Icon nombre="calendar" className="h-4 w-4" /></span>
            <span className="text-ink-soft">Enviada el<br /><strong className="text-ink">{formatearFecha(solicitud.fechaCreacion)}</strong></span>
          </p>
        </div>

        {solicitud.citas.length > 0 && (
          <p className="flex items-center gap-2">
            <span className="text-brand"><Icon nombre="calendar" className="h-4 w-4" /></span>
            Próxima cita: <strong>{formatearFecha(solicitud.citas[solicitud.citas.length - 1].fecha)}</strong>
          </p>
        )}

        <section className="rounded-xl border border-stone-200 bg-white p-4 shadow-sm">
          <h4 className="mb-3 flex items-center gap-2 font-medium text-ink">
            <span className="text-brand"><Icon nombre="bell" /></span>
            Novedades del caso
          </h4>
          <ul className="ml-1 flex flex-col gap-2.5 border-l-2 border-sage pl-5">
            {solicitud.notificaciones.map((n, i) => (
              <li key={i} className="relative">
                <span className="absolute -left-[1.65rem] top-1.5 h-2.5 w-2.5 rounded-full bg-brand ring-2 ring-white" />
                <strong>{formatearFecha(n.fecha)}</strong> — {n.tipo}
              </li>
            ))}
          </ul>
        </section>

        <p className="flex items-center gap-2 rounded-md bg-sage-soft px-3 py-1.5 text-xs text-brand-deep">
          <Icon nombre="lock" className="h-4 w-4 shrink-0" />
          Por confidencialidad, el seguimiento interno del equipo de bienestar no es visible para docentes.
        </p>
      </div>
    </Modal>
  );
}
