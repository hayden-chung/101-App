import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity, Dimensions, TextInput} from 'react-native';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

const Stopwatch = () => { // Stopwatch function
    const [currenTimeInMilliseconds, setCurrentTimeInMilliseconds] = useState(0);
    const [isRunning, setIsRunning] = useState(false); // Is stopwatch running?
    const lastUpdate = useRef(0);

    useEffect(() => { // 
        let interval = null;

        if (isRunning) { // if isRunning is true:
            interval = setInterval(() => {
                const now = Date.now();
                const changeInTime = now - lastUpdate.current; // change in time (should be 1ms)
                setCurrentTimeInMilliseconds((prevMilliseconds) => prevMilliseconds + changeInTime);
                lastUpdate.current = now
            }, 10);
        } else {
            clearInterval(interval);
        }

        return () => {
            clearInterval(interval);
        };

        

    }, [isRunning, currenTimeInMilliseconds]);

    useEffect(() => {
        if (isRunning){
            lastUpdate.current = Date.now();
        } 
    }, [isRunning])

    const formatTime = () => {
        const hours = Math.floor(currenTimeInMilliseconds/(1000*60*60)) // Math.floor() = round down to nearest integer.
        const minutes = Math.floor((currenTimeInMilliseconds%(1000*60*60))/(1000*60))
        const seconds =Math.floor((currenTimeInMilliseconds%(1000*60))/1000)
        const milliseconds = Math.floor(currenTimeInMilliseconds%(100))

        const formattedHours = String(hours).padStart(2, '0');
        const formattedMinutes = String(minutes).padStart(2, '0');
        const formattedSeconds = String(seconds).padStart(2, '0');
        const formattedMilliseconds = String(milliseconds).padStart(2, '0');

        console.log('hours', hours, 'minutes', minutes, 'seconds', seconds, 'milliseconds', milliseconds)
        return `${formattedHours}:${formattedMinutes}:${formattedSeconds}.${formattedMilliseconds}`
    }

    return (
        <View style={styles.container}>
            <View style={styles.timeDisplayContainer}>
                <Text style={styles.timeText}>{formatTime()}</Text>
            </View>
            

            {/* Start/Pause Button */}
            <View style={styles.controlButtons}>
                <TouchableOpacity style={styles.startOrPauseButton} onPress={() => setIsRunning(!isRunning)}>
                <Text>{isRunning ? 'Pause' : 'Start'} </Text>
                </TouchableOpacity>

                {/* Reset Button */}
                <TouchableOpacity style={styles.resetButton} onPress={() => {setCurrentTimeInMilliseconds(0); setIsRunning(false)}}>
                    <Text>Reset</Text>
                </TouchableOpacity >
            </View>
        </View>
    );
};

const buttonHeight = SCREEN_HEIGHT/20
const buttonWidth = SCREEN_WIDTH/4

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#90EE90',
    },
    timeDisplayContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: SCREEN_HEIGHT/10,
    },
    timeText: {
        fontSize: SCREEN_HEIGHT/20,
    },
    controlButtons: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'red',
    },
    startOrPauseButton: {
        justifyContent: 'center',
        alignItems: 'center',
        width: buttonWidth,
        height: buttonHeight,
        borderRadius: SCREEN_HEIGHT/60,
        backgroundColor: '#ADD8E6',
        margin: 20,
    },
    resetButton: {
        justifyContent: 'center',
        alignItems: 'center',
        width: buttonWidth,
        height: buttonHeight,
        borderRadius: SCREEN_HEIGHT/60,
        backgroundColor: '#ADD8E6',
    },
})

export default Stopwatch;
