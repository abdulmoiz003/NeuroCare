const mongoose = require("mongoose")

const PatientSchema = new mongoose.Schema({
    name:String,
    age:Number,
    phoneNumber: String,
    gender: String,
    email: { type: String, required: true, unique: true },
    password: String
})

const PatientModel = mongoose.model("patient",PatientSchema)
module.exports = PatientModel