const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// Define schemas
const DietPlanSchema = new mongoose.Schema({
    name: String,
    description: String,
    meals: [{
        time: String,
        description: String,
        foods: [String],
        calories: Number
    }],
    totalCalories: Number,
    restrictions: [String],
    category: String, // e.g., "Alzheimer's", "Stroke", "Parkinson's"
    createdAt: { type: Date, default: Date.now }
});

const ExercisePlanSchema = new mongoose.Schema({
    name: String,
    description: String,
    exercises: [{
        name: String,
        description: String,
        duration: Number,
        intensity: String,
        instructions: [String]
    }],
    category: String, // e.g., "Alzheimer's", "Stroke", "Parkinson's"
    difficulty: String,
    createdAt: { type: Date, default: Date.now }
});

// Create models
const DietPlan = mongoose.model('DietPlan', DietPlanSchema);
const ExercisePlan = mongoose.model('ExercisePlan', ExercisePlanSchema);

// Diet Plan Routes
router.get('/diet-plans', async (req, res) => {
    try {
        const { category } = req.query;
        const query = category ? { category } : {};
        const dietPlans = await DietPlan.find(query);
        res.json(dietPlans);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.post('/diet-plans', async (req, res) => {
    try {
        const dietPlan = new DietPlan(req.body);
        const savedPlan = await dietPlan.save();
        res.status(201).json(savedPlan);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Exercise Plan Routes
router.get('/exercise-plans', async (req, res) => {
    try {
        const { category, difficulty } = req.query;
        const query = {};
        if (category) query.category = category;
        if (difficulty) query.difficulty = difficulty;
        
        const exercisePlans = await ExercisePlan.find(query);
        res.json(exercisePlans);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.post('/exercise-plans', async (req, res) => {
    try {
        const exercisePlan = new ExercisePlan(req.body);
        const savedPlan = await exercisePlan.save();
        res.status(201).json(savedPlan);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Save plans for users
router.post('/save-plan', async (req, res) => {
    try {
        const { userId, planId, planType } = req.body;
        // Implementation for saving plans to user profile
        res.status(200).json({ message: "Plan saved successfully" });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Get saved plans
router.get('/saved-plans/:userId', async (req, res) => {
    try {
        const { userId } = req.params;
        // Implementation for retrieving user's saved plans
        res.json({ dietPlans: [], exercisePlans: [] });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;