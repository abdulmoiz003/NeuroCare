import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, ActivityIndicator, Alert, TouchableOpacity } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const StrokeResult = ({ route }) => {
  const { detectionResult } = route.params;
  const [patientDetails, setPatientDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

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

  const saveReport = async () => {
    try {
      const email = await AsyncStorage.getItem('patientEmail');
      if (email && patientDetails) {
        const response = await axios.post('http://10.0.2.2:5000/saveStrokeReport', {
          patientName: patientDetails.name,
          patientAge: patientDetails.age,
          patientGender: patientDetails.gender,
          disease: "Brain Stroke",
          detectionResult,
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
      <Text style={styles.heading}>Brain Stroke Prediction Report</Text>
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
          <Text style={styles.value}>Brain Stroke</Text>
        </View>
        <View style={styles.reportItem}>
          <Text style={styles.label}>Prediction Result:</Text>
          <Text style={[styles.value, detectionResult === 'brain stroke positive' ? styles.positiveResult : styles.negativeResult]}>
            {detectionResult}
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
      <TouchableOpacity
              style={styles.imageButton}
              onPress={() => navigation.navigate('StrokeRecom', { detectionResult })}
            >
              <Image
                source={require('../assets/recommendation-icon.png')}
                style={styles.iconImage}
              />
              <Text style={styles.imageButtonText}>View Recommendations</Text>
       </TouchableOpacity>
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
  imageButton: {
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 10,
    marginHorizontal: 5,
    width: 150,
    borderWidth: 2,
    borderColor: '#007bff',
    marginTop: 80,
  },
  iconImage: {
    width: 100,
    height: 100,
    marginBottom: 10,
  },
  imageButtonText: {
    color: '#007bff',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default StrokeResult;