import { Input, Select } from "./FormField.jsx";

export const OTRO_ESTUDIANTE = "__otro__";

// Elige un estudiante ya registrado; si no está, permite escribir su nombre.
// El estado (valor) vive en el formulario que lo usa, para poder mostrar avisos según la opción elegida.
export default function SelectorEstudiante({ estudiantes = [], valor, onCambio }) {
  return (
    <>
      <label className="flex flex-col gap-1.5 text-sm text-ink-soft">
        <span>Estudiante registrado en el sistema</span>
        <Select name="estudianteEmail" value={valor} onChange={(e) => onCambio(e.target.value)} required>
          <option value="" disabled>Selecciona…</option>
          {estudiantes.map((u) => (
            <option key={u.id} value={u.email}>{u.nombre}</option>
          ))}
          <option value={OTRO_ESTUDIANTE}>El estudiante no está en la lista…</option>
        </Select>
      </label>
      {valor === OTRO_ESTUDIANTE && (
        <label className="flex flex-col gap-1.5 text-sm text-ink-soft">
          <span>Nombre completo del estudiante</span>
          <Input name="estudianteNombre" placeholder="Ej. Juan Andrés Torres" required />
        </label>
      )}
    </>
  );
}
