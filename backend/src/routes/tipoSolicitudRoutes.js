import { Router } from "express"
import {
  regtiposolicitud,
  mostrarTiposSolicitud
} from "../controllers/tipoSolicitudCont.js"

const router = Router()

router.post('/tiposolicitud',regtiposolicitud)
router.get('/tiposolicitud',mostrarTiposSolicitud)

export default router