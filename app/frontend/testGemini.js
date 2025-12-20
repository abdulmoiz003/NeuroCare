const { GoogleGenerativeAI } = require("@google/generative-ai");

const API_KEY = "AIzaSyD1UppV7F7gfpxLc3N_YOp95Yp2xCKhzdw";

async function testGemini() {
    try {
        console.log('Testing Gemini API...');
        const genAI = new GoogleGenerativeAI(API_KEY);
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });
        
        const result = await model.generateContent("Say hello");
        const response = await result.response;
        const text = response.text();
        
        console.log('Success! Response:', text);
    } catch (error) {
        console.error('Error:', error.message);
        console.error('Full error:', error);
    }
}

testGemini();
