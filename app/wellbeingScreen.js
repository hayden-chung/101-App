import React, {useState} from 'react';
import { StyleSheet, View, Text, Image, Dimensions, SafeAreaView, TouchableOpacity, Modal, Touchable} from 'react-native';
import {BarChart, PieChart, ContributionGraph} from 'react-native-chart-kit'; // charts from third party library.
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import {NewWellbeingChartModal} from '../components/wellbeing/newChartModal/newWellbeingChartModal';
import {wellbeingData, updateWellbeingData} from '../components/wellbeing/wellbeingData';
import WellbeingDatePicker from '../components/wellbeing/calendar/wellbeingDatePicker';
import {getCurrentDate} from '../components/wellbeing/calendar/calendarControls'
import {handlePreviousDay, handleNextDay, updateCalendarData, savedCalendarData} from '../components/wellbeing/calendar/calendarControls';
import TabBar from '../components/tabBar'

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = (Dimensions.get('window').height);

const WellBeingScreen = ({navigation}) => { // main function for wellbeing screen  
  const [isNewChartModalVisible, newChartModalVisible] = useState(false); // Is 'new chart' modal visible. 
  const [isCalendarVisible, setCalendarVisible] = useState(false); // Is calendar modal visible.
  const [selectedDate, setSelectedDate] = useState(getCurrentDate()); // Selected date from date picker (calendar).
  const [calendarData, setCalendarData] = useState(savedCalendarData); // data type = object (key value (like dictionary in python))

  updateWellbeingData(selectedDate, calendarData) 

  const goBackScreen = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    }
  }

  return (
    // SafeAreaView renders content within the visible boundaries of the device (iOS only).
    <SafeAreaView style={styles.container}> 

        <View style={styles.wrapper}>
          <View style={styles.header}>

            {/* Return to Home Dashboard Button */}
            <TouchableOpacity style={styles.goBackHomeButton} onPress={() => goBackScreen()}>  
              <Ionicons name="chevron-back" size={SCREEN_HEIGHT/20} color="black"/>
            </TouchableOpacity>

            {/* Title */}
            <Text style={styles.title}> Wellbeing Chart</Text>

            {/* Update Wellbeing Chart Button. When pressed, set isNewChartModalVisible to true for modal to appear.*/}
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
                newChartModalVisible={newChartModalVisible} // Is modal visible
                wellbeingData={wellbeingData}               // 
                setCalendarData={setCalendarData}
                calendarData={calendarData}
              />

            </Modal>
          </View>

          {/* --------------- Wellbeing Date Bar --------------- */}
          <View style={styles.dateBar}>

            {/* Previous Day Button */}   
            <TouchableOpacity style={styles.goBackHomeButton} onPress={() => handlePreviousDay(selectedDate, setSelectedDate)}>
              <Entypo name="chevron-left" size={SCREEN_HEIGHT/20} color="black" />
            </TouchableOpacity>

            {/* Display Selected Date */}
            <Text style={styles.dateText}>{selectedDate}</Text>
            
            {/* Next Day Button */}
            <TouchableOpacity style={styles.goBackHomeButton} onPress={() => handleNextDay(selectedDate, setSelectedDate)}>
            <Entypo name="chevron-right" size={SCREEN_HEIGHT/20} color="black" />
            </TouchableOpacity>

            {/* Calendar Button. Open calendar modal when pressed. */}
            <TouchableOpacity style={styles.calendarButton} onPress={() => setCalendarVisible(true)}>
              <AntDesign name="calendar" size={24} color="black" />
            </TouchableOpacity>

            {/* Calendar Modal */}
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
        
          {/* --------------- WELLBEING CHART (Pie Chart) --------------- */}
          <View style={styles.chartWrapper}>
            <BarChart
              // style={graphStyle}
              data={wellbeingData} // import wellbeing data to display 
              width={SCREEN_WIDTH} // width of chart
              height={220}                    // height of chart
              yAxisLabel={''}                 // to put in fron of y axis labels (e.g. '$')
              verticalLabelRotation={-20}     // rotate y axis labels.
              fromZero={true}                 // start y axis from 0

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
        </View>

        <View style={styles.pushToBottom}></View>    
        <TabBar navigation={navigation}/>

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
  wrapper: {
  
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
  pushToBottom: {
    flex: 1,    
  },
});


export default WellBeingScreen;