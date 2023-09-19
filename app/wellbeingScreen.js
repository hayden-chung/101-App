import React, {useState} from 'react';
import { StyleSheet, View, Text, Image, Dimensions, SafeAreaView, TouchableOpacity, Modal} from 'react-native';
import {BarChart, PieChart, ContributionGraph} from 'react-native-chart-kit'; // charts from third party library.
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import {NewWellbeingChartModal} from '../components/wellbeing/newChartModal/newWellbeingChartModal';
import {wellbeingData, updateWellbeingData} from '../components/wellbeing/wellbeingData';
import WellbeingDatePicker from '../components/wellbeing/calendar/wellbeingDatePicker';
import {getCurrentDate} from '../components/wellbeing/calendar/calendarControls'
import {handlePreviousDay, handleNextDay, updateCalendarData, savedCalendarData} from '../components/wellbeing/calendar/calendarControls';
import TabBar from '../components/tabBar'
import Feedback from '../components/wellbeing/feedback'

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = (Dimensions.get('window').height);
const ICON_SIZE = SCREEN_WIDTH/17

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

  const formatDateForControlBar = () => {
    let formattedDate = new Date(new Date(selectedDate))

  }
  const date = new Date("Wed Sep 20 2023 12:00:00 GMT+1200");
  console.log('selectedDate: ' + selectedDate)
  console.log(calendarData[selectedDate] )

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
        
          {/* --------------- WELLBEING CHART (Pie Chart) --------------- */}
          <View style={styles.chartWrapper}>
            <Text style={styles.chartTitleText}>My Wellbeing</Text>
            <BarChart
              data={wellbeingData} // import wellbeing data to display 
              width={SCREEN_WIDTH/1.2} // width of chart
              height={SCREEN_HEIGHT/3.5}                    // height of chart
              yAxisLabel={''}                 // to put in fron of y axis labels (e.g. '$')
              verticalLabelRotation={-20}     // rotate y axis labels.
              fromZero={true}                 // start y axis from 0
              showBarTops={false}
              chartConfig={chartConfig}
              fromNumber={10}       
              yAxisInterval={3}       
              style={styles.chart}
            />
            <View style={styles.iconRowContainer}>
              <Entypo name={'suitcase'} size={ICON_SIZE} color="#3a46bf" />
              <MaterialIcons name={'fitness-center'} size={ICON_SIZE} color="orange" />
              <FontAwesome5 name="coffee" size={ICON_SIZE} color="#50bfd1" />
              <Entypo name={'chat'} size={ICON_SIZE} color="#9e32db" />
              <MaterialCommunityIcons name={'power-sleep'} size={ICON_SIZE} color="#f0ca00" />
              <MaterialCommunityIcons name={'head-cog'} size={ICON_SIZE} color="#21a177" />
            </View>
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

const barColor = '#87c0ff';

const chartConfig = {
  backgroundGradientFrom: 'white',
  backgroundGradientTo: 'white',
  fillShadowGradientFrom: barColor,
  fillShadowGradientFromOpacity: 1,
  fillShadowGradientTo: barColor,
  fillShadowGradientToOpacity: 1,
  color: () => 'white',
  labelColor: () => barColor,
  barPercentage: 1,
  barRadius: 10,
  propsForBackgroundLines: { // background stroke line
    stroke: barColor, 
    strokeWidth: 0.2,
    strokeDasharray: null,
  },
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
  headerRowLeft: {
    flexDirection: 'row',
  },
  titleText: {
    fontSize: SCREEN_HEIGHT/30,
    fontWeight: '500',
  },
  newButtonWrapper: {
    width: SCREEN_WIDTH/8,
    height: SCREEN_WIDTH/8,
    borderRadius: 10,
    borderWidth: 3,
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dateControlBar: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: SCREEN_HEIGHT/90,
    borderRadius: 12,
    backgroundColor: 'white',
    elevation: 5,
  },
  leftControlBar: {
    flex: 1, 
  },
  middleControlBar: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  rightControlBar: {
    flex: 1, 
    alignItems: 'center',
  },
  dateText: {
    fontSize: SCREEN_HEIGHT/38,
    paddingHorizontal: SCREEN_WIDTH/10,
  },
  calendarButton: {
    
  },
  chartWrapper: {
    alignItems: 'center',
    width: '100%',
    marginTop: SCREEN_HEIGHT/70,
    paddingRight: SCREEN_WIDTH/20,
    backgroundColor: 'white',
    borderRadius: 12,
    elevation: 5,
  },
  chartTitleText: {
    fontSize: SCREEN_HEIGHT/35,
    fontWeight: '500',
  },
  chart: {
    width: '100%',
    paddingHorizontal: 10,
  },
  iconRowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    paddingLeft: SCREEN_WIDTH/4.9,
    top: -SCREEN_HEIGHT/30,
  },
  newButton: {
    
  },
  lineDivider: {
    width: '100%',
    height: SCREEN_HEIGHT/500,
    marginTop: SCREEN_HEIGHT/80,
    backgroundColor: '#D1D1D1',
  },
  noFeedbackWrapper: {
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
  noFeedbackImage: {
    resizeMode: 'contain',
    height: SCREEN_HEIGHT/4,
    width: SCREEN_WIDTH/2,
    
  },
  feedbackWrapper: {
    flex: 1,
    width: '100%',
  },
});


export default WellBeingScreen;