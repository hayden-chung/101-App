import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, Dimensions, TextInput, Alert, TouchableOpacity} from 'react-native';
import {fixedSessions} from './timetableSettingsData' 
import AlertMessage from '../../alertMessage'
import {getSessions} from '../generator/timetableGeneratorAlgorithm'

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = (Dimensions.get('window').height);

const getRemainingTime = () => {
    let fixedSessionsCopy = {...fixedSessions}
    let remainingTime = new Date(fixedSessionsCopy['start-finish'][1]).getTime() - new Date(fixedSessionsCopy['start-finish'][0]).getTime()
    console.log("remainingTime", remainingTime)
    breaks = Object.keys(fixedSessionsCopy).filter(type => type !== 'start-finish')
    for (let i = 0; i < breaks.length; i++) {
        breakTimeLength = fixedSessionsCopy[breaks[i]][1] - fixedSessionsCopy[breaks[i]][0]
        remainingTime -= breakTimeLength
    }
    remainingTimeInMinutes = remainingTime/(1000*60) // convert ms to min
    return remainingTimeInMinutes

}

const addBreakIfAvailable = (breakName) => {
    const [sessionsBetweenBreaks, breakOrder] = getSessions()
    console.log('CHECK',sessionsBetweenBreaks)

    const remainingTimeInMinutes = getRemainingTime()
    let startTime = 0
    let endTime = 0
      


    // if (remainingTimeInMinutes > 10) { // can a new break session fit in the timetable (if more than 10min available)
    //     if (new Date() < fixedSessions['start-finish'][0]) { // if current time is less than start time of timetable:
    //         startTime = fixedSessions['start-finish'][0] // set start time to start time of timetable. 
    //         endTime = new Date(startTime.getTime() + 1 * 60 * 1000) // end time = one minute after start time. 
    //     } else if (new Date() > fixedSessions['start-finish'][1]) { // if current time is greater than end time of timetable:
    //         endTime = fixedSessions['start-finish'][1]
    //         startTime = new Date(endTime.getTime() - 1 * 60 * 1000)
    //     }
        
    if (remainingTimeInMinutes > 10 && breakOrder.length >= 1) { // can a new break session fit in the timetable (if more than 10min available)
        console.log('option 1')
        for (i=0; i < breakOrder.length+1; i++){
            let availableTime = new Date(sessionsBetweenBreaks[i][1]) - new Date(sessionsBetweenBreaks[i][0])
            let availableTimeInMinutes = availableTime/(1000*60)
            console.log('availableTimeInMinutes', availableTimeInMinutes)
            if (availableTimeInMinutes > 10) {
                startTime=new Date(sessionsBetweenBreaks[i][0])
                endTime = new Date(startTime.getTime() + 1 * 60 * 1000)
                console.log('startTime', startTime, 'endTime', endTime)
            }
        }
    } else if (breakOrder.length === 0){
        console.log('option 2')
        startTime = new Date(fixedSessions['start-finish'][0])
        endTime = new Date(startTime.getTime() + 1*60*1000)
    }
    console.log('startTime', startTime, 'endTime', endTime)
    fixedSessions[breakName] = [startTime, endTime]    // add [current time, time 10min after current] to set the break session in the beginning. This is to prevent an empty string when the user first sets up the break session. 
    console.log('new fixed sessions',  fixedSessions)
    console.log('-================================================================================================================================================================================================')
}

export const AddBreakModal = (props) => { // Add a new break session. 

    const [breakName, setBreakName] = useState('') // Name of break session. 
    // ------------- Close Modal Function ------------- //
    const closeModal = (addBreak) => {  // Close Modal Screen
        if (addBreak && breakName) { // If addBreak is true, and breakName is also valid (not empty):
            // time must be before timetable finish time 
            
            addBreakIfAvailable(breakName)
            props.updateBreakSessions()  // update break sessions. 
        }
        props.setNewBreakModalVisible(false); // set to false as modal should not be visible now.
    };

    return ( 
        // ------------------------------- MODAL SCREEN ------------------------------- //
        <TouchableOpacity disabled={true} style={styles.container}> 
            <View style={styles.modal}> 
                
                {/* Close Modal Button */}
                <TouchableOpacity style={styles.exitButton} onPress={() => closeModal(false)}>
                    <Text style={{fontSize: 20}}>X</Text>
                </TouchableOpacity>

                {/* Content inside modal (excluding exit button) */}
                <View style={styles.modalContent}>
                    {/* Name of Break. Text input from user */}
                    <Text style={styles.textInputHeader}>Break Name:</Text>
                    <TextInput style={styles.textInput} placeholder={'Break:'} value={breakName} onChangeText={text => setBreakName(text)} />  

                    {/* When add button pressed, call closeModal function */}
                    <TouchableOpacity style={styles.addButton} onPress={() => closeModal(true)}> 
                        <Text style={styles.addButtonText}>Add</Text>
                    </TouchableOpacity>
                    </View>
            </View>
        </TouchableOpacity>
        // --------------------------------------------------------------------- //
    )
}


const styles= StyleSheet.create({
    container: { // Whole screen. 
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    modal: { // View component of modal.
        height: SCREEN_HEIGHT/5,
        width: SCREEN_WIDTH/1.4,
        backgroundColor: 'white',
        borderColor: 'black',
        borderWidth: 3,
        borderRadius: 10,
    },
    modalContent: { // Content inside modal excluding exit button. 
        alignItems: 'center',
        justifyContent: 'center',
    },
    textInputHeader: { // Header text of text input inside modal.
        marginBottom: SCREEN_HEIGHT/70,
    },
    textInput: { // Text input box.
        width: '80%',
        height: SCREEN_HEIGHT/20,
        borderWidth: 2,
        borderRadius: 10,
        padding: 10,
    },
    addButton: { // Add button (for adding new break session).
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: SCREEN_HEIGHT/50,
        backgroundColor: 'blue', 
        width: SCREEN_WIDTH/2.6,
        height: SCREEN_HEIGHT/26,
    },
    addButtonText: { // Texdt inside add button that displays 'add'. 
        color: 'white',
    },

})