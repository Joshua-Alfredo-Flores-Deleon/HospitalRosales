import express from "express";
import equiposController from "../controllers/equiposController.js"
import upload from "../utils/cloudinaryConfig.js"

const router = express.Router();

router.route("/")
.get(equiposController.getEquipos)
.post(upload.single("image"),equiposController.insertEquipos)

router.route("/verifiCodeEmail")
.put(upload.single("image"),equiposController.updateEquipos)
.delete(equiposController.deleteEquipos)

export default router;