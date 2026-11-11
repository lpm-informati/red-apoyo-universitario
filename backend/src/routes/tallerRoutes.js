import { Router } from "express"
import {
  regtaller,
  mostrarTalleres,
  mostrartaller,
  eliminartaller,
  actualizartaller
} from "../controllers/tallerCont.js"

const router = Router()

router.post('/taller',regtaller)
router.get('/taller',mostrarTalleres)
router.get('/taller/:id',mostrartaller)
router.delete('/taller/:id',eliminartaller)
router.put('/taller/:id',actualizartaller)

export default router