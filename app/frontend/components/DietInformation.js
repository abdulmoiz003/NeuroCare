import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const DietInformation = ({ route }) => {
    const { shoppingList, breakfast, lunch, dinner } = route.params;
    const [loading, setLoading] = useState(false);

    // Helper function to render text and bold sections between **
    const renderFormattedText = (text) => {
        const parts = text.split(/(\*\*[^*]+\*\*)/);

        return parts.map((part, index) => {
            if (part.startsWith('*') && part.endsWith('*')) {
                const boldText = part.slice(2, -2);
                return (
                    <Text key={index} style={styles.boldText}>
                        {boldText}
                    </Text>
                );
            }
            return <Text key={index}>{part}</Text>;
        });
    };

    // Function to save diet plan to MongoDB via backend API
    const saveDietPlan = async () => {
        setLoading(true);

        try {
            const email = await AsyncStorage.getItem('patientEmail');
            const response = await axios.post('http://10.0.2.2:5000/save-diet-plan', {
                email,
                shoppingList,
                breakfast,
                lunch,
                dinner,
            });
            
            setLoading(false);
            Alert.alert('Success', 'Diet plan saved successfully!');
        } catch (error) {
            setLoading(false);
            Alert.alert('Error', 'Failed to save diet plan.');
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            {/* Shopping List */}
            <View style={styles.dietPlanContainer}>
                <Text style={styles.dietPlanTitle}>Shopping List:</Text>
                <Text style={styles.textContent}>{renderFormattedText(shoppingList)}</Text>
            </View>

            {/* Breakfast */}
            <View style={styles.dietPlanContainer}>
                <Text style={styles.dietPlanTitle}>Breakfast:</Text>
                <Text style={styles.textContent}>{renderFormattedText(breakfast)}</Text>
            </View>

            {/* Lunch */}
            <View style={styles.dietPlanContainer}>
                <Text style={styles.dietPlanTitle}>Lunch:</Text>
                <Text style={styles.textContent}>{renderFormattedText(lunch)}</Text>
            </View>

            {/* Dinner */}
            <View style={styles.dietPlanContainer}>
                <Text style={styles.dietPlanTitle}>Dinner:</Text>
                <Text style={styles.textContent}>{renderFormattedText(dinner)}</Text>
            </View>

            {/* Save Diet Plan Button */}
            <TouchableOpacity style={styles.saveButton} onPress={saveDietPlan} disabled={loading}>
                <Text style={styles.saveButtonText}>Save Diet Plan</Text>
            </TouchableOpacity>

            {/* Loading Indicator */}
            {loading && <ActivityIndicator size="large" color="#0000ff" />}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 20,
        backgroundColor: '#F5F5F5',
        justifyContent: 'center',
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
        textAlign: 'center',
        fontWeight: 'bold',
    },
    textContent: {
        fontSize: 16,
        lineHeight: 24,
        color: '#333',
        textAlign: 'justify',
    },
    boldText: {
        fontWeight: 'bold',
        fontSize: 20,
    },
    saveButton: {
        backgroundColor: '#1E90FF',
        paddingVertical: 12,
        borderRadius: 8,
        marginTop: 20,
    },
    saveButtonText: {
        color: '#fff',
        fontSize: 16,
        textAlign: 'center',
        fontWeight: 'bold',
    },
});

export default DietInformation;
