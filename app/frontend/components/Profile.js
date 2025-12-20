import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Image, TouchableWithoutFeedback } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Profile = ({ navigation }) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const email = await AsyncStorage.getItem('patientEmail');
        if (email) {
          const response = await axios.get(`http://10.0.2.2:5000/patient/${email}`);
          setUser(response.data);
        }
      } catch (error) {
        console.error("Fetch Error:", error);
        setError('Failed to fetch user details.');
      }
    };

    fetchUserDetails();
  }, []);

  const handleEditProfile = () => {
    setIsEditing(!isEditing); // Toggle edit mode
  };

  const handleSaveChanges = async () => {
    // Name validation
  if (!user.name || !/^[A-Za-z\s]+$/.test(user.name)) {
    Alert.alert('Invalid Name', 'Name should only contain alphabets and spaces.');
    return;
  }

  if (!user.age || isNaN(user.age) || user.age <= 0 || user.age > 120) {
    Alert.alert('Invalid Age', 'Age must be a number between 1 and 120.');
    return;
  }

  // Phone number validation
  if (!user.phoneNumber || user.phoneNumber.length !== 11 || !/^\d+$/.test(user.phoneNumber)) {
    Alert.alert('Invalid Phone Number', 'Phone number must be 11 digits long.');
    return;
  }

    try {
      const email = await AsyncStorage.getItem('patientEmail');
      if (email && user) {
        const updatedPatient = {
          name: user.name,
          age: user.age,
          phoneNumber: user.phoneNumber,
          gender: user.gender,
        };

        await axios.put(`http://10.0.2.2:5000/patient/${email}`, updatedPatient);
        Alert.alert('Profile updated', 'Your profile has been updated.');
        setIsEditing(false); // Exit edit mode
      }
    } catch (error) {
      console.error("Save Error:", error);
      Alert.alert('Error', 'Failed to save profile changes.');
    }
  };

  const handleCancelEdit = () => {
    setIsEditing(false); // Exit edit mode
  };

  const handleDeleteProfile = () => {
    Alert.alert(
      'Confirm Deletion',
      'Are you sure you want to delete your profile?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              await axios.delete(`http://10.0.2.2:5000/patients/${user._id}`);
              await AsyncStorage.removeItem('patientEmail');
              Alert.alert('Profile deleted', 'Your profile has been deleted.');
              navigation.navigate('Login');
            } catch (error) {
              console.error("Delete Error:", error);
              Alert.alert('Error', 'Failed to delete profile.');
            }
          },
        },
      ]
    );
  };

  const handleResetPassword = () => {
    navigation.navigate('ResetPassword');
  };

  const renderRadioButton = (value, label) => (
    <TouchableWithoutFeedback
      onPress={() => isEditing && setUser({ ...user, gender: value })}
      disabled={!isEditing && user.gender !== value}
    >
      <View style={styles.radioButtonContainer}>
        <View style={[
          styles.radioButton,
          user.gender === value && styles.radioButtonSelected,
          !isEditing && user.gender !== value && styles.radioButtonDisabled
        ]} />
        <Text style={[
          styles.radioLabel,
          !isEditing && user.gender !== value && styles.radioLabelDisabled
        ]}>
          {label}
        </Text>
      </View>
    </TouchableWithoutFeedback>
  );

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.error}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {user ? (
        <>
          <Image
            source={require('../assets/profile-logo.png')}
            style={styles.logo}
          />

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Name</Text>
            <TextInput
              style={styles.input}
              value={user.name}
              editable={isEditing}
              onChangeText={(text) => setUser({ ...user, name: text })}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Age</Text>
            <TextInput
              style={styles.input}
              value={user.age ? user.age.toString() : ''}
              editable={isEditing}
              keyboardType="numeric" // Show numeric keyboard
              onChangeText={(text) => setUser({ ...user, age: text })}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Phone</Text>
            <TextInput
              style={styles.input}
              value={user.phoneNumber ? user.phoneNumber.toString() : ''}
              editable={isEditing}
              keyboardType="phone-pad" // Show phone number keyboard
              onChangeText={(text) => setUser({ ...user, phoneNumber: text })}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Gender</Text>
            <View style={styles.radioGroup}>
              {renderRadioButton('Male', 'Male')}
              {renderRadioButton('Female', 'Female')}
              {renderRadioButton('Other', 'Other')}
            </View>
          </View>

          {isEditing ? (
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.button} onPress={handleSaveChanges}>
                <Text style={styles.buttonText}>Save Changes</Text>
              </TouchableOpacity>

              <TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={handleCancelEdit}>
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.button} onPress={handleEditProfile}>
                <Text style={styles.buttonText}>Edit Profile</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.button} onPress={handleResetPassword}>
                <Text style={styles.buttonText}>Reset Password</Text>
              </TouchableOpacity>

              <TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={handleDeleteProfile}>
                <Text style={styles.buttonText}>Delete Profile</Text>
              </TouchableOpacity>

            </View>
          )}
        </>
      ) : (
        <Text style={styles.info}>Loading...</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  inputContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  label: {
    width: 100,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 15,
    backgroundColor: '#ffffff',
    color: '#333',
  },
  radioGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  radioButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 10,
  },
  radioButton: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#007BFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioButtonSelected: {
    backgroundColor: '#007BFF',
  },
  radioButtonDisabled: {
    borderColor: '#CCC',
    backgroundColor: '#EEE',
  },
  radioLabel: {
    marginLeft: 5,
    fontSize: 16,
    color: '#333',
  },
  radioLabelDisabled: {
    color: '#CCC',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 20,
  },
  button: {
    flex: 1,
    height: 50,
    backgroundColor: '#007BFF',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginHorizontal: 5,
  },
  cancelButton: {
    backgroundColor: '#FF4C4C',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  error: {
    color: 'red',
    fontSize: 18,
  },
  info: {
    fontSize: 18,
    color: '#333',
  },
});

export default Profile;
