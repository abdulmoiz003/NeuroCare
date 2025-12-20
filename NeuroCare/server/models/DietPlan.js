// models/DietPlan.js
const mongoose = require('mongoose');

const DietPlanSchema = new mongoose.Schema({
    email: String,
    shoppingList: String,
    breakfast: String,
    lunch: String,
    dinner: String,
});

module.exports = mongoose.model('DietPlan', DietPlanSchema);