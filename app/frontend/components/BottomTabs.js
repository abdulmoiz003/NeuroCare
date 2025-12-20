import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Text, StyleSheet } from 'react-native';
import Dashboard from './Dashboard';
import About from './About';
import Help from './Help';

// Custom CircleIcon component
const CircleIcon = ({ label, color, size }) => {
  return (
    <View style={[styles.iconContainer, { width: size, height: size, borderRadius: size / 2, backgroundColor: color }]}>
      <Text style={[styles.iconText, { fontSize: size / 2 }]}>{label}</Text>
    </View>
  );
};

const Tab = createBottomTabNavigator();

const BottomTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false, // Hide header for all screens
        tabBarStyle: {
          backgroundColor: '#ffffff', // Customize tab bar background color
        },
        tabBarActiveTintColor: '#007BFF', // Customize active tab color
        tabBarInactiveTintColor: '#888888', // Customize inactive tab color
      }}
    >
      <Tab.Screen
        name="Dashboard"
        component={Dashboard}
        options={{
          tabBarLabel: 'Home', // Change tab label to "Home"
          tabBarIcon: ({ color, size }) => (
            <CircleIcon label="H" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="About"
        component={About}
        options={{
          tabBarLabel: 'About',
          tabBarIcon: ({ color, size }) => (
            <CircleIcon label="A" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Help"
        component={Help}
        options={{
          tabBarLabel: 'Help',
          tabBarIcon: ({ color, size }) => (
            <CircleIcon label="?" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd', // Border color of the circle
  },
  iconText: {
    color: '#ffffff', // Text color inside the circle
    fontWeight: 'bold',
  },
});

export default BottomTabs;
