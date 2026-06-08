import express from "express";
import pacientesRegisterController from "../controllers/pacientesRegisterController.js";
import upload from "../utils/cloudinaryConfig.js";

const router = express.Router();

router.route("/")
.post(upload.single("profilePhoto"),pacientesRegisterController.register)

router.route("/verifiCodeEmail")
.post(pacientesRegisterController.verifyCode)

export default router;