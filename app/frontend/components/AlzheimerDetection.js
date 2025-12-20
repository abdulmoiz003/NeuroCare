import React, { useState, useEffect } from 'react';
import { View, Text, Image, ActivityIndicator, StyleSheet, PermissionsAndroid, TouchableOpacity, Alert } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import axios from 'axios';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';

const AlzheimerDetection = () => {
  const [imageUri, setImageUri] = useState(null);
  const [prediction, setPrediction] = useState(null);
  const [detectionResult, setDetectionResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const [confidence, setConfidence] = useState(null);

  useEffect(() => {
    const requestPermissions = async () => {
      try {
        await PermissionsAndroid.requestMultiple([
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        ]);
      } catch (err) {
        console.warn(err);
      }
    };

    requestPermissions();
  }, []);

  const selectImage = () => {
    launchImageLibrary({ mediaType: 'photo', quality: 1 }, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        console.log('ImagePicker Error: ', response.errorMessage);
      } else if (response.assets && response.assets.length > 0) {
        console.log('Selected image URI:', response.assets[0].uri); // Debugging line
        setImageUri(response.assets[0].uri);
      }
    });
  };

  const uploadImage = async () => {
    if (!imageUri) {
      Alert.alert('No Image Selected', 'Select an image to upload');
      return;
    }

    const formData = new FormData();
    formData.append('file', {
      uri: imageUri,
      name: 'mri_image.jpg',
      type: 'image/jpeg',
    });

    try {
      setLoading(true);
      const response = await axios.post('http://10.0.2.2:8000/predict', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setPrediction(response.data);
      setDetectionResult(response.data.class);
      setConfidence(response.data.confidence);
    } catch (error) {
      console.error('Error uploading image:', error);
      setPrediction(null);
      setDetectionResult(null);
      setConfidence(null);
    } finally {
      setLoading(false);
    }
  };

  const clearImage = () => {
    setImageUri(null);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Alzheimer's Disease Detection</Text>
      <Image
        source={require('../assets/img2.png')}
        style={styles.roundedImage}
      />
      <Text style={styles.label}>Upload brain MRI image:</Text>
      <View style={styles.imageContainer}>
        <TouchableOpacity style={styles.button} onPress={selectImage}>
          <Text style={styles.buttonText}>Select Image</Text>
        </TouchableOpacity>
        {imageUri && (
          <View style={styles.thumbnailContainer}>
            <Image source={{ uri: imageUri }} style={styles.thumbnail} />
            <TouchableOpacity style={styles.clearButton} onPress={clearImage}>
              <Icon name="close" size={20} color="#fff" />
            </TouchableOpacity>
          </View>
        )}
      </View>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <TouchableOpacity
          style={[styles.button, styles.uploadButton]}
          onPress={uploadImage}
        >
          <Text style={styles.buttonText}>Upload</Text>
        </TouchableOpacity>
      )}
      {detectionResult && (
        <View style={styles.resultContainer}>
          <Text style={styles.resultText}>Detection Result: {detectionResult}</Text>
          {/* <Text style={styles.resultText}>Confidence: {confidence}
          </Text> */}
          <Text style={styles.resultText}>Confidence: {(confidence * 100).toFixed(2)}%
          </Text>
          <View style={styles.buttonRow}>
            <TouchableOpacity
              style={styles.imageButton}
              onPress={() => navigation.navigate('AlzReport', { detectionResult })}
            >
              <Image
                source={require('../assets/report-icon.png')}
                style={styles.iconImage}
              />
              <Text style={styles.imageButtonText}>Generate Diagnostic Report</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.imageButton}
              onPress={() => navigation.navigate('AlzRecom', { detectionResult })}
            >
              <Image
                source={require('../assets/recommendation-icon.png')}
                style={styles.iconImage}
              />
              <Text style={styles.imageButtonText}>View Recommendations</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={styles.tabButton}
          onPress={() => navigation.navigate('Dashboard')}
        >
          <Image
            source={require('../assets/home1.jpg')}
            style={styles.tabIcon}
          />
          <Text style={styles.tabLabel}>HM</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.tabButton}
          onPress={() => navigation.navigate('ParkinsonDetection')}
        >
          <Image
            source={require('../assets/img1.png')}
            style={styles.tabIcon}
          />
          <Text style={styles.tabLabel}>PD</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.tabButton}
          onPress={() => navigation.navigate('AlzheimerDetection')}
        >
          <Image
            source={require('../assets/img2.png')}
            style={styles.tabIcon}
          />
          <Text style={styles.tabLabel}>AD</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.tabButton}
          onPress={() => navigation.navigate('StrokeDetection')}
        >
          <Image
            source={require('../assets/img3.png')}
            style={styles.tabIcon}
          />
          <Text style={styles.tabLabel}>SP</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.tabButton}
          onPress={() => navigation.navigate('LifestylePlans')}
        >
          <Image
            source={require('../assets/img4.png')}
            style={styles.tabIcon}
          />
          <Text style={styles.tabLabel}>LP</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#F5F5F5',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  roundedImage: {
    width: 380,
    height: 200,
    borderRadius: 20,
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  imageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#007bff',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 30,
    marginVertical: 10,
    width: 150,
    alignItems: 'center',
  },
  uploadButton: {
    backgroundColor: '#22ACAC',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
  thumbnailContainer: {
    position: 'relative',
    marginLeft: 10,
  },
  thumbnail: {
    width: 80,
    height: 80,
    borderRadius: 5,
  },
  clearButton: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: '#ff0000',
    borderRadius: 50,
    padding: 5,
  },
  resultContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  resultText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  imageButton: {
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 5, // Reduced padding
    borderRadius: 10,
    marginTop: 1,
    marginHorizontal: 20,
    width: 120, // Reduced width
    borderWidth: 2,
    borderColor: '#007bff',
  },
  iconImage: {
    width: 60, // Reduced icon size
    height: 60, // Reduced icon size
    marginBottom: 5, // Reduced margin
  },
  imageButtonText: {
    color: '#007bff',
    fontSize: 14, // Reduced text size
    textAlign: 'center',
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    padding: 10,
    position: 'absolute',
    bottom: 0,
    backgroundColor: '#f8f8f8',
    borderTopWidth: 1,
    borderColor: '#ddd',
  },
  tabButton: {
    alignItems: 'center',
  },
  tabIcon: {
    width: 40, // Adjusted width for round image
    height: 40, // Adjusted height for round image
    borderRadius: 20, // Half of width/height for round image
    marginBottom: 5,
  },
  tabLabel: {
    fontSize: 12,
    color: '#007bff',
  },
});

export default AlzheimerDetection;