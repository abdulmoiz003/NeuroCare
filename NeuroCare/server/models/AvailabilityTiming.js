const mongoose = require('mongoose');

const availabilityTimingSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  time: { type: String, required: true },
  fee: { type: String, required: true },
  booked: { type: String, default: 'n' },
  name: {type: String, required: true},
  email: {type: String, required: true}
});

module.exports = mongoose.model('AvailabilityTiming', availabilityTimingSchema, 'availabilitytimings');