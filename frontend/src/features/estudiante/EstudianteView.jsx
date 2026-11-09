import { useState } from "react";
import Badge from "../../components/ui/Badge.jsx";
import Button from "../../components/ui/Button.jsx";
import NuevaSolicitudEstudianteModal from "./NuevaSolicitudEstudianteModal.jsx";
import { formatearFecha } from "../../utils/format.js";

/*
 Vista de autoservicio del estudiante (RF2 + parte de RF7).
 Solo muestra las solicitudes que creó esta misma persona (filtradas por
 email de sesión) y únicamente lo que le corresponde ver: su estado, las
 notificaciones que el sistema le envió y la fecha de sus próximas citas.
 Nunca se le muestran las observaciones internas del equipo de bienestar.
 */
export default function EstudianteView({ solicitudes, sedes, sesion, onCrear }) {
  const [mostrarForm, setMostrarForm] = useState(false);
  const misSolicitudes = solicitudes
    .filter((s) => s.estudianteEmail === sesion.email)
    .sort((a, b) => new Date(b.fechaCreacion) - new Date(a.fechaCreacion));

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 className="font-display text-2xl text-brand-deep">Mis solicitudes de apoyo</h2>
          <p className="text-sm text-ink-soft">Hola, {sesion.nombre.split(" ")[0]}. Aquí puedes ver el estado de lo que has enviado.</p>
        </div>
        <Button onClick={() => setMostrarForm(true)}>+ Nueva solicitud</Button>
      </div>

      {misSolicitudes.length === 0 ? (
        <section className="rounded-md border border-stone-300 bg-surface p-6 text-center">
          <p className="text-sm text-ink-soft">Todavía no has enviado ninguna solicitud. Si necesitas conversar con alguien, estamos aquí.</p>
        </section>
      ) : (
        <div className="flex flex-col gap-4">
          {misSolicitudes.map((s) => (
            <article key={s.id} className="rounded-md border border-stone-300 bg-surface p-5">
              <div className="mb-2 flex flex-wrap items-center gap-2">
                <Badge texto={s.estado} />
                <span className="text-xs text-ink-soft">Enviada el {formatearFecha(s.fechaCreacion)}</span>
              </div>
              <p className="font-medium text-ink">{s.motivo}</p>

              {s.citas.length > 0 && (
                <p className="mt-2 text-sm text-ink-soft">
                  📅 Próxima cita: <strong>{formatearFecha(s.citas[s.citas.length - 1].fecha)}</strong>
                </p>
              )}

              <div className="mt-3 border-t border-stone-100 pt-3">
                <p className="mb-1 text-xs font-medium text-ink-soft">Novedades</p>
                <ul className="flex flex-col gap-1 text-xs text-ink-soft">
                  {s.notificaciones.map((n, i) => (
                    <li key={i}>• {formatearFecha(n.fecha)} — {n.tipo}</li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      )}

      {mostrarForm && (
        <NuevaSolicitudEstudianteModal sedes={sedes} onClose={() => setMostrarForm(false)} onCrear={onCrear} />
      )}
    </div>
  );
}
