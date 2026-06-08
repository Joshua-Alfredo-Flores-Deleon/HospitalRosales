import especialidadesModel from "../models/especialidadesMedicas.js";

const especialidadesController = {};

especialidadesController.getEspecialidades = async (req, res) => {
    try {
        const especialidades = await especialidadesModel.find()
        return res.status(200).json(especialidades)
    } catch (error) {
        console.log("error"+error);
        return res.status(500).json({message: "Internal server Error"});
    }
};

especialidadesController.insertEspecialidades = async (req, res) => {
    try {
        const {         
        specialtyName,
        description,
        isAvailable } = req.body;

            const newEspecialidad = new especialidadesModel({
                specialtyName,
                description,
                isAvailable
            })

        await newEspecialidad.save()

        return res.status(200).json({message:"saved"})


    } catch (error) {
        console.log("error"+error);
        return res.status(500).json({message: "Internal server Error"});
    }
}

especialidadesController.deleteEspecialidades = async (req, res) => {
    try {
        const pacienteDeleted = await especialidadesModel.findByIdAndDelete(req.params.id)

        if(!pacienteDeleted){
            return res.status(404).json({message: "Paciente not found"})
        }

        return res.status(200).json({message:"Paciente deleted"})

    } catch (error) {
        console.log("error"+error);
        return res.status(500).json({message: "Internal server Error"});  
    }
};

especialidadesController.updateEspecialidades = async (req, res) => {
    try {
        const{ 
            specialtyName,
        description,
        isAvailable
        } = req.body;

        const updatedData = {
        specialtyName,
        description,
        isAvailable
        }

        await especialidadesModel.findByIdAndUpdate(
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

export default especialidadesController;