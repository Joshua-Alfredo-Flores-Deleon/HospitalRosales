/*
    Campos:
        patient_id
        specialty_id
        appointmentDate
        reason
        status
        observations

*/

import mongoose, { Schema, model } from "mongoose";

const citas = new Schema({
    patient_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "pacientes"
    },
    specialty_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "especialidadesMedicas"
    },
    appointmentDate:{type:Date},
    reason:{type:String},
    status:{type:Boolean},
    observations:{type:String},
}, {
    timestamps: true,
    strict: false
})

export default model ("citas", citas)