import { Router } from "express"
import {
  regprofesional,
  mostrarProfesionales,
  mostrarprofesional,
  eliminarprofesional,
  actualizarprofesional
} from "../controllers/profesionalCont.js"

const router = Router()

router.post('/profesional',regprofesional)
router.get('/profesional',mostrarProfesionales)
router.get('/profesional/:id',mostrarprofesional)
router.delete('/profesional/:id',eliminarprofesional)
router.put('/profesional/:id',actualizarprofesional)

export default router