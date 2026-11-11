import { Router } from "express"
import {
  regbitacora,
  mostrarBitacoras
} from "../controllers/bitacoraCont.js"

const router = Router()

router.post('/bitacora',regbitacora)
router.get('/bitacora',mostrarBitacoras)

export default router