const mongoose = require('mongoose');

const MedicationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  dosage: { type: String, required: true },
  time: { type: String, required: true },
});

const EPrescriptionSchema = new mongoose.Schema({
  appointmentId: { type: String, required: true },
  patientName: { type: String, required: true },
  disease: { type: String, required: true },
  medications: [MedicationSchema],
  status: { type: String, required: true },
  neurologistName: { type: String, required: true },
  instructions: { type: String },
  savedMonth: { type: String, default: new Date().toLocaleString('default', { month: 'long' }) }, // Current month
  savedYear: { type: Number, default: new Date().getFullYear() }, // Current year
});

module.exports = mongoose.model('EPrescription', EPrescriptionSchema);