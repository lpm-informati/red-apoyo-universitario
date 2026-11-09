import Profesional from "../models/profesional.js"

// Registrando Profesional
export const regprofesional = async (req,res) => {
  try {
    const {nombre,especialidad,sedeId,cargaActual} = req.body
    const nuevoProfesional = new Profesional({
      nombre,especialidad,sedeId,cargaActual
    })
    const guardado = await nuevoProfesional.save()
    res.status(200).json(guardado)
  } catch (error) {
    console.log(error)
  }
}

// Mostrar profesionales
export const mostrarProfesionales = async (req,res) => {
  try {
    const profesionales = await Profesional.find()
    res.status(200).json(profesionales)
  } catch (error) {
    console.log(error)
  }
}

// Actualizar profesional
export const actualizarprofesional = async (req,res) => {
  try {
    const profesionalactualizado = await Profesional.findByIdAndUpdate(
      { _id: req.params.id },
      req.body,
      { returnDocument: 'after' }
    )
    if (!profesionalactualizado) {
      return res.status(404).json({
        mensaje:"Profesional no encontrado"
      })
    }
    res.status(200).json({
      mensaje: "Profesional actualizado correctamente",
      profesional: profesionalactualizado
    })
  } catch (error) {
    console.log(error)
  }
}