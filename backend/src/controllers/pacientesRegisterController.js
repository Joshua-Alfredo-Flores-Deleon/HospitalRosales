import pacientesModel from "../models/pacientesModel.js";
import {v2 as cloudinary} from "cloudinary";
import nodemailer from "nodemailer";
import crypto from "crypto";
import jsonwebtoken from "jsonwebtoken";
import bcryptjs from "bcryptjs";
import { config } from "../../config.js";

const pacienteRegisterController = {};

pacienteRegisterController.register = async (req, res) => {
    const {         
        name,
        lastName,
        email,
        password,
        birthDate,
        phone,
        address,
        bloodType,
        phoneEmergencyContacts,
        profilePhoto,
        public_id,
        isVerified } = req.body;

        try {
            const existPaciente = await pacientesModel.findOne({ email });

            if(existPaciente) {
                return res.status(400).json({message: "Paceinte Already exist"})
            }

            const passwordHashed = await bcryptjs.hash(password, 10);

            const RamdomNumber = crypto.randomBytes(3).toString("hex");

            const token = jsonwebtoken.sign(
                {
                    name,
                    lastName,
                    RamdomNumber,
                    email,
                    password: passwordHashed,
                    birthDate,
                    phone,
                    address,
                    bloodType,
                    phoneEmergencyContacts,
                    profilePhoto,
                    public_id,
                    isVerified
                },
                config.JWT.secret,
                { expiresIn: "15m" },
            );

            res.cookie("registrationCookie", token,{maxAge: 15 * 60 *1000});

            const transporter = nodemailer.createTransport({
                service:"gmail",
                auth: {
                    user: config.email.user_email,
                    pass: config.email.user_password
                },
            })

            const mailOptions = {
                    from: config.email.user_email,
                    to: email,
                    subject: "Verificacion de cuenta",
                    text: 
                    "para verificar tu cuenta utiliza este codigo: " + RamdomNumber + "expira en 15 minutos"
            }

                transporter.sendMail(mailOptions, (error, info) => {
                    if(error){
                        console.log("error" + error)
                        return res.status(500).json({message: "Error sending email"})
                    }
                    return res.status(200).json({message: "Email send"})
                });

        } catch (error) {
            console.log("error"+error);
            return res.status(500).json({message: "Internal server Error"});  
        }
};

pacienteRegisterController.verifyCode = async (req, res) => {
    try {
        
        const {verifyCodeRquest} = req.body;

        const token = req.cookies.registrationCookie;

        const decoded = jsonwebtoken.verify(token, config.JWT.secret);

        const {
            RamdomNumber: storedCode,
            name,
            lastName,
            email,
            password,
            birthDate,
            phone,
            address,
            bloodType,
            phoneEmergencyContacts,
            isVerified,
        } = decoded;

        if (verifyCodeRquest = storedCode){
            return res.status(400).json({message: "invalid Code"})
        }

        const newPaciente = new pacientesModel({
            name,
            lastName,
            email,
            password,
            birthDate,
            phone,
            address,
            bloodType,
            phoneEmergencyContacts,
            profilePhoto: req.file.path,
            public_id: req.file.filename,
            isVerified: true,
        });

        await newPaciente.save();
        res.clearCookie("registrationCookie")
        return res.status(200).json({message: "registration"})

    } catch (error) {
            console.log("error"+error);
            return res.status(500).json({message: "Internal server Error"});  
    }
}

export default pacienteRegisterController;