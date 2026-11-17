import { ETIQUETAS_ROL } from "../../data/mockData.js";
import imgEstudiante from "../../assets/roles/estudiante.png";
import imgConsejero from "../../assets/roles/consejero.png";
import imgProfesional from "../../assets/roles/profesional.png";
import imgDocente from "../../assets/roles/docente.png";
import imgAdministrador from "../../assets/roles/administrador.png";

const IMAGENES = {
  estudiante: imgEstudiante,
  consejero: imgConsejero,
  profesional: imgProfesional,
  docente: imgDocente,
  administrador: imgAdministrador,
};

// Definición de cada rol dentro de la red de apoyo
const DESCRIPCIONES = {
  estudiante:
    "El estudiante es la persona de la comunidad universitaria que puede pedir apoyo cuando lo necesite, seguir sus solicitudes e inscribirse en los talleres de bienestar. Todo lo que cuente es confidencial.",
  consejero:
    "El consejero es la persona que brinda orientación a estudiantes, ayudándolos a enfrentar dificultades personales o académicas asignando profesionales adecuados a sus necesidades.",
  profesional:
    "El profesional de apoyo es el especialista capacitado para brindar atención, evaluación y apoyo en el ámbito de la salud mental.",
  docente:
    "El profesor es la persona que, al notar que un estudiante podría necesitar ayuda, lo deriva al equipo de bienestar y puede revisar el estado de sus derivaciones.",
  administrador:
    "El administrador es la persona encargada de gestionar y supervisar el funcionamiento de la plataforma y sus usuarios.",
};

export default function TarjetaBienvenida({ sesion }) {
  if (!IMAGENES[sesion.rol]) return null;

  return (
    <section className="flex flex-col items-center gap-4 rounded-2xl border border-stone-200 bg-crema p-5 text-center sm:flex-row sm:gap-6 sm:text-left">
      <img src={IMAGENES[sesion.rol]} alt={ETIQUETAS_ROL[sesion.rol]} className="h-24 w-24 shrink-0 rounded-full sm:h-28 sm:w-28" />
      <div className="flex-1 text-sm">
        <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 sm:justify-start">
          <h3 className="font-display text-xl text-brand-deep">Hola, {sesion.nombre}</h3>
          <span className="rounded-full bg-sage-soft px-2.5 py-0.5 text-xs text-brand-deep">{ETIQUETAS_ROL[sesion.rol]}</span>
        </div>
        <p className="mt-2 text-ink-soft">{DESCRIPCIONES[sesion.rol]}</p>
      </div>
    </section>
  );
}
