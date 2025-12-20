import React, { useState } from 'react';
import { View, Text, TextInput, Button, ScrollView, StyleSheet, Alert, ActivityIndicator, Touchable, TouchableOpacity } from 'react-native';

import RNPickerSelect from 'react-native-picker-select';
const { GoogleGenerativeAI } = require("@google/generative-ai");
import { useNavigation } from '@react-navigation/native';
import { GEMINI_API_KEY } from '@env';


export default function DietPlanForm() {
    const [dietaryPreference, setDietaryPreference] = useState('');
    const [allergies, setAllergies] = useState('');
    const [restrictions, setRestrictions] = useState('');
    const [disease, setDisease] = useState('');
    const [dietPlan, setDietPlan] = useState('');
    const [loading, setLoading] = useState(false);

    const API_KEY = "AIzaSyD1UppV7F7gfpxLc3N_YOp95Yp2xCKhzdw";
    const MODEL_NAME = "gemini-2.5-flash";

    const navigation = useNavigation(); 

    const handleSubmit = async () => {
        if (!dietaryPreference || !disease) {
            Alert.alert('Validation Error', 'Please select both Dietary Preference and Disease before proceeding.');
            return;
        }
        
        setLoading(true);
        try {
            console.log('Starting API call');
            const genAI = new GoogleGenerativeAI(API_KEY);
            console.log('Created GenAI instance');
            const model = genAI.getGenerativeModel({ 
                model: "gemini-2.5-flash",
            });
            console.log('Got model instance');

            const prompt = `Create a personalized meal plan for a patient with ${disease}.
            Details:
            - Dietary Preference: ${dietaryPreference}
            - Allergies: ${allergies || 'None'}
            - Dietary Restrictions: ${restrictions || 'None'}
            - Cuisine Style: Pakistani

            Please provide a meal plan in the following format:
            Breakfast:
            - Recipe 1 (name, nutritional info, instructions)
            - Recipe 2 (name, nutritional info, instructions)
            - Recipe 3 (name, nutritional info, instructions)

            Lunch:
            - Recipe 1 (name, nutritional info, instructions)
            - Recipe 2 (name, nutritional info, instructions)
            - Recipe 3 (name, nutritional info, instructions)

            Dinner:
            - Recipe 1 (name, nutritional info, instructions)
            - Recipe 2 (name, nutritional info, instructions)
            - Recipe 3 (name, nutritional info, instructions)

            Shopping List:
            (List all required ingredients)

            Keep in mind this is for a patient with ${disease} and adjust accordingly.`;

            try {
                const result = await model.generateContent(prompt);
                const response = await result.response;
                const generatedPlan = response.text();
                if (generatedPlan) {
                    // Extract sections from the generated plan
                    const shoppingListMatch = /shopping list:([\s\S]*?)(breakfast|lunch|dinner|important|$)/i.exec(generatedPlan);
                    const breakfastMatch = /breakfast:([\s\S]*?)(lunch|dinner|shopping list|important|$)/i.exec(generatedPlan);
                    const lunchMatch = /lunch:([\s\S]*?)(breakfast|dinner|shopping list|important|$)/i.exec(generatedPlan);
                    const dinnerMatch = /dinner:([\s\S]*?)(lunch|breakfast|shopping list|important|$)/i.exec(generatedPlan);
                    
                    const extractedShoppingList = shoppingListMatch ? shoppingListMatch[1].trim() : 'No shopping list section found.';
                    const extractedBreakfast = breakfastMatch ? breakfastMatch[1].trim() : 'No breakfast section found.';
                    const extractedLunch = lunchMatch ? lunchMatch[1].trim() : 'No lunch section found.';
                    const extractedDinner = dinnerMatch ? dinnerMatch[1].trim() : 'No dinner section found.';
                    
                    setDietPlan(generatedPlan);
                    navigation.navigate('DietInformation', { 
                        shoppingList: extractedShoppingList,
                        breakfast: extractedBreakfast, 
                        lunch: extractedLunch, 
                        dinner: extractedDinner 
                    });
                } else {
                    throw new Error('No response from AI model');
                }
            } catch (apiError) {
                console.error('API Error details:', apiError);
                Alert.alert('API Error', `${apiError.message || 'Unknown API error'}\n\nPlease check:\n1. Internet connection\n2. API key is valid\n3. Gemini API is enabled`);
                setLoading(false);
            }
        } catch (error) {
            console.error('Outer Error:', error);
            setLoading(false);
        }
    };
    


    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.header}>Personalized Diet Plans</Text>

            <Text style={styles.label}>Dietary Preference</Text>


            <RNPickerSelect
                selectedValue={dietaryPreference}
                onValueChange={(itemValue) => setDietaryPreference(itemValue)}
                style={styles.input}
                placeholder={{ label: "Select", value: "" }}
                items={[
                    { label: "Vegetarian", value: "Vegetarian" },
                    { label: "Non-Vegetarian", value: "Non-Vegetarian" },
                    
                ]}
            />

            <Text style={styles.label}>Disease</Text>
            <RNPickerSelect
                selectedValue={disease}
                onValueChange={(itemValue) => setDisease(itemValue)}
                style={styles.input}
                placeholder={{ label: "Select", value: "" }}
                items={[
                    { label: "Parkinson's", value: "parkinsons" },
                    { label: "Alzheimer's", value: "alzheimers" },
                    { label: "Brain Stroke", value: "brain_stroke" },
                    { label: "None", value: "none" },
                    
                ]}
            />

           

            <Text style={styles.label}>Allergies (Optional)</Text>
            <TextInput
                style={styles.input}
                placeholder="Enter allergies (e.g., nuts, gluten)"
                value={allergies}
                onChangeText={setAllergies}
            />

            <Text style={styles.label}>Dietary Restrictions (Optional)</Text>
            <TextInput
                style={styles.input}
                placeholder="Enter restrictions (e.g., low sugar, low salt)"
                value={restrictions}
                onChangeText={setRestrictions}
            />

            {/* <Button title="Get Personalized Diet Plan" onPress={handleSubmit}   /> */}
            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                <Text style={styles.buttonText}>Get Diet Plan</Text>
            </TouchableOpacity>

            {/* Show Loader when loading */}
            {loading ? (
                <View style={styles.loaderContainer}>
                    <ActivityIndicator size="large" color="#1E90FF" />
                    <Text>Generating your diet plan...</Text>
                </View>
            ) : null}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 10,
        backgroundColor: '#F5F5F5',
        justifyContent: 'center',
    },
    header: {
        fontSize: 24,
        marginBottom: 40,
        textAlign: 'center',
        fontWeight: 'bold',
    },
    label: {
        fontWeight: 'bold',
        fontSize: 18,
        marginBottom: 10,
        color: '#333',
    },
    input: {
        height: 40,
        borderColor: '#1E90FF', // Blue border color
        borderWidth: 2,
        borderRadius: 8,
        marginBottom: 30,
        paddingHorizontal: 10,
        width: '100%',
        backgroundColor: '#f0f8ff',
    },
    dietPlanContainer: {
        marginTop: 30,
        padding: 20,
        borderColor: '#1E90FF',
        borderWidth: 2,
        borderRadius: 8,
        backgroundColor: '#f0f8ff',
        width: '100%',
    },
    dietPlanTitle: {
        fontSize: 20,
        marginBottom: 10,
        textAlign: 'center',
        fontWeight: 'bold',
    },
    button: {
        width: '100%',
        height: 50,
        backgroundColor: '#007BFF',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        marginBottom: 20,
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: 'bold',
    },
    loaderContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
