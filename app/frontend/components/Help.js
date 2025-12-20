import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const Help = () => {
  return (
    <View style={styles.container}>
      <Image source={require('../assets/help.png')} style={styles.icon} />
      <Text style={styles.heading}>Need Help?</Text>
      <Text style={styles.paragraph}>
        Call our customer services team on the number below to speak to one of our advisors who will help you with all your needs.
      </Text>
      <Text style={styles.phoneNumber}>+923-041-754-605</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  icon: {
    width: 120,
    height: 120,
    marginBottom: 20,
  },
  heading: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#007bff',
    marginBottom: 20,
    textAlign: 'center',
  },
  paragraph: {
    fontSize: 18,
    lineHeight: 26,
    color: '#333',
    textAlign: 'center',
    marginBottom: 40,
  },
  phoneNumber: {
    fontSize: 20,
    color: '#28a745',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default Help;