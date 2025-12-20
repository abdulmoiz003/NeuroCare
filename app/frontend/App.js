import React from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import HomePage from './components/HomePage';
import Signup from './components/Signup';
import Login from './components/Login';
import Profile from './components/Profile';
import ResetPassword from './components/ResetPassword';
import BottomTabs from './components/BottomTabs'; // Import the BottomTabs
import ParkinsonDetection from './components/ParkinsonDetection';
import ParkReport from './components/ParkReport';
import ParkRecom from './components/ParkRecom';
import AlzheimerDetection from './components/AlzheimerDetection';
import AlzReport from './components/AlzReport';
import AlzRecom from './components/AlzRecom';
import StrokeDetection from './components/StrokeDetection';
import StrokeResult from './components/StrokeResult';
import StrokeRecom from './components/StrokeRecom';
import LifestylePlans from './components/LifestylePlans';
import DietPlans from './components/DietPlans';
import DietInformation from './components/DietInformation';
import SavedPlans from './components/SavedPlans';
import SavedDietPlans from './components/SavedDietPlans';
import ExercisePlans from './components/ExercisePlans';
import ParkinsonExercises from './components/ParkinsonExercises';
import AlzheimerExercises from './components/AlzheimerExercises';
import StrokeExercises from './components/StrokeExercises';

const Stack = createStackNavigator();

const App = () => {

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={HomePage}
          options={{ headerShown: false }}  // Hide header for the homepage
        />
        <Stack.Screen name="SignUp" component={Signup} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen
          name="BottomTabs"
          component={BottomTabs}  // Use BottomTabs component
          options={{ headerShown: false }} // Hide header for the tabs
        />
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="ResetPassword" component={ResetPassword} options={{ title: 'Reset Password' }} />
        <Stack.Screen name="ParkinsonDetection" component={ParkinsonDetection} options={{ title: 'Parkinsons Detection' }} />
        <Stack.Screen name="ParkReport" component={ParkReport} options={{ title: 'Parkinsons Report' }} />
        <Stack.Screen name="ParkRecom" component={ParkRecom} options={{ title: 'Parkinsons Recommendations' }} />
        <Stack.Screen name="AlzheimerDetection" component={AlzheimerDetection} options={{ title: 'Alzheimers Detection' }} />
        <Stack.Screen name="AlzReport" component={AlzReport} options={{ title: 'Alzheimers Report' }} />
        <Stack.Screen name="AlzRecom" component={AlzRecom} options={{ title: 'Alzheimers Recommendations' }} />
        <Stack.Screen name="StrokeDetection" component={StrokeDetection} options={{ title: 'Brain Stroke Prediction' }} />
        <Stack.Screen name="StrokeResult" component={StrokeResult} options={{ title: 'Brain Stroke Prediction Report' }} />
        <Stack.Screen name="StrokeRecom" component={StrokeRecom} options={{ title: 'Brain Stroke Recommendations' }} />
        <Stack.Screen name="LifestylePlans" component={LifestylePlans} options={{ title: 'Lifestyle Plans' }} />
        <Stack.Screen name="DietPlans" component={DietPlans} options={{ title: 'Diet Plans' }} />
        <Stack.Screen name="DietInformation" component={DietInformation} options={{ title: 'Diet Plan Details' }} />
        <Stack.Screen name="SavedPlans" component={SavedPlans} options={{ title: 'Saved Lifestyle Plans' }} />
        <Stack.Screen name="SavedDietPlans" component={SavedDietPlans} options={{ title: 'My Diet Plans' }} />
        <Stack.Screen name="ExercisePlans" component={ExercisePlans} options={{ title: 'Exercise Plans' }} />
        <Stack.Screen name="ParkinsonExercises" component={ParkinsonExercises} options={{ title: 'Parkinsons Exercises' }} />
        <Stack.Screen name="AlzheimerExercises" component={AlzheimerExercises} options={{ title: 'Alzheimers Exercises' }} />
        <Stack.Screen name="StrokeExercises" component={StrokeExercises} options={{ title: 'Brain Stroke Exercises' }} />

      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
