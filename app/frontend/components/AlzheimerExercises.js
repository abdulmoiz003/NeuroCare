import React from 'react';
import { View, Text, Linking, TouchableOpacity, ScrollView, StyleSheet, Button, Alert } from 'react-native';
import Clipboard from '@react-native-clipboard/clipboard';

const AlzheimerExercises = () => {
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
        <Text style={styles.heading}>Exercise 1: Body Stretches</Text>
        
        <Text style={styles.link} onPress={() => openLink('https://youtu.be/9nDBY2tH3lI')}>
        https://youtu.be/9nDBY2tH3lI
        </Text>
        
        <TouchableOpacity onPress={() => copyToClipboard('https://youtu.be/9nDBY2tH3lI')} style={styles.copyButton}>
          <Text style={styles.copyButtonText}>Copy Link</Text>
        </TouchableOpacity>

        <View style={styles.stepsContainer}>
          <Text style={styles.subHeading}>Steps:</Text>
          <Text style={styles.stepTitle}>Warm-up (5-10 minutes):</Text>
          <Text style={styles.stepText}>1. Sit on a sturdy chair with your feet flat on the floor.</Text>
          <Text style={styles.stepText}>2. Slowly lift both arms in front of you until they are parallel to the ground.</Text>
          <Text style={styles.stepText}>3. Hold for a second, then gently lower them back to the sides.</Text>
          <Text style={styles.stepText}>4. Repeat this 10 times.</Text>
          <Text style={styles.stepText}>5. Sit tall and slowly tilt your head to one side, bringing your ear toward your shoulder.</Text>
          <Text style={styles.stepText}>6. Hold for 10 seconds, then switch to the other side.</Text>
          <Text style={styles.stepText}>7. Repeat twice on each side.</Text>

          <Text style={styles.stepTitle}>Leg Exercises:</Text>
          <Text style={styles.stepText}>1. Stay seated and straighten one leg, holding it in the air for 3-5 seconds.</Text>
          <Text style={styles.stepText}>2. Lower it back down slowly.</Text>
          <Text style={styles.stepText}>3. Repeat 10 times on each leg.</Text>
          <Text style={styles.stepText}>4. While sitting, lift one foot slightly off the floor.</Text>
          <Text style={styles.stepText}>5. Rotate your ankle in slow circles, 5 times clockwise and 5 times counterclockwise.</Text>
          <Text style={styles.stepText}>6. Switch to the other foot and repeat.</Text>

          <Text style={styles.stepTitle}>Upper Body Stretch:</Text>
          <Text style={styles.stepText}>1. Sitting on the chair, cross your arms over your chest.</Text>
          <Text style={styles.stepText}>2. Gently twist your torso to one side, hold for a moment, then twist to the other side.</Text>
          <Text style={styles.stepText}>3. Repeat this 10 times on each side.</Text>

          <Text style={styles.stepTitle}>Cool-down (5 minutes):</Text>
          <Text style={styles.stepText}>1. Sit upright, close your eyes, and take deep breaths in through your nose and out through your mouth.</Text>
          <Text style={styles.stepText}>2. Repeat for 5 deep breaths to relax the body.</Text>
        </View>
      </View>

      {/* Exercise 2 */}
      <View style={styles.card}>
        <Text style={styles.heading}>Exercise 2: Full Body Workout</Text>
        
        <Text style={styles.link} onPress={() => openLink('https://youtu.be/CKTTIIZjbDg')}>
        https://youtu.be/CKTTIIZjbDg
        </Text>
        
        <TouchableOpacity onPress={() => copyToClipboard('https://youtu.be/CKTTIIZjbDg')} style={styles.copyButton}>
          <Text style={styles.copyButtonText}>Copy Link</Text>
        </TouchableOpacity>

        <View style={styles.stepsContainer}>
          <Text style={styles.subHeading}>Steps:</Text>
          <Text style={styles.stepTitle}>Warm-up (5-10 minutes):</Text>
          <Text style={styles.stepText}>1. Stand or sit tall, then lift one knee, followed by the other, mimicking a march.</Text>
          <Text style={styles.stepText}>2. If seated, raise your legs off the ground while swinging your arms gently.</Text>
          <Text style={styles.stepText}>3. Do this for about 1-2 minutes.
          </Text>
          <Text style={styles.stepText}>4. Let your arms hang by your sides.</Text>
          <Text style={styles.stepText}>5. Gently swing your arms forward and backward while keeping your body stable.</Text>
          <Text style={styles.stepText}>6. Do this for 1-2 minutes.</Text>

          <Text style={styles.stepTitle}>Balance and Mobility Exercises:</Text>
          <Text style={styles.stepText}>1. Stand with one foot in front of the other, heel to toe, as if walking on a tightrope.</Text>
          <Text style={styles.stepText}>2. Hold onto a wall or chair for support if necessary.</Text>
          <Text style={styles.stepText}>3. ake 10 steps forward, then turn around and repeat.
          </Text>
          <Text style={styles.stepText}>4. Sit tall in a chair and lift one leg out to the side as far as comfortable.</Text>
          <Text style={styles.stepText}>5. Lower the leg and repeat on the other side.</Text>
          <Text style={styles.stepText}>6. Repeat 10 times on each leg.</Text>
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

export default AlzheimerExercises;
