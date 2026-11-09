export const sedesSeed = [
  { id: "sede-1", nombre: "Sede Central" },
  { id: "sede-2", nombre: "Sede Norte" },
  { id: "sede-3", nombre: "Sede Sur" },
];

export const tiposSolicitudSeed = ["Emocional", "Académico", "Social", "Económico", "Convivencia", "Otro"];

export const usuariosSeed = [
  { id: "u-1", nombre: "Camila Rojas", email: "camila.rojas@uni.cl", rol: "administrador", activo: true },
  { id: "u-2", nombre: "Tomás Vidal", email: "tomas.vidal@uni.cl", rol: "consejero", activo: true },
  { id: "u-3", nombre: "Valentina Soto", email: "valentina.soto@uni.cl", rol: "profesional", activo: true },
  { id: "u-4", nombre: "Ignacio Pardo", email: "ignacio.pardo@uni.cl", rol: "docente", activo: true },
  { id: "u-5", nombre: "Martina Pérez González", email: "martina.perez@uni.cl", rol: "estudiante", activo: true },
];

export const profesionalesSeed = [
  { id: "p-1", nombre: "Valentina Soto", especialidad: "Psicología clínica", sedeId: "sede-1", cargaActual: 4 },
  { id: "p-2", nombre: "Andrés Fuentes", especialidad: "Trabajo social", sedeId: "sede-1", cargaActual: 2 },
  { id: "p-3", nombre: "Marcela Díaz", especialidad: "Psicopedagogía", sedeId: "sede-2", cargaActual: 3 },
];

export const solicitudesSeed = [
  {
    id: "s-1001",
    estudianteIniciales: "M.P.G.",
    estudianteEmail: "martina.perez@uni.cl",
    motivo: "Ansiedad frente a evaluaciones",
    descripcion: "Estudiante reporta insomnio y crisis de ansiedad antes de pruebas.",
    urgencia: "Alta",
    tipo: "Emocional",
    estado: "Nueva",
    origen: "Autogenerada",
    sedeId: "sede-1",
    profesionalId: null,
    fechaCreacion: "2026-08-28T14:10:00",
    citas: [],
    observaciones: [],
    notificaciones: [{ fecha: "2026-08-28T14:10:00", tipo: "Recepción de solicitud" }],
    cierre: null,
  },
  {
    id: "s-1002",
    estudianteIniciales: "J.A.T.",
    derivadoPorEmail: "ignacio.pardo@uni.cl",
    motivo: "Bajo rendimiento y ausentismo",
    descripcion: "Docente observa ausencias reiteradas y bajo desempeño en el semestre.",
    urgencia: "Media",
    tipo: "Académico",
    estado: "Asignada",
    origen: "Derivación docente",
    sedeId: "sede-1",
    profesionalId: "p-2",
    fechaCreacion: "2026-08-25T09:30:00",
    citas: [{ fecha: "2026-09-02T10:00:00", estado: "Pendiente", nota: "Primera entrevista" }],
    observaciones: [{ fecha: "2026-08-26T11:00:00", autor: "Tomás Vidal", texto: "Se contactó al estudiante, agenda primera cita." }],
    notificaciones: [
      { fecha: "2026-08-25T09:31:00", tipo: "Recepción de solicitud" },
      { fecha: "2026-08-26T11:00:00", tipo: "Asignación de profesional" },
    ],
    cierre: null,
  },
  {
    id: "s-1003",
    estudianteIniciales: "F.N.L.",
    motivo: "Dificultades económicas para continuar estudios",
    descripcion: "Solicita orientación sobre becas y beneficios disponibles.",
    urgencia: "Media",
    tipo: "Económico",
    estado: "En seguimiento",
    origen: "Autogenerada",
    sedeId: "sede-2",
    profesionalId: "p-3",
    fechaCreacion: "2026-08-20T16:45:00",
    citas: [{ fecha: "2026-08-24T15:00:00", estado: "Atendida", nota: "Se orientó sobre postulación a beca de emergencia." }],
    observaciones: [{ fecha: "2026-08-24T15:20:00", autor: "Marcela Díaz", texto: "Se realizará seguimiento en 30 días." }],
    notificaciones: [
      { fecha: "2026-08-20T16:46:00", tipo: "Recepción de solicitud" },
      { fecha: "2026-08-21T09:00:00", tipo: "Asignación de profesional" },
    ],
    cierre: null,
  },
];

export const talleresSeed = [
  {
    id: "t-1",
    nombre: "Manejo de ansiedad frente a exámenes",
    tipo: "Preventivo - Emocional",
    fecha: "2026-09-15T15:00:00",
    sedeId: "sede-1",
    facilitador: "Valentina Soto",
    cupo: 20,
    inscritos: 12,
  },
  {
    id: "t-2",
    nombre: "Hábitos de estudio y organización del tiempo",
    tipo: "Preventivo - Académico",
    fecha: "2026-09-20T10:00:00",
    sedeId: "sede-2",
    facilitador: "Marcela Díaz",
    cupo: 25,
    inscritos: 25,
  },
];

export const bitacoraSeed = [
  { id: "b-1", fecha: "2026-08-25T09:31:00", usuario: "Sistema", accion: "Creación de solicitud", entidad: "s-1002" },
];

export const NAV_ITEMS = [
  { ruta: "inicio", etiqueta: "Panorama general", roles: ["administrador", "consejero", "profesional"] },
  { ruta: "solicitudes", etiqueta: "Solicitudes", roles: ["administrador", "consejero", "profesional"] },
  { ruta: "talleres", etiqueta: "Talleres", roles: ["administrador", "consejero", "profesional", "estudiante"] },
  { ruta: "reportes", etiqueta: "Reportes", roles: ["administrador"] },
  { ruta: "administracion", etiqueta: "Administración", roles: ["administrador"] },
  { ruta: "bitacora", etiqueta: "Bitácora", roles: ["administrador"] },
  { ruta: "mis-solicitudes", etiqueta: "Mis solicitudes", roles: ["estudiante"] },
  { ruta: "derivar", etiqueta: "Derivar estudiante", roles: ["docente"] },
];

// Ruta de inicio al autenticarse, según el rol.
export const RUTA_INICIAL_POR_ROL = {
  administrador: "inicio",
  consejero: "inicio",
  profesional: "inicio",
  estudiante: "mis-solicitudes",
  docente: "derivar",
};

export const ETIQUETAS_ROL = {
  administrador: "Administrador de bienestar",
  consejero: "Consejero",
  profesional: "Profesional de apoyo",
  docente: "Profesor que refiere",
  estudiante: "Estudiante",
};
