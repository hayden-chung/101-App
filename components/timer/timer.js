import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity, Dimensions, TextInput} from 'react-native';
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

const Timer = () => {
  const [seconds, setSeconds] = useState(null); // Initial time in seconds
  const [minutes, setMinutes] = useState(null); // Initial time in minutes
  const [hours, setHours] = useState(null); // Initial time in hours
  const [timerDuration, setTimerDuration] = useState(0); // Initial time in seconds
  const [isActive, setIsActive] = useState(false);
  const [isReset, setIsReset] = useState(true); // indicate when time setter can appear or not. 
  const [key, setKey] = useState(0);
  
  const toggleTimer = () => { // 
    setIsActive(!isActive);
    setIsReset(false) // Indicate that timer is running now. 
  };

  const resetTimer = () => { // 
    setIsReset(true)
    setKey(prevKey => prevKey + 1) // To reset countdown timer back to its intial time value. 
    setIsActive(false); // Timer is not active (running) anymore
  };

  const formatTime = ({ remainingTime }) => { // Format the countdown timer into 'hour:min:seconds' time. 
    const hours = Math.floor(remainingTime / 3600)
    const minutes = Math.floor((remainingTime % 3600) / 60)
    const seconds = remainingTime % 60

    // e.g. if seconds = 2, display 02 instead of 2. 
    const formattedHours = String(hours).padStart(2, '0');
    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(seconds).padStart(2, '0');
  
    return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`
  }

  const handleInputChange = (num, unit) => { // When text box (sec, min, hr) changes. 
    
    let timeValue = num.replace(/[^0-9]/g, '').slice(0, 2); // Filter out non-numeric characters. Maximum of 2 numeric characters. 

    if (unit === 'seconds') { // setting seconds
        setSeconds(timeValue);
        console.log('new seconds', seconds)
    }
    else if (unit === 'minutes') { // setting minutes 
        setMinutes(timeValue)
        console.log('new minutes', minutes)
    }
    else if (unit === 'hours') { // setting hours
        setHours(timeValue)
        console.log('new hours', hours)
    }

  };

  useEffect(() => { // when hours, minutes, or seconds is changed, update timer duration. 
    updateTimerDuration()
  }, [hours, minutes, seconds])

  const updateTimerDuration = () => {

    const isIntergerNumbers = (value) => { // check if value = integer
        let intValue = parseInt(value, 10)

        if (!isNaN(intValue)) {
            
            return true
        } else {
            return false
        }
    }

    setTimerDuration(0)

    if (isIntergerNumbers(hours)) { // if hours is an integer,
        setTimerDuration(preivous => preivous + (parseInt(hours)*60*60));
    }
    if (isIntergerNumbers(minutes)) {
        setTimerDuration(preivous => preivous + (parseInt(minutes)*60));
    }
    if (isIntergerNumbers(seconds)) {
        setTimerDuration(preivous => preivous + parseInt(seconds));
    }

    console.log('hours:', hours, 'minutes:', minutes, 'seconds:', seconds, 'duration:', timerDuration)
  };

  return (
    <View style={styles.container}>

        <View style={styles.countdownTimer}>

            {isReset? (
                <View style={styles.fillTimer}></View>
            ): 
            <CountdownCircleTimer
                key={key}
                isPlaying={isActive}
                duration={timerDuration} // initial time 
                colors={['#8a8fd4', '#00FF1C']}
                colorsTime={[timerDuration, 0]}
                strokeWidth={12}
                trailStrokeWidth={12}
                isSmoothColorTransition={false} // smooth color transition
                size={SCREEN_WIDTH/1.2} // circumference (width/height) of circle timer. 

                onComplete={() => { // When Timer is Over
                    if (isActive) {
                        setIsActive(false);
                    }
                }}
            >
                {/* Display 'hour:min:seconds' format */}
                {({ remainingTime }) => <Text style={styles.remainingTimeText}>{formatTime({remainingTime})}</Text>} 
            </CountdownCircleTimer>
            }
            
            {/* Display time input only when isReset is true. */}
            {isReset ? (
            <View style={styles.setTimeContainer}>

                <View style={styles.header}>
                    <Text style={styles.headerText}>Set Your Timer</Text>
                </View>

                <View style={styles.timeUnitRow}>
                    <Text style={styles.timeUnitText}>Hours</Text>
                    <Text style={styles.timeUnitText}>Minutes</Text>
                    <Text style={styles.timeUnitText}>Seconds</Text>
                </View>

                <View style={styles.textInputRow}>

                    {/* Hours */}
                    <TextInput 
                        style={styles.textInput} 
                        placeholder="00"
                        value={hours} 
                        onChangeText={num => handleInputChange(num, 'hours')}
                        keyboardType="numeric"
                        editable={!isActive} // editable should be true when isActive is false (when timer is not running) and vice versa. 
                    />
                    <Text style={styles.textInputColon}>:</Text>

                    {/* Minutes */}
                    <TextInput 
                        style={styles.textInput} 
                        placeholder="00"
                        value={minutes} 
                        onChangeText={num => handleInputChange(num, 'minutes')}
                        keyboardType="numeric"
                        editable={!isActive}
                    />
                    <Text style={styles.textInputColon}>:</Text>

                    {/* Seconds */}
                    <TextInput 
                        style={styles.textInput} 
                        placeholder="00"
                        value={seconds} 
                        onChangeText={num => handleInputChange(num, 'seconds')}
                        keyboardType="numeric"
                        editable={!isActive}
                    />
                    
                </View>

            </View>
            ): null}

        </View>
        
        <View style={styles.buttonsContainer}>
            {/* Reset Button */}
            <TouchableOpacity style={styles.resetButton} onPress={resetTimer}>
                <Text style={styles.resetText}>Reset</Text>
            </TouchableOpacity >

            {/* Start/Pause Button */}
            <TouchableOpacity style={timerDuration === 0 ? styles.startNotReady : styles.startOrPauseButton} disabled={timerDuration===0} onPress={toggleTimer}>
                <Text style={styles.startOrPauseText}>{isActive ? 'Pause' : 'Start'} </Text>
            </TouchableOpacity>
        </View>
        
    </View>
  );
};

const SET_TIME_TEXT_SIZE = SCREEN_WIDTH/11
const BUTTON_WIDTH = SCREEN_WIDTH/3;
const BUTTON_HEIGHT = SCREEN_HEIGHT/12;
const BUTTON_BORDER_RADIUS = SCREEN_WIDTH/15;

const styles = StyleSheet.create({
    container:{ // main container. consists of all timer components. 
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'center',
        backgroundColor: 'white',
    },
    countdownTimer: { // timer container (timer, start, pause)
        justifyContent: 'center',
        alignItems: 'center',
    },
    // fillTimer: {
    //     height: SCREEN_WIDTH/1.3, 
    //     width: SCREEN_WIDTH/1.3, 
    // },
    setTimeContainer: { // conatiner for text input and text of: hours, minutes, seconds. 
        flexDirection: 'column',
        alignItems:'center',
        height: SCREEN_WIDTH/1.2,
    },
    remainingTimeText: {
        fontSize: SCREEN_WIDTH/13,
        fontWeight: '500',
        color: '#8a8fd4ff',
    },
    header: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'flex-start',
    },
    headerText: {
        fontSize: SCREEN_HEIGHT/30,
        fontWeight: '500',
        color: '#8a8fd4ff',
    },
    timeUnitRow: {
        flexDirection: 'row',
        marginBottom: SCREEN_HEIGHT/80,
    },
    timeUnitText: {
        fontSize: SET_TIME_TEXT_SIZE/2,
        color: '#B1B3B9',
        paddingHorizontal: SCREEN_WIDTH/20,
    },
    textInputRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: SCREEN_WIDTH/1.3,
        backgroundColor: 'white',
    },
    textInput: { // Style text input boxes. 
        width: SCREEN_WIDTH/5,
        height: SCREEN_HEIGHT/10,
        fontWeight: '600',
        fontSize: SET_TIME_TEXT_SIZE,
        color: '#8a8fd4ff',
        paddingHorizontal: SCREEN_WIDTH/30,
        marginHorizontal: SCREEN_WIDTH/50,
        borderRadius: SCREEN_WIDTH/40,
        elevation: 5,
        backgroundColor: 'white',
    },
    textInputColon: {
        justifyContent: 'center',
        alignItems: 'center',
        fontWeight: '800',
        fontSize: SET_TIME_TEXT_SIZE,
        color: '#8a8fd4ff',
    },
    buttonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
        marginTop: SCREEN_HEIGHT/30,
    },
    startNotReady: { // Start button when no initial time. 
        justifyContent: 'center',
        alignItems: 'center',
        width: BUTTON_WIDTH,
        height: BUTTON_HEIGHT,
        borderRadius: BUTTON_BORDER_RADIUS,
        backgroundColor: '#BEE6BE',
    },
    startOrPauseButton: { // Pause/Start button. 
        justifyContent: 'center',
        alignItems: 'center',
        width: BUTTON_WIDTH,
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
    resetButton: { // Reset button
        justifyContent: 'center',
        alignItems: 'center',
        width: BUTTON_WIDTH,
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
})

export default Timer;
