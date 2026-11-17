import mongoose from "mongoose"
const esquema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true
  },
  especialidad: {
    type: String,
    required: true
  },
  email: {
    type: String,
    default: ""
  },
  sedeId: {
    type: String,
    required: true
  },
  cargaActual: {
    type: Number,
    default: 0
  }
})
export default mongoose.model('profesional',esquema)