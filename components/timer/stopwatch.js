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

    useEffect(() => { // if start or pause pressed:
        if (isRunning){
            lastUpdate.current = Date.now(); 
        } 
    }, [isRunning])

    const formatTime = (timeinMilliseconds) => { // format time to 00:00:00.00
        const hours = Math.floor(timeinMilliseconds/(1000*60*60)) // Math.floor() = round down to nearest integer.
        const minutes = Math.floor((timeinMilliseconds%(1000*60*60))/(1000*60))
        const seconds =Math.floor((timeinMilliseconds%(1000*60))/1000)
        const milliseconds = (Math.floor(timeinMilliseconds%1000/10))

        const formattedHours = String(hours).padStart(2, '0'); // e.g. if 5s --> 05s
        const formattedMinutes = String(minutes).padStart(2, '0');
        const formattedSeconds = String(seconds).padStart(2, '0');
        const formattedMilliseconds = String(milliseconds).padStart(2, '0')

        return `${formattedHours}:${formattedMinutes}:${formattedSeconds}.${formattedMilliseconds}`
    }

    const lapOrResetPressed = () => { // if lap or reset button pressed. 
        if (isRunning) { // lap pressed
            setLaps(prevLaps => [...prevLaps, [formatTime(currentTimeInMilliseconds-latestLapTimeInMilliseconds) ,formatTime(currentTimeInMilliseconds)]]) // add lap to list
            setLatestLapTimeInMilliseconds(currentTimeInMilliseconds)
            setTimeout(() => { // give interval of 0.01ms and scroll to end of list to show new updated lap. 
                flatlistRef.current.scrollToEnd();
            }, 10);
            
        } else if (!isRunning) { // reset pressed set all to initial value. 
            setCurrentTimeInMilliseconds(0)
            setIsRunning(false)
            setLaps([])
            setLatestLapTimeInMilliseconds(0)
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.timeDisplayContainer}>
                {/* Current time */}
                <Text style={styles.timeText}>{formatTime(currentTimeInMilliseconds)}</Text>
                {/* Time after lap was pressed */}
                <Text style={styles.lapTimeText}>{formatTime(currentTimeInMilliseconds-latestLapTimeInMilliseconds)}</Text>
            </View>
            
            {/* Lap Container */}
            {laps.length !== 0 ? ( 
                <View style={styles.lapsWrapper}>
                    <View style={styles.lapSubheader}>
                        <Text style={styles.lapSubheaderText}>Lap</Text>
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
                            <Text style={styles.lapItemText}>{index+1}</Text>
                            {/* Lap time */}
                            <Text style={styles.lapItemText}>{item[0]}</Text> 
                            {/* Total time */}
                            <Text style={styles.lapItemText}>{item[1]}</Text>
                        </View>
                    }/>
                </View>
                ): (<View style={styles.lapsWrapper}></View>
                    )
            }
            


            {/* Start/Pause Button */}
            <View style={styles.controlButtons}>

                {/* Reset/Lap Button */}
                <TouchableOpacity style={styles.lapOrResetButton} onPress={() => lapOrResetPressed()}>
                    <Text style={styles.lapOrResetText}>{isRunning ? 'Lap' : 'Reset'} </Text>
                </TouchableOpacity >

                {/* Start/Pause button */}
                <TouchableOpacity style={styles.startOrPauseButton} onPress={() => setIsRunning(!isRunning)}>
                <Text style={styles.startOrPauseText}>{isRunning ? 'Pause' : 'Start'} </Text>
                </TouchableOpacity>

            </View>
        </View>
    );
};

const BUTTON_WIDTH = SCREEN_WIDTH/3;
const BUTTON_HEIGHT = SCREEN_HEIGHT/12;
const BUTTON_BORDER_RADIUS = SCREEN_WIDTH/15;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    timeDisplayContainer: { // time and lap time
        height: 100,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: SCREEN_HEIGHT/15,
    },
    timeText: { // main time 
        fontSize: SCREEN_HEIGHT/17,
        fontWeight: '400',
        color: '#8A8FD4',
    },

    // Lap components
    lapTimeText: { // lap time
        fontSize: SCREEN_HEIGHT/23,
        fontWeight: '300',
        color: '#B1B3B9',
    },
    lapsWrapper: { 
        height: SCREEN_HEIGHT/4,
        marginHorizontal: SCREEN_WIDTH/30,
        marginTop: SCREEN_HEIGHT/22,
        marginBottom: SCREEN_HEIGHT/30,
    },
    lapSubheader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: SCREEN_WIDTH/15,
        paddingBottom: SCREEN_HEIGHT/150,
    },
    lapSubheaderText: {
        fontSize: SCREEN_WIDTH/22,
    },

    // Divide headers and lap items. 
    lineBetweenSubheaderAndLaps: {
        height: SCREEN_HEIGHT/800,
        backgroundColor: '#C7C7C7',
        marginBottom: SCREEN_HEIGHT/80,
        marginHorizontal: SCREEN_WIDTH/25,
    },
    lapItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: SCREEN_WIDTH/18,
        paddingLeft: SCREEN_WIDTH/11,
        paddingBottom: SCREEN_HEIGHT/100,
    },
    lapItemText: {
        fontSize: SCREEN_HEIGHT/50,
    },

    // Buttons
    controlButtons: { // Lap/Reset & Start/Pause button
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        paddingVertical: SCREEN_HEIGHT/100,
    },
    startOrPauseButton: {
        justifyContent: 'center',
        alignItems: 'center',
        fontFamily: 'OpenSans-Regular',
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
    lapOrResetButton: {
        justifyContent: 'center',
        alignItems: 'center',
        fontFamily: 'OpenSans-Regular',
        width: BUTTON_WIDTH,
        height: BUTTON_HEIGHT,
        borderRadius: BUTTON_BORDER_RADIUS,
        backgroundColor: 'white',
        elevation: 4,
    },
    lapOrResetText: {
        color: '#8a8fd4ff',
        fontWeight: '500',
        fontSize: SCREEN_HEIGHT/50,
    },
})

export default Stopwatch;
