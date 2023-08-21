import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, Dimensions, TextInput, Alert, TouchableOpacity} from 'react-native';
import {fixedSessions} from './timetableSettingsData' 

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = (Dimensions.get('window').height);

export const AddBreakModal = (props) => { // Add a new break session. 

    const [breakName, setBreakName] = useState('') // Name of break session. 
    // ------------- Close Modal Function ------------- //
    const closeModal = (addBreak) => {  // Close Modal Screen
        if (addBreak && breakName) { // If addBreak is true, and breakName is also valid:
            
            // time must be before timetable finish time 
            
            startTime = new Date()
            endTime = new Date(new Date().getTime() + 10 * 60 * 1000) // Time ten minutes after current time. 
            fixedSessions[breakName] = [new Date(), endTime]    // add [current time, time 10min after current] to set the break session in the beginning. This is to prevent an empty string when the user first sets up the break session. 
            props.updateBreakSessions()  // update
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