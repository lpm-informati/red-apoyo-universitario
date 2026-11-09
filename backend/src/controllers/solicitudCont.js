import Solicitud from "../models/solicitud.js"

// Registrando Solicitud
export const regsolicitud = async (req,res) => {
  try {
    const {
      estudianteIniciales,
      estudianteEmail,
      derivadoPorEmail,
      motivo,
      descripcion,
      urgencia,
      tipo,
      estado,
      origen,
      sedeId,
      profesionalId,
      fechaCreacion,
      citas,
      observaciones,
      notificaciones,
      cierre
    } = req.body

    const nuevaSolicitud = new Solicitud({
      estudianteIniciales,
      estudianteEmail,
      derivadoPorEmail,
      motivo,
      descripcion,
      urgencia,
      tipo,
      estado,
      origen,
      sedeId,
      profesionalId,
      fechaCreacion,
      citas,
      observaciones,
      notificaciones,
      cierre
    })
    const guardada = await nuevaSolicitud.save()
    res.status(200).json(guardada)
  } catch (error) {
    console.log(error)
  }
}

// Mostrar solicitudes
export const mostrarSolicitudes = async (req,res) => {
  try {
    const solicitudes = await Solicitud.find()
    res.status(200).json(solicitudes)
  } catch (error) {
    console.log(error)
  }
}

// Mostrar una sola solicitud
export const mostrarsolicitud = async (req,res) => {
  try {
    const {id} = req.params
    const solicitud = await Solicitud.findById(id)
    if (!solicitud) {
      return res.status(404).json({
        mensaje:"Solicitud no encontrada"
      })
    }
    res.status(200).json(solicitud)
  } catch (error) {
    console.log(error)
  }
}

// Eliminar Solicitud
export const eliminarsolicitud = async (req,res) => {
  try {
    const {id} = req.params
    const solicitudeliminada = await Solicitud.findByIdAndDelete(id)
    if (!solicitudeliminada) {
      return res.status(404).json({
        mensaje:"Solicitud no encontrada"
      })
    }
    res.status(200).json({
      mensaje:"Solicitud eliminada correctamente",
      solicitud: solicitudeliminada
    })
  } catch (error) {
    console.log(error)
  }
}

// Actualizar solicitud
export const actualizarsolicitud = async (req,res) => {
  try {
    const solicitudactualizada = await Solicitud.findByIdAndUpdate(
      { _id: req.params.id },
      req.body,
      { returnDocument: 'after' }
    )
    if (!solicitudactualizada) {
      return res.status(404).json({
        mensaje:"Solicitud no encontrada"
      })
    }
    res.status(200).json({
      mensaje: "Solicitud actualizada correctamente",
      solicitud: solicitudactualizada
    })
  } catch (error) {
    console.log(error)
  }
}