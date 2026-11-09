export function formatearFecha(iso) {
  if (!iso) return "—";
  return new Date(iso).toLocaleString("es-CL", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function contarPor(lista, campo) {
  return lista.reduce((acc, item) => {
    const clave = item[campo] || "Sin dato";
    acc[clave] = (acc[clave] || 0) + 1;
    return acc;
  }, {});
}

// RF10: reportes agregados — solo conteos y promedios, nunca datos nominales.
export function generarResumen(solicitudes, sedes) {
  const sedeNombre = Object.fromEntries(sedes.map((s) => [s.id, s.nombre]));
  const porSedeIds = contarPor(solicitudes, "sedeId");
  const porSede = Object.fromEntries(Object.entries(porSedeIds).map(([id, n]) => [sedeNombre[id] || id, n]));

  const conAsignacion = solicitudes.filter((s) => s.profesionalId);
  const horas = conAsignacion.map((s) => {
    const notif = s.notificaciones.find((n) => n.tipo === "Asignación de profesional");
    return notif ? Math.max(0, (new Date(notif.fecha) - new Date(s.fechaCreacion)) / 36e5) : 0;
  });
  const tiempoPromedioHoras = horas.length ? Math.round((horas.reduce((a, b) => a + b, 0) / horas.length) * 10) / 10 : 0;

  return {
    total: solicitudes.length,
    abiertas: solicitudes.filter((s) => s.estado !== "Cerrada").length,
    cerradas: solicitudes.filter((s) => s.estado === "Cerrada").length,
    altaUrgenciaSinAsignar: solicitudes.filter((s) => s.urgencia === "Alta" && !s.profesionalId).length,
    tiempoPromedioHoras,
    porTipo: contarPor(solicitudes, "tipo"),
    porEstado: contarPor(solicitudes, "estado"),
    porUrgencia: contarPor(solicitudes, "urgencia"),
    porSede,
  };
}

// Genera "M.P.G." a partir de "Martina Pérez González", para no pedirle
// al propio estudiante que escriba sus iniciales al crear su solicitud.
export function inicialesDesdeNombre(nombre) {
  return (
    nombre
      .trim()
      .split(/\s+/)
      .filter(Boolean)
      .map((palabra) => palabra[0].toUpperCase())
      .join(".") + "."
  );
}

export function ordenarPorUrgencia(solicitudes) {
  const peso = { Alta: 0, Media: 1, Baja: 2 };
  return [...solicitudes].sort(
    (a, b) => peso[a.urgencia] - peso[b.urgencia] || new Date(a.fechaCreacion) - new Date(b.fechaCreacion)
  );
}
