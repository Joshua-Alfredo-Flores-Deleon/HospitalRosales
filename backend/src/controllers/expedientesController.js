import expedientesModel from "../models/expedientes.js";

const expedientesController = {};

expedientesController.getExpediente = async (req, res) => {
    try {
        const expediente = await expedientesModel.find()
        return res.status(200).json(expediente)
    } catch (error) {
        console.log("error"+error);
        return res.status(500).json({message: "Internal server Error"});
    }
};

expedientesController.insertExpediente = async (req, res) => {
    try {
        const {         
        patient_id,
        diagnosis,
        medications,
        medicalNotes } = req.body;

            const newExpediente = new expedientesModel({
                patient_id,
        diagnosis,
        medications,
        medicalNotes
            })

        await newExpediente.save()

        return res.status(200).json({message:"saved"})


    } catch (error) {
        console.log("error"+error);
        return res.status(500).json({message: "Internal server Error"});
    }
}

expedientesController.deleteExpediente = async (req, res) => {
    try {
        const expedienteDeleted = await expedientesModel.findByIdAndDelete(req.params.id)

        if(!expedienteDeleted){
            return res.status(404).json({message: "Expediente not found"})
        }

        return res.status(200).json({message:"Expediente deleted"})

    } catch (error) {
        console.log("error"+error);
        return res.status(500).json({message: "Internal server Error"});  
    }
};

expedientesController.updateExpediente = async (req, res) => {
    try {
        const{ 
            patient_id,
        diagnosis,
        medications,
        medicalNotes
        } = req.body;

        const updatedData = {
        patient_id,
        diagnosis,
        medications,
        medicalNotes
        }

        await expedientesModel.findByIdAndUpdate(
            req.params.id,
            updatedData,
            {new:true}
        )

        return res.status(200).json({message:"expediente Updated"})

    } catch (error) {
        console.log("error"+error);
        return res.status(500).json({message: "Internal server Error"});  
    }
}

export default expedientesController;