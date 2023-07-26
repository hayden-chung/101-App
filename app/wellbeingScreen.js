import React from 'react';
import { StyleSheet, View, Text, Image, Dimensions, SafeAreaView} from 'react-native';
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart
} from 'react-native-chart-kit'

const screenWidth = (Dimensions.get('window').width);

const barData = { 
  labels: ['Work', 'Exercise & Nutrition', 'relaxation', 'relationships', 'Sleep', 'Personal Development'], // for x axis 
  datasets: [
    {
      data: [2, 9, 3, 8, 10, 4],
    },
  ],
};


const WellbeingScreen = () => {


  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.chartWrapper}>
        <BarChart
          // style={graphStyle}
          data={barData}
          width={screenWidth}
          height={220}
          yAxisLabel={''} // to put in fron of y axis labels (e.g. '$')
          verticalLabelRotation={-20}
          fromZero={true} // start y label from 0

          chartConfig={{ // Chart Design 
            backgroundColor: '#e26a00', 
            backgroundGradientFrom: '#fb8c00', // starting color of gradient (from left)
            backgroundGradientTo: '#ffa726', // ending gradient (to right)
            decimalPlaces: 2, // optional, defaults to 2dp
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            style: {
              borderRadius: 16
            }
          }}
        />
      </View>
    </SafeAreaView>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'green',
  },
  chartWrapper: {
  },
});


export default WellbeingScreen;