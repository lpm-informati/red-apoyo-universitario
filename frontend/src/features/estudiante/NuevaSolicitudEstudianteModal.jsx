import { useState } from "react";
import Modal from "../../components/ui/Modal.jsx";
import Button from "../../components/ui/Button.jsx";
import { Input, Select, Textarea, ErrorList } from "../../components/ui/FormField.jsx";

/*
 A diferencia de NuevaSolicitudModal (que usa el equipo de bienestar), este
 formulario no pide origen, iniciales ni tipo: el estudiante es quien está
 sesión, así que esos datos se completan automáticamente en App.jsx antes
 de guardar (RF2: "crear una solicitud de apoyo con motivo, descripción,
 urgencia percibida y datos de contacto").
 */
export default function NuevaSolicitudEstudianteModal({ sedes, onClose, onCrear }) {
  const [errores, setErrores] = useState([]);

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
    <Modal titulo="Nueva solicitud de apoyo" onClose={onClose}>
      <form onSubmit={manejarEnvio} className="flex flex-col gap-4">
        <p className="rounded-md bg-sage-soft px-3 py-2 text-xs text-brand-deep">
          🔒 Tu solicitud será revisada por el equipo de bienestar. La información que compartas es confidencial.
        </p>
        <label className="flex flex-col gap-1.5 text-sm text-ink-soft">
          <span>¿Qué está pasando? (motivo)</span>
          <Input name="motivo" placeholder="Ej. Me siento muy ansioso/a antes de las pruebas" required />
        </label>
        <label className="flex flex-col gap-1.5 text-sm text-ink-soft">
          <span>Cuéntanos un poco más (opcional)</span>
          <Textarea name="descripcion" rows={3} placeholder="Lo que quieras compartir, a tu ritmo" />
        </label>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <label className="flex flex-col gap-1.5 text-sm text-ink-soft">
            <span>¿Qué tan urgente lo sientes?</span>
            <Select name="urgencia" defaultValue="" required>
              <option value="" disabled>Selecciona…</option>
              <option value="Alta">Necesito ayuda pronto</option>
              <option value="Media">Me gustaría conversarlo</option>
              <option value="Baja">No es urgente</option>
            </Select>
          </label>
          <label className="flex flex-col gap-1.5 text-sm text-ink-soft">
            <span>Sede donde estudias</span>
            <Select name="sedeId" defaultValue="" required>
              <option value="" disabled>Selecciona…</option>
              {sedes.map((s) => (
                <option key={s.id} value={s.id}>{s.nombre}</option>
              ))}
            </Select>
          </label>
        </div>

        <ErrorList errores={errores} />

        <div className="flex justify-end gap-2 pt-1">
          <Button type="button" variant="ghost" onClick={onClose}>Cancelar</Button>
          <Button type="submit">Enviar solicitud</Button>
        </div>
      </form>
    </Modal>
  );
}
