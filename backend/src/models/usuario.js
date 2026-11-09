import mongoose from "mongoose"
const esquema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    default: "1234"
  },
  rol: {
    type: String,
    required: true
  },
  activo: {
    type: Boolean,
    default: true
  }
})
export default mongoose.model('usuario',esquema)