import React from 'react';
import { StyleSheet, View} from 'react-native';
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import colors from './assets/colors';
import ToDoScreen from './app/todoScreen';
import HomeScreen from './app/homeScreen';
import QuoteScreen from './app/quoteScreen';
import WellBeingScreen from './app/wellbeingScreen'
import TimetableScreen from './app/timetableScreen'
import TimetableGenerator from './components/timetable/timetableGenerator';
import TimetableSettings from './components/timetable/settings/timetableSettings';
import TimerScreen from './app/timerScreen'


const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>

        <Stack.Screen 
          name="TimerScreen"
          component={TimerScreen}
        />

        <Stack.Screen 
          name="TimetableScreen"
          component={TimetableScreen}
        />

        <Stack.Screen 
          name="TimetableGenerator"
          component={TimetableGenerator}
        />

        <Stack.Screen 
          name="TimetableSettings"
          component={TimetableSettings}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  }
});
