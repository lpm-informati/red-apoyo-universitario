import { useState } from "react";
import Button from "./ui/Button.jsx";
import { Input } from "./ui/FormField.jsx";

export default function Login({ onLogin }) {
  const [error, setError] = useState("");

  async function manejarEnvio(e) {
    e.preventDefault();
    const data = new FormData(e.target);
    const resultado = await onLogin(data.get("email").trim(), data.get("password"));
    if (!resultado.ok) setError(resultado.error);
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-paper px-4">
      <div className="w-full max-w-md rounded-md border border-stone-300 bg-surface p-8 shadow-sm">
        <div className="mb-1 flex items-center gap-3">
          <span className="text-2xl text-clay">◆</span>
          <div>
            <p className="text-xs text-ink-soft">Bienestar Estudiantil</p>
            <h1 className="font-display text-xl text-brand-deep">Red de Apoyo y Salud Mental</h1>
          </div>
        </div>
        <p className="mb-6 mt-3 text-sm text-ink-soft">
          Ingresa con tu cuenta institucional para acceder al panel de gestión.
        </p>

        <form onSubmit={manejarEnvio} className="flex flex-col gap-4">
          <label className="flex flex-col gap-1.5 text-sm text-ink-soft">
            <span>Correo institucional</span>
            <Input type="email" name="email" placeholder="camila.rojas@uni.cl" required />
          </label>
          <label className="flex flex-col gap-1.5 text-sm text-ink-soft">
            <span>Contraseña</span>
            <Input type="password" name="password" placeholder="••••••••" required />
          </label>
          {error && <p className="rounded-md bg-alert-soft px-3 py-2 text-sm text-alert">{error}</p>}
          <Button type="submit" className="w-full">
            Ingresar
          </Button>
        </form>

        <div className="mt-6 rounded-md bg-sage-soft p-4 text-xs text-brand-deep">
          <p className="mb-2">Cuentas de demostración (cualquier contraseña de 4+ caracteres):</p>
          <ul className="list-disc space-y-1 pl-4">
            <li><strong>camila.rojas@uni.cl</strong> — Administradora de bienestar</li>
            <li><strong>tomas.vidal@uni.cl</strong> — Consejero</li>
            <li><strong>valentina.soto@uni.cl</strong> — Profesional de apoyo</li>
            <li><strong>ignacio.pardo@uni.cl</strong> — Profesor que refiere</li>
            <li><strong>martina.perez@uni.cl</strong> — Estudiante</li>
          </ul>
        </div>
      </div>
    </div>
  );
}