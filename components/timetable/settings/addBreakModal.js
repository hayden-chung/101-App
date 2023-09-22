import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, Dimensions, TextInput, Alert, TouchableOpacity} from 'react-native';
import {fixedSessions} from './timetableSettingsData' 
import AlertMessage from '../../alertMessage'
import {getSessions} from '../generator/timetableGeneratorAlgorithm'

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = (Dimensions.get('window').height);

const getRemainingTime = () => { // Get the remaining available time excluding breaks. 
    let fixedSessionsCopy = {...fixedSessions} // Create a copy of the fixed sessions, so the original fixedSessions does not get manipulated. 
    let remainingTime = new Date(fixedSessionsCopy['start-finish'][1]).getTime() - new Date(fixedSessionsCopy['start-finish'][0]).getTime() // get remaining time by subtracting the start time from the finish time of the timetable.  
    breaks = Object.keys(fixedSessionsCopy).filter(type => type !== 'start-finish') // Create a list with breaks, 
    for (let i = 0; i < breaks.length; i++) { // Repeat for the number of breaks. 
        breakTimeLength = fixedSessionsCopy[breaks[i]][1] - fixedSessionsCopy[breaks[i]][0] // period length of break. 
        remainingTime -= breakTimeLength // subtract break length from remaining time. 
    }
    remainingTimeInMinutes = remainingTime/(1000*60) // convert ms to min
    return remainingTimeInMinutes

}

const addBreakIfAvailable = (breakName) => { // Add break if there is available time. 
    const [sessionsBetweenBreaks, breakOrder] = getSessions() // get available session times between breaks (available time)

    const remainingTimeInMinutes = getRemainingTime() // determine the remaining time 
    let startTime = 0 // Initialize a start time.
    let endTime = 0 // Initialize an end time. 
      
    if (remainingTimeInMinutes > 10 && breakOrder.length >= 1) { // can a new break session fit in the timetable (is more than 10min available)
        for (i=0; i < breakOrder.length+1; i++){ // repeat for the number of breaks
            let availableTime = new Date(sessionsBetweenBreaks[i][1]) - new Date(sessionsBetweenBreaks[i][0]) // available time in between one break time to another. 
            let availableTimeInMinutes = availableTime/(1000*60) // convert from ms to minutes. 
            if (availableTimeInMinutes >= 10) { // add break only if there is more than 10 mins of available time.
                startTime=new Date(sessionsBetweenBreaks[i][0])         
                endTime = new Date(startTime.getTime() + 1 * 60 * 1000) // Set 1 min more than start time. 
                fixedSessions[breakName] = [startTime, endTime]    // add [current time, time 10min after current] to set the break session in the beginning.
            }
        }
    } else if (breakOrder.length === 0){ // if there are no breaks, a break can be added. 
        startTime = new Date(fixedSessions['start-finish'][0]) 
        endTime = new Date(startTime.getTime() + 1*60*1000) // set end time to 1 min more than start time. 
        fixedSessions[breakName] = [startTime, endTime]    // add [current time, time 10min after current] to set the break session in the beginning.
    }
}

export const AddBreakModal = (props) => { // Add a new break session. 

    const [breakName, setBreakName] = useState('') // Name of break session. 
    // ------------- Close Modal Function ------------- //
    const closeModal = (addBreak) => {  // Close Modal Screen
        if (addBreak && breakName) { // If addBreak is true, and breakName is also valid (not empty):
            // time must be before timetable finish time 
            
            addBreakIfAvailable(breakName) // Add break only if there is time available. 
            props.updateAndReRender()  // Update break sessions. 
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