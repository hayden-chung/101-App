import React, {useState} from 'react';
import { StyleSheet, View, Text, Image, Dimensions, SafeAreaView, TouchableOpacity, Modal} from 'react-native';
import {BarChart, PieChart, ContributionGraph} from 'react-native-chart-kit'; // charts from third party library.
import { Ionicons } from '@expo/vector-icons';
import {NewWellbeingChart} from '../components/wellbeing/newWellbeingChartModal';

const screenWidth = (Dimensions.get('window').width); // width of screen.

const barData = { 
  labels: ['Work', 'Exercise & Nutrition', 'relaxation', 'relationships', 'Sleep', 'Personal Development'], // 6 aspects of wellbeing for x axis.
  datasets: [{ data: [2, 9, 3, 8, 10, 4] }]}; // aspect rating out of 10. 6 values for the 6 aspects 


const WellBeingScreen = () => { // main function for wellbeing screen 

  const [isNewChartModalVisible, newChartModal] = useState(false);

  return (
    // SafeAreaView renders content within the visible boundaries of the device (iOS only).
    <SafeAreaView style={styles.container}> 

        <View style={styles.header}>
          {/*  update wellbeing chart */}
          <TouchableOpacity onPress={() => {newChartModal(true)}}>
            <Ionicons name="add" size={35} color="black" style={styles.updateWrapper}/>
          </TouchableOpacity>

          <Modal
            transparent ={true} // covers screen completely but allows transparency in empty areas. 
            animationType='fade' // fade animation when appearing/disappearing.
            visible={isNewChartModalVisible} // modal is visible (true/false)
            onRequestClose={() => newChartModal(false)} // when backbutton tapped, close modal (set showNewChartModal to false)
          >


          </Modal>
        </View>
      
        {/* --------------- WELLBEING CHART --------------- */}
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
        {/* ------------------------------------------------ */}

    </SafeAreaView>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'green',
  },
  header: {
    
  },
  chartWrapper: {
  },
  updateWrapper: {
    borderRadius: 10,
    borderWidth: 3,
    paddingLeft: 8,
    paddingRight: 1,
    paddingTop: 6,
    paddingBottom: 0,
    backgroundColor: 'white',
  },
});


export default WellBeingScreen;