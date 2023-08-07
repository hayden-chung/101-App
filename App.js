import React from 'react';
import { StyleSheet, View} from 'react-native';
import colors from './assets/colors';
import ToDoScreen from './app/todoScreen';
import HomeScreen from './app/homeScreen';
import QuoteScreen from './app/quoteScreen';
import WellBeingScreen from './app/wellbeingScreen'
import TimetableGenerator from './components/timetable/timetableGenerator';

export default function App() {
  return (
    <View style={styles.container}>
      <TimetableGenerator />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  }
});
