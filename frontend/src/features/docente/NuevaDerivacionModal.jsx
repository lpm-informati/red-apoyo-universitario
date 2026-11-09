import { useState } from "react";
import Modal from "../../components/ui/Modal.jsx";
import Button from "../../components/ui/Button.jsx";
import { Input, Select, Textarea, ErrorList } from "../../components/ui/FormField.jsx";

/*
 RF3: "Permitir a docentes derivar estudiantes mediante un formulario de
 derivación responsable." El origen queda fijo como "Derivación docente"
 y se guarda en App.jsx; aquí solo se piden los datos del caso.
 */
export default function NuevaDerivacionModal({ sedes, onClose, onCrear }) {
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
    <Modal titulo="Derivar estudiante" onClose={onClose}>
      <form onSubmit={manejarEnvio} className="flex flex-col gap-4">
        <p className="rounded-md bg-sage-soft px-3 py-2 text-xs text-brand-deep">
          🔒 Comparte solo la información necesaria para que el equipo de bienestar pueda contactar al estudiante.
        </p>
        <label className="flex flex-col gap-1.5 text-sm text-ink-soft">
          <span>Referencia del estudiante (iniciales o folio)</span>
          <Input name="estudianteIniciales" placeholder="Ej. J.A.T." required />
        </label>
        <label className="flex flex-col gap-1.5 text-sm text-ink-soft">
          <span>Motivo de la derivación</span>
          <Input name="motivo" placeholder="Ej. Ausentismo reiterado y bajo rendimiento" required />
        </label>
        <label className="flex flex-col gap-1.5 text-sm text-ink-soft">
          <span>Observación para el equipo de bienestar</span>
          <Textarea name="descripcion" rows={3} placeholder="Qué has observado, sin juicios de valor" />
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

        <div className="flex justify-end gap-2 pt-1">
          <Button type="button" variant="ghost" onClick={onClose}>Cancelar</Button>
          <Button type="submit">Enviar derivación</Button>
        </div>
      </form>
    </Modal>
  );
}
