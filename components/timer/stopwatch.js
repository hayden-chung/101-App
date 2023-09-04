import React, { useState, useEffect, useRef, useCallback } from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity, Dimensions, FlatList} from 'react-native';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

const Stopwatch = () => { // Stopwatch function
    const [currentTimeInMilliseconds, setCurrentTimeInMilliseconds] = useState(0);
    const [isRunning, setIsRunning] = useState(false); // Is stopwatch running?
    const [laps, setLaps] = useState([]); // [lap time, total time]
    const [latestLapTimeInMilliseconds, setLatestLapTimeInMilliseconds] = useState(0);
    const lastUpdate = useRef(0);
    const flatlistRef = useRef();

    useEffect(() => { // every time timer time changes. 
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

        

    }, [isRunning, currentTimeInMilliseconds]);

    useEffect(() => {
        if (isRunning){
            lastUpdate.current = Date.now();
        } 
    }, [isRunning])

    const formatTime = (timeinMilliseconds) => {
        const hours = Math.floor(timeinMilliseconds/(1000*60*60)) // Math.floor() = round down to nearest integer.
        const minutes = Math.floor((timeinMilliseconds%(1000*60*60))/(1000*60))
        const seconds =Math.floor((timeinMilliseconds%(1000*60))/1000)
        const milliseconds = (Math.floor(timeinMilliseconds%1000/10))

        const formattedHours = String(hours).padStart(2, '0');
        const formattedMinutes = String(minutes).padStart(2, '0');
        const formattedSeconds = String(seconds).padStart(2, '0');
        const formattedMilliseconds = String(milliseconds).padStart(2, '0')

        return `${formattedHours}:${formattedMinutes}:${formattedSeconds}.${formattedMilliseconds}`
    }

    const lapOrResetPressed = () => {
        if (isRunning) { // lap pressed
            setLaps(prevLaps => [...prevLaps, [formatTime(currentTimeInMilliseconds-latestLapTimeInMilliseconds) ,formatTime(currentTimeInMilliseconds)]])
            setLatestLapTimeInMilliseconds(currentTimeInMilliseconds)
        } else if (!isRunning) { // reset pressed
            setCurrentTimeInMilliseconds(0)
            setIsRunning(false)
            setLaps([])
            setLatestLapTimeInMilliseconds(0)
            console.log('reset')
        }
        console.log('after', laps)
    }

    const onPressFunction = () => {
        flatlistRef.current.scrollToEnd();
    };

    return (
        <View style={styles.container}>
            <View style={styles.timeDisplayContainer}>
                <Text style={styles.timeText}>{formatTime(currentTimeInMilliseconds)}</Text>
            </View>
            
            <View style={styles.lapsWrapper}>
            <View style={styles.lapSubheader}>
                <Text style={styles.lapSubheaderText}>Laps</Text>
                <Text style={styles.lapSubheaderText}>Lap Time</Text>
                <Text style={styles.lapSubheaderText}>Total Time</Text>
            </View>
            <View style={styles.lineBetweenSubheaderAndLaps}></View>

            <FlatList   // FlatList to render lists.
                    ref = {flatlistRef}
                    data={laps}                   
                    showsVerticalScrollIndicator={false} // hide scroll bar.
                    renderItem={({item, index}) =>       // quote item in the list array & index. 
                    <View style={styles.lapItem}>
                        {/* Lap # */}
                        <Text styles={styles.lapItemText}>{index}</Text>
                        {/* Lap time */}
                        <Text styles={styles.lapItemText}>{item[0]}</Text> 
                        {/* Total time */}
                        <Text styles={styles.lapItemText}>{item[1]}</Text>
                    </View>
                }/>
            </View>


            {/* Start/Pause Button */}
            <View style={styles.controlButtons}>

                {/* Reset Button */}
                <TouchableOpacity style={styles.resetButton} onPress={() => lapOrResetPressed()}>
                    <Text>{isRunning ? 'Lap' : 'Reset'} </Text>
                </TouchableOpacity >

                <TouchableOpacity style={styles.startOrPauseButton} onPress={() => setIsRunning(!isRunning)}>
                <Text>{isRunning ? 'Pause' : 'Start'} </Text>
                </TouchableOpacity>

            </View>
        </View>
    );
};

const buttonHeight = SCREEN_HEIGHT/16
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
    lapsWrapper: {
        height: SCREEN_HEIGHT/4,
        paddingVertical: SCREEN_HEIGHT/60,
        backgroundColor: 'magenta',
    },
    lapSubheader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: SCREEN_WIDTH/25,
        paddingBottom: SCREEN_HEIGHT/100,
    },
    lapSubheaderText: {

    },
    lineBetweenSubheaderAndLaps: {
        height: SCREEN_HEIGHT/800,
        backgroundColor: 'black',
    },
    lapItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: SCREEN_WIDTH/25,
        paddingLeft: SCREEN_WIDTH/15,
        paddingBottom: SCREEN_HEIGHT/100,
    },
    lapItemText: {

    },
    controlButtons: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        backgroundColor: 'yellow',
        paddingVertical: SCREEN_HEIGHT/100,
    },
    startOrPauseButton: {
        justifyContent: 'center',
        alignItems: 'center',
        width: buttonWidth,
        height: buttonHeight,
        borderRadius: 1000,
        fontFamily: 'OpenSans-Regular',
        backgroundColor: 'red', 
    },
    resetButton: {
        justifyContent: 'center',
        alignItems: 'center',
        width: buttonWidth,
        height: buttonHeight,
        borderRadius: 1000,
        fontFamily: 'OpenSans-Regular',
        backgroundColor: '#ADD8E6',
    },
})

export default Stopwatch;
