import React from 'react';
import { View, Text, Linking, TouchableOpacity, ScrollView, StyleSheet, Button, Alert } from 'react-native';
import Clipboard from '@react-native-clipboard/clipboard';

const ParkinsonExercises = () => {
  // Function to open YouTube links
  const openLink = (url) => {
    Linking.openURL(url).catch(err => console.error("Couldn't load page", err));
  };

  // Function to copy the link to clipboard and show alert
  const copyToClipboard = (url) => {
    Clipboard.setString(url);
    Alert.alert('Link Copied', 'The link has been copied to your clipboard.');
  };

  return (
    <ScrollView style={styles.container}>
      {/* Exercise 1 */}
      <View style={styles.card}>
        <Text style={styles.heading}>Exercise 1: Neck and Shoulder Stretches</Text>
        
        <Text style={styles.link} onPress={() => openLink('https://youtu.be/effXAxgxXb0')}>
          https://youtu.be/effXAxgxXb0
        </Text>
        
        <TouchableOpacity onPress={() => copyToClipboard('https://youtu.be/effXAxgxXb0')} style={styles.copyButton}>
          <Text style={styles.copyButtonText}>Copy Link</Text>
        </TouchableOpacity>

        <View style={styles.stepsContainer}>
          <Text style={styles.subHeading}>Steps:</Text>
          <Text style={styles.stepTitle}>Chin tuck:</Text>
          <Text style={styles.stepText}>1. Sit up as tall as you can and bring your head back over your shoulders.</Text>
          <Text style={styles.stepText}>2. Make sure you don't go down or up, just straight back.</Text>
          <Text style={styles.stepText}>3. Hold for a two or three second count. Do two sets of ten repetitions.</Text>

          <Text style={styles.stepTitle}>Shoulder blades back and down:</Text>
          <Text style={styles.stepText}>1. Bend your elbows and squeeze your shoulder blades together.</Text>
          <Text style={styles.stepText}>2. Put your shoulder blades down into your back pocket.</Text>
          <Text style={styles.stepText}>3. Hold for a five-second count. Let it relax. Do two sets of ten repetitions.</Text>

          <Text style={styles.stepTitle}>Thoracic spine opener:</Text>
          <Text style={styles.stepText}>1. Sit on a chair with a low back. Put your hands up over your head.</Text>
          <Text style={styles.stepText}>2. Take a deep breath in. As you exhale, try to open up your chest over the back of the chair.</Text>
          <Text style={styles.stepText}>3. Hold for a five-second count. Return to neutral. Do two sets of ten repetitions.</Text>
        </View>
      </View>

      {/* Exercise 2 */}
      <View style={styles.card}>
        <Text style={styles.heading}>Exercise 2: Ball Toss Coordination</Text>
        
        <Text style={styles.link} onPress={() => openLink('https://youtu.be/VvZnP_njKpI')}>
          https://youtu.be/VvZnP_njKpI
        </Text>

        <TouchableOpacity onPress={() => copyToClipboard('https://youtu.be/VvZnP_njKpI')} style={styles.copyButton}>
          <Text style={styles.copyButtonText}>Copy Link</Text>
        </TouchableOpacity>

        <View style={styles.stepsContainer}>
          <Text style={styles.subHeading}>Steps:</Text>
          <Text style={styles.stepText}>1. Get a ball. A brain ball, a regular ball, or even a pair of rolled-up socks will work.</Text>
          <Text style={styles.stepText}>2. Stand or sit in a comfortable position.</Text>
          <Text style={styles.stepText}>3. Toss the ball from side to side. Catch the ball with both hands.</Text>
          <Text style={styles.stepText}>4. Repeat for one minute.</Text>
        </View>
      </View>
      <Text></Text>
    </ScrollView>
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
    borderRadius: 10,
    marginVertical: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    borderColor: '#1E90FF',
    borderWidth: 2,
    borderRadius: 8,
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  link: {
    fontSize: 16,
    color: '#1e90ff',
    textDecorationLine: 'underline',
    marginBottom: 10,
  },
  copyButton: {
    backgroundColor: '#007BFF',
    // backgroundColor: '#4CAF50',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
    marginBottom: 20,
  },
  copyButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: '600',
  },
  stepsContainer: {
    marginTop: 10,
  },
  subHeading: {
    fontSize: 18,
    fontWeight: '600',
    color: '#555',
    marginBottom: 5,
  },
  stepTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#444',
    marginTop: 10,
  },
  stepText: {
    fontSize: 16,
    color: '#333',
    lineHeight: 22,
    marginBottom: 5,
  },
});

export default ParkinsonExercises;
