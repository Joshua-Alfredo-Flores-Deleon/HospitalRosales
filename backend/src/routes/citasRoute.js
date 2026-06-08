import express from "express";
import citasController from "../controllers/citasController.js";

const router = express.Router();

router.route("/")
.get(citasController.getCitas)
.post(citasController.insertCitas)

router.route("/verifiCodeEmail")
.put(citasController.updateCitas)
.delete(citasController.deleteCitas)

export default router;