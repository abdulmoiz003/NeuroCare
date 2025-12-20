import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window'); // Get the screen width for responsive layout

const LifestylePlans = () => {
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            {/* My Plans Button at top right corner */}
            <TouchableOpacity
                style={styles.myPlansButton}
                onPress={() => navigation.navigate('SavedPlans')}
            >
                <Image
                    source={require('../assets/savedPlans.jpg')} // Replace with your image path
                    style={styles.myPlansImage}
                />
                <Text style={styles.myPlansText}>My Plans</Text>
            </TouchableOpacity>

            <View style={styles.headerContainer}>
                <Text style={styles.header}>Lifestyle Plans</Text>
            </View>

            {/* Diet and Exercise Plan buttons */}
            <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate('DietPlans')}
            >
                <Image
                    source={require('../assets/diet.jpeg')} // Add your diet image here
                    style={styles.image}
                />
                <Text style={styles.buttonText}>Diet Plans</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={[styles.button, styles.exerciseButton]} // Apply additional margin only to this button
                onPress={() => navigation.navigate('ExercisePlans')}
            >
                <Image
                    source={require('../assets/exercise.png')} // Add your exercise image here
                    style={styles.image}
                />
                <Text style={styles.buttonText}>Exercise Plans</Text>
            </TouchableOpacity>

            {/* Bottom Tab Navigation */}
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
        backgroundColor: '#F5F5F5',
        alignItems: 'center',
        justifyContent: 'center', // Vertically center the content
    },
    headerContainer: {
        width: '100%',
        marginTop: 50,
        marginBottom: 20, // Adjust space between the header and the buttons
        alignItems: 'center',
    },
    header: {
        fontWeight: 'bold',
        fontSize: 24,
        textAlign: 'center',
    },
    myPlansButton: {
        position: 'absolute',
        top: 10, // Position at the top of the screen
        right: 16, // Position to the right side of the screen
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        backgroundColor: 'skyblue',
        borderRadius: 50, // Circular button
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 2,
        elevation: 4, // For Android shadow
    },
    myPlansImage: {
        width: 40, // Increased size for the image
        height: 30,
        borderRadius: 15, // Circular image
        marginRight: 5,
    },
    myPlansText: {
        fontSize: 14,
        fontWeight: 'bold',
        // color: 'white'
    },
    button: {
        alignItems: 'center',
        marginBottom: 30, // Default margin
    },
    exerciseButton: {
        marginBottom: 100, // Increase margin specifically for Exercise Plans button
    },
    image: {
        width: width - 40, // Full width minus padding
        height: 200,
        borderRadius: 15, // Rounded corners
        marginBottom: 10,
    },
    buttonText: {
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

export default LifestylePlans;
