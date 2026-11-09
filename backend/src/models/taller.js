import mongoose from "mongoose"
const esquema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true
  },
  tipo: {
    type: String,
    required: true
  },
  fecha: {
    type: String,
    required: true
  },
  sedeId: {
    type: String,
    required: true
  },
  facilitador: {
    type: String,
    required: true
  },
  cupo: {
    type: Number,
    required: true
  },
  inscritos: {
    type: Number,
    default: 0
  }
})
export default mongoose.model('taller',esquema)