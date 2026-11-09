import Usuario from "../models/usuario.js"

// Registrando Usuario
export const regusuario = async (req,res) => {
  try {
    const {nombre,email,password,rol,activo} = req.body
    const nuevoUsuario = new Usuario({
      nombre,email,password,rol,activo
    })
    const guardado = await nuevoUsuario.save()
    res.status(200).json(guardado)
  } catch (error) {
    console.log(error)
  }
}

// Mostrar usuarios
export const mostrarUsuarios = async (req,res) => {
  try {
    const usuarios = await Usuario.find()
    res.status(200).json(usuarios)
  } catch (error) {
    console.log(error)
  }
}

// Mostrar un solo usuario
export const mostrarusuario = async (req,res) => {
  try {
    const {id} = req.params
    const usuario = await Usuario.findById(id)
    if (!usuario) {
      return res.status(404).json({
        mensaje:"Usuario no encontrado"
      })
    }
    res.status(200).json(usuario)
  } catch (error) {
    console.log(error)
  }
}

// Eliminar Usuario
export const eliminarusuario = async (req,res) => {
  try {
    const {id} = req.params
    const usuarioeliminado = await Usuario.findByIdAndDelete(id)
    if (!usuarioeliminado) {
      return res.status(404).json({
        mensaje:"Usuario no encontrado"
      })
    }
    res.status(200).json({
      mensaje:"Usuario eliminado correctamente",
      usuario: usuarioeliminado
    })
  } catch (error) {
    console.log(error)
  }
}

// Actualizar usuario
export const actualizarusuario = async (req,res) => {
  try {
    const usuarioactualizado = await Usuario.findByIdAndUpdate(
      { _id: req.params.id },
      req.body,
      { returnDocument: 'after' }
    )
    if (!usuarioactualizado) {
      return res.status(404).json({
        mensaje:"Usuario no encontrado"
      })
    }
    res.status(200).json({
      mensaje: "Usuario actualizado correctamente",
      usuario: usuarioactualizado
    })
  } catch (error) {
    console.log(error)
  }
}