import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity, Dimensions, TextInput} from 'react-native';
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer';
// import NumberPad, { Input, Display } from './index'; 

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

const Timer = () => {
  const [seconds, setSeconds] = useState(null); // Initial time in seconds
  const [minutes, setMinutes] = useState(null); // Initial time in minutes
  const [hours, setHours] = useState(null); // Initial time in hours
  const [timerDuration, setTimerDuration] = useState(0); // Initial time in seconds
  const [isActive, setIsActive] = useState(false);
  const [isReset, setIsReset] = useState(true); // used to indicate when time setter can appear or not. 
  const [key, setKey] = useState(0);
  
  const toggleTimer = () => { // 
    console.log('duration', timerDuration);
    setIsActive(!isActive);
    setIsReset(false) // Indicate that timer is running now. 
  };

  const resetTimer = () => { // 
    setIsReset(true)
    setKey(prevKey => prevKey + 1) // To reset countdown timer back to its intial time value. 
    setIsActive(false); // Timer is not active (running) anymore
  };
  console.log('isReset', isReset)
  const setInitialTime = () => {
    console.log('setting initial time')
  }

  const children = ({ remainingTime }) => { // Format the countdown timer into 'hour:min:seconds' time. 
    const hours = Math.floor(remainingTime / 3600)
    const minutes = Math.floor((remainingTime % 3600) / 60)
    const seconds = remainingTime % 60
  
    return `${hours}:${minutes}:${seconds}`
  }

  const handleInputChange = (num, unit) => { // 
    
    const isIntergerNumbers = (value) => {
        intValue = parseInt(value, 10)

        if (!isNaN(intValue)) {
            console.log('int true')
            return true
        } else {
            console.log('int false')
            return false
        }

        // return typeof value === 'number'
    }

    let timeValue = num.replace(/[^0-9]/g, '').slice(0, 2); // Filter out non-numeric characters. Maximum of 2 numeric characters. 
    if (unit === 'seconds') { // setting seconds
        setSeconds(timeValue);
    }
    else if (unit === 'minutes') { // setting minutes 
        setMinutes(timeValue)
    }
    else if (unit === 'hours') { // setting hours
        setHours(timeValue)
    }
    
    setTimerDuration(0)
    if (isIntergerNumbers(hours)) {
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
            <CountdownCircleTimer
                key={key}
                isPlaying={isActive}
                duration={timerDuration} // initial time 
                colors={['red', 'green', 'green']}
                colorsTime={[5, 2, 0]}
                strokeWidth={15}
                trailStrokeWidth={12}
                isSmoothColorTransition={false} // smooth color transition
                size={SCREEN_WIDTH/1.3} // circumference (width/height) of circle timer. 

                onComplete={() => { // When Timer is Over
                    if (isActive) {
                        setIsActive(false);
                    }
                }}
            >
                {({ remainingTime }) => <Text>{children({remainingTime})}</Text>}
            </CountdownCircleTimer>
            
            {isReset ? (
            <View style={styles.setTimeContainer}>

                {/* Hours */}
                <TextInput 
                    style={styles.textInput} 
                    placeholder="00"
                    value={hours} 
                    onChangeText={num => handleInputChange(num, 'hours')}
                    keyboardType="numeric"
                    editable={!isActive} // editable should be true when isActive is false (when timer is not running) and vice versa. 
                />
                <Text>h  </Text>

                {/* Minutes */}
                <TextInput 
                    style={styles.textInput} 
                    placeholder="00"
                    value={minutes} 
                    onChangeText={num => handleInputChange(num, 'minutes')}
                    keyboardType="numeric"
                    editable={!isActive}
                />
                <Text>m  </Text>

                {/* Seconds */}
                <TextInput 
                    style={styles.textInput} 
                    placeholder="00"
                    value={seconds} 
                    onChangeText={num => handleInputChange(num, 'seconds')}
                    keyboardType="numeric"
                    editable={!isActive}
                />
                <Text>s  </Text>

            </View>
            ): null}

        </View>
        
        
        {/* Start/Pause Button */}
        <TouchableOpacity style={styles.startOrPauseButton} onPress={toggleTimer}>
        <Text>{isActive ? 'Pause' : 'Start'} </Text>
        </TouchableOpacity>

        {/* Reset Button */}
        <TouchableOpacity style={styles.resetButton} onPress={resetTimer}>
            <Text>Reset</Text>
        </TouchableOpacity >
    </View>
  );
};

const styles = StyleSheet.create({
    container:{
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'center',
    },
    countdownTimer: {
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        backgroundColor: 'yellow'
    },
    setTimeContainer: {
        flexDirection: 'row',
        alignItems:'center',
        position: 'absolute',
        backgroundColor: '#90EE90',
    },
    startOrPauseButton: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 90, 
        height: 40, 
        backgroundColor: '#90EE90',
    },
    resetButton: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 90, 
        height: 40, 
        backgroundColor: '#ff4747',
    },
    textInput: {
        fontWeight: '600',
    }
})

export default Timer;
