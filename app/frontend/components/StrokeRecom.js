import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { useRoute } from '@react-navigation/native';

const StrokeRecom = ({ navigation }) => {
  const route = useRoute();
  const { detectionResult } = route.params;
  const [condition, setCondition] = useState('');
  useEffect(()=> {
    if (detectionResult === "brain stroke negative"){
        setCondition("Healthy");
    }
    else{
        setCondition("Stroke");
    }
  }, []);

  const renderHealthyRecommendations = () => (
    <ScrollView style={styles.container}>
      <Text style={styles.heading}>Ways to Prevent Brain Stroke</Text>
      <View style={styles.recommendationContainer}>
        <Text style={styles.recommendationTitle}>1. Manage Blood Pressure</Text>
        <Text style={styles.recommendationText}>
        High blood pressure is a major risk factor. Regular checkups and medication can help control it.
        </Text>
        <Text style={styles.recommendationTitle}>2. Control Cholesterol</Text>
        <Text style={styles.recommendationText}>
        Elevated cholesterol can lead to atherosclerosis, a condition that narrows arteries. A healthy diet and medication can help.
        </Text>
        <Text style={styles.recommendationTitle}>3. Quit Smoking:

</Text>
        <Text style={styles.recommendationText}>
        Smoking damages blood vessels, increasing the risk of stroke.
        </Text>
        <Text style={styles.recommendationTitle}>4. Maintain a Healthy Weight</Text>
        <Text style={styles.recommendationText}>
        Obesity is linked to high blood pressure, cholesterol, and diabetes, all of which increase stroke risk.
        </Text>
        <Text style={styles.recommendationTitle}>5. Eat a Balanced Diet</Text>
        <Text style={styles.recommendationText}>
        Focus on fruits, vegetables, whole grains, lean proteins, and healthy fats. Limit saturated and trans fats, sodium, and added sugars. 
        </Text>
        <Text style={styles.recommendationTitle}>6. Regular Exercise</Text>
        <Text style={styles.recommendationText}>
        Aim for at least 30 minutes of moderate-intensity exercise most days of the week.
        </Text>
        <Text style={styles.recommendationTitle}>7. Limit Alcohol</Text>
        <Text style={styles.recommendationText}>
        Excessive alcohol consumption can raise blood pressure and increase stroke risk.
        </Text>
      </View>
    </ScrollView>
  );

  const renderStrokeRecommendations = () => (
    <ScrollView style={styles.container}>
      <Text style={styles.heading}>Ways to Prevent Brain Stroke Progression</Text>
      <View style={styles.recommendationContainer}>
        <Text style={styles.recommendationTitle}>1. Manage Underlying Conditions</Text>
        <Text style={styles.recommendationText}>
        Continue to control conditions like high blood pressure, diabetes, and atrial fibrillation.
        </Text>
        <Text style={styles.recommendationTitle}>2. Rehabilitation</Text>
        <Text style={styles.recommendationText}>
        Participate actively in physical, occupational, and speech therapy to regain lost functions and prevent complications.
        </Text>
        <Text style={styles.recommendationTitle}>3. Book an Appointment with a Neurologist</Text>
        <Text style={styles.recommendationText}>
          For further evaluation and personalized treatment plans, book an appointment with a neurologist using the NeuroCare webapp.
        </Text>
        <Text style={styles.recommendationTitle}>4. Personalized diet and exercise plans</Text>
        <Text style={styles.recommendationText}>
        Get personalized diet and exercise plans for Brain Stroke.
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

  return condition === 'Healthy' ? renderHealthyRecommendations() : renderStrokeRecommendations();
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

export default StrokeRecom;