import mongoose from "mongoose"
const esquema = new mongoose.Schema({
  estudianteIniciales: {
    type: String,
    required: true
  },
  estudianteEmail: {
    type: String,
    default: ""
  },
  derivadoPorEmail: {
    type: String,
    default: ""
  },
  motivo: {
    type: String,
    required: true
  },
  descripcion: {
    type: String,
    default: ""
  },
  urgencia: {
    type: String,
    required: true
  },
  tipo: {
    type: String,
    default: "Otro"
  },
  estado: {
    type: String,
    default: "Nueva"
  },
  origen: {
    type: String,
    default: "Autogenerada"
  },
  sedeId: {
    type: String,
    required: true
  },
  profesionalId: {
    type: String,
    default: null
  },
  fechaCreacion: {
    type: String,
    required: true
  },
  citas: {
    type: Array,
    default: []
  },
  observaciones: {
    type: Array,
    default: []
  },
  notificaciones: {
    type: Array,
    default: []
  },
  cierre: {
    type: Object,
    default: null
  }
})
export default mongoose.model('solicitud',esquema)