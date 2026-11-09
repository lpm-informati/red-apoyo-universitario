import { useEffect, useRef, useState } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Header from "./components/layout/Header.jsx";
import Footer from "./components/layout/Footer.jsx";
import Login from "./components/Login.jsx";
import ToastStack from "./components/ui/ToastStack.jsx";
import InicioView from "./features/inicio/InicioView.jsx";
import SolicitudesView from "./features/solicitudes/SolicitudesView.jsx";
import TalleresView from "./features/talleres/TalleresView.jsx";
import AdministracionView from "./features/administracion/AdministracionView.jsx";
import ReportesView from "./features/reportes/ReportesView.jsx";
import BitacoraView from "./features/bitacora/BitacoraView.jsx";
import EstudianteView from "./features/estudiante/EstudianteView.jsx";
import DocenteView from "./features/docente/DocenteView.jsx";
import { inicialesDesdeNombre } from "./utils/format.js";
import {
  usuariosSeed,
  solicitudesSeed,
  talleresSeed,
  sedesSeed,
  tiposSolicitudSeed,
  profesionalesSeed,
  bitacoraSeed,
  NAV_ITEMS,
  RUTA_INICIAL_POR_ROL,
} from "./data/mockData.js";

const LIMITE_INACTIVIDAD_MS = 5 * 60 * 1000; // 5 minutos (requisito no funcional de seguridad)

// Convierte el _id de MongoDB en .id para que todas las vistas funcionen igual
const normalizar = (doc) => (doc ? { ...doc, id: doc._id || doc.id } : doc);
const normalizarLista = (lista) => (Array.isArray(lista) ? lista.map(normalizar) : []);

export default function App() {
  const navigate = useNavigate();

  // ---------- Estado global alimentado desde MongoDB ----------
  const [usuarios, setUsuarios] = useState([]);
  const [solicitudes, setSolicitudes] = useState([]);
  const [talleres, setTalleres] = useState([]);
  const [sedes, setSedes] = useState([]);
  const [tiposSolicitud, setTiposSolicitud] = useState([]);
  const [profesionales, setProfesionales] = useState([]);
  const [bitacora, setBitacora] = useState([]);

  const [sesion, setSesion] = useState(null);
  const [toasts, setToasts] = useState([]);
  const inactividadRef = useRef(null);

  function mostrarToast(mensaje, tipo = "info") {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, mensaje, tipo }]);
    setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== id)), 3200);
  }

  // Carga los datos desde MongoDB (y si la BD está vacía la primera vez, inserta las semillas de mockData.js)
  async function cargarDatosDesdeMongo() {
    try {
      const resUsu = await fetch("/api/usuario");
      let listaUsuarios = await resUsu.json();

      // Si no hay usuarios en MongoDB, poblamos las colecciones con los datos iniciales de prueba
      if (Array.isArray(listaUsuarios) && listaUsuarios.length === 0) {
        for (const u of usuariosSeed) {
          await fetch("/api/usuario", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(u),
          });
        }

        const sedesCreadas = [];
        for (const s of sedesSeed) {
          const r = await fetch("/api/sede", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ nombre: s.nombre }),
          });
          sedesCreadas.push(normalizar(await r.json()));
        }
        const mapaSedes = {
          "sede-1": sedesCreadas[0]?.id || "sede-1",
          "sede-2": sedesCreadas[1]?.id || "sede-2",
          "sede-3": sedesCreadas[2]?.id || "sede-3",
        };

        for (const t of tiposSolicitudSeed) {
          await fetch("/api/tiposolicitud", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ nombre: t }),
          });
        }

        const profCreados = [];
        for (const p of profesionalesSeed) {
          const r = await fetch("/api/profesional", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ ...p, sedeId: mapaSedes[p.sedeId] || p.sedeId }),
          });
          profCreados.push(normalizar(await r.json()));
        }
        const mapaProf = {
          "p-1": profCreados[0]?.id || "p-1",
          "p-2": profCreados[1]?.id || "p-2",
          "p-3": profCreados[2]?.id || "p-3",
        };

        for (const sol of solicitudesSeed) {
          await fetch("/api/solicitud", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              ...sol,
              sedeId: mapaSedes[sol.sedeId] || sol.sedeId,
              profesionalId: sol.profesionalId ? mapaProf[sol.profesionalId] : null,
            }),
          });
        }

        for (const tal of talleresSeed) {
          await fetch("/api/taller", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ ...tal, sedeId: mapaSedes[tal.sedeId] || tal.sedeId }),
          });
        }

        for (const bit of bitacoraSeed) {
          await fetch("/api/bitacora", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(bit),
          });
        }
      }

      // Obtenemos todas las colecciones actualizadas desde MongoDB
      const [uRes, solRes, talRes, sedRes, tipRes, profRes, bitRes] = await Promise.all([
        fetch("/api/usuario"),
        fetch("/api/solicitud"),
        fetch("/api/taller"),
        fetch("/api/sede"),
        fetch("/api/tiposolicitud"),
        fetch("/api/profesional"),
        fetch("/api/bitacora"),
      ]);

      setUsuarios(normalizarLista(await uRes.json()));
      setSolicitudes(normalizarLista(await solRes.json()));
      setTalleres(normalizarLista(await talRes.json()));
      setSedes(normalizarLista(await sedRes.json()));
      const tiposDocs = await tipRes.json();
      setTiposSolicitud(tiposDocs.map((t) => t.nombre));
      setProfesionales(normalizarLista(await profRes.json()));
      const bitDocs = normalizarLista(await bitRes.json());
      setBitacora(bitDocs.reverse());
    } catch (error) {
      console.error("Error conectando con el backend:", error);
      mostrarToast("Verifica que el servidor backend esté corriendo en el puerto 4000.", "error");
    }
  }

  useEffect(() => {
    cargarDatosDesdeMongo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function registrarBitacora(usuario, accion, entidad) {
    const nuevaEntrada = {
      fecha: new Date().toISOString(),
      usuario,
      accion,
      entidad: entidad || "-",
    };
    const res = await fetch("/api/bitacora", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(nuevaEntrada),
    });
    if (res.ok) {
      const guardada = normalizar(await res.json());
      setBitacora((prev) => [guardada, ...prev]);
    }
  }

  // ---------- RF1: autenticación + expiración de sesión por inactividad ----------
  function manejarLogin(email, password) {
    if (!email || !password) return { ok: false, error: "Ingresa tu correo institucional y tu contraseña." };
    const usuario = usuarios.find((u) => u.email.toLowerCase() === email.toLowerCase() && u.activo);
    if (!usuario) return { ok: false, error: "No existe una cuenta activa con ese correo institucional." };
    if (password.length < 4) return { ok: false, error: "Contraseña incorrecta." };
    setSesion(usuario);
    registrarBitacora(usuario.nombre, "Inicio de sesión", "-");
    const rutaInicial = RUTA_INICIAL_POR_ROL[usuario.rol] || "inicio";
    navigate(`/${rutaInicial}`);
    return { ok: true };
  }

  function manejarLogout(motivo = "Cierre de sesión manual") {
    if (sesion) registrarBitacora(sesion.nombre, motivo, "-");
    setSesion(null);
    navigate("/login");
  }

  useEffect(() => {
    if (!sesion) return;
    function reiniciarTemporizador() {
      clearTimeout(inactividadRef.current);
      inactividadRef.current = setTimeout(() => {
        mostrarToast("Tu sesión expiró por inactividad. Vuelve a ingresar.", "error");
        manejarLogout("Sesión expirada por inactividad");
      }, LIMITE_INACTIVIDAD_MS);
    }
    reiniciarTemporizador();
    const eventos = ["click", "keydown", "mousemove"];
    eventos.forEach((e) => document.addEventListener(e, reiniciarTemporizador));
    return () => {
      clearTimeout(inactividadRef.current);
      eventos.forEach((e) => document.removeEventListener(e, reiniciarTemporizador));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sesion]);

  // ---------- RF2 / RF3: crear solicitud ----------
  function crearSolicitud(datos) {
    const errores = [];
    if (!datos.motivo || datos.motivo.trim().length < 4) errores.push("Describe el motivo (mínimo 4 caracteres).");
    if (!datos.urgencia) errores.push("Selecciona la urgencia percibida.");
    if (!datos.sedeId) errores.push("Selecciona la sede o unidad de apoyo.");
    if (!datos.estudianteIniciales || datos.estudianteIniciales.trim().length < 2) {
      errores.push("Ingresa una referencia del estudiante (ej. iniciales), evita datos sensibles innecesarios.");
    }
    if (errores.length) return { ok: false, errores };

    const cuerpo = {
      estado: "Nueva",
      profesionalId: null,
      citas: [],
      observaciones: [],
      cierre: null,
      fechaCreacion: new Date().toISOString(),
      notificaciones: [{ fecha: new Date().toISOString(), tipo: "Recepción de solicitud" }],
      tipo: datos.tipo || "Otro",
      ...datos,
    };

    fetch("/api/solicitud", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(cuerpo),
    })
      .then((r) => r.json())
      .then((guardada) => {
        const doc = normalizar(guardada);
        setSolicitudes((prev) => [doc, ...prev]);
        registrarBitacora(sesion.nombre, "Creación de solicitud", doc.id);
        mostrarToast("Solicitud registrada correctamente.", "exito");
      });

    return { ok: true };
  }

  function crearSolicitudComoEstudiante(datos) {
    return crearSolicitud({
      ...datos,
      origen: "Autogenerada",
      estudianteIniciales: inicialesDesdeNombre(sesion.nombre),
      estudianteEmail: sesion.email,
    });
  }

  function crearSolicitudComoDocente(datos) {
    return crearSolicitud({
      ...datos,
      origen: "Derivación docente",
      derivadoPorEmail: sesion.email,
    });
  }

  async function actualizarSolicitud(id, cambios) {
    const res = await fetch(`/api/solicitud/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(cambios),
    });
    if (res.ok) {
      const data = await res.json();
      const doc = normalizar(data.solicitud || data);
      setSolicitudes((prev) => prev.map((s) => (s.id === id ? doc : s)));
    }
  }

  function verDetalleSolicitud(id) {
    registrarBitacora(sesion.nombre, "Visualización de caso", id);
  }

  // RF4
  function clasificarSolicitud(id, tipo) {
    actualizarSolicitud(id, { tipo, estado: "Clasificada" });
    registrarBitacora(sesion.nombre, "Clasificación de solicitud", id);
    mostrarToast("Solicitud clasificada.", "exito");
  }

  // RF5
  function asignarProfesional(id, profesionalId) {
    if (!profesionalId) return mostrarToast("Selecciona un profesional habilitado.", "error");
    const actual = solicitudes.find((s) => s.id === id);
    const notificaciones = [...(actual?.notificaciones || []), { fecha: new Date().toISOString(), tipo: "Asignación de profesional" }];
    actualizarSolicitud(id, { profesionalId, estado: "Asignada", notificaciones });
    registrarBitacora(sesion.nombre, "Asignación de profesional", id);
    mostrarToast("Profesional asignado.", "exito");
  }

  // RF6
  function agendarCita(id, fecha, nota) {
    if (!fecha) return mostrarToast("Selecciona fecha y hora para la cita.", "error");
    const actual = solicitudes.find((s) => s.id === id);
    const citas = [...(actual?.citas || []), { fecha, estado: "Pendiente", nota }];
    actualizarSolicitud(id, { estado: "En seguimiento", citas });
    registrarBitacora(sesion.nombre, "Registro de cita de seguimiento", id);
    mostrarToast("Cita registrada.", "exito");
  }

  function agregarObservacion(id, texto) {
    if (!texto || texto.trim().length < 3) return mostrarToast("La observación no puede estar vacía.", "error");
    const actual = solicitudes.find((s) => s.id === id);
    const observaciones = [...(actual?.observaciones || []), { fecha: new Date().toISOString(), autor: sesion.nombre, texto: texto.trim() }];
    actualizarSolicitud(id, { observaciones });
    registrarBitacora(sesion.nombre, "Registro de observación de seguimiento", id);
    mostrarToast("Observación registrada.", "exito");
  }

  // RF7
  function notificarEstudiante(id, tipo) {
    const actual = solicitudes.find((s) => s.id === id);
    const notificaciones = [...(actual?.notificaciones || []), { fecha: new Date().toISOString(), tipo }];
    actualizarSolicitud(id, { notificaciones });
    registrarBitacora(sesion.nombre, `Notificación al estudiante: ${tipo}`, id);
    mostrarToast("Estudiante notificado.", "exito");
  }

  // RF11
  function cerrarCaso(id, motivo, derivacion) {
    if (!motivo || motivo.trim().length < 3) return mostrarToast("Indica el motivo de cierre.", "error");
    const actual = solicitudes.find((s) => s.id === id);
    const cierre = { fecha: new Date().toISOString(), motivo: motivo.trim(), derivacion: derivacion?.trim() || "Sin derivación adicional" };
    const notificaciones = [...(actual?.notificaciones || []), { fecha: new Date().toISOString(), tipo: "Cierre de caso" }];
    actualizarSolicitud(id, { estado: "Cerrada", cierre, notificaciones });
    registrarBitacora(sesion.nombre, "Cierre de caso", id);
    mostrarToast("Caso cerrado.", "exito");
  }

  // ---------- RF8: talleres ----------
  function crearTaller(datos) {
    const errores = [];
    if (!datos.nombre || datos.nombre.trim().length < 3) errores.push("Ingresa el nombre del taller.");
    if (!datos.fecha) errores.push("Selecciona fecha y hora.");
    if (!datos.cupo || Number(datos.cupo) < 1) errores.push("El cupo debe ser mayor a 0.");
    if (errores.length) return { ok: false, errores };

    fetch("/api/taller", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ inscritos: 0, ...datos, cupo: Number(datos.cupo) }),
    })
      .then((r) => r.json())
      .then((guardado) => {
        const doc = normalizar(guardado);
        setTalleres((prev) => [...prev, doc]);
        registrarBitacora(sesion.nombre, "Creación de taller preventivo", doc.id);
        mostrarToast("Taller creado correctamente.", "exito");
      });

    return { ok: true };
  }

  async function inscribirEnTaller(id) {
    const taller = talleres.find((t) => t.id === id);
    if (taller.inscritos >= taller.cupo) return mostrarToast("El taller ya alcanzó su cupo máximo.", "error");
    const res = await fetch(`/api/taller/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ inscritos: taller.inscritos + 1 }),
    });
    if (res.ok) {
      const data = await res.json();
      const doc = normalizar(data.taller || data);
      setTalleres((prev) => prev.map((t) => (t.id === id ? doc : t)));
      registrarBitacora(sesion.nombre, "Inscripción en taller", id);
      mostrarToast("Inscripción registrada.", "exito");
    }
  }

  // ---------- RF9: administración de maestros ----------
  function crearUsuario(datos) {
    const errores = [];
    if (!datos.nombre || datos.nombre.trim().length < 3) errores.push("Ingresa el nombre completo.");
    if (!/^\S+@\S+\.\S+$/.test(datos.email || "")) errores.push("Ingresa un correo institucional válido.");
    if (!datos.rol) errores.push("Selecciona un perfil institucional.");
    if (usuarios.some((u) => u.email.toLowerCase() === (datos.email || "").toLowerCase())) errores.push("Ya existe una cuenta con ese correo.");
    if (errores.length) return { ok: false, errores };

    fetch("/api/usuario", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ activo: true, ...datos }),
    })
      .then((r) => r.json())
      .then((guardado) => {
        const doc = normalizar(guardado);
        setUsuarios((prev) => [...prev, doc]);
        registrarBitacora(sesion.nombre, "Creación de usuario", doc.id);
        mostrarToast("Usuario agregado.", "exito");
      });

    return { ok: true };
  }

  async function alternarEstadoUsuario(id) {
    const actual = usuarios.find((u) => u.id === id);
    const res = await fetch(`/api/usuario/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ activo: !actual.activo }),
    });
    if (res.ok) {
      const data = await res.json();
      const doc = normalizar(data.usuario || data);
      setUsuarios((prev) => prev.map((u) => (u.id === id ? doc : u)));
      registrarBitacora(sesion.nombre, "Cambio de estado de usuario", id);
      mostrarToast("Estado del usuario actualizado.", "exito");
    }
  }

  function crearSede(nombre) {
    if (!nombre || nombre.trim().length < 3) return { ok: false, error: "Ingresa un nombre de sede válido." };
    fetch("/api/sede", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nombre: nombre.trim() }),
    })
      .then((r) => r.json())
      .then((guardada) => {
        const doc = normalizar(guardada);
        setSedes((prev) => [...prev, doc]);
        registrarBitacora(sesion.nombre, "Creación de sede/unidad", doc.id);
        mostrarToast("Sede agregada.", "exito");
      });
    return { ok: true };
  }

  function crearTipo(nombre) {
    if (!nombre || nombre.trim().length < 3) return { ok: false, error: "Ingresa un tipo de solicitud válido." };
    fetch("/api/tiposolicitud", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nombre: nombre.trim() }),
    })
      .then((r) => r.json())
      .then((guardado) => {
        setTiposSolicitud((prev) => (prev.includes(guardado.nombre) ? prev : [...prev, guardado.nombre]));
        registrarBitacora(sesion.nombre, "Creación de tipo de solicitud", guardado.nombre);
        mostrarToast("Tipo de solicitud agregado.", "exito");
      });
    return { ok: true };
  }

  function crearProfesional(datos) {
    const errores = [];
    if (!datos.nombre || datos.nombre.trim().length < 3) errores.push("Ingresa el nombre del profesional.");
    if (!datos.especialidad) errores.push("Ingresa la especialidad.");
    if (!datos.sedeId) errores.push("Selecciona la sede.");
    if (errores.length) return { ok: false, errores };

    fetch("/api/profesional", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ cargaActual: 0, ...datos }),
    })
      .then((r) => r.json())
      .then((guardado) => {
        const doc = normalizar(guardado);
        setProfesionales((prev) => [...prev, doc]);
        registrarBitacora(sesion.nombre, "Registro de profesional habilitado", doc.id);
        mostrarToast("Profesional agregado.", "exito");
      });
    return { ok: true };
  }

  // ---------- Render con Rutas Claras ----------
  if (!sesion) {
    return (
      <Routes>
        <Route path="/login" element={<Login onLogin={manejarLogin} />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    );
  }

  const navItemsVisibles = NAV_ITEMS.filter((item) => item.roles.includes(sesion.rol));
  const rutaPorDefecto = `/${RUTA_INICIAL_POR_ROL[sesion.rol] || "inicio"}`;

  return (
    <div className="flex min-h-screen flex-col">
      <Header usuario={sesion} navItems={navItemsVisibles} onLogout={() => manejarLogout()} />

      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-6 sm:px-6">
        <Routes>
          <Route
            path="/inicio"
            element={<InicioView solicitudes={solicitudes} sedes={sedes} onNavigate={(r) => navigate(`/${r}`)} />}
          />
          <Route
            path="/solicitudes"
            element={
              <SolicitudesView
                solicitudes={solicitudes}
                sedes={sedes}
                tipos={tiposSolicitud}
                profesionales={profesionales}
                onCrear={crearSolicitud}
                onClasificar={clasificarSolicitud}
                onAsignar={asignarProfesional}
                onAgendarCita={agendarCita}
                onAgregarObservacion={agregarObservacion}
                onNotificar={notificarEstudiante}
                onCerrar={cerrarCaso}
                onVerDetalle={verDetalleSolicitud}
              />
            }
          />
          <Route
            path="/talleres"
            element={
              <TalleresView
                talleres={talleres}
                sedes={sedes}
                onCrear={crearTaller}
                onInscribir={inscribirEnTaller}
                permiteCrear={sesion.rol !== "estudiante"}
              />
            }
          />
          <Route
            path="/mis-solicitudes"
            element={<EstudianteView solicitudes={solicitudes} sedes={sedes} sesion={sesion} onCrear={crearSolicitudComoEstudiante} />}
          />
          <Route
            path="/derivar"
            element={<DocenteView solicitudes={solicitudes} sedes={sedes} sesion={sesion} onCrear={crearSolicitudComoDocente} />}
          />
          <Route path="/reportes" element={<ReportesView solicitudes={solicitudes} sedes={sedes} />} />
          <Route
            path="/administracion"
            element={
              <AdministracionView
                usuarios={usuarios}
                sedes={sedes}
                tipos={tiposSolicitud}
                profesionales={profesionales}
                onCrearUsuario={crearUsuario}
                onAlternarUsuario={alternarEstadoUsuario}
                onCrearSede={crearSede}
                onCrearTipo={crearTipo}
                onCrearProfesional={crearProfesional}
              />
            }
          />
          <Route path="/bitacora" element={<BitacoraView bitacora={bitacora} />} />
          <Route path="*" element={<Navigate to={rutaPorDefecto} replace />} />
        </Routes>
      </main>

      <Footer />
      <ToastStack toasts={toasts} />
    </div>
  );
}