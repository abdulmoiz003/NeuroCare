const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  patientName: String,
  patientEmail: String,
  neurologistName: String,
  neurologistEmail: String,
  date: String,
  time: String
});

module.exports = mongoose.model('Appointment', appointmentSchema);