import { Router } from "express"
import {
  regsolicitud,
  mostrarSolicitudes,
  mostrarsolicitud,
  eliminarsolicitud,
  actualizarsolicitud
} from "../controllers/solicitudCont.js"

const router = Router()

router.post('/solicitud',regsolicitud)
router.get('/solicitud',mostrarSolicitudes)
router.get('/solicitud/:id',mostrarsolicitud)
router.delete('/solicitud/:id',eliminarsolicitud)
router.put('/solicitud/:id',actualizarsolicitud)

export default router