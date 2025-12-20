import React from 'react';
import { View, Text, Linking, TouchableOpacity, ScrollView, StyleSheet, Button, Alert } from 'react-native';
import Clipboard from '@react-native-clipboard/clipboard';

const StrokeExercises = () => {
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
        <Text style={styles.heading}>Exercise 1: Stroke Recovery Exercise</Text>
        
        <Text style={styles.link} onPress={() => openLink('https://youtu.be/PuBpM-bzmfc')}>
        https://youtu.be/PuBpM-bzmfc
        </Text>
        
        <TouchableOpacity onPress={() => copyToClipboard('https://youtu.be/PuBpM-bzmfc')} style={styles.copyButton}>
          <Text style={styles.copyButtonText}>Copy Link</Text>
        </TouchableOpacity>

        <View style={styles.stepsContainer}>
          <Text style={styles.subHeading}>Steps:</Text>
          <Text style={styles.stepText}>1. While seated or lying down, flex and point your foot to promote circulation and reduce stiffness.</Text>
          <Text style={styles.stepText}>2. Sit on a chair and slowly extend one leg at a time to strengthen thigh muscles.</Text>
          <Text style={styles.stepText}>3. While standing or seated, lift each knee as high as comfortable, simulating a marching movement.</Text>
          <Text style={styles.stepText}>4. Lift your leg to the side while standing, supporting yourself if necessary, to improve balance and hip strength.</Text>
        </View>
      </View>

      {/* Exercise 2 */}
      <View style={styles.card}>
        <Text style={styles.heading}>Exercise 2: Walking Exercise</Text>
        
        <Text style={styles.link} onPress={() => openLink('https://youtu.be/iD0gT8eFW6c')}>
        https://youtu.be/iD0gT8eFW6c
        </Text>

        <TouchableOpacity onPress={() => copyToClipboard('https://youtu.be/iD0gT8eFW6c')} style={styles.copyButton}>
          <Text style={styles.copyButtonText}>Copy Link</Text>
        </TouchableOpacity>

        <View style={styles.stepsContainer}>
          <Text style={styles.subHeading}>Steps:</Text>
          <Text style={styles.stepText}>1. tand behind a chair, hold the back for support, and raise your heels so you're standing on your toes. Slowly lower back down. Repeat 10 times.</Text>
          <Text style={styles.stepText}>2. Hold onto a chair for balance and slowly lift one knee as high as possible, then lower it and alternate with the other leg.</Text>
          <Text style={styles.stepText}>3. Hold onto a stable surface, swing one leg out to the side and bring it back. Switch legs after 10 repetitions.</Text>
          <Text style={styles.stepText}>4. While seated, extend one leg straight out and slowly lower it. Repeat with the other leg.</Text>
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

export default StrokeExercises;
