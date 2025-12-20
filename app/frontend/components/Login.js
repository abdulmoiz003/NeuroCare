import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginPage = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    try {
      if (!email || !password) {
        Alert.alert("Error", "Please enter both email and password");
        return;
      }

      const response = await axios.post("http://10.0.2.2:5000/login", { email, password });
      console.log('Server response:', response.data);

      if (response.data.message === "Success") {
        await AsyncStorage.setItem("patientEmail", email);
        await AsyncStorage.setItem("userId", response.data.userId);
        setEmail(''); // Clear the email field
        setPassword(''); // Clear the password field
        Alert.alert("Success", "Login successful! Welcome back.");
        navigation.navigate("BottomTabs");
      } else {
        Alert.alert("Error", response.data.message || "Login failed. Please check your credentials.");
      }
    } catch (error) {
      console.error('Login error:', error.response?.data || error.message);
      if (error.response?.status === 404) {
        Alert.alert("Error", "Account not found. Please check your email.");
      } else if (error.response?.status === 401) {
        Alert.alert("Error", "Incorrect password. Please try again.");
      } else {
        Alert.alert("Error", "Connection error. Please check your internet connection.");
      }
      setError(error.response?.data?.message || "An error occurred. Please try again.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Login</Text>
      {error ? <Text style={styles.error}>{error}</Text> : null}

      <TextInput
        style={styles.input}
        placeholder="Email"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
      <Text style={styles.link}>
        Don't have an account?{' '}
        <Text style={{ color: '#007BFF',
    fontSize: 16,
    fontWeight: 'bold', }}>Signup</Text>
      </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#F5F5F5',
  },
  heading: {
    fontSize: 36,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 15,
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
  link: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  error: {
    color: 'red',
    fontSize: 16,
    marginBottom: 10,
  },
});

export default LoginPage;
