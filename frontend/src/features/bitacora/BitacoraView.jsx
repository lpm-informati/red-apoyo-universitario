import Icon from "../../components/ui/Icon.jsx";
import { formatearFecha } from "../../utils/format.js";

export default function BitacoraView({ bitacora, solicitudes = [], talleres = [], usuarios = [], sedes = [], profesionales = [] }) {
  // Traduce el id guardado en la bitácora a un nombre que se entienda
  const nombres = {};
  solicitudes.forEach((s) => (nombres[s.id] = `Solicitud de ${s.estudianteIniciales} — ${s.motivo}`));
  talleres.forEach((t) => (nombres[t.id] = `Taller: ${t.nombre}`));
  usuarios.forEach((u) => (nombres[u.id] = `Usuario: ${u.nombre}`));
  sedes.forEach((s) => (nombres[s.id] = `Sede: ${s.nombre}`));
  profesionales.forEach((p) => (nombres[p.id] = `Profesional: ${p.nombre}`));

  function describir(entidad) {
    if (!entidad || entidad === "-") return "— (acción general)";
    if (nombres[entidad]) return nombres[entidad];
    if (/^[0-9a-f]{24}$/i.test(entidad)) return "Registro ya no disponible";
    return entidad;
  }

  return (
    <div className="flex flex-col gap-5">
      <div>
        <h2 className="font-display text-2xl text-brand-deep">Bitácora de accesos y modificaciones</h2>
        <p className="text-sm text-ink-soft">Registro de trazabilidad de acciones sobre solicitudes y usuarios. Acceso exclusivo del administrador de bienestar.</p>
      </div>
      <p className="flex items-start gap-2 rounded-md bg-sage-soft px-3 py-2 text-xs text-brand-deep">
        <Icon nombre="info" className="mt-0.5 h-4 w-4 shrink-0" />
        <span>
          <strong>Elemento afectado:</strong> es sobre qué se realizó la acción (una solicitud, un taller, un usuario, una sede…).
          Si la acción es general, como iniciar o cerrar sesión, aparece «—».
        </span>
      </p>
      <section className="rounded-md border border-stone-300 bg-surface p-5">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[520px] text-sm">
            <thead>
              <tr className="border-b border-stone-200 text-left text-xs text-ink-soft">
                <th className="py-2">Fecha</th><th className="py-2">Realizado por</th><th className="py-2">Acción</th><th className="py-2">Elemento afectado</th>
              </tr>
            </thead>
            <tbody>
              {bitacora.map((r) => (
                <tr key={r.id} className="border-b border-stone-100">
                  <td className="py-2">{formatearFecha(r.fecha)}</td>
                  <td className="py-2">{r.usuario}</td>
                  <td className="py-2">{r.accion}</td>
                  <td className="py-2">{describir(r.entidad)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
