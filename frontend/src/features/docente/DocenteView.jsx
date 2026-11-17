import { useState } from "react";
import Badge from "../../components/ui/Badge.jsx";
import Button from "../../components/ui/Button.jsx";
import TarjetaBienvenida from "../../components/ui/TarjetaBienvenida.jsx";
import NuevaDerivacionModal from "./NuevaDerivacionModal.jsx";
import DetalleDerivacionModal from "./DetalleDerivacionModal.jsx";
import Icon from "../../components/ui/Icon.jsx";
import { formatearFecha } from "../../utils/format.js";

/*
 Vista del docente (RF3). Igual que EstudianteView, solo ve lo que le
 corresponde: sus propias derivaciones y su estado general, sin acceso a
 las observaciones internas del equipo de bienestar.
 */
export default function DocenteView({ solicitudes, sedes, usuarios, sesion, onCrear }) {
  const [mostrarForm, setMostrarForm] = useState(false);
  const [detalleId, setDetalleId] = useState(null);
  const misDerivaciones = solicitudes
    .filter((s) => s.derivadoPorEmail === sesion.email)
    .sort((a, b) => new Date(b.fechaCreacion) - new Date(a.fechaCreacion));

  return (
    <div className="flex flex-col gap-5">
      <TarjetaBienvenida sesion={sesion} />
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 className="font-display text-2xl text-brand-deep">Derivar estudiante</h2>
          <p className="text-sm text-ink-soft">Deriva de forma responsable al equipo de bienestar y revisa el estado de tus derivaciones.</p>
        </div>
        <Button onClick={() => setMostrarForm(true)}>
          <span className="inline-flex items-center gap-2"><Icon nombre="plus" className="h-4 w-4" />Nueva derivación</span>
        </Button>
      </div>

      <section className="rounded-md border border-stone-300 bg-surface p-5">
        <h3 className="mb-3 font-display text-lg text-brand-deep">Mis derivaciones</h3>
        {misDerivaciones.length === 0 ? (
          <p className="text-sm text-ink-soft">Aún no has derivado a ningún estudiante.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[480px] text-sm">
              <thead>
                <tr className="border-b border-stone-200 text-left text-xs text-ink-soft">
                  <th className="py-2">Estudiante</th>
                  <th className="py-2">Motivo</th>
                  <th className="py-2">Estado</th>
                  <th className="py-2">Enviada</th>
                  <th className="py-2"></th>
                </tr>
              </thead>
              <tbody>
                {misDerivaciones.map((s) => (
                  <tr key={s.id} className="border-b border-stone-100">
                    <td className="py-2">{s.estudianteIniciales}</td>
                    <td className="py-2">{s.motivo}</td>
                    <td className="py-2"><Badge texto={s.estado} /></td>
                    <td className="py-2">{formatearFecha(s.fechaCreacion)}</td>
                    <td className="py-2">
                      <Button variant="link" small onClick={() => setDetalleId(s.id)}>Ver detalle</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      {detalleId && misDerivaciones.find((s) => s.id === detalleId) && (
        <DetalleDerivacionModal solicitud={misDerivaciones.find((s) => s.id === detalleId)} sedes={sedes} onClose={() => setDetalleId(null)} />
      )}

      {mostrarForm && (
        <NuevaDerivacionModal sedes={sedes} estudiantes={usuarios.filter((u) => u.rol === "estudiante" && u.activo)} onClose={() => setMostrarForm(false)} onCrear={onCrear} />
      )}
    </div>
  );
}
