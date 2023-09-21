import React from 'react';
import { StyleSheet, View, Text, Dimensions} from 'react-native';
import {BarChart } from 'react-native-chart-kit'; // charts from third party library.
import {wellbeingData} from './wellbeingData';
import { Entypo } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = (Dimensions.get('window').height);
const ICON_SIZE = SCREEN_WIDTH/17

const WellbeingChart = ({sizeBig}) => { // main function for wellbeing screen  
  
  return (
          
    <View style={[sizeBig ? { ...styles.chartWrapperLarge, transform: [{ scale: 1 }] } : { ...styles.chartWrapperSmall, transform: [{ scale: 0.8 }] }]}>
            {/* --------------- WELLBEING CHART (Bar Graph) --------------- */}
            <Text style={sizeBig ? styles.chartTitleTextBig : styles.chartTitleTextSmall}>My Wellbeing</Text>
            <BarChart
              data={wellbeingData} // import wellbeing data to display 
              width={SCREEN_WIDTH/1.1} // width of chart
              height={sizeBig? SCREEN_HEIGHT/3.5 : SCREEN_HEIGHT/4}                    // height of chart
              yAxisLabel={''}                 // to put in fron of y axis labels (e.g. '$')
              verticalLabelRotation={-20}     // rotate y axis labels.
              fromZero={true}                 // start y axis from 0
              showBarTops={false}
              chartConfig={chartConfig}
              fromNumber={10}       
              yAxisInterval={1}  
              style={styles.chart}
            />
            <View style={sizeBig ? styles.iconRowContainerLarge: styles.iconRowContainerSmall}>
              <Entypo name={'suitcase'} size={ICON_SIZE} color="#3a46bf" />
              <MaterialIcons name={'fitness-center'} size={ICON_SIZE} color="orange" />
              <FontAwesome5 name="coffee" size={ICON_SIZE} color="#50bfd1" />
              <Entypo name={'chat'} size={ICON_SIZE} color="#9e32db" />
              <MaterialCommunityIcons name={'power-sleep'} size={ICON_SIZE} color="#f0ca00" />
              <MaterialCommunityIcons name={'head-cog'} size={ICON_SIZE} color="#21a177" />
            </View>
            {/* ------------------------------------------------ */}
          </View>

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
  barPercentage: 0.8,
  barRadius: 10,
  propsForBackgroundLines: { // background stroke line
    stroke: barColor, 
    strokeWidth: 0.2,
    strokeDasharray: null,
  },
};

const styles = StyleSheet.create({
  chartWrapperLarge: {
    overflow: 'hidden',
    alignItems: 'center',
    width: '100%',
    marginTop: SCREEN_HEIGHT/70,
    paddingRight: SCREEN_WIDTH/20,
    paddingTop: SCREEN_HEIGHT/60,
    backgroundColor: 'white',
    borderRadius: 12,
    elevation: 5,
  },
  chartWrapperSmall: {
    alignItems: 'center',
    width: '100%',
    marginTop: SCREEN_HEIGHT/70,
    paddingRight: SCREEN_WIDTH/20,
    paddingLeft: SCREEN_WIDTH/12,
    paddingTop: SCREEN_HEIGHT/90,
    top: -SCREEN_HEIGHT/19,
    backgroundColor: 'white',
    borderRadius: 12,
  },
  chartTitleTextBig: {
    fontSize: SCREEN_HEIGHT/35,
    fontWeight: '500',
  },
  chartTitleTextSmall:{
    width: '100%',
    fontSize: SCREEN_HEIGHT/29,
    fontWeight: '500',
    color: '#95baff',
  },
  chart: {
    width: '100%',
    paddingHorizontal: 10,
    right: SCREEN_WIDTH/15,
  },
  iconRowContainerLarge: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingLeft: SCREEN_WIDTH/5.5,
    paddingRight: SCREEN_WIDTH/40,
    top: -SCREEN_HEIGHT/30,
    backgroundColor: 'white',
  },
  iconRowContainerSmall: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: SCREEN_WIDTH/1,
    paddingLeft: SCREEN_WIDTH/7.5,
    paddingRight: SCREEN_WIDTH/8.8,
    top: -SCREEN_HEIGHT/39,
  },

});


export default WellbeingChart;