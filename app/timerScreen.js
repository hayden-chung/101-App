import React, {useState, useEffect, useCallback } from 'react';
import { useFonts } from 'expo-font';
import { KeyboardAvoidingView, StyleSheet, Text, View, TextInput, TouchableOpacity, Keyboard, Dimensions} from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import Timer from '../components/timer/timer'
import Stopwatch from '../components/timer/stopwatch';
import PomodoroTimer from '../components/timer/pomodoro';
import TabBar from '../components/tabBar'

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

const TimerScreen = ({navigation}) => { // Timer Screen (Timer, Stopwatch, Pomodoro)

    const [activeTab, setActiveTab] = useState('stopwatch') // current timer

    // --- Load Font --- //
    const [fontsLoaded] = useFonts({ // load font from file
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
    // ---------------- //

    return(
        <View style={styles.container}>

            <View style={styles.wrapper}>

                {/* Timer Selection Tab (stopwatch, timer, pomodoro) */}
                <View style={styles.tabContainer}>

                    {/* Stopwatch */}
                    <TouchableOpacity style={activeTab === 'stopwatch' ? styles.selectedTab : styles.notSelectedTab} onPress={() => setActiveTab('stopwatch')}>
                        <Text style={activeTab === 'stopwatch' ? styles.selectedTabText : styles.notSelectedTabText}>Stopwatch</Text>
                    </TouchableOpacity>

                    {/* Timer */}
                    <TouchableOpacity style={activeTab === 'timer' ? styles.selectedTab : styles.notSelectedTab} onPress={() => setActiveTab('timer')}>
                        <Text style={activeTab === 'timer' ? styles.selectedTabText : styles.notSelectedTabText}>Timer</Text>
                    </TouchableOpacity>

                    {/* Pomodoro */}
                    <TouchableOpacity style={activeTab === 'pomodoro' ? styles.selectedTab : styles.notSelectedTab} onPress={() => setActiveTab('pomodoro')}>
                        <Text style={activeTab === 'pomodoro' ? styles.selectedTabText : styles.notSelectedTabText}>Pomodoro</Text>
                    </TouchableOpacity>
                </View>

                {/* Main timer component */}
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

            <TabBar navigation={navigation}/>
        </View>
    )
}

const textBlack = '#161A25' // modern black text color
const textGray = '#B1B3B9'  // modern gray text color
const modernWhite = '#EBEEF6'

const styles = StyleSheet.create({
    container: { // whole screen
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    },
    wrapper: { // available space
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: SCREEN_HEIGHT/10,
    },
    tabContainer: { // selection tab container
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        width: SCREEN_WIDTH/1.1,
        height: SCREEN_HEIGHT/14,
        marginBottom: SCREEN_HEIGHT/40,
        borderRadius: 10000,
        paddingHorizontal: SCREEN_WIDTH/60,
        backgroundColor: 'white',
        
        // Shadow (Android)
        elevation: 10,
    },

    timerComponentContainer: { // container cosists of timer component (timer/countdown/pomodoro)
        width: SCREEN_WIDTH/1.1,
        height: SCREEN_HEIGHT/1.4,
    },

    selectedTab: { // selected tab has a popout effect. 
        justifyContent: 'center',
        alignItems: 'center',
        width: (SCREEN_WIDTH/1.1-SCREEN_WIDTH/21)/3,
        height: SCREEN_HEIGHT/18,
        borderRadius: 10000,
        elevation: 10,
        backgroundColor: 'white',
    },
    notSelectedTab: { // other tabs (not selected)
        justifyContent: 'center',
        alignItems: 'center',
        width: (SCREEN_WIDTH/1.1-SCREEN_WIDTH/21)/3,
    },
    selectedTabText: { // text of selected tab
        color: textBlack,
        fontFamily: 'OpenSans-Regular',
    },
    notSelectedTabText: { // text of not selected tab 
        color: textGray,
        fontFamily: 'OpenSans-Regular',
    },
    pushToBottom: { // for tab bar to go bottom. 
        flex: 1,    
    },

});

export default TimerScreen;