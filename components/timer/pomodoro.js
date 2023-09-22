import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity, Dimensions, TextInput} from 'react-native';
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer';
import { Feather } from '@expo/vector-icons';
import {triggerVibration} from '../vibration';
import {vibration} from '../settings/vibrationState'

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

const PomodoroTimer = () => { // Pomodoro timer function. 
  const [workMinutes, setWorkMinutes] = useState(null); // Initial time in minutes
  const [breakMinutes, setBreakMinutes] = useState(null);
  const [timerDuration, setTimerDuration] = useState(0); // Initial time in seconds
  const [sessionsCount, setSessionsCount] = useState(1); // number of pomodoro sessions. 
  const [workOrBreak, setWorkOrBreak] = useState(null);
  const [isActive, setIsActive] = useState(false); // has timer been started
  const [isReset, setIsReset] = useState(true); // indicate when time setter can appear or not. false = timer is runnning
  const [key, setKey] = useState(0);
  
  const toggleTimer = () => { // If start button pressed, change to pause. Vice versa
    setIsActive(!isActive); // inverse boolean state. 
    setIsReset(false) // Indicate that timer is running now and not reset. 
  };

  const resetTimer = () => { // set reset to true to indicate timer is reset. 
    setIsReset(true)
    setKey(prevKey => prevKey + 1) // To reset countdown timer back to its intial time value. 
    setIsActive(false); // Timer is not active (running) anymore
    setSessionsCount(1) 
  };

  const skipSession = () => { // during break session, if skip button is pressed, skip timer to focus mode. 
    if (workOrBreak === 'break') {
        setKey(prevKey => prevKey + 1)
        if (vibration) {
            triggerVibration(false)
        }
        setSessionsCount(previousCount => previousCount + 1) 
    }
  }

  const formatTime = ({ remainingTime }) => { // Format the countdown timer into 'hour:min:seconds' time. 
    
    // Get remaining time of current session
    let remainingTimeForThisSession = 0
    if (workOrBreak === 'work') {
        remainingTimeForThisSession = remainingTime - (breakMinutes * 60);
    }
    if (workOrBreak === 'break') {
        remainingTimeForThisSession = remainingTime;
    }

    // Find hours, minutes and seconds
    const hours = Math.floor(remainingTimeForThisSession / 3600)
    const minutes = Math.floor((remainingTimeForThisSession % 3600) / 60)
    const seconds = remainingTimeForThisSession % 60

    // Format time values. e.g. if seconds = 2, display 02 instead of 2. 
    const formattedHours = String(hours).padStart(2, '0');
    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(seconds).padStart(2, '0');

    return `${formattedHours}:${formattedMinutes}:${formattedSeconds}` // return: hr:min:sec
  }

  const handleInputChange = (num, workOrBreak) => { // When text box (sec, min, hr) changes. 
    
    let timeValue = num.replace(/[^0-9]/g, '').slice(0, 3); // Filter out non-numeric characters. Maximum of 2 numeric characters. 
    
    // Update work or break time. 
    if (workOrBreak === 'work') { 
        setWorkMinutes(timeValue);
    }
    else if (workOrBreak === 'break') {
        setBreakMinutes(timeValue);
    }

  };

  useEffect(() => { // when minutes is changed, update timer duration.
    updateTimerDuration()
  }, [workMinutes, breakMinutes])


    const updateTimerDuration = () => { // Set new duration of time (work or break).

        const isIntergerNumbers = (value) => { // Function to check if value = integer
            let intValue = parseInt(value, 10) // parseInt = convert to integer

            if (!isNaN(intValue)) { // if not a 'none' type:
                return true
            } else {
                return false
            }
        }

        if (isIntergerNumbers(workMinutes) && isIntergerNumbers(breakMinutes)) { // if both workMinutes and breakMinutes are valid
            setTimerDuration(parseInt(workMinutes*60) + parseInt(breakMinutes*60))
        } 
        else if (isIntergerNumbers(workMinutes) && isIntergerNumbers(breakMinutes) === false) { // if only workMinutes is valid
            setTimerDuration(parseInt(workMinutes*60))
        }
        else if (isIntergerNumbers(workMinutes) === false && isIntergerNumbers(breakMinutes)) { // if only breakMinutes is valid
            setTimerDuration(parseInt(breakMinutes*60))
        }
        else if (isIntergerNumbers(workMinutes) === false && isIntergerNumbers(breakMinutes) === false){ // if both are not valid
            setTimerDuration(0)
        }
    }

  return (
    <View style={styles.container}>

        <View style={styles.timerBackgroundCircle}>
            <View style={styles.countdownTimer}>
                <CountdownCircleTimer
                    key={key}
                    isPlaying={isActive}
                    duration={timerDuration} // initial time 
                    colors={['#8A9AD4', '#008000', '#008000']}
                    colorsTime={[timerDuration, (parseInt(breakMinutes)*60), 0]} // in seconds 
                    strokeWidth={12}
                    trailStrokeWidth={12}
                    trailColor='#FDFEFF'
                    isSmoothColorTransition={false} // smooth color transition
                    size={SCREEN_WIDTH/1.24} // circumference (width/height) of circle timer. 
                    onUpdate={(remainingTime) => { // current status: work or break?
                        if (remainingTime > (parseInt(breakMinutes)*60)) { // if remaining time is greater than the break time, set status to work. 
                            setWorkOrBreak('work')
                        }
                        else if (remainingTime <= (parseInt(breakMinutes)*60)) { // if remaining time is less or equal to the break time, set status to break. 
                            setWorkOrBreak('break')
                        }

                    }}

                    onComplete={() => { // When Timer is Over
                        setKey(prevKey => prevKey + 1)
                        if (vibration) {
                            triggerVibration(false)
                        }
                        setSessionsCount(previousCount => previousCount + 1)
                    }}
                >
                    {/* Display 'hour:min:seconds' format */}
                    {({ remainingTime }) => <Text style={styles.timerTimeText}>{formatTime({remainingTime})}</Text>} 
                </CountdownCircleTimer>
                
                {/* Has timer reset? */}
                {isReset ? (

                // Set Time & display duration of one cycle
                <View style={styles.containerInsideTimer}>

                    {/* Container of time input boxes */}
                    <View style={styles.setTimeContainer}>

                        <View style={styles.setTimeColumn}>
                            <View style={styles.setTimeBoxWork}>
                                    {/* Work (minutes) */}
                                    <TextInput 
                                        style={styles.textInput} 
                                        placeholder="00"
                                        value={workMinutes} 
                                        onChangeText={num => handleInputChange(num, 'work')}
                                        keyboardType="numeric"
                                        editable={!isActive}
                                    />
                                    <Text style={styles.timeUnitText}>Minutes</Text>
                            </View>
                            <Text style={styles.timeInputLabelWork}>WORK</Text>
                        </View>

                        <View style={styles.setTimeColumn}>
                            <View style={styles.setTimeBoxBreak}>
                                    {/* Work (minutes) */}
                                    <TextInput 
                                        style={styles.textInput} 
                                        placeholder="00"
                                        value={breakMinutes} 
                                        onChangeText={num => handleInputChange(num, 'break')}
                                        keyboardType="numeric"
                                        editable={!isActive}
                                    />
                                    <Text style={styles.timeUnitText}>Minutes</Text>
                            </View>
                            <Text style={styles.timeInputLabelBreak}>BREAK</Text>
                        </View>

                    </View>

                    <View style={{maxWidth: SCREEN_WIDTH/1.8}}>
                        { !isActive && !(parseInt(workMinutes)) > 0 || !isActive && !(parseInt(breakMinutes)) > 0 ? (
                            <Text style={{fontSize: SCREEN_HEIGHT/65, textAlign: 'center', color: '#808080', top:SCREEN_HEIGHT/55}}>
                            Enter a time in both 'WORK' and 'BREAK' to start the timer
                            </Text>
                        ): null}
                    </View>

                    <View style={styles.totalCycleTime}>
                        <Text style={styles.totalCycleTimeText}>One Cycle = {timerDuration/60}min</Text>
                    </View>
                </View>


                
                ): null}

            </View>

            {isReset === false ? ( // If reset is not true
                <View style={styles.workOrBreakLabelContainer}>
                    <Text style={styles.workOrBreakLabelText}> {workOrBreak === 'work' ? ( 'FOCUS MODE' ) : 'REST'} </Text>
                    <Text style={styles.remainingTimeText}> Pomodoro # : {sessionsCount} </Text>
                </View>
            ): null}
    
        </View>
        
        <View style={styles.buttonRow}>

            {/* Reset Button */}
            <TouchableOpacity style={ workOrBreak === 'break' 
                ? styles.resetButtonSmall
                : styles.resetButtonLarge
                } 
                onPress={resetTimer}>
                <Text style={styles.resetText}>Reset</Text>
            </TouchableOpacity >

            {/* Skip Button. when pressed, skip from break to work*/}
            {workOrBreak === 'break' && isActive ? (
            <TouchableOpacity style={styles.skipButton} onPress={skipSession}>
                <Feather name="skip-forward" size={24} color="white" />
                <Text style={styles.skipText}>Skip</Text>
            </TouchableOpacity >
            ):
            null}

            {/* Start/Pause Button. Only display when both work and break minutes have a valid time. */}
            <TouchableOpacity style={parseInt(breakMinutes) > 0 && parseInt(workMinutes) > 0 
                ? workOrBreak === 'work' 
                    ? styles.startOrPauseButtonLarge 
                    : styles.startOrPauseButtonSmall
                : styles.startNotReady
                } 
                disabled={!(parseInt(breakMinutes) > 0 && parseInt(workMinutes) > 0)} onPress={toggleTimer}>
            <Text style={styles.startOrPauseText}>{isActive ? 'Pause' : 'Start'} </Text>
            </TouchableOpacity>

        </View>
    </View>
  );
};

const TIMER_BACKGROUND_COLOR = '#FDFEFF'
const TIME_INPUT_BOX_WIDTH = SCREEN_WIDTH/4.4;
const TIME_INPUT_BOX_HEIGHT = SCREEN_HEIGHT/8;
const BUTTON_WIDTH_LARGE = SCREEN_WIDTH/3;
const BUTTON_WIDTH_SMALL = SCREEN_WIDTH/3.9;
const BUTTON_HEIGHT = SCREEN_HEIGHT/12;
const BUTTON_BORDER_RADIUS = SCREEN_WIDTH/15;
const textBlack = '#161A25' // modern black text color
const textGray = '#161A25'  // modern gray text color
const modernWhite = '#EBEEF6'


const styles = StyleSheet.create({
    container:{ // main container. consists of all timer components. 
        flex: 1, 
        justifyContent: 'flex-start', 
        alignItems: 'center',
        backgroundColor: 'white',
    },
    timerBackgroundCircle: { // back white circle of timer. 
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        width: SCREEN_WIDTH/1.15,
        height: SCREEN_WIDTH/1.15,
        borderRadius: 1000,
        zIndex: 0,
        elevation: 7,
        backgroundColor: TIMER_BACKGROUND_COLOR,

    },
    countdownTimer: { // timer container (timer, start, pause)
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1,
        elevation: 10,
    },
    timerTimeText: { // remaining time
        fontSize: SCREEN_HEIGHT/20,
    },
    containerInsideTimer: { // container and components inside timer. 
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems:'center',
        position: 'absolute',
        zIndex: 2,
    },
    setTimeContainer: { // conatiner for text input and text of: hours, minutes, seconds. 
        flexDirection: 'row',
        alignItems:'center',
        zIndex: 2,
        backgroundColor: 'white',
    },
    setTimeColumn: { // column for time text and time text input
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    setTimeBoxWork: { // Time input box for work
        justifyContent: 'center',
        alignItems: 'center',
        width: TIME_INPUT_BOX_WIDTH,
        height: TIME_INPUT_BOX_HEIGHT,
        marginRight: SCREEN_WIDTH/22,
        borderRadius: SCREEN_HEIGHT/45,
        elevation: 5,
        backgroundColor: 'white',
    },
    setTimeBoxBreak: { // Time input box for break.
        justifyContent: 'center',
        alignItems: 'center',
        width: TIME_INPUT_BOX_WIDTH,
        height: TIME_INPUT_BOX_HEIGHT,
        marginLeft: SCREEN_WIDTH/22,
        borderRadius: SCREEN_HEIGHT/45,
        elevation: 5,
        backgroundColor: 'white',
    },
    textInput: { // Style text input boxes. 
        fontWeight: '500',
        width: '100%',
        height: SCREEN_HEIGHT/13,
        fontSize: SCREEN_WIDTH/13,
        textAlign: 'center',
    },
    timeUnitText: { // displays 'minutes' below time inpput
        fontSize: SCREEN_WIDTH/27,
        fontWeight: '400',
        color: '#B1B3B9',
    },
    timeInputLabelWork: { // WORK label below time input box. 
        marginTop: SCREEN_HEIGHT/60,
        marginRight: SCREEN_WIDTH/22,
        color: '#808080', 
    },
    timeInputLabelBreak: { // BREAK label below time input box. 
        marginTop: SCREEN_HEIGHT/60,
        marginLeft: SCREEN_WIDTH/22,
        color: '#808080', 
    },
    totalCycleTime: { // container for total cycle time
        flexDirection: 'column',
        justifyContent: 'flex-end',
        alignItems:'center',
        top: SCREEN_HEIGHT/30,
        zIndex: 2,
    },
    totalCycleTimeText: { // total cycle text
        color: '#808080',
    },
    remainingTimeText: { // displays remaining time of timer
        color: '#B4B4B4',
        fontSize: SCREEN_HEIGHT/60,
    },
    workOrBreakLabelContainer: { // container of work and break label 
        flexDirection: 'column',
        alignItems: 'center',
        bottom: SCREEN_HEIGHT/11,
        zIndex: 2,
        position: 'absolute',
    },
    workOrBreakLabelText: { // Text displays work or break 
        marginBottom: SCREEN_HEIGHT/60,
        color: '#808080',
        fontSize: SCREEN_HEIGHT/35,
        fontWeight: '400',
    },

    // ---- BUTTONS ---- //
    buttonRow: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        marginTop: SCREEN_HEIGHT/20,
    },
    startNotReady: { // Pause/Start button. 
        justifyContent: 'center',
        alignItems: 'center',
        width: BUTTON_WIDTH_LARGE,
        height: BUTTON_HEIGHT,
        borderRadius: BUTTON_BORDER_RADIUS,
        backgroundColor: '#BEE6BE',
        elevation: 4,
    },

    // Start/Pause
    startOrPauseButtonLarge: { // Start/Pause button. 
        justifyContent: 'center',
        alignItems: 'center',
        width: BUTTON_WIDTH_LARGE,
        height: BUTTON_HEIGHT,
        borderRadius: BUTTON_BORDER_RADIUS,
        backgroundColor: '#8a8fd4ff',
        elevation: 4,
    },
    startOrPauseButtonSmall: { // Start/Pause button. 
        justifyContent: 'center',
        alignItems: 'center',
        width: BUTTON_WIDTH_SMALL,
        height: BUTTON_HEIGHT,
        borderRadius: BUTTON_BORDER_RADIUS,
        backgroundColor: '#8a8fd4ff',
        elevation: 4,
    },
    startOrPauseText: { 
        color: 'white',
        fontWeight: '500',
        fontSize: SCREEN_HEIGHT/50,
    },

    // Reset
    resetButtonLarge: { // Reset button
        justifyContent: 'center',
        alignItems: 'center',
        width: BUTTON_WIDTH_LARGE,
        height: BUTTON_HEIGHT,
        borderRadius: BUTTON_BORDER_RADIUS,
        backgroundColor: 'white',
        elevation: 4,
    },
    resetButtonSmall: { // Reset button
        justifyContent: 'center',
        alignItems: 'center',
        width: BUTTON_WIDTH_SMALL,
        height: BUTTON_HEIGHT,
        borderRadius: BUTTON_BORDER_RADIUS,
        backgroundColor: 'white',
        elevation: 4,
    },
    resetText: {
        color: '#8a8fd4ff',
        fontWeight: '500',
        fontSize: SCREEN_HEIGHT/50,
    },

    // Skip
    skipButton: { // Reset button
        justifyContent: 'center',
        alignItems: 'center',
        width: BUTTON_WIDTH_SMALL,
        height: BUTTON_HEIGHT,
        borderRadius: BUTTON_BORDER_RADIUS,
        backgroundColor: '#3bba59ff',
        elevation: 4,
    },
    skipText: {
        color: 'white',
        fontWeight: '500',
        fontSize: SCREEN_HEIGHT/50,
    },
    // -------------------- //
})

export default PomodoroTimer;