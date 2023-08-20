import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, Dimensions, TextInput, Alert, TouchableOpacity} from 'react-native';
import {fixedSessions} from './timetableSettingsData'

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = (Dimensions.get('window').height);

export const AddBreakModal = (props) => {

    const [breakName, setBreakName] = useState('')
    // ------------- Close Modal Function ------------- //
    const closeModal = (addBreak) => {             // update = add/edit quote (boolean)
        if (addBreak && breakName) {
            temMinutesLater = new Date(new Date().getTime() + 10 * 60 * 1000)
            fixedSessions[breakName] = [new Date(), temMinutesLater]
            props.UpdateSessions()
        }
        console.log(fixedSessions)
        props.setBreakModalVisible(false); // set to false as modal should not be visible now.
    };

    return ( 
        // ------------------------------- MODAL SCREEN ------------------------------- //
        <TouchableOpacity disabled={true} style={styles.container}> 
            <View style={styles.modal}> 
                
                {/* Close Modal Button */}
                <TouchableOpacity style={styles.exitButton} onPress={() => closeModal(false)}>
                    <Text style={{fontSize: 20}}>X</Text>
                </TouchableOpacity>

                <View style={styles.modalContent}>
                    <Text style={styles.textInputHeader}>Break Name:</Text>
                    <TextInput style={styles.textInput} placeholder={'Break:'} value={breakName} onChangeText={text => setBreakName(text)} />  
                
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
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    modal: {
        height: SCREEN_HEIGHT/5,
        width: SCREEN_WIDTH/1.4,
        backgroundColor: 'white',
        borderColor: 'black',
        borderWidth: 3,
        borderRadius: 10,
    },
    modalContent: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    textInputHeader: {
        marginBottom: SCREEN_HEIGHT/70,
    },
    textInput: {
        width: '80%',
        height: SCREEN_HEIGHT/20,
        borderWidth: 2,
        borderRadius: 10,
        padding: 10,
    },
    addButton: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: SCREEN_HEIGHT/50,
        backgroundColor: 'blue', 
        width: SCREEN_WIDTH/2.6,
        height: SCREEN_HEIGHT/26,
    },
    addButtonText: {
        color: 'white',
    },

})