import React, {useState} from 'react';
import { StyleSheet, View, Text, Image, Dimensions, SafeAreaView, TouchableOpacity, Modal, Touchable} from 'react-native';
import {BarChart, PieChart, ContributionGraph} from 'react-native-chart-kit'; // charts from third party library.
import dimensions from '../assets/dimensions';
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import {NewWellbeingChartModal} from '../components/wellbeing/newChartModal/NewWellbeingChartModal';
import {wellbeingData, updateWellbeingData} from '../assets/wellbeingData';
import WellbeingDatePicker from '../components/wellbeing/calendar/WellbeingDatePicker';
import {getCurrentDate, updateCalendarData} from '../components/wellbeing/wellbeingControls'
import {handlePreviousDay, handleNextDay} from '../components/wellbeing/calendar/calendarControls';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = (Dimensions.get('window').height);

const WellBeingScreen = () => { // main function for wellbeing screen  
  const [isNewChartModalVisible, newChartModalVisible] = useState(false); // Is 'new chart' modal visible. 
  const [isCalendarVisible, setCalendarVisible] = useState(false); // Is calendar modal visible.
  const [selectedDate, setSelectedDate] = useState(getCurrentDate()); // Selected date from date picker (calendar).
  const [calendarData, setCalendarData] = useState({"2023-08-02": [10, 1, 2, 5, 1, 1]}); // data type = object (key value (like dictionary in python))

  updateWellbeingData(selectedDate, calendarData)

  return (
    // SafeAreaView renders content within the visible boundaries of the device (iOS only).
    <SafeAreaView style={styles.container}> 

        <View style={styles.header}>

          <TouchableOpacity style={styles.goBackHomeButton}>  
            <Ionicons name="chevron-back" size={SCREEN_HEIGHT/20} color="black"/>
          </TouchableOpacity>

          <Text style={styles.title}> Wellbeing Chart</Text>

          {/* ------------ UPDATE WELLBEING CHART BUTTON ------------ */}
          <TouchableOpacity onPress={() => {newChartModalVisible(true)}} style={styles.updateButtonWrapper}> 
            <Ionicons name="add" size={35} color="black" style={styles.updateButton}/>
          </TouchableOpacity>

          {/* Modal appears when update button pressed */}
          <Modal
            transparent ={true} // covers screen completely but allows transparency in empty areas. 
            animationType='fade' // fade animation when appearing/disappearing.
            visible={isNewChartModalVisible} // modal is visible (true/false)
            onRequestClose={() => newChartModalVisible(false)} // when backbutton tapped, close modal (set showNewChartModal to false)
            >
            {/* Make a new wellbeing rating (Modal Component) */}
            <NewWellbeingChartModal
              newChartModalVisible={newChartModalVisible}
              wellbeingData={wellbeingData}
              setCalendarData={setCalendarData}
              calendarData={calendarData}
            />

          </Modal>
        </View>

        {/* --------------- Wellbeing Date Bar --------------- */}
        <View style={styles.dateBar}>

          {/* Previous Day */}   
          <TouchableOpacity style={styles.goBackHomeButton} onPress={() => handlePreviousDay(selectedDate, setSelectedDate)}>
            <Entypo name="chevron-left" size={SCREEN_HEIGHT/20} color="black" />
          </TouchableOpacity>

          {/* Selected Date */}
          <Text style={styles.dateText}>{selectedDate}</Text>
          
          {/* Next Day */}
          <TouchableOpacity style={styles.goBackHomeButton} onPress={() => handleNextDay(selectedDate, setSelectedDate)}>
          <Entypo name="chevron-right" size={SCREEN_HEIGHT/20} color="black" />
          </TouchableOpacity>

          {/* Calendar Button */}
          <TouchableOpacity style={styles.calendarButton} onPress={() => setCalendarVisible(true)}>
            <AntDesign name="calendar" size={24} color="black" />
          </TouchableOpacity>

          <Modal
            transparent={true} // don't cover the whole screen. only modal area covers screen. 
            animationType='fade' // fade animation when appearing/disappearing.
            visible={isCalendarVisible}
            onRequestClose={() => setCalendarVisible(false)} // when backbutton on phone tapped, close modal.
          >
            <WellbeingDatePicker 
              setCalendarVisible={setCalendarVisible}
              setSelectedDate={setSelectedDate}
              selectedDate={selectedDate}
            />
          </Modal>
        </View>
      
        {/* --------------- WELLBEING CHART --------------- */}
        <View style={styles.chartWrapper}>
          <BarChart
            // style={graphStyle}
            data={wellbeingData}
            width={dimensions.SCREEN_WIDTH}
            height={220}
            yAxisLabel={''} // to put in fron of y axis labels (e.g. '$')
            verticalLabelRotation={-20}
            fromZero={true} // start y label from 0

            chartConfig={{ // Chart Design 
              backgroundColor: '#e26a00', 
              backgroundGradientFrom: '#fb8c00', // starting color of gradient (from left)
              backgroundGradientTo: '#ffa726',   // ending gradient (to right)
              decimalPlaces: 2,                  // optional, defaults to 2dp
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
  container: { // screen container
    flex: 1, 
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  header: {
    width: '100%',
    paddingVertical: SCREEN_HEIGHT/18,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'green',
  },
  title: {
    fontSize: SCREEN_HEIGHT/28,
  },
  updateButtonWrapper: {
    width: SCREEN_WIDTH/8,
    height: SCREEN_WIDTH/8,
    borderRadius: 10,
    borderWidth: 3,
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dateBar: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    backgroundColor: 'red',

  },
  dateText: {
    fontSize: SCREEN_HEIGHT/38,
  },
  calendarButton: {
    
  },
  chartWrapper: {
  },
  updateButton: {

  },
});


export default WellBeingScreen;