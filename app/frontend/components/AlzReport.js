import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Alert, TouchableOpacity } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ParkReport = ({ route }) => {
  const { detectionResult } = route.params;
  const [patientDetails, setPatientDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [condition, setCondition] = useState(true);

  useEffect(() => {
    const fetchPatientDetails = async () => {
      try {
        const email = await AsyncStorage.getItem('patientEmail');
        if (email) {
          const response = await axios.get(`http://10.0.2.2:5000/patient/${email}`);
          setPatientDetails(response.data);
        } else {
          Alert.alert('Error', 'No email found in storage');
        }
      } catch (error) {
        console.error('Error fetching patient details:', error);
        Alert.alert('Error', 'Failed to fetch patient details');
      } finally {
        setLoading(false);
      }
    };

    fetchPatientDetails();
  }, []);

  useEffect(()=> {
    if (detectionResult === "Non Demented"){
        setCondition("Healthy");
    }
    else{
        setCondition("Alzheimer");
    }
  }, []);

  const saveReport = async () => {
    try {
      const email = await AsyncStorage.getItem('patientEmail');
      if (email && patientDetails) {
        const response = await axios.post('http://10.0.2.2:5000/saveAlzReport', {
          patientName: patientDetails.name,
          patientAge: patientDetails.age,
          patientGender: patientDetails.gender,
          disease: "Alzheimer",
          detectionResult,
          condition,
          email
        });

        if (response.status === 201) {
          Alert.alert('Success', 'Report saved successfully!');
        } else {
          Alert.alert('Error', 'Failed to save the report');
        }
      } else {
        Alert.alert('Error', 'No email or patient details found');
      }
    } catch (error) {
      console.error('Error saving report:', error);
      Alert.alert('Error', 'Failed to save the report');
    }
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#007bff" style={styles.loader} />;
  }

  if (!patientDetails) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Failed to load patient details.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Alzheimer's Disease Detection Report</Text>
      <View style={styles.reportContainer}>
        <View style={styles.reportItem}>
          <Text style={styles.label}>Name:</Text>
          <Text style={styles.value}>{patientDetails.name}</Text>
        </View>
        <View style={styles.reportItem}>
          <Text style={styles.label}>Age:</Text>
          <Text style={styles.value}>{patientDetails.age}</Text>
        </View>
        <View style={styles.reportItem}>
          <Text style={styles.label}>Gender:</Text>
          <Text style={styles.value}>{patientDetails.gender}</Text>
        </View>
        <View style={styles.reportItem}>
          <Text style={styles.label}>Disease:</Text>
          <Text style={styles.value}>Alzheimer</Text>
        </View>
        <View style={styles.reportItem}>
          <Text style={styles.label}>Detection Result:</Text>
          <Text style={styles.value}>
            {detectionResult}
          </Text>
        </View>
        <View style={styles.reportItem}>
          <Text style={styles.label}>Condition:</Text>
          <Text style={[styles.value, condition === 'Healthy' ? styles.negativeResult : styles.positiveResult]}>
            {condition}
          </Text>
        </View>
        <View style={styles.reportItem}>
          <Text style={styles.label}>Email:</Text>
          <Text style={styles.value}>{patientDetails.email}</Text>
        </View>
        <TouchableOpacity style={styles.saveButton} onPress={saveReport}>
          <Text style={styles.saveButtonText}>Save Report</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
    alignItems: 'center',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  reportContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    width: '100%',
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
  },
  reportItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  value: {
    fontSize: 16,
    color: '#555',
  },
  positiveResult: {
    color: '#d9534f',
  },
  negativeResult: {
    color: '#5cb85c',
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
  },
  errorText: {
    fontSize: 18,
    color: '#d9534f',
    textAlign: 'center',
  },
  saveButton: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 5,
    marginTop: 20,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ParkReport;