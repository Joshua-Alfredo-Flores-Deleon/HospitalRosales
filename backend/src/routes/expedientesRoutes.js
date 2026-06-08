import express from "express";
import expedientesController from "../controllers/expedientesController.js";

const router = express.Router();

router.route("/")
.get(expedientesController.getExpediente)
.post(expedientesController.insertExpediente)

router.route("/verifiCodeEmail")
.put(expedientesController.updateExpediente)
.delete(expedientesController.deleteExpediente)

export default router;