import React, {useState, useEffect, useCallback } from 'react';
import { useFonts } from 'expo-font';
import { KeyboardAvoidingView, StyleSheet, Text, View, TextInput, TouchableOpacity, Keyboard, Dimensions} from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import Timer from '../components/timer/timer'
import Stopwatch from '../components/timer/stopwatch';
import PomodoroTimer from '../components/timer/pomodoro';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

const TimerScreen = ({navigation}) => { 

    const [activeTab, setActiveTab] = useState('stopwatch')

    const [fontsLoaded] = useFonts({
        "OpenSans-Regular": require("../assets/fonts/OpenSans-Regular.ttf")
    });

    useEffect(() => {
        async function prepare() {
            await SplashScreen.preventAutoHideAsync();
        }
        prepare();
    }, [])

    if (!fontsLoaded) {
        return undefined;
    } else {
        SplashScreen.hideAsync();
    }

    return(
        <View style={styles.container}>


            <View style={styles.tabContainer}>
                <TouchableOpacity style={activeTab === 'stopwatch' ? styles.selectedTab : styles.notSelectedTab} onPress={() => setActiveTab('stopwatch')}>
                    <Text style={activeTab === 'stopwatch' ? styles.selectedTabText : styles.notSelectedTabText}>Stopwatch</Text>
                </TouchableOpacity>

                <TouchableOpacity style={activeTab === 'timer' ? styles.selectedTab : styles.notSelectedTab} onPress={() => setActiveTab('timer')}>
                    <Text style={activeTab === 'timer' ? styles.selectedTabText : styles.notSelectedTabText}>Timer</Text>
                </TouchableOpacity>

                <TouchableOpacity style={activeTab === 'pomodoro' ? styles.selectedTab : styles.notSelectedTab} onPress={() => setActiveTab('pomodoro')}>
                    <Text style={activeTab === 'pomodoro' ? styles.selectedTabText : styles.notSelectedTabText}>Pomodoro</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.timerComponentContainer}> 
                {(() => {
                    if (activeTab === 'timer'){
                        return <Timer/>;
                    } else if (activeTab === 'stopwatch'){
                        return <Stopwatch/>
                    } else if (activeTab === 'pomodoro'){
                        return <PomodoroTimer/>
                    } else {
                        return null;
                    }
                })()}
            </View>
        </View>
    )
}

const textBlack = '#161A25' // modern black text color
const textGray = '#B1B3B9'  // modern gray text color

const styles = StyleSheet.create({
    container: { // whole screen
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'red',
    },
    
    tabContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        width: SCREEN_WIDTH/1.1,
        height: SCREEN_HEIGHT/14,
        top: -SCREEN_HEIGHT/12,

        borderRadius: 10000,
        paddingHorizontal: SCREEN_WIDTH/60,
        backgroundColor: 'white',
        
        // Shadow (Android)
        elevation: 10,

        // iOS 
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
    },

    timerComponentContainer: { // container cosists of timer component (timer/countdown/pomodoro)
        width: SCREEN_WIDTH/1.2,
        height: SCREEN_HEIGHT/2.2,
        backgroundColor: 'red',
    },

    selectedTab: {
        justifyContent: 'center',
        alignItems: 'center',
        width: (SCREEN_WIDTH/1.1-SCREEN_WIDTH/21)/3,
        height: SCREEN_HEIGHT/18,
        borderRadius: 10000,
        elevation: 10,
        backgroundColor: 'white',
    },

    notSelectedTab: {
        justifyContent: 'center',
        alignItems: 'center',
        width: (SCREEN_WIDTH/1.1-SCREEN_WIDTH/21)/3,
    },

    selectedTabText: {
        color: textBlack,
        fontFamily: 'OpenSans-Regular',
    },

    notSelectedTabText: {
        color: textGray,
        fontFamily: 'OpenSans-Regular',
    },

});

export default TimerScreen;