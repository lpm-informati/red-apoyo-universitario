import Sede from "../models/sede.js"

// Registrando Sede
export const regsede = async (req,res) => {
  try {
    const {nombre} = req.body
    const nuevaSede = new Sede({
      nombre
    })
    const guardada = await nuevaSede.save()
    res.status(200).json(guardada)
  } catch (error) {
    console.log(error)
  }
}

// Mostrar sedes
export const mostrarSedes = async (req,res) => {
  try {
    const sedes = await Sede.find()
    res.status(200).json(sedes)
  } catch (error) {
    console.log(error)
  }
}

// Eliminar Sede
export const eliminarsede = async (req,res) => {
  try {
    const {id} = req.params
    const sedeeliminada = await Sede.findByIdAndDelete(id)
    if (!sedeeliminada) {
      return res.status(404).json({
        mensaje:"Sede no encontrada"
      })
    }
    res.status(200).json({
      mensaje:"Sede eliminada correctamente",
      sede: sedeeliminada
    })
  } catch (error) {
    console.log(error)
  }
}