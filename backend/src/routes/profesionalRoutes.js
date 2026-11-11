import { Router } from "express"
import {
  regprofesional,
  mostrarProfesionales,
  actualizarprofesional
} from "../controllers/profesionalCont.js"

const router = Router()

router.post('/profesional',regprofesional)
router.get('/profesional',mostrarProfesionales)
router.put('/profesional/:id',actualizarprofesional)

export default router