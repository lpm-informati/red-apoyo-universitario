import mongoose from "mongoose"
const esquema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
    unique: true
  }
})
export default mongoose.model('sede',esquema)