import React, {useState} from 'react';
import { KeyboardAvoidingView, StyleSheet, Text, View, TextInput, Dimensions} from 'react-native';
import {getRandomQuote} from '../motivationalQuotes/quoteList&Controls'
import WellbeingChart from '../wellbeing/wellbeingChart';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

const MiniWellbeingScreen = ({navigation}) => { // wellbeing screen in home screen
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