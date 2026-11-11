import express from "express"
import morgan from "morgan"
import usuarioRoutes from "./routes/usuarioRoutes.js"
import solicitudRoutes from "./routes/solicitudRoutes.js"
import tallerRoutes from "./routes/tallerRoutes.js"
import sedeRoutes from "./routes/sedeRoutes.js"
import tipoSolicitudRoutes from "./routes/tipoSolicitudRoutes.js"
import profesionalRoutes from "./routes/profesionalRoutes.js"
import bitacoraRoutes from "./routes/bitacoraRoutes.js"

const app = express()

app.use(express.json())
app.use(morgan('dev'))

app.use("/api",usuarioRoutes)
app.use("/api",solicitudRoutes)
app.use("/api",tallerRoutes)
app.use("/api",sedeRoutes)
app.use("/api",tipoSolicitudRoutes)
app.use("/api",profesionalRoutes)
app.use("/api",bitacoraRoutes)

export default app