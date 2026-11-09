import Taller from "../models/taller.js"

// Registrando Taller
export const regtaller = async (req,res) => {
  try {
    const {nombre,tipo,fecha,sedeId,facilitador,cupo,inscritos} = req.body
    const nuevoTaller = new Taller({
      nombre,tipo,fecha,sedeId,facilitador,cupo,inscritos
    })
    const guardado = await nuevoTaller.save()
    res.status(200).json(guardado)
  } catch (error) {
    console.log(error)
  }
}

// Mostrar talleres
export const mostrarTalleres = async (req,res) => {
  try {
    const talleres = await Taller.find()
    res.status(200).json(talleres)
  } catch (error) {
    console.log(error)
  }
}

// Mostrar un solo taller
export const mostrartaller = async (req,res) => {
  try {
    const {id} = req.params
    const taller = await Taller.findById(id)
    if (!taller) {
      return res.status(404).json({
        mensaje:"Taller no encontrado"
      })
    }
    res.status(200).json(taller)
  } catch (error) {
    console.log(error)
  }
}

// Eliminar Taller
export const eliminartaller = async (req,res) => {
  try {
    const {id} = req.params
    const tallereliminado = await Taller.findByIdAndDelete(id)
    if (!tallereliminado) {
      return res.status(404).json({
        mensaje:"Taller no encontrado"
      })
    }
    res.status(200).json({
      mensaje:"Taller eliminado correctamente",
      taller: tallereliminado
    })
  } catch (error) {
    console.log(error)
  }
}

// Actualizar taller
export const actualizartaller = async (req,res) => {
  try {
    const talleractualizado = await Taller.findByIdAndUpdate(
      { _id: req.params.id },
      req.body,
      { returnDocument: 'after' }
    )
    if (!talleractualizado) {
      return res.status(404).json({
        mensaje:"Taller no encontrado"
      })
    }
    res.status(200).json({
      mensaje: "Taller actualizado correctamente",
      taller: talleractualizado
    })
  } catch (error) {
    console.log(error)
  }
}