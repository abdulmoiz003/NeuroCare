import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useRoute } from '@react-navigation/native';

const AlzRecom = ({ navigation }) => {
  const route = useRoute();
  const { detectionResult } = route.params;
  const [condition, setCondition] = useState('');
  useEffect(()=> {
    if (detectionResult === "Non Demented"){
        setCondition("Healthy");
    }
    else{
        setCondition("Alzheimer");
    }
  }, []);

  const renderHealthyRecommendations = () => (
    <ScrollView style={styles.container}>
      <Text style={styles.heading}>Ways to Prevent Alzheimer's Disease</Text>
      <View style={styles.recommendationContainer}>
        <Text style={styles.recommendationTitle}>1. Flex Your Brainpower</Text>
        <Text style={styles.recommendationText}>
        Keep your brain active by engaging in cognitive activities. Playing memory and reasoning games can help maintain cognitive function and delay Alzheimer's disease.
        </Text>
        <Text style={styles.recommendationTitle}>2. Speak a Second Language</Text>
        <Text style={styles.recommendationText}>
        Learning a new language can boost cognitive skills and delay the onset of Alzheimer's disease. Even in later life, picking up a new language can help build brain resiliency.
        </Text>
        <Text style={styles.recommendationTitle}>3. Eat Like a Mediterranean</Text>
        <Text style={styles.recommendationText}>
        Adopting a Mediterranean or DASH diet, which emphasizes fruits, vegetables, whole grains, and fish, may reduce the risk of Alzhiemer's disease. Consult with your physician to determine the best diet for you.
        </Text>
        <Text style={styles.recommendationTitle}>4. Wear a Seat Belt</Text>
        <Text style={styles.recommendationText}>
        Protect your brain by wearing a seat belt and minimizing fall risks. Head injuries significantly increase the risk of developing Alzheimer's later in life.
        </Text>
        <Text style={styles.recommendationTitle}>5. Sap Your Stress</Text>
        <Text style={styles.recommendationText}>
        Manage stress through practices like deep breathing, meditation, or journaling. Reducing stress helps protect your cognitive health.
        </Text>
        <Text style={styles.recommendationTitle}>6. Don’t Smoke</Text>
        <Text style={styles.recommendationText}>
        Smoking is linked to an increased risk of Alzheimer's disease. Quitting smoking can significantly reduce this risk.
        </Text>
        <Text style={styles.recommendationTitle}>7. Watch Your Blood Pressure</Text>
        <Text style={styles.recommendationText}>
        Maintaining healthy blood pressure supports brain health. Work with your physician to monitor and manage your blood pressure.
        </Text>
      </View>
    </ScrollView>
  );

  const renderAlzRecommendations = () => (
    <ScrollView style={styles.container}>
      <Text style={styles.heading}>Ways to Prevent Alzheimer's Disease Progression</Text>
      <View style={styles.recommendationContainer}>
        <Text style={styles.recommendationTitle}>1. Regular Exercise</Text>
        <Text style={styles.recommendationText}>
        Engaging in at least 150 minutes of moderate-intensity exercise weekly can reduce the risk of Alzheimer’s disease progression. Combine cardio, strength training, and balance exercises to protect brain health and prevent falls.
        </Text>
        <Text style={styles.recommendationTitle}>2. Mental Stimulation</Text>
        <Text style={styles.recommendationText}>
        Continuously challenging your brain with new activities, learning, and memory exercises can help delay the onset of Alzheimer's disease. Engaging in complex and interactive tasks is particularly beneficial.
        </Text>
        <Text style={styles.recommendationTitle}>3. Book an Appointment with a Neurologist</Text>
        <Text style={styles.recommendationText}>
          For further evaluation and personalized treatment plans, book an appointment with a neurologist using the NeuroCare webapp.
        </Text>
        <Text style={styles.recommendationTitle}>4. Personalized diet and exercise plans</Text>
        <Text style={styles.recommendationText}>
        Get personalized diet and exercise plans for Alzheimer's Disease.
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

  return condition === 'Healthy' ? renderHealthyRecommendations() : renderAlzRecommendations();
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

export default AlzRecom;