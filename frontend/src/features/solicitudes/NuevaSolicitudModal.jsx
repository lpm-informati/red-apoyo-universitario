import { useState } from "react";
import Modal from "../../components/ui/Modal.jsx";
import Button from "../../components/ui/Button.jsx";
import { Input, Select, Textarea, ErrorList } from "../../components/ui/FormField.jsx";

export default function NuevaSolicitudModal({ sedes, tipos, onClose, onCrear }) {
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
    <Modal titulo="Registrar solicitud de apoyo" onClose={onClose}>
      <form onSubmit={manejarEnvio} className="flex flex-col gap-4">
        <label className="flex flex-col gap-1.5 text-sm text-ink-soft">
          <span>Origen</span>
          <Select name="origen" defaultValue="Autogenerada">
            <option value="Autogenerada">Registrada por el equipo de bienestar</option>
            <option value="Derivación docente">Derivación docente</option>
          </Select>
        </label>
        <label className="flex flex-col gap-1.5 text-sm text-ink-soft">
          <span>Referencia del estudiante (iniciales o folio)</span>
          <Input name="estudianteIniciales" placeholder="Ej. M.P.G." required />
        </label>
        <label className="flex flex-col gap-1.5 text-sm text-ink-soft">
          <span>Motivo</span>
          <Input name="motivo" placeholder="Ej. Ansiedad frente a evaluaciones" required />
        </label>
        <label className="flex flex-col gap-1.5 text-sm text-ink-soft">
          <span>Descripción</span>
          <Textarea name="descripcion" rows={3} placeholder="Contexto breve, sin datos sensibles innecesarios" />
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

        <div className="flex justify-end gap-2 pt-1">
          <Button type="button" variant="ghost" onClick={onClose}>Cancelar</Button>
          <Button type="submit">Registrar solicitud</Button>
        </div>
      </form>
    </Modal>
  );
}
