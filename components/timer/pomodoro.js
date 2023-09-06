import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity, Dimensions, TextInput} from 'react-native';
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

const PomodoroTimer = () => { // Pomodoro timer function. 
  const [workMinutes, setWorkMinutes] = useState(null); // Initial time in minutes
  const [breakMinutes, setBreakMinutes] = useState(null);
  const [timerDuration, setTimerDuration] = useState(0); // Initial time in seconds
  const [sessionsCount, setSessionsCount] = useState(0); // number of pomodoro sessions. 
  const [workOrBreak, setWorkOrBreak] = useState(null);
  const [isActive, setIsActive] = useState(false);
  const [isReset, setIsReset] = useState(true); // indicate when time setter can appear or not. false = timer is runnning
  const [key, setKey] = useState(0);
  
  console.log('breakMinutes', breakMinutes, 'workMinutes', workMinutes)
  const toggleTimer = () => { // If start button pressed, change to pause. Vice versa
    setIsActive(!isActive); // inverse boolean state. 
    setIsReset(false) // Indicate that timer is running now and not reset. 
  };

  const resetTimer = () => { // set reset to true to indicate timer is reset. 
    setIsReset(true)
    setKey(prevKey => prevKey + 1) // To reset countdown timer back to its intial time value. 
    setIsActive(false); // Timer is not active (running) anymore
    setSessionsCount(0) 
  };

  const skipSession = () => { // during break session, if skip button is pressed, skip timer to focus mode. 
    if (workOrBreak === 'break') {
        setKey(prevKey => prevKey + 1)
        setSessionsCount(previousCount => previousCount + 1) 

    }
  }

  const formatTime = ({ remainingTime }) => { // Format the countdown timer into 'hour:min:seconds' time. 
    
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
    console.log('changed')
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
                    colors={['#FF0000', '#008000', '#008000']}
                    colorsTime={[timerDuration, (parseInt(breakMinutes)*60), 0]} // in seconds 
                    strokeWidth={12}
                    trailStrokeWidth={12}
                    trailColor='#FDFEFF'
                    isSmoothColorTransition={false} // smooth color transition
                    size={SCREEN_WIDTH/1.2} // circumference (width/height) of circle timer. 
                    onUpdate={(remainingTime) => { // current status: work or break?
                        if (remainingTime > (parseInt(breakMinutes)*60)) { // if remaining time is greater than the break time, set status to work. 
                            setWorkOrBreak('work')
                        }
                        else if (remainingTime <= (parseInt(breakMinutes)*60)) { // if remaining time is less or equal to the break time, set status to break. 
                            setWorkOrBreak('break')
                        }

                    }}

                    onComplete={() => { // When Timer is Over
                        console.log('reset Timer')
                        setKey(prevKey => prevKey + 1)
                        setSessionsCount(previousCount => previousCount + 1)
                    }}
                >
                    {/* Display 'hour:min:seconds' format */}
                    {({ remainingTime }) => <Text style={styles.timerTimeText}>{formatTime({remainingTime})}</Text>} 
                </CountdownCircleTimer>
                
                {/* Has timer reset? */}
                {isReset ? (
                <View style={styles.containerInsideTimer}>

                    {/*  */}
                    <View style={styles.setTimeContainer}>
                        <View style={styles.setWorkTime}>

                            <View style={styles.textInputRow}>
                                {/* Work (minutes) */}
                                <TextInput 
                                    style={styles.textInput} 
                                    placeholder="00"
                                    value={workMinutes} 
                                    onChangeText={num => handleInputChange(num, 'work')}
                                    keyboardType="numeric"
                                    editable={!isActive}
                                />
                                <Text style={styles.timeUnitText}>m  </Text>
                            </View>

                            <Text style={styles.timeInputLabel}>WORK</Text>
                        </View>

                        <View style={styles.setBreakTime}>
                            <View style={styles.textInputRow}>
                                {/* Work (minutes) */}
                                <TextInput 
                                    style={styles.textInput} 
                                    placeholder="00"
                                    value={breakMinutes} 
                                    onChangeText={num => handleInputChange(num, 'break')}
                                    keyboardType="numeric"
                                    editable={!isActive}
                                />
                                <Text style={styles.timeUnitText}>m  </Text>
                            </View>

                            <Text style={styles.timeInputLabel}>BREAK</Text>
                        </View>

                    </View>

                    <View style={styles.totalCycleTime}>
                        <Text style={styles.totalCycleTimeText}>One Cycle = {timerDuration/60}min</Text>
                    </View>
                </View>


                
                ): null}

            </View>

            {isReset === false ? ( // If reset is not true
                <View style={styles.workOrBreakLabelContainer}>
                    <Text style={styles.workOrBreakLabel}> {workOrBreak === 'work' ? ( 'FOCUS MODE' ) : 'REST'} </Text>
                    <Text style={styles.remainingTimeText}> Pomodoro # : {sessionsCount} </Text>
                </View>
            ): null}
    
        </View>
        
        
        {/* Start/Pause Button. Only display when both work and break minutes have a valid time. */}
        <TouchableOpacity style={parseInt(breakMinutes) > 0 && parseInt(workMinutes) > 0 ? styles.startOrPauseButton : styles.startNotReady} disabled={!(parseInt(breakMinutes) > 0 && parseInt(workMinutes) > 0)} onPress={toggleTimer}>
        <Text>{isActive ? 'Pause' : 'Start'} </Text>
        </TouchableOpacity>

        {/* Reset Button */}
        <TouchableOpacity style={styles.resetButton} onPress={resetTimer}>
            <Text>Reset</Text>
        </TouchableOpacity >

        {/* Skip Button. when pressed, skip from break to work*/}
        {workOrBreak !== 'work' ? (
        <TouchableOpacity style={styles.skipButton} onPress={skipSession}>
            <Text>Skip</Text>
        </TouchableOpacity >
        ):(
            <TouchableOpacity style={styles.hideSkipButton} disabled={true}>
                {/* Empty Container (just to fill up space inside container) */}
            </TouchableOpacity >
        )}
    </View>
  );
};

const timerBackgroundColor = '#FDFEFF'
const textBlack = '#161A25' // modern black text color
const textGray = '#161A25'  // modern gray text color
const modernWhite = '#EBEEF6'


const styles = StyleSheet.create({
    container:{ // main container. consists of all timer components. 
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'center',
    },
    timerBackgroundCircle: {
        justifyContent: 'center',
        alignItems: 'center',
        width: SCREEN_WIDTH/1.1,
        height: SCREEN_WIDTH/1.1,
        borderRadius: 1000,
        backgroundColor: timerBackgroundColor,
        position: 'relative',
        zIndex: 0,

        shadowColor: 'rgba(0, 0, 0, 0.5)', // Shadow color
        shadowOffset: { width: 0, height: 0 }, // Shadow offset (x and y)
        shadowOpacity: 1, // Shadow opacity (0 to 1)
        shadowRadius: 10, // Shadow blur radius
        elevation: 10,

    },
    countdownTimer: { // timer container (timer, start, pause)
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1,
    },
    timerTimeText: {
        fontSize: SCREEN_HEIGHT/20,
    },
    containerInsideTimer: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems:'center',
        position: 'absolute',
        backgroundColor: timerBackgroundColor,
        zIndex: 2,
    },
    setTimeContainer: { // conatiner for text input and text of: hours, minutes, seconds. 
        flexDirection: 'row',
        alignItems:'center',
        backgroundColor: timerBackgroundColor,
        zIndex: 2,
    },
    textInputRow: {
        width: SCREEN_WIDTH/8,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'flex-end',
    },
    setWorkTime: {
        justifyContent: 'center',
        alignItems: 'center',
        width: SCREEN_WIDTH/4.5,
        height: SCREEN_HEIGHT/8,
        marginHorizontal: SCREEN_WIDTH/30,
        backgroundColor: '#F0F0F0',
    },
    setBreakTime: {
        justifyContent: 'center',
        alignItems: 'center',
        width: SCREEN_WIDTH/4.5,
        height: SCREEN_HEIGHT/8,
        marginHorizontal: SCREEN_WIDTH/30,
        backgroundColor: '#F0F0F0',
    },
    timeInputLabel: { // 
        color: '#808080', 
    },
    totalCycleTime: { // container for total cycle time
        flexDirection: 'column',
        justifyContent: 'flex-end',
        alignItems:'center',
        top: SCREEN_HEIGHT/30,
        zIndex: 2,
    },
    totalCycleTimeText: {
        color: '#808080',
    },
    remainingTimeText: {
        color: '#B4B4B4',
        fontSize: SCREEN_HEIGHT/60,
    },
    startNotReady: { // Pause/Start button. 
        justifyContent: 'center',
        alignItems: 'center',
        width: 90, 
        height: 40, 
        backgroundColor: '#BEE6BE',
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
    skipButton: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 90, 
        height: 40, 
        backgroundColor: '#fae69eff',
    },
    hideSkipButton: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 90, 
        height: 40, 
    },
    textInput: { // Style text input boxes. 
        fontWeight: '400',
        fontSize: SCREEN_WIDTH/15,
    },
    timeUnitText: {
        fontSize: SCREEN_WIDTH/30,
        paddingLeft: SCREEN_WIDTH/200,
    },
    workOrBreakLabelContainer: {
        flexDirection: 'column',
        alignItems: 'center',
        bottom: SCREEN_HEIGHT/11,
        zIndex: 2,
        position: 'absolute',
    },
    workOrBreakLabel: {
        marginBottom: SCREEN_HEIGHT/60,
        color: '#808080',
        fontSize: SCREEN_HEIGHT/35,
        fontWeight: '400',
    },
})

export default PomodoroTimer;