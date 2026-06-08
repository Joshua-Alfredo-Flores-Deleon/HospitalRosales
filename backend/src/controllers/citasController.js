import citasModel from "../models/citas.js";

const citasController = {};

citasController.getCitas = async (req, res) => {
    try {
        const citas = await citasModel.find()
        return res.status(200).json(citas)
    } catch (error) {
        console.log("error"+error);
        return res.status(500).json({message: "Internal server Error"});
    }
};

citasController.insertCitas = async (req, res) => {
    try {
        const {         
            patient_id,
            specialty_id,
            appointmentDate,
            reason,
            status,
            observations } = req.body;

            const newCita = new citasModel({
                patient_id,
            specialty_id,
            appointmentDate,
            reason,
            status,
            observations
            })

        await newCita.save()

        return res.status(200).json({message:"saved"})


    } catch (error) {
        console.log("error"+error);
        return res.status(500).json({message: "Internal server Error"});
    }
}

citasController.deleteCitas = async (req, res) => {
    try {
        const citaDeleted = await citasModel.findByIdAndDelete(req.params.id)

        if(!citaDeleted){
            return res.status(404).json({message: "Cita not found"})
        }

        return res.status(200).json({message:"Cita deleted"})

    } catch (error) {
        console.log("error"+error);
        return res.status(500).json({message: "Internal server Error"});  
    }
};

citasController.updateCitas = async (req, res) => {
    try {
        const{ 
            patient_id,
            specialty_id,
            appointmentDate,
            reason,
            status,
            observations
        } = req.body;

        const updatedData = {
        patient_id,
            specialty_id,
            appointmentDate,
            reason,
            status,
            observations
        }

        await citasModel.findByIdAndUpdate(
            req.params.id,
            updatedData,
            {new:true}
        )

        return res.status(200).json({message:"Cita Updated"})

    } catch (error) {
        console.log("error"+error);
        return res.status(500).json({message: "Internal server Error"});  
    }
}

export default citasController;