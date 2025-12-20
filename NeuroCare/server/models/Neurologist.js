const mongoose = require("mongoose")

const NeurologistSchema = new mongoose.Schema({
    name: String,
    age: Number,
    phoneNumber: String,
    gender: String,
    email: { type: String, required: true, unique: true },
    password: String,
    accountHolderName : String,
    bankName : String,
    accountNumber : String,
    pmcRegistrationNumber: String,
    approved: { type: String, required: true, default : "n"},
})

const NeurologistModel = mongoose.model("neurologist", NeurologistSchema)
module.exports = NeurologistModel