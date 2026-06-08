import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import pacienteRegisterRoute from "./src/routes/pacientesRegisterRoute.js";
import especialidadesRoute from "./src/routes/especialidadesRoute.js";
import citasRoute from "./src/routes/citasRoute.js";
import expedientesRoutes from "./src/routes/expedientesRoutes.js";
import equiposRoute from "./src/routes/equiposRoute.js"

const app = express();

app.use(
    cors({
        origin:["http://localhost:5173", "http://localhost:5174"],
        credentials: true,
    }),
);

app.use(cookieParser());

app.use(express.json());

app.use("/api/pacienteRegister", pacienteRegisterRoute);
app.use("/api/especialidadesMedicas", especialidadesRoute);
app.use("/api/citas", citasRoute);
app.use("/api/expedientes", expedientesRoutes);
app.use("/api/equipos", equiposRoute);

export default app;