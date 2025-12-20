import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

const HomePage = ({ navigation }) => {
  return (
    <View style={styles.container}>
      {/* NeuroCare Logo */}
      <Image
        source={require('../assets/neurocare-logo.png')}  // Ensure your logo is in the assets folder
        style={styles.logo}
      />

      {/* Title */}
      <Text style={styles.title}>NeuroCare</Text>

      {/* Signup and Login Buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('SignUp')}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Login')}>
          <Text style={styles.buttonText}>Log In</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
  },
  logo: {
    width: 230,
    height: 230,
    marginBottom: 10,  // Reduced margin between logo and title
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 80,  // Margin between title and buttons
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',  // Center-align the buttons
  },
  button: {
    width: '70%',
    height: 50,  // Increased height
    backgroundColor: '#007BFF',  // Blue color
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,  // Space between buttons
    borderRadius: 10,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default HomePage;