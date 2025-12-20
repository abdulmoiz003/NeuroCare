// models/ParkReport.js
const mongoose = require('mongoose');

const parkReportSchema = new mongoose.Schema({
  patientName: { type: String, required: true },
  patientAge: { type: Number, required: true },
  patientGender: { type: String, required: true },
  disease: { type: String, required: true },
  detectionResult: { type: String, required: true },
  email: { type: String, required: true },
  savedMonth: { type: String, default: new Date().toLocaleString('default', { month: 'long' }) }, // Current month
  savedYear: { type: Number, default: new Date().getFullYear() }, // Current year
}, {
  timestamps: true // Automatically adds createdAt and updatedAt fields
});

const ParkReport = mongoose.model('ParkReport', parkReportSchema);

module.exports = ParkReport;