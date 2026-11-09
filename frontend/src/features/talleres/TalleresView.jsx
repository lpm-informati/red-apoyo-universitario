import { useState } from "react";
import Modal from "../../components/ui/Modal.jsx";
import Button from "../../components/ui/Button.jsx";
import { Input, Select, ErrorList } from "../../components/ui/FormField.jsx";
import { formatearFecha } from "../../utils/format.js";

function FormularioTaller({ sedes, onClose, onCrear }) {
  const [errores, setErrores] = useState([]);

  function manejarEnvio(e) {
    e.preventDefault();
    const datos = Object.fromEntries(new FormData(e.target).entries());
    const resultado = onCrear(datos);
    if (!resultado.ok) return setErrores(resultado.errores);
    onClose();
  }

  return (
    <Modal titulo="Crear taller preventivo" onClose={onClose}>
      <form onSubmit={manejarEnvio} className="flex flex-col gap-4">
        <label className="flex flex-col gap-1.5 text-sm text-ink-soft"><span>Nombre del taller</span><Input name="nombre" required /></label>
        <label className="flex flex-col gap-1.5 text-sm text-ink-soft"><span>Tipo</span><Input name="tipo" placeholder="Ej. Preventivo - Emocional" required /></label>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <label className="flex flex-col gap-1.5 text-sm text-ink-soft"><span>Fecha y hora</span><Input type="datetime-local" name="fecha" required /></label>
          <label className="flex flex-col gap-1.5 text-sm text-ink-soft"><span>Cupo</span><Input type="number" name="cupo" min="1" defaultValue={20} required /></label>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <label className="flex flex-col gap-1.5 text-sm text-ink-soft"><span>Facilitador/a</span><Input name="facilitador" required /></label>
          <label className="flex flex-col gap-1.5 text-sm text-ink-soft">
            <span>Sede</span>
            <Select name="sedeId" required>{sedes.map((s) => <option key={s.id} value={s.id}>{s.nombre}</option>)}</Select>
          </label>
        </div>
        <ErrorList errores={errores} />
        <div className="flex justify-end gap-2">
          <Button type="button" variant="ghost" onClick={onClose}>Cancelar</Button>
          <Button type="submit">Crear taller</Button>
        </div>
      </form>
    </Modal>
  );
}

export default function TalleresView({ talleres, sedes, onCrear, onInscribir, permiteCrear = true }) {
  const [mostrarForm, setMostrarForm] = useState(false);
  const sedeNombre = Object.fromEntries(sedes.map((s) => [s.id, s.nombre]));
  const ordenados = [...talleres].sort((a, b) => new Date(a.fecha) - new Date(b.fecha));

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 className="font-display text-2xl text-brand-deep">Talleres y actividades preventivas</h2>
          <p className="text-sm text-ink-soft">
            {permiteCrear
              ? "Coordina charlas, talleres y actividades de prevención con inscripción de estudiantes."
              : "Inscríbete en los talleres y actividades preventivas disponibles."}
          </p>
        </div>
        {permiteCrear && <Button onClick={() => setMostrarForm(true)}>+ Crear taller</Button>}
      </div>

      {ordenados.length === 0 ? (
        <p className="text-sm text-ink-soft">Aún no hay talleres programados. Crea el primero.</p>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {ordenados.map((t) => {
            const lleno = t.inscritos >= t.cupo;
            const porcentaje = Math.min(100, Math.round((t.inscritos / t.cupo) * 100));
            return (
              <article key={t.id} className="flex flex-col gap-1.5 rounded-md border border-stone-300 bg-surface p-4">
                <p className="text-xs text-clay">{t.tipo}</p>
                <h3 className="font-display text-base text-brand-deep">{t.nombre}</h3>
                <p className="text-xs text-ink-soft">{formatearFecha(t.fecha)} · {sedeNombre[t.sedeId] || "—"}</p>
                <p className="text-xs text-ink-soft">Facilita: {t.facilitador}</p>
                <div className="my-1 h-1.5 overflow-hidden rounded-full bg-sage-soft">
                  <div className="h-full bg-brand" style={{ width: `${porcentaje}%` }} />
                </div>
                <p className="text-xs text-ink-soft">{t.inscritos} / {t.cupo} inscritos</p>
                <Button small variant={lleno ? "ghost" : "primary"} disabled={lleno} onClick={() => onInscribir(t.id)}>
                  {lleno ? "Cupo lleno" : "Registrar inscripción"}
                </Button>
              </article>
            );
          })}
        </div>
      )}

      {mostrarForm && <FormularioTaller sedes={sedes} onClose={() => setMostrarForm(false)} onCrear={onCrear} />}
    </div>
  );
}
