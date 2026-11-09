import { useState } from "react";
import Badge from "../../components/ui/Badge.jsx";
import Button from "../../components/ui/Button.jsx";
import { Input, Select, ErrorList } from "../../components/ui/FormField.jsx";
import { ETIQUETAS_ROL } from "../../data/mockData.js";

export default function AdministracionView({
  usuarios,
  sedes,
  tipos,
  profesionales,
  onCrearUsuario,
  onAlternarUsuario,
  onCrearSede,
  onCrearTipo,
  onCrearProfesional,
}) {
  const [erroresUsuario, setErroresUsuario] = useState([]);
  const [erroresProfesional, setErroresProfesional] = useState([]);
  const [errorSede, setErrorSede] = useState("");
  const [errorTipo, setErrorTipo] = useState("");

  function manejarUsuario(e) {
    e.preventDefault();
    const datos = Object.fromEntries(new FormData(e.target).entries());
    const r = onCrearUsuario(datos);
    if (!r.ok) return setErroresUsuario(r.errores);
    setErroresUsuario([]);
    e.target.reset();
  }

  function manejarSede(e) {
    e.preventDefault();
    const nombre = new FormData(e.target).get("nombre");
    const r = onCrearSede(nombre);
    if (!r.ok) return setErrorSede(r.error);
    setErrorSede("");
    e.target.reset();
  }

  function manejarTipo(e) {
    e.preventDefault();
    const nombre = new FormData(e.target).get("nombre");
    const r = onCrearTipo(nombre);
    if (!r.ok) return setErrorTipo(r.error);
    setErrorTipo("");
    e.target.reset();
  }

  function manejarProfesional(e) {
    e.preventDefault();
    const datos = Object.fromEntries(new FormData(e.target).entries());
    const r = onCrearProfesional(datos);
    if (!r.ok) return setErroresProfesional(r.errores);
    setErroresProfesional([]);
    e.target.reset();
  }

  return (
    <div className="flex flex-col gap-5">
      <div>
        <h2 className="font-display text-2xl text-brand-deep">Administración</h2>
        <p className="text-sm text-ink-soft">Gestiona usuarios, perfiles, sedes, tipos de solicitud y profesionales habilitados.</p>
      </div>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        {/* Usuarios */}
        <section className="rounded-md border border-stone-300 bg-surface p-5">
          <h3 className="mb-3 font-display text-lg text-brand-deep">Usuarios institucionales</h3>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[420px] text-sm">
              <thead>
                <tr className="border-b border-stone-200 text-left text-xs text-ink-soft">
                  <th className="py-2">Nombre</th><th className="py-2">Correo</th><th className="py-2">Perfil</th><th className="py-2">Estado</th><th className="py-2"></th>
                </tr>
              </thead>
              <tbody>
                {usuarios.map((u) => (
                  <tr key={u.id} className="border-b border-stone-100">
                    <td className="py-2">{u.nombre}</td>
                    <td className="py-2">{u.email}</td>
                    <td className="py-2">{ETIQUETAS_ROL[u.rol] || u.rol}</td>
                    <td className="py-2"><Badge texto={u.activo ? "Activo" : "Inactivo"} /></td>
                    <td className="py-2">
                      <Button variant="link" small onClick={() => onAlternarUsuario(u.id)}>
                        {u.activo ? "Desactivar" : "Reactivar"}
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <form onSubmit={manejarUsuario} className="mt-4 flex flex-col gap-2">
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              <Input name="nombre" placeholder="Nombre completo" required />
              <Input name="email" type="email" placeholder="correo@uni.cl" required />
            </div>
            <div className="flex flex-wrap gap-2">
              <Select name="rol" defaultValue="" required className="flex-1">
                <option value="" disabled>Perfil…</option>
                <option value="administrador">Administrador de bienestar</option>
                <option value="consejero">Consejero</option>
                <option value="profesional">Profesional de apoyo</option>
                <option value="docente">Docente</option>
              </Select>
              <Button small type="submit">Agregar usuario</Button>
            </div>
            <ErrorList errores={erroresUsuario} />
          </form>
        </section>

        {/* Sedes */}
        <section className="rounded-md border border-stone-300 bg-surface p-5">
          <h3 className="mb-3 font-display text-lg text-brand-deep">Sedes y unidades de apoyo</h3>
          <ul className="mb-3 flex flex-col divide-y divide-stone-100 text-sm">
            {sedes.map((s) => <li key={s.id} className="py-1.5">{s.nombre}</li>)}
          </ul>
          <form onSubmit={manejarSede} className="flex gap-2">
            <Input name="nombre" placeholder="Nueva sede o unidad" required className="flex-1" />
            <Button small type="submit">Agregar</Button>
          </form>
          {errorSede && <p className="mt-2 text-sm text-alert">{errorSede}</p>}
        </section>

        {/* Tipos de solicitud */}
        <section className="rounded-md border border-stone-300 bg-surface p-5">
          <h3 className="mb-3 font-display text-lg text-brand-deep">Tipos de solicitud</h3>
          <ul className="mb-3 flex flex-col divide-y divide-stone-100 text-sm">
            {tipos.map((t) => <li key={t} className="py-1.5">{t}</li>)}
          </ul>
          <form onSubmit={manejarTipo} className="flex gap-2">
            <Input name="nombre" placeholder="Nuevo tipo de solicitud" required className="flex-1" />
            <Button small type="submit">Agregar</Button>
          </form>
          {errorTipo && <p className="mt-2 text-sm text-alert">{errorTipo}</p>}
        </section>

        {/* Profesionales */}
        <section className="rounded-md border border-stone-300 bg-surface p-5">
          <h3 className="mb-3 font-display text-lg text-brand-deep">Profesionales habilitados</h3>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[360px] text-sm">
              <thead>
                <tr className="border-b border-stone-200 text-left text-xs text-ink-soft">
                  <th className="py-2">Nombre</th><th className="py-2">Especialidad</th><th className="py-2">Casos activos</th>
                </tr>
              </thead>
              <tbody>
                {profesionales.map((p) => (
                  <tr key={p.id} className="border-b border-stone-100">
                    <td className="py-2">{p.nombre}</td><td className="py-2">{p.especialidad}</td><td className="py-2">{p.cargaActual}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <form onSubmit={manejarProfesional} className="mt-4 flex flex-col gap-2">
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              <Input name="nombre" placeholder="Nombre" required />
              <Input name="especialidad" placeholder="Especialidad" required />
            </div>
            <div className="flex flex-wrap gap-2">
              <Select name="sedeId" required className="flex-1">
                {sedes.map((s) => <option key={s.id} value={s.id}>{s.nombre}</option>)}
              </Select>
              <Button small type="submit">Agregar profesional</Button>
            </div>
            <ErrorList errores={erroresProfesional} />
          </form>
        </section>
      </div>
    </div>
  );
}
