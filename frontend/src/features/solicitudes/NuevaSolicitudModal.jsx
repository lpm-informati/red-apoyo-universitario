import { useState } from "react";
import Modal from "../../components/ui/Modal.jsx";
import Button from "../../components/ui/Button.jsx";
import Icon from "../../components/ui/Icon.jsx";
import { Input, Select, Textarea, ErrorList } from "../../components/ui/FormField.jsx";
import SelectorEstudiante, { OTRO_ESTUDIANTE } from "../../components/ui/SelectorEstudiante.jsx";

export default function NuevaSolicitudModal({ sedes, tipos, estudiantes = [], onClose, onCrear }) {
  const [errores, setErrores] = useState([]);
  const [seleccion, setSeleccion] = useState("");
  const otro = seleccion === OTRO_ESTUDIANTE;

  function manejarEnvio(e) {
    e.preventDefault();
    const datos = Object.fromEntries(new FormData(e.target).entries());
    const resultado = onCrear(datos);
    if (!resultado.ok) {
      setErrores(resultado.errores);
      return;
    }
    onClose();
  }

  return (
    <Modal titulo="Registrar solicitud de apoyo" icono="clipboard" onClose={onClose}>
      <form onSubmit={manejarEnvio} className="flex flex-col gap-4">
        <label className="flex flex-col gap-1.5 text-sm text-ink-soft">
          <span>Origen</span>
          <Select name="origen" defaultValue="Autogenerada">
            <option value="Autogenerada">Registrada por el equipo de bienestar</option>
            <option value="Derivación docente">Derivación docente</option>
          </Select>
        </label>
        <SelectorEstudiante estudiantes={estudiantes} valor={seleccion} onCambio={setSeleccion} />
        <label className="flex flex-col gap-1.5 text-sm text-ink-soft">
          <span>Motivo</span>
          <Input name="motivo" placeholder="Ej. Ansiedad frente a evaluaciones" required />
        </label>
        <label className="flex flex-col gap-1.5 text-sm text-ink-soft">
          <span>Descripción</span>
          <Textarea
            name="descripcion"
            rows={3}
            placeholder={otro ? "Correo del estudiante y contexto breve, sin datos sensibles innecesarios" : "Contexto breve, sin datos sensibles innecesarios"}
          />
          {otro && (
            <span className="flex items-start gap-2 rounded-md border border-stone-200 bg-crema px-3 py-2 text-xs text-ink-soft">
              <Icon nombre="info" className="mt-0.5 h-4 w-4 shrink-0" />
              Como el estudiante no está en el sistema, te sugerimos escribir aquí su correo electrónico para que el equipo de bienestar pueda contactarlo.
            </span>
          )}
        </label>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <label className="flex flex-col gap-1.5 text-sm text-ink-soft">
            <span>Urgencia percibida</span>
            <Select name="urgencia" defaultValue="" required>
              <option value="" disabled>Selecciona…</option>
              <option>Alta</option>
              <option>Media</option>
              <option>Baja</option>
            </Select>
          </label>
          <label className="flex flex-col gap-1.5 text-sm text-ink-soft">
            <span>Sede / unidad</span>
            <Select name="sedeId" defaultValue="" required>
              <option value="" disabled>Selecciona…</option>
              {sedes.map((s) => (
                <option key={s.id} value={s.id}>{s.nombre}</option>
              ))}
            </Select>
          </label>
        </div>
        <label className="flex flex-col gap-1.5 text-sm text-ink-soft">
          <span>Tipo (si ya se conoce)</span>
          <Select name="tipo" defaultValue="">
            <option value="">Sin clasificar aún</option>
            {tipos.map((t) => (
              <option key={t}>{t}</option>
            ))}
          </Select>
        </label>

        <ErrorList errores={errores} />

        <div className="flex justify-end gap-2 border-t border-stone-200 pt-4">
          <Button type="button" variant="ghost" onClick={onClose}>Cancelar</Button>
          <Button type="submit"><span className="inline-flex items-center gap-2"><Icon nombre="check" className="h-4 w-4" />Registrar solicitud</span></Button>
        </div>
      </form>
    </Modal>
  );
}
