import { useState } from "react";
import Modal from "../../components/ui/Modal.jsx";
import Button from "../../components/ui/Button.jsx";
import Icon from "../../components/ui/Icon.jsx";
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
    <Modal titulo="Crear taller preventivo" icono="calendar" onClose={onClose}>
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
        <div className="flex justify-end gap-2 border-t border-stone-200 pt-4">
          <Button type="button" variant="ghost" onClick={onClose}>Cancelar</Button>
          <Button type="submit"><span className="inline-flex items-center gap-2"><Icon nombre="plus" className="h-4 w-4" />Crear taller</span></Button>
        </div>
      </form>
    </Modal>
  );
}

function ConfirmarInscripcion({ taller, sedeNombre, onClose, onConfirmar }) {
  const pie = (
    <>
      <Button variant="ghost" onClick={onClose}>Cancelar</Button>
      <Button onClick={onConfirmar}><span className="inline-flex items-center gap-2"><Icon nombre="check" className="h-4 w-4" />Confirmar inscripción</span></Button>
    </>
  );
  return (
    <Modal titulo="Confirmar inscripción" icono="calendar" pie={pie} onClose={onClose}>
      <div className="flex flex-col gap-3 text-sm">
        <p>¿Quieres inscribirte en <strong>{taller.nombre}</strong>?</p>
        <p className="text-ink-soft">{formatearFecha(taller.fecha)} · {sedeNombre || "—"}</p>
        <p className="flex items-start gap-2 rounded-md border border-stone-200 bg-crema px-3 py-2 text-xs text-ink-soft">
          <Icon nombre="bell" className="mt-0.5 h-4 w-4 shrink-0" />
          Al confirmar, se notificará tu inscripción al equipo de bienestar. Solo puedes inscribirte una vez en cada taller.
        </p>
      </div>
    </Modal>
  );
}

export default function TalleresView({ talleres, sedes, onCrear, onInscribir, permiteCrear = true, permiteInscribir = false, emailEstudiante = "" }) {
  const [mostrarForm, setMostrarForm] = useState(false);
  const [aConfirmar, setAConfirmar] = useState(null);
  const sedeNombre = Object.fromEntries(sedes.map((s) => [s.id, s.nombre]));
  const ordenados = [...talleres].sort((a, b) => new Date(a.fecha) - new Date(b.fecha));

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 className="font-display text-2xl text-brand-deep">Talleres y actividades preventivas</h2>
          <p className="text-sm text-ink-soft">
            {permiteCrear
              ? "Coordina charlas, talleres y actividades de prevención. Las inscripciones las realizan los propios estudiantes."
              : permiteInscribir
                ? "Inscríbete en los talleres y actividades preventivas disponibles."
                : "Consulta los talleres y actividades preventivas programados."}
          </p>
        </div>
        {permiteCrear && <Button onClick={() => setMostrarForm(true)}>+ Crear taller</Button>}
      </div>

      {ordenados.length === 0 ? (
        <p className="text-sm text-ink-soft">Aún no hay talleres programados.</p>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {ordenados.map((t) => {
            const lleno = t.inscritos >= t.cupo;
            const yaInscrito = (t.inscritosEmails || []).includes(emailEstudiante.toLowerCase());
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
                {permiteInscribir && (
                  <Button small variant={lleno || yaInscrito ? "ghost" : "primary"} disabled={lleno || yaInscrito} onClick={() => setAConfirmar(t)}>
                    {yaInscrito ? "Ya estás inscrito" : lleno ? "Cupo lleno" : "Inscribirme"}
                  </Button>
                )}
              </article>
            );
          })}
        </div>
      )}

      {aConfirmar && (
        <ConfirmarInscripcion
          taller={aConfirmar}
          sedeNombre={sedeNombre[aConfirmar.sedeId]}
          onClose={() => setAConfirmar(null)}
          onConfirmar={() => { onInscribir(aConfirmar.id); setAConfirmar(null); }}
        />
      )}

      {mostrarForm && <FormularioTaller sedes={sedes} onClose={() => setMostrarForm(false)} onCrear={onCrear} />}
    </div>
  );
}
