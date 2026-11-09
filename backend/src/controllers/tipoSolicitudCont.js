import TipoSolicitud from "../models/tipoSolicitud.js"

// Registrando Tipo de Solicitud
export const regtiposolicitud = async (req,res) => {
  try {
    const {nombre} = req.body
    const nuevoTipo = new TipoSolicitud({
      nombre
    })
    const guardado = await nuevoTipo.save()
    res.status(200).json(guardado)
  } catch (error) {
    console.log(error)
  }
}

// Mostrar tipos de solicitud
export const mostrarTiposSolicitud = async (req,res) => {
  try {
    const tipos = await TipoSolicitud.find()
    res.status(200).json(tipos)
  } catch (error) {
    console.log(error)
  }
}