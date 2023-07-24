import React from 'react';
import { StyleSheet, View } from 'react-native';
import { RadarChart } from 'react-native-svg-charts';

const data = [
  {
    data: [0.7, 0.8, 0.9, 0.67, 0.8],
    meta: { color: 'blue' },
  },
  {
    data: [0.6, 0.85, 0.5, 0.6, 0.7],
    meta: { color: 'red' },
  },
];

const captions = ['Battery Capacity', 'Design', 'Usefulness', 'Speed', 'Weight'];

const WellbeingScreen = () => {
  return (
    <View style={styles.container}>
      <RadarChart
        data={data}
        captions={captions}
        size={450}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default WellbeingScreen;