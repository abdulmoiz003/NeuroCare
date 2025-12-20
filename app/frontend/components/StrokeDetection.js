import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    Image,
    StyleSheet,
    Alert, TouchableOpacity
} from 'react-native';
import axios from 'axios';
import { Picker } from '@react-native-picker/picker';
import RadioForm from 'react-native-simple-radio-button';
import { useNavigation } from '@react-navigation/native'; 

const StrokeDetection = () => {
    const [gender, setGender] = useState('');
    const [age, setAge] = useState('');
    const [hypertension, setHypertension] = useState('');
    const [heartDisease, setHeartDisease] = useState('');
    const [everMarried, setEverMarried] = useState('');
    const [workType, setWorkType] = useState('');
    const [residenceType, setResidenceType] = useState('');
    const [avgGlucoseLevel, setAvgGlucoseLevel] = useState('');
    const [bmi, setBmi] = useState('');
    const [smokingStatus, setSmokingStatus] = useState('');

    const navigation = useNavigation(); 

    const handleSubmit = async () => {
        if (
            !gender ||
            !age ||
            !hypertension ||
            !heartDisease ||
            !everMarried ||
            !workType ||
            !residenceType ||
            !avgGlucoseLevel ||
            !bmi ||
            !smokingStatus
        ) {
            Alert.alert('Error', 'Please fill out all fields.');
            return;
        }

        const data = {
            gender: gender === 'Female' ? 0 : 1,
            age: parseFloat(age),
            hypertension: hypertension === 'No' ? 0 : 1,
            heart_disease: heartDisease === 'No' ? 0 : 1,
            ever_married: everMarried === 'No' ? 0 : 1,
            work_type:
                workType === 'Government-job'
                    ? 0
                    : workType === 'Not-Working'
                        ? 1
                        : workType === 'Private'
                            ? 2
                            : 3,
            Residence_type: residenceType === 'Rural' ? 0 : 1,
            avg_glucose_level: parseFloat(avgGlucoseLevel),
            bmi: parseFloat(bmi),
            smoking_status:
                smokingStatus === 'formerly smoked'
                    ? 0
                    : smokingStatus === 'never smoked'
                        ? 1
                        : smokingStatus === 'smokes'
                            ? 2
                            : 3,
        };

        try {
            const response = await axios.post('http://10.0.2.2:9000/predict', data);
            const prediction = response.data.prediction;

            navigation.navigate('StrokeResult', { detectionResult: prediction });
        } catch (error) {
            console.error(error);
            Alert.alert('Error', 'Failed to submit data.');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Brain Stroke Prediction</Text>

            <View style={styles.inputGroup}>
                <Text style={styles.label}>Gender:</Text>
                <View style={styles.radioGroup}>
                    <RadioForm
                        radio_props={[
                            { label: 'Male', value: 'Male' },
                            { label: 'Female', value: 'Female' },
                        ]}
                        initial={-1}
                        onPress={(value) => setGender(value)}
                        formHorizontal={true}
                        labelHorizontal={true}
                        buttonColor={'#1E90FF'}
                        selectedButtonColor={'#1E90FF'}
                        labelStyle={styles.radioLabel2}
                    />
                </View>
            </View>

            <View style={styles.inputGroup}>
                <Text style={styles.label}>Hypertension:</Text>
                <View style={styles.radioGroup}>
                    <RadioForm
                        radio_props={[
                            { label: 'Yes', value: 'Yes' },
                            { label: 'No', value: 'No' },
                        ]}
                        initial={-1}
                        onPress={(value) => setHypertension(value)}
                        formHorizontal={true}
                        labelHorizontal={true}
                        buttonColor={'#1E90FF'}
                        selectedButtonColor={'#1E90FF'}
                        labelStyle={styles.radioLabel}
                    />
                </View>
            </View>

            <View style={styles.inputGroup}>
                <Text style={styles.label}>Heart Disease:</Text>
                <View style={styles.radioGroup}>
                    <RadioForm
                        radio_props={[
                            { label: 'Yes', value: 'Yes' },
                            { label: 'No', value: 'No' },
                        ]}
                        initial={-1}
                        onPress={(value) => setHeartDisease(value)}
                        formHorizontal={true}
                        labelHorizontal={true}
                        buttonColor={'#1E90FF'}
                        selectedButtonColor={'#1E90FF'}
                        labelStyle={styles.radioLabel}
                    />
                </View>
            </View>

            <View style={styles.inputGroup}>
                <Text style={styles.label}>Ever Married:</Text>
                <View style={styles.radioGroup}>
                    <RadioForm
                        radio_props={[
                            { label: 'Yes', value: 'Yes' },
                            { label: 'No', value: 'No' },
                        ]}
                        initial={-1}
                        onPress={(value) => setEverMarried(value)}
                        formHorizontal={true}
                        labelHorizontal={true}
                        buttonColor={'#1E90FF'}
                        selectedButtonColor={'#1E90FF'}
                        labelStyle={styles.radioLabel}
                    />
                </View>
            </View>

            <View style={styles.inputGroup}>
                <Text style={styles.label}>Residence Type:</Text>
                <View style={styles.radioGroup}>
                    <RadioForm
                        radio_props={[
                            { label: 'Urban', value: 'Urban' },
                            { label: 'Rural', value: 'Rural' },
                        ]}
                        initial={-1}
                        onPress={(value) => setResidenceType(value)}
                        formHorizontal={true}
                        labelHorizontal={true}
                        buttonColor={'#1E90FF'}
                        selectedButtonColor={'#1E90FF'}
                        labelStyle={styles.radioLabel3}
                    />
                </View>
            </View>

            <View style={styles.inputGroup}>
                <Text style={styles.label}>Age:</Text>
                <TextInput
                    style={styles.input}
                    value={age}
                    onChangeText={setAge}
                    keyboardType="numeric"
                />
            </View>

            <View style={styles.inputGroup}>
                <Text style={styles.label}>Avg Glucose Level:</Text>
                <TextInput
                    style={styles.input}
                    value={avgGlucoseLevel}
                    onChangeText={setAvgGlucoseLevel}
                    keyboardType="numeric"
                />
            </View>

            <View style={styles.inputGroup}>
                <Text style={styles.label}>BMI:</Text>
                <TextInput
                    style={styles.input}
                    value={bmi}
                    onChangeText={setBmi}
                    keyboardType="numeric"
                />
            </View>

            <View style={styles.inputGroup}>
                <Text style={styles.label}>Work Type:</Text>
                <View style={styles.pickerContainer}>
                <Picker
                    selectedValue={workType}
                    onValueChange={(value) => setWorkType(value)}
                    style={styles.picker}
                >
                    <Picker.Item label="Select option" value="" enabled={false} />
                    <Picker.Item label="Government-job" value="Government-job" />
                    <Picker.Item label="Private" value="Private" />
                    <Picker.Item label="Self-employed" value="Self-employed" />
                </Picker>
                </View>
            </View>

            <View style={styles.inputGroup}>
                <Text style={styles.label}>Smoking Status:</Text>
                <View style={styles.pickerContainer}>
                <Picker
                    selectedValue={smokingStatus}
                    
                    onValueChange={(value) => setSmokingStatus(value)}
                    style={styles.picker}
                >
                     <Picker.Item label="Select option" value="" enabled={false} />
                    <Picker.Item label="formerly smoked" value="formerly smoked" />
                    <Picker.Item label="never smoked" value="never smoked" />
                    <Picker.Item label="smokes" value="smokes" />
                </Picker>
                </View>
            </View>

            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                <Text style={styles.buttonText}>Submit</Text>
            </TouchableOpacity>

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
        padding: 20,
        alignItems: 'center',
        backgroundColor: '#F5F5F5',
    },
    header: {
        fontWeight: 'bold',
        fontSize: 24,
        textAlign: 'center',
        marginBottom: 30,
    },
    label: {
        width: '40%',  // Ensure label takes up 40% of space
        fontSize: 16,
        textAlign: 'left',
        marginRight: 10, // Adds some space between label and input
        fontWeight: 'bold',
    },
    inputGroup: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 13,
    },
    input: {
        width: '55%',  // Input takes remaining space
        padding: 2,
        borderWidth: 2,
        borderColor: '#1E90FF',
        borderRadius: 5,
        backgroundColor: '#fff',
    },
    pickerContainer: {
        width: '55%', // Container width
        height:'65%',
        borderWidth: 2,
        borderColor: '#1E90FF', // Border color
        borderRadius: 5, // Optional: rounded corner
        backgroundColor: '#fff', // Background color
        overflow: 'hidden', // Ensures border is visible
    },
    picker: {
        
        width: '95%',
        height:"13%",
        
    },
    radioGroup: {
        width: '55%',
    },
    radioLabel: {
        marginRight: 30, // Adds some space between radio button labels
    },
    radioLabel2: {
        marginRight: 21, // Adds some space between radio button labels
    },
    radioLabel3: {
        marginRight: 16, // Adds some space between radio button labels
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

export default StrokeDetection;