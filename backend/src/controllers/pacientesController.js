import pacientesModel from "../models/pacientesModel.js";
import {v2 as cloudinary} from "cloudinary";

const pacientesController = {};

pacientesController.getPacientes = async (req, res) => {
    try {
        const pacientes = await pacientesModel.find()
        return res.status(200).json(pacientes)
    } catch (error) {
        console.log("error"+error);
        return res.status(500).json({message: "Internal server Error"});
    }
};

pacientesController.deletePacientes = async (req, res) => {
    try {
        const pacientesFound = await pacientesModel.findById(req.params.id)
        await cloudinary.uploader.destroy(pacientesFound.public_id)
        const pacienteDeleted = await pacientesModel.findByIdAndDelete(req.params.id)

        if(!pacienteDeleted){
            return res.status(404).json({message: "Paciente not found"})
        }

        return res.status(200).json({message:"Paciente deleted"})

    } catch (error) {
        console.log("error"+error);
        return res.status(500).json({message: "Internal server Error"});  
    }
};

pacientesController.updatePacientes = async (req, res) => {
    try {
        const{ 
        name,
        lastName,
        email,
        password,
        birthDate,
        phone,
        address,
        bloodType,
        phoneEmergencyContacts,
        isVerified} = req.body;

        const pacientesFound = await pacientesModel.findByIdAndUpdate(req.params.id)

        const updatedData = {
        name,
        lastName,
        email,
        password,
        birthDate,
        phone,
        address,
        bloodType,
        phoneEmergencyContacts,
        isVerified
        }

        if(req.file){
            await cloudinary.uploader.destroy(pacientesFound.public_id)

            updatedData.profilePhoto = req.file.path
            updatedData.public_id = req.file.filename
        };

        await pacientesModel.findByIdAndUpdate(
            req.params.id,
            updatedData,
            {new:true}
        )

        return res.status(200).json({message:"Paciente Updated"})

    } catch (error) {
        console.log("error"+error);
        return res.status(500).json({message: "Internal server Error"});  
    }
}

export default pacientesController;