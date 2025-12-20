import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useRoute } from '@react-navigation/native';

const ParkRecom = ({ navigation }) => {
  const route = useRoute();
  const { detectionResult } = route.params;

  const renderHealthyRecommendations = () => (
    <ScrollView style={styles.container}>
      <Text style={styles.heading}>Ways to Prevent Parkinson's Disease</Text>
      <View style={styles.recommendationContainer}>
        <Text style={styles.recommendationTitle}>1. Go Organic (and Local)</Text>
        <Text style={styles.recommendationText}>
          Pesticides and herbicides have been heavily implicated in causing Parkinson’s. Opt for organic and locally sourced foods to reduce exposure.
        </Text>
        <Text style={styles.recommendationTitle}>2. Eat Fresh, Raw Vegetables</Text>
        <Text style={styles.recommendationText}>
          Increased folic acid from vegetables can reduce the risk of Parkinson’s. Incorporate dark green veggies and legumes into your diet.
        </Text>
        <Text style={styles.recommendationTitle}>3. Incorporate Omega-3 Fatty Acids Into Your Diet</Text>
        <Text style={styles.recommendationText}>
          Omega-3s have anti-inflammatory properties and may prevent cell degeneration. Include wild-caught fish, pastured eggs, and walnuts in your diet.
        </Text>
        <Text style={styles.recommendationTitle}>4. Vitamin D3</Text>
        <Text style={styles.recommendationText}>
          Vitamin D is essential for calcium absorption and overall health. Obtain it from sunlight and animal fats or consider supplementation.
        </Text>
        <Text style={styles.recommendationTitle}>5. Green Tea</Text>
        <Text style={styles.recommendationText}>
          Green tea's antioxidants may protect the brain and sustain dopamine levels. Choose high-quality green tea.
        </Text>
        <Text style={styles.recommendationTitle}>6. Regular Aerobic Exercise</Text>
        <Text style={styles.recommendationText}>
          Exercise helps counteract inflammation and supports overall health. Aim for regular, moderate to vigorous physical activity.
        </Text>
        <Text style={styles.recommendationTitle}>7. CoQ10</Text>
        <Text style={styles.recommendationText}>
          CoQ10 is crucial for cellular energy and may slow Parkinson’s progression. Consume organ meats or consider supplements.
        </Text>
      </View>
    </ScrollView>
  );

  const renderParkinsonRecommendations = () => (
    <ScrollView style={styles.container}>
      <Text style={styles.heading}>Ways to Prevent Parkinson's Disease Progression</Text>
      <View style={styles.recommendationContainer}>
        <Text style={styles.recommendationTitle}>1. Healthy Eating and Regular Exercise</Text>
        <Text style={styles.recommendationText}>
          A balanced diet and regular exercise can slow Parkinson’s progression. Focus on a whole-food, plant-based diet and at least 2.5 hours of exercise per week.
        </Text>
        <Text style={styles.recommendationTitle}>2. Explore Therapy Advances</Text>
        <Text style={styles.recommendationText}>
          Consider therapies like rasagiline, levodopa, and deep brain stimulation. Consult your neurologist for personalized treatment options.
        </Text>
        <Text style={styles.recommendationTitle}>3. Book an Appointment with a Neurologist</Text>
        <Text style={styles.recommendationText}>
          For further evaluation and personalized treatment plans, book an appointment with a neurologist using the NeuroCare webapp.
        </Text>
        <Text style={styles.recommendationTitle}>4. Personalized diet and exercise plans</Text>
        <Text style={styles.recommendationText}>
        Get personalized diet and exercise plans for Parkinson's Disease.
        </Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('LifestylePlans')}
        >
          <Text style={styles.buttonText}>Get Personalized Diet and Exercise Plans</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );

  return detectionResult === 'healthy' ? renderHealthyRecommendations() : renderParkinsonRecommendations();
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  recommendationContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    width: '100%',
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
  },
  recommendationTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  recommendationText: {
    fontSize: 16,
    color: '#555',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 5,
    marginTop: 20,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ParkRecom;