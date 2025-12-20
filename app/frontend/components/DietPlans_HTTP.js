import React, { useState } from 'react';
import { View, Text, TextInput, ScrollView, StyleSheet, Alert, ActivityIndicator, TouchableOpacity } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

export default function DietPlanForm() {
    const [dietaryPreference, setDietaryPreference] = useState('');
    const [allergies, setAllergies] = useState('');
    const [restrictions, setRestrictions] = useState('');
    const [disease, setDisease] = useState('');
    const [dietPlan, setDietPlan] = useState('');
    const [loading, setLoading] = useState(false);

    const API_KEY = "AIzaSyD1UppV7F7gfpxLc3N_YOp95Yp2xCKhzdw";

    const navigation = useNavigation(); 

    const handleSubmit = async () => {
        if (!dietaryPreference || !disease) {
            Alert.alert('Validation Error', 'Please select both Dietary Preference and Disease before proceeding.');
            return;
        }
        
        setLoading(true);
        try {
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

            // Using direct HTTP API call
            const response = await axios.post(
                `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${API_KEY}`,
                {
                    contents: [{
                        parts: [{
                            text: prompt
                        }]
                    }]
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    timeout: 60000 // 60 seconds timeout
                }
            );

            if (response.data && response.data.candidates && response.data.candidates[0]) {
                const generatedPlan = response.data.candidates[0].content.parts[0].text;
                
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
                setLoading(false);
                navigation.navigate('DietInformation', { 
                    shoppingList: extractedShoppingList,
                    breakfast: extractedBreakfast, 
                    lunch: extractedLunch, 
                    dinner: extractedDinner 
                });
            } else {
                throw new Error('No response from AI model');
            }
        } catch (error) {
            console.error('Error:', error.response || error);
            setLoading(false);
            Alert.alert('Error', `Failed to generate diet plan: ${error.message}\n\n${error.response?.data?.error?.message || 'Please check your internet connection and API key.'}`);
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

            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                <Text style={styles.buttonText}>Get Diet Plan</Text>
            </TouchableOpacity>

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
        borderColor: '#1E90FF',
        borderWidth: 2,
        borderRadius: 8,
        marginBottom: 30,
        paddingHorizontal: 10,
        width: '100%',
        backgroundColor: '#f0f8ff',
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
