import React from 'react';
import { StyleSheet, View} from 'react-native';
import colors from './assets/colors';
import ToDoScreen from './app/todoScreen';
import HomeScreen from './app/homeScreen';
import QuoteScreen from './app/quoteScreen';
import WellbeingScreen from './app/wellbeingScreen'

export default function App() {
  return (
    <View style={styles.container}>
      <WellbeingScreen />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  }
});
