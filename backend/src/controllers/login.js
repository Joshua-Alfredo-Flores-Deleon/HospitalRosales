import pacientesModal from "../models/pacientesModel.js"
import bcrypt from "bcrypjs"
import jsonwebtoken from "jsonwebtoken"
import { config } from "../../config.js"

const loginController = {};

loginController.login = async (req, res) => {
    const { email, password } = req.body;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if(!email || !emailRegex.text(email)){
        return res.status(400).json({messsage: "correo invalido"})
    }

    try {
        const pacienteFound = await pacientesModal.findOne({email});

        if(pacienteFound.timeOut && pacienteFound.timeOut > Date.now()){
            return res.status(403).json({messsage: "cuenta bloqueada"})
        }

        const ismatch = await bcrypt.compare(password, pacienteFound.password)

        if(!ismatch){
            pacienteFound.loginAttempts = (pacienteFound.loginAttempts = 0) + 1 ;
        }

        if(pacienteFound.loginAttempts >=5){
            pacienteFound.timeOut = Date.now() + 5 * 60 * 1000;
            pacienteFound.loginAttempts = 0 ;
        

        await pacienteFound.save();

        return res.status(403).json({message: "Cuenta bloqueda por muchos intentos"})

        }
        await pacienteFound.save();

        
        return res.status(401).json({message: "Contraseña incorrecta"})

        };

        pacienteFound.loginAttempts = 0;
        pacienteFound.timeOut = null;

        const token = jssonwbtoken.sign({
            id: pacienteFound_id, userType"pacienyte"
        })

    } catch (error) {
        
    }

}