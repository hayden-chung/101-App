import React, {useState} from 'react';
import { KeyboardAvoidingView, StyleSheet, Text, View, TextInput, TouchableOpacity, Keyboard, ScrollView} from 'react-native';

import colors from './assets/colors';
import Task from './components/task';
import ToDoScreen from './app/todo';

export default function App() {

  return (
    <View style={styles.container}>
      <ToDoScreen />
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
});
