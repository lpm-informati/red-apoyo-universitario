import express from "express"
import morgan from "morgan"
import rutas from "./routes/routes.js"
const app = express()
app.use(express.json())
app.use(morgan('dev'))
app.use("/api",rutas)
export default app