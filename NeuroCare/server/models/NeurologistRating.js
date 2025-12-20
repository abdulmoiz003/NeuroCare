const mongoose = require('mongoose');

const neurologistRatingSchema = new mongoose.Schema({
  neurologistName: { type: String, required: true },
  neurologistEmail: { type: String, required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  review: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('NeurologistRating', neurologistRatingSchema);
