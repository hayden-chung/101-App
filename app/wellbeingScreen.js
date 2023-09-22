import React, {useState} from 'react';
import { StyleSheet, View, Text, Image, Dimensions, SafeAreaView, TouchableOpacity, Modal} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import {NewWellbeingChartModal} from '../components/wellbeing/newChartModal/newWellbeingChartModal';
import {wellbeingData, updateWellbeingData} from '../components/wellbeing/wellbeingData';
import WellbeingDatePicker from '../components/wellbeing/calendar/wellbeingDatePicker';
import {getCurrentDate} from '../components/wellbeing/calendar/calendarControls'
import {handlePreviousDay, handleNextDay, savedCalendarData} from '../components/wellbeing/calendar/calendarControls';
import TabBar from '../components/tabBar'
import Feedback from '../components/wellbeing/feedback'
import WellbeingChart from '../components/wellbeing/wellbeingChart'

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
          <View style={styles.headerRow}>
            <View style={styles.headerRowLeft}>
              {/* Return to Home Dashboard Button */}
              <TouchableOpacity style={styles.goBackHomeButton} onPress={() => goBackScreen()}>  
                <Ionicons name="chevron-back" size={SCREEN_HEIGHT/20} color="black"/>
              </TouchableOpacity>

              {/* Title */}
              <Text style={styles.titleText}> Wellbeing Chart</Text>
            </View>

            {/* Update Wellbeing Chart Button. When pressed, set isNewChartModalVisible to true for modal to appear.*/}
            <TouchableOpacity onPress={() => {newChartModalVisible(true)}} style={styles.newButtonWrapper}> 
              <Ionicons name="add" size={35} color="black" style={styles.newButton}/>
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
          <View style={styles.dateControlBar}>

            <View style={styles.leftControlBar}></View>

            <View style={styles.middleControlBar}>
              {/* Previous Day Button */}   
              <TouchableOpacity style={styles.goBackHomeButton} onPress={() => handlePreviousDay(selectedDate, setSelectedDate)}>
                <Entypo name="chevron-left" size={SCREEN_HEIGHT/20} color="black" />
              </TouchableOpacity>

              {/* Display Selected Date */}
              <TouchableOpacity onPress={() => setCalendarVisible(true)}>
                <Text style={styles.dateText}>{selectedDate}</Text>
              </TouchableOpacity>
              
              {/* Next Day Button */}
              <TouchableOpacity style={styles.goBackHomeButton} onPress={() => handleNextDay(selectedDate, setSelectedDate)}>
              <Entypo name="chevron-right" size={SCREEN_HEIGHT/20} color="black" />
              </TouchableOpacity>
            </View>

            <View style={styles.rightControlBar}>
              {/* Calendar Button. Open calendar modal when pressed. */}
              <TouchableOpacity style={styles.calendarButton} onPress={() => setCalendarVisible(true)}>
                <AntDesign name="calendar" size={SCREEN_HEIGHT/25} color="black" />
              </TouchableOpacity>
            </View>

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
        
          {/* --------------- WELLBEING CHART (bar chart) --------------- */}
          <View style={styles.chartWrapper}>
            <WellbeingChart sizeBig={true}/>
          </View>
          {/* ------------------------------------------------ */}

          <View style={styles.lineDivider}></View>

          {calendarData[selectedDate] === undefined || calendarData[selectedDate] === null ? (
              <View style={styles.noFeedbackWrapper}>
                <Text style={styles.noFeedbackHeaderText}>No Feedback...</Text>
                <Text style={styles.noFeedbackSubheaderText}>Update your well-being today by creating a new chart</Text>
                <Image source={require('../assets/images/wellbeing/noWellbeingChart.jpg')} style={styles.noFeedbackImage}/>
              </View>  
            ): (
              <View style={styles.feedbackWrapper}>
                <Feedback 
                  ratings={calendarData[selectedDate]}
                />
              </View>
            )}
          
        </View>

        <TabBar navigation={navigation}/>

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { // screen container
    flex: 1, 
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  wrapper: { 
    width: '93%',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerRow: {
    width: '100%',
    paddingTop: SCREEN_HEIGHT/15,
    paddingBottom: SCREEN_HEIGHT/40,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  headerRowLeft: { // back arrow and wellbeing chart header text
    flexDirection: 'row',
  },
  titleText: {
    fontSize: SCREEN_HEIGHT/30,
    fontWeight: '500',
  },
  newButtonWrapper: { // new chart button wrapper
    width: SCREEN_WIDTH/8,
    height: SCREEN_WIDTH/8,
    borderRadius: 10,
    borderWidth: 3,
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dateControlBar: { // calendar date bar 
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: SCREEN_HEIGHT/90,
    borderRadius: 12,
    backgroundColor: 'white',
    elevation: 5,
  },
  leftControlBar: { // previous day button
    flex: 1, 
  },
  middleControlBar: { // current date
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  rightControlBar: { // next day button
    flex: 1, 
    alignItems: 'center',
  },
  dateText: { // current selected date 
    fontSize: SCREEN_HEIGHT/38,
    paddingHorizontal: SCREEN_WIDTH/10,
  },
  chartWrapper: {
    width: '100%',
  },
  chart: { // bar graph
    width: '100%',
    paddingHorizontal: 10,
  },
  iconRowContainer: { // aspect icons below graph (x-axis)
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    paddingLeft: SCREEN_WIDTH/4.9,
    top: -SCREEN_HEIGHT/30,
  },
  lineDivider: { // line divider below chart
    width: '100%',
    height: SCREEN_HEIGHT/500,
    marginTop: SCREEN_HEIGHT/80,
    backgroundColor: '#D1D1D1',
  },
  noFeedbackWrapper: { // wrapper when no chart
    flex: 1,
    alignItems: 'center',
    width: '80%',
  },
  noFeedbackHeaderText: {
    fontWeight: '500',
    fontSize: SCREEN_HEIGHT/35,
  },
  noFeedbackSubheaderText: {
    textAlign: 'center',
    fontWeight: '400',
    color: '#9B9B9B',
  },
  noFeedbackImage: { // Image displays when no feedback
    resizeMode: 'contain',
    height: SCREEN_HEIGHT/4,
    width: SCREEN_WIDTH/2,
    
  },
  feedbackWrapper: { // wrapper when feedback exist
    flex: 1,
    width: '100%',
  },
});


export default WellBeingScreen;