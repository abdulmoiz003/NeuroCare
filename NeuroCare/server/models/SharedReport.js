// models/SharedReport.js

const mongoose = require('mongoose');

const SharedReportSchema = new mongoose.Schema({
  patientName: { type: String, required: true },
  patientAge: { type: Number, required: true },
  patientGender: { type: String, required: true },
  disease: { type: String, required: true },
  detectionResult: { type: String, required: true },
  email: { type: String, required: true },
  createdAt: { type: Date, required: true },
  sharedWith: { type: String, required: true }  // Neurologist's email
});

const SharedReport = mongoose.model('SharedReport', SharedReportSchema);

module.exports = SharedReport;
