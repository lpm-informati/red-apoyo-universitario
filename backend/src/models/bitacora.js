import mongoose from "mongoose"
const esquema = new mongoose.Schema({
  fecha: {
    type: String,
    required: true
  },
  usuario: {
    type: String,
    required: true
  },
  accion: {
    type: String,
    required: true
  },
  entidad: {
    type: String,
    required: true
  }
})
export default mongoose.model('bitacora',esquema)