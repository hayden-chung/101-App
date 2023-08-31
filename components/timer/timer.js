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
  const setInitialTime = () => {
    console.log('setting initial time')
  }

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
        console.log('true', intValue)
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
                strokeWidth={12}
                trailStrokeWidth={12}
                isSmoothColorTransition={false} // smooth color transition
                size={SCREEN_WIDTH/1.3} // circumference (width/height) of circle timer. 

                onComplete={() => { // When Timer is Over
                    if (isActive) {
                        setIsActive(false);
                    }
                }}
            >
                {/* Display 'hour:min:seconds' format */}
                {({ remainingTime }) => <Text>{formatTime({remainingTime})}</Text>} 
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
                <Text style={styles.timeUnitText}>h  </Text>

                {/* Minutes */}
                <TextInput 
                    style={styles.textInput} 
                    placeholder="00"
                    value={minutes} 
                    onChangeText={num => handleInputChange(num, 'minutes')}
                    keyboardType="numeric"
                    editable={!isActive}
                />
                <Text style={styles.timeUnitText}>m  </Text>

                {/* Seconds */}
                <TextInput 
                    style={styles.textInput} 
                    placeholder="00"
                    value={seconds} 
                    onChangeText={num => handleInputChange(num, 'seconds')}
                    keyboardType="numeric"
                    editable={!isActive}
                />
                <Text style={styles.timeUnitText}>s  </Text>

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

const SetTimeTextSize = SCREEN_WIDTH/18;

const styles = StyleSheet.create({
    container:{ // main container. consists of all timer components. 
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'center',
    },
    countdownTimer: { // timer container (timer, start, pause)
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        backgroundColor: 'yellow'
    },
    setTimeContainer: { // conatiner for text input and text of: hours, minutes, seconds. 
        flexDirection: 'row',
        height: SCREEN_HEIGHT/15,
        alignItems:'center',
        position: 'absolute',
        backgroundColor: '#90EE90',
    },
    startOrPauseButton: { // Pause/Start button. 
        justifyContent: 'center',
        alignItems: 'center',
        width: 90, 
        height: 40, 
        backgroundColor: '#90EE90',
    },
    resetButton: { // Reset button
        justifyContent: 'center',
        alignItems: 'center',
        width: 90, 
        height: 40, 
        backgroundColor: '#ff4747',
    },
    textInput: { // Style text input boxes. 
        width: SCREEN_WIDTH/9,
        fontWeight: '600',
        fontSize: SetTimeTextSize,
    },
    timeUnitText: {
        fontSize: SetTimeTextSize,
        paddingLeft: SCREEN_WIDTH/100,
    },
})

export default Timer;
