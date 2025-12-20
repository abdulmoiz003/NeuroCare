import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const SavedDietPlans = () => {
  const [email, setEmail] = useState('');
  const [dietPlans, setDietPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Function to retrieve email from AsyncStorage
  const getEmail = async () => {
    try {
      const storedEmail = await AsyncStorage.getItem('patientEmail');
      if (storedEmail) {
        setEmail(storedEmail);
      }
    } catch (e) {
      console.log('Failed to load email.');
    }
  };

  // Fetch diet plans from the backend based on email
  const fetchDietPlans = async (email) => {
    try {
      const response = await axios.get(`http://10.0.2.2:5000/get-diet-plans/${email}`);
      setDietPlans(response.data);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch diet plans');
      setLoading(false);
    }
  };

  useEffect(() => {
    getEmail().then(() => {
      if (email) {
        fetchDietPlans(email);
      }
    });
  }, [email]);

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#007bff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  // Render each diet plan with numbering
  const renderDietPlan = ({ item, index }) => (
    <View style={styles.card}>
      <Text style={styles.heading}>Diet Plan #{index + 1}</Text>
      {/* <View style={styles.detailsContainer}>
        <Text style={styles.label}>Email:</Text>
        <Text style={styles.value}>{item.email}</Text>
      </View> */}
      <View style={styles.detailsContainer}>
        <Text style={styles.label}>Shopping List:</Text>
        <Text style={styles.value}>{item.shoppingList}</Text>
      </View>
      <View style={styles.detailsContainer}>
        <Text style={styles.label}>Breakfast:</Text>
        <Text style={styles.value}>{item.breakfast}</Text>
      </View>
      <View style={styles.detailsContainer}>
        <Text style={styles.label}>Lunch:</Text>
        <Text style={styles.value}>{item.lunch}</Text>
      </View>
      <View style={styles.detailsContainer}>
        <Text style={styles.label}>Dinner:</Text>
        <Text style={styles.value}>{item.dinner}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={dietPlans}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderDietPlan}
        ListEmptyComponent={<Text style={styles.errorText}>No diet plans found.</Text>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#F5F5F5',
  },
  card: {
    backgroundColor: '#f0f8ff',
    padding: 20,
    borderRadius: 12,
    marginVertical: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
    borderWidth: 1,
    borderColor: '#1E90FF',
  },
  heading: {
    fontSize: 25,
    fontWeight: '600',
    marginBottom: 10,
    color: '#333',
  },
  detailsContainer: {
    marginBottom: 10,
  },
  label: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#555',
  },
  value: {
    fontSize: 16,
    color: '#333',
    marginBottom: 5,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 16,
    color: 'red',
  },
});

export default SavedDietPlans;
