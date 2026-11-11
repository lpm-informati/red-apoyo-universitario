import { Router } from "express"
import {
  regusuario,
  mostrarUsuarios,
  mostrarusuario,
  eliminarusuario,
  actualizarusuario
} from "../controllers/usuarioCont.js"

const router = Router()

router.post('/usuario',regusuario)
router.get('/usuario',mostrarUsuarios)
router.get('/usuario/:id',mostrarusuario)
router.delete('/usuario/:id',eliminarusuario)
router.put('/usuario/:id',actualizarusuario)

export default router