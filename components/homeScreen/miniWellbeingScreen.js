import React, {useState, useEffect} from 'react';
import { KeyboardAvoidingView, StyleSheet, Text, View, TextInput, Dimensions} from 'react-native';
import {getRandomQuote} from '../motivationalQuotes/quoteList&Controls'
import WellbeingChart from '../wellbeing/wellbeingChart';
import {updateWellbeingData} from '../wellbeing/wellbeingData'
import {savedCalendarData} from '../wellbeing/calendar/calendarControls';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

const MiniWellbeingScreen = ({navigation}) => { // wellbeing screen in home screen

    updateWellbeingData(new Date().toISOString().split('T')[0], savedCalendarData) 

    useEffect(() => { // refresh code whenever navigation changes. 
    
        return () => {
        };
      }, [navigation]);

    return(
        <View style={styles.container}>       
                <WellbeingChart sizeBig={false}/>
        </View>

    )
}

const styles = StyleSheet.create({
    container: { // style it according appropriate widht in home dashboard. 
        flex: 1,
        padding: SCREEN_WIDTH/50,
        top: -SCREEN_HEIGHT/50,
    },

});

export default MiniWellbeingScreen;