import { useState } from "react";
import Modal from "../../components/ui/Modal.jsx";
import Button from "../../components/ui/Button.jsx";
import Icon from "../../components/ui/Icon.jsx";
import { Input, Select, Textarea, ErrorList } from "../../components/ui/FormField.jsx";
import SelectorEstudiante, { OTRO_ESTUDIANTE } from "../../components/ui/SelectorEstudiante.jsx";

/*
 RF3: "Permitir a docentes derivar estudiantes mediante un formulario de
 derivación responsable." El origen queda fijo como "Derivación docente"
 y se guarda en App.jsx; aquí solo se piden los datos del caso.
 */
export default function NuevaDerivacionModal({ sedes, estudiantes = [], onClose, onCrear }) {
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
    <Modal titulo="Derivar estudiante" icono="users" onClose={onClose}>
      <form onSubmit={manejarEnvio} className="flex flex-col gap-4">
        <p className="flex items-center gap-2 rounded-md bg-sage-soft px-3 py-2 text-xs text-brand-deep">
          <Icon nombre="lock" className="h-4 w-4 shrink-0" />
          Comparte solo la información necesaria para que el equipo de bienestar pueda contactar al estudiante.
        </p>
        <SelectorEstudiante estudiantes={estudiantes} valor={seleccion} onCambio={setSeleccion} />
        <label className="flex flex-col gap-1.5 text-sm text-ink-soft">
          <span>Motivo de la derivación</span>
          <Input name="motivo" placeholder="Ej. Ausentismo reiterado y bajo rendimiento" required />
        </label>
        <label className="flex flex-col gap-1.5 text-sm text-ink-soft">
          <span>Observación para el equipo de bienestar</span>
          <Textarea
            name="descripcion"
            rows={3}
            placeholder={otro ? "Correo del estudiante y qué has observado, sin juicios de valor" : "Qué has observado, sin juicios de valor"}
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
            <span>Sede</span>
            <Select name="sedeId" defaultValue="" required>
              <option value="" disabled>Selecciona…</option>
              {sedes.map((s) => (
                <option key={s.id} value={s.id}>{s.nombre}</option>
              ))}
            </Select>
          </label>
        </div>

        <ErrorList errores={errores} />

        <div className="flex justify-end gap-2 border-t border-stone-200 pt-4">
          <Button type="button" variant="ghost" onClick={onClose}>Cancelar</Button>
          <Button type="submit"><span className="inline-flex items-center gap-2"><Icon nombre="send" className="h-4 w-4" />Enviar derivación</span></Button>
        </div>
      </form>
    </Modal>
  );
}
