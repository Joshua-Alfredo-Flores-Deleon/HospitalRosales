import equiposModel from "../models/equiposMedicos.js";
import {v2 as cloudinary} from "cloudinary";

const equiposController = {};

equiposController.getEquipos = async (req, res) => {
    try {
        const equipos = await equiposModel.find()
        return res.status(200).json(equipos)
    } catch (error) {
        console.log("error"+error);
        return res.status(500).json({message: "Internal server Error"});
    }
};

equiposController.insertEquipos = async ( req, res) => {
    try {
        const {
            equipmentName,
            description,
            brand,
            model,
            purchaseDate,
            maintenanceDate,
            location,
            status,
            isAvailable} = req.body;

            const newEquipo = new equiposModel({
                equipmentName,
                description,
                brand,
                model,
                purchaseDate,
                maintenanceDate,
                location,
                image: req.file.path,
                public_id: req.file.filename,
                status,
                isAvailable,
            })

            await newEquipo.save()

            return res.status(200).json({message:"saved"})

    } catch (error) {
        console.log("error"+error);
        return res.status(500).json({message: "Internal server Error"});
    }
}

equiposController.deleteEquipos = async (req, res) => {
    try {
        const EquiposFound = await equiposModel.findById(req.params.id)
        await cloudinary.uploader.destroy(EquiposFound.public_id)
        const equiposDeleted = await equiposModel.findByIdAndDelete(req.params.id)

        if(!equiposDeleted){
            return res.status(404).json({message: "Equipos not found"})
        }

        return res.status(200).json({message:"Equipos deleted"})

    } catch (error) {
        console.log("error"+error);
        return res.status(500).json({message: "Internal server Error"});  
    }
};

equiposController.updateEquipos = async (req, res) => {
    try {
        const{ 
            equipmentName,
            description,
            brand,
            model,
            purchaseDate,
            maintenanceDate,
            location,
            status,
            isAvailable} = req.body;

        const EquiposFound = await equiposModel.findByIdAndUpdate(req.params.id)

        const updatedData = {
            equipmentName,
            description,
            brand,
            model,
            purchaseDate,
            maintenanceDate,
            location,
            status,
            isAvailable
        }

        if(req.file){
            await cloudinary.uploader.destroy(EquiposFound.public_id)

            updatedData.image = req.file.path
            updatedData.public_id = req.file.filename
        };

        await equiposModel.findByIdAndUpdate(
            req.params.id,
            updatedData,
            {new:true}
        )

        return res.status(200).json({message:"Equipos Updated"})

    } catch (error) {
        console.log("error"+error);
        return res.status(500).json({message: "Internal server Error"});  
    }
}

export default equiposController;