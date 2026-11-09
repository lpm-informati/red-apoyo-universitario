import Bitacora from "../models/bitacora.js"

// Registrando Bitacora
export const regbitacora = async (req,res) => {
  try {
    const {fecha,usuario,accion,entidad} = req.body
    const nuevaBitacora = new Bitacora({
      fecha,usuario,accion,entidad
    })
    const guardada = await nuevaBitacora.save()
    res.status(200).json(guardada)
  } catch (error) {
    console.log(error)
  }
}

// Mostrar bitacora
export const mostrarBitacoras = async (req,res) => {
  try {
    const bitacoras = await Bitacora.find()
    res.status(200).json(bitacoras)
  } catch (error) {
    console.log(error)
  }
}