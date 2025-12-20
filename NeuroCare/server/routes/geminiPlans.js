const express = require('express');
const router = express.Router();
const { GoogleGenerativeAI } = require('@google/generative-ai');

// Initialize Gemini AI
const API_KEY = "AIzaSyD1UppV7F7gfpxLc3N_YOp95Yp2xCKhzdw";
const MODEL_NAME = "gemini-2.5-flash";
const genAI = new GoogleGenerativeAI(API_KEY);

// Helper function to generate diet plan prompt
function generateDietPlanPrompt(data) {
    return `Create a detailed daily diet plan for a person with ${data.disease}. 
    Dietary preferences: ${data.dietaryPreference}
    Allergies: ${data.allergies || 'None'}
    Restrictions: ${data.restrictions || 'None'}

    Please format the response with these sections:
    SHOPPING LIST:
    (List essential ingredients)

    BREAKFAST:
    (Detailed breakfast plan)

    LUNCH:
    (Detailed lunch plan)

    DINNER:
    (Detailed dinner plan)

    IMPORTANT:
    (Any special considerations for ${data.disease})`;
}

// Helper function to generate exercise plan prompt
function generateExercisePlanPrompt(data) {
    return `Create a detailed exercise plan for a person with ${data.disease}.
    Fitness level: ${data.fitnessLevel}
    Physical limitations: ${data.limitations || 'None'}
    Goals: ${data.goals}

    Please include:
    1. Warm-up exercises
    2. Main exercises with duration and intensity
    3. Cool-down exercises
    4. Safety precautions specific to ${data.disease}
    5. Weekly schedule`;
}

// Generate Diet Plan
router.post('/generate-diet-plan', async (req, res) => {
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });
        const prompt = generateDietPlanPrompt(req.body);
        
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();
        
        res.json({ plan: text });
    } catch (error) {
        console.error('Error generating diet plan:', error);
        res.status(500).json({ error: 'Failed to generate diet plan' });
    }
});

// Generate Exercise Plan
router.post('/generate-exercise-plan', async (req, res) => {
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });
        const prompt = generateExercisePlanPrompt(req.body);
        
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();
        
        res.json({ plan: text });
    } catch (error) {
        console.error('Error generating exercise plan:', error);
        res.status(500).json({ error: 'Failed to generate exercise plan' });
    }
});

// Save Generated Plan
router.post('/save-generated-plan', async (req, res) => {
    try {
        const { userId, planType, planContent } = req.body;
        // Save to database logic here
        res.json({ message: 'Plan saved successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to save plan' });
    }
});

module.exports = router;