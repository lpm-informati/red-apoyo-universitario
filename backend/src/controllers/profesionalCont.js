import Profesional from "../models/profesional.js"

// 1. Registrando Profesional (POST /api/profesional)
export const regprofesional = async (req,res) => {
  try {
    const {nombre,email,especialidad,sedeId,cargaActual} = req.body
    const nuevoProfesional = new Profesional({
      nombre,email,especialidad,sedeId,cargaActual
    })
    const guardado = await nuevoProfesional.save()
    res.status(200).json(guardado)
  } catch (error) {
    console.log(error)
  }
}

// 2. Mostrar todos los profesionales (GET /api/profesional)
export const mostrarProfesionales = async (req,res) => {
  try {
    const profesionales = await Profesional.find()
    res.status(200).json(profesionales)
  } catch (error) {
    console.log(error)
  }
}

// 3. Mostrar un solo profesional por ID (GET /api/profesional/:id)
export const mostrarprofesional = async (req,res) => {
  try {
    const {id} = req.params
    const profesional = await Profesional.findById(id)
    if (!profesional) {
      return res.status(404).json({
        mensaje:"Profesional no encontrado"
      })
    }
    res.status(200).json(profesional)
  } catch (error) {
    console.log(error)
  }
}

// 4. Eliminar Profesional por ID (DELETE /api/profesional/:id)
export const eliminarprofesional = async (req,res) => {
  try {
    const {id} = req.params
    const profesionaleliminado = await Profesional.findByIdAndDelete(id)
    if (!profesionaleliminado) {
      return res.status(404).json({
        mensaje:"Profesional no encontrado"
      })
    }
    res.status(200).json({
      mensaje:"Profesional eliminado correctamente",
      profesional: profesionaleliminado
    })
  } catch (error) {
    console.log(error)
  }
}

// 5. Actualizar profesional por ID (PUT /api/profesional/:id)
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