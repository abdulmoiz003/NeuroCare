import React from 'react';
import { View, Text, ScrollView, Image, StyleSheet } from 'react-native';

const About = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={require('../assets/neurocare-logo.png')} style={styles.logo} />
      <Text style={styles.heading}>About NeuroCare</Text>
      <Text style={styles.paragraph}>
        NeuroCare is a comprehensive software platform dedicated to transforming neurological health management. 
        It seamlessly integrates functionalities for patients, neurologists, and administrators. 
        From user registration to advanced disease detection using machine learning, NeuroCare offers precise 
        identification and timely recommendations for conditions like Parkinson's and Alzheimer's. 
        The platform also provides predictive analysis for Brain Stroke, virtual medical consultations with secure payments, 
        and personalized diet and exercise plans to enhance patient engagement. Additionally, NeuroCare leverages 
        statistical analysis to continuously improve and evaluate its effectiveness.
      </Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#F5F5F5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#007bff',
    marginBottom: 20,
    textAlign: 'center',
  },
  paragraph: {
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'justify',
    color: '#333',
    marginBottom: 20,
    width: '100%', // Ensure paragraph spans the width
  },
});

export default About;