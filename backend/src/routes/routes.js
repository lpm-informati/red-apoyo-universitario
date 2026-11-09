import { Router } from "express"
import {
  regusuario,
  mostrarUsuarios,
  mostrarusuario,
  eliminarusuario,
  actualizarusuario
} from "../controllers/usuarioCont.js"
import {
  regsolicitud,
  mostrarSolicitudes,
  mostrarsolicitud,
  eliminarsolicitud,
  actualizarsolicitud
} from "../controllers/solicitudCont.js"
import {
  regtaller,
  mostrarTalleres,
  mostrartaller,
  eliminartaller,
  actualizartaller
} from "../controllers/tallerCont.js"
import {
  regsede,
  mostrarSedes,
  eliminarsede
} from "../controllers/sedeCont.js"
import {
  regtiposolicitud,
  mostrarTiposSolicitud
} from "../controllers/tipoSolicitudCont.js"
import {
  regprofesional,
  mostrarProfesionales,
  actualizarprofesional
} from "../controllers/profesionalCont.js"
import {
  regbitacora,
  mostrarBitacoras
} from "../controllers/bitacoraCont.js"

const router = Router()

// Rutas Usuario
router.post('/usuario',regusuario)
router.get('/usuario',mostrarUsuarios)
router.get('/usuario/:id',mostrarusuario)
router.delete('/usuario/:id',eliminarusuario)
router.put('/usuario/:id',actualizarusuario)

// Rutas Solicitud
router.post('/solicitud',regsolicitud)
router.get('/solicitud',mostrarSolicitudes)
router.get('/solicitud/:id',mostrarsolicitud)
router.delete('/solicitud/:id',eliminarsolicitud)
router.put('/solicitud/:id',actualizarsolicitud)

// Rutas Taller
router.post('/taller',regtaller)
router.get('/taller',mostrarTalleres)
router.get('/taller/:id',mostrartaller)
router.delete('/taller/:id',eliminartaller)
router.put('/taller/:id',actualizartaller)

// Rutas Sede
router.post('/sede',regsede)
router.get('/sede',mostrarSedes)
router.delete('/sede/:id',eliminarsede)

// Rutas Tipo de Solicitud
router.post('/tiposolicitud',regtiposolicitud)
router.get('/tiposolicitud',mostrarTiposSolicitud)

// Rutas Profesional
router.post('/profesional',regprofesional)
router.get('/profesional',mostrarProfesionales)
router.put('/profesional/:id',actualizarprofesional)

// Rutas Bitacora
router.post('/bitacora',regbitacora)
router.get('/bitacora',mostrarBitacoras)

export default router