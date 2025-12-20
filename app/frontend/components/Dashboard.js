import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Alert, Dimensions } from 'react-native';
import Modal from 'react-native-modal';

const { width } = Dimensions.get('window');

const Dashboard = ({ navigation }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handlePress = (destination) => {
    navigation.navigate(destination);
  };

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  const handleOptionSelect = (option) => {
    if (option === 'viewProfile') {
      navigation.navigate('Profile');
    } else if (option === 'logout') {
      Alert.alert("Logged out successfully");
      navigation.navigate('Login');
    }
    toggleModal(); // Close modal after selection
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.iconButton} onPress={toggleModal}>
          <Image source={require('../assets/profile-icon.png')} style={styles.icon} />
        </TouchableOpacity>
      </View>

      <Text style={styles.title}>Welcome</Text>

      <Image source={require('../assets/slide1.png')} style={styles.roundedImage} />

      <View style={styles.imageButtonContainer}>
        <View style={styles.row}>
          <TouchableOpacity style={styles.imageButton} onPress={() => handlePress('ParkinsonDetection')}>
            <Image source={require('../assets/img1.png')} style={styles.image} />
            <Text style={styles.imageButtonText}>Parkinson's Disease Detection</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.imageButton} onPress={() => handlePress('AlzheimerDetection')}>
            <Image source={require('../assets/img2.png')} style={styles.image} />
            <Text style={styles.imageButtonText}>Alzheimer's Disease Detection</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.row}>
          <TouchableOpacity style={styles.imageButton} onPress={() => handlePress('StrokeDetection')}>
            <Image source={require('../assets/img3.png')} style={styles.image} />
            <Text style={styles.imageButtonText}>Brain Stroke Prediction</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.imageButton} onPress={() => handlePress('LifestylePlans')}>
            <Image source={require('../assets/img4.png')} style={styles.image} />
            <Text style={styles.imageButtonText}>Lifestyle Plans</Text>
          </TouchableOpacity>
        </View>
      </View>

      <Modal isVisible={isModalVisible} onBackdropPress={toggleModal}>
        <View style={styles.modalContent}>
          <TouchableOpacity style={styles.modalButton} onPress={() => handleOptionSelect('viewProfile')}>
            <Text style={styles.modalButtonText}>View Profile</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.modalButton} onPress={() => handleOptionSelect('logout')}>
            <Text style={styles.modalButtonText}>Logout</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    position: 'relative',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 1,
  },
  iconButton: {
    padding: 10,
  },
  icon: {
    width: 35,
    height: 35,
    marginLeft: 10,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    marginBottom: 20, // Adjusted margin for spacing
    // color: '#007BFF',
    textAlign: 'center',
  },
  roundedImage: {
    width: 380, // Adjust width as needed
    height: 200, // Adjust height as needed
    borderRadius: 20, // Rounded corners
    alignSelf: 'center',
    marginBottom: 30, // Space between image and buttons
  },
  imageButtonContainer: {
    marginBottom: 30, // Space between image buttons and modal
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20, // Space between rows of image buttons
  },
  imageButton: {
    width: '40%', // Each button covers 40% of width
    alignItems: 'center',
  },
  image: {
    width: '100%', // Image covers full width of the button
    height: 100, // Adjust height as needed
    borderRadius: 15, // Rounded corners
    resizeMode: 'cover',
  },
  imageButtonText: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: 'bold',
    // color: '#007BFF',
    textAlign: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalButton: {
    width: '80%', // Smaller width compared to full width
    height: 40, // Smaller height
    backgroundColor: '#007BFF', // Same background color as other buttons
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10, // Same borderRadius as other buttons
    marginBottom: 10, // Space between buttons
  },
  modalButtonText: {
    fontSize: 16, // Slightly smaller font size
    color: '#FFFFFF', // White text
  },
});

export default Dashboard;