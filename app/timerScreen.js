import React, {useState} from 'react';
import { KeyboardAvoidingView, StyleSheet, Text, View, TextInput, TouchableOpacity, Keyboard, Dimensions} from 'react-native';
import Timer from '../components/timer/timer'
import Stopwatch from '../components/timer/stopwatch';
import PomodoroTimer from '../components/timer/pomodoro';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

const TimerScreen = ({navigation}) => { 
    return(
        <View style={styles.container}>
            <View style={styles.timerComponentContainer}>
                <PomodoroTimer />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    timerComponentContainer: {
        width: SCREEN_WIDTH/1.2,
        height: SCREEN_HEIGHT/2.2,
    },
});

export default TimerScreen;