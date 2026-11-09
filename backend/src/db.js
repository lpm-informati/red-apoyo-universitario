import mongoose from "mongoose"

export const connectDB = async () => {
  try{
    await mongoose.connect("mongodb://localhost:27017/bienestarDB")
    console.log("Base de Datos Conectada")
  }catch(error){
    console.log(error)
  }
}