import { Router } from "express"
import {
  regsede,
  mostrarSedes,
  eliminarsede
} from "../controllers/sedeCont.js"

const router = Router()

router.post('/sede',regsede)
router.get('/sede',mostrarSedes)
router.delete('/sede/:id',eliminarsede)

export default router