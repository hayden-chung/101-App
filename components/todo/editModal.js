import React, {useState} from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions, TextInput, Alert } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import {updateTask} from './taskControls'

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = (Dimensions.get('window').height);

// ------------------------ MODAL SCREEN --------------------------------//
const WIDTH_MODAL = (Dimensions.get('window').width)/1.5;
const HEIGHT_MODAL = (Dimensions.get('window').height)/4;

export const EditModal = ({setEdit, index, taskItems, setTaskItems, updateTaskList}) => { // edit and delete quotes


    const [updatedTask, setUpdatedTask] = useState(taskItems[index][0]);
    console.log('taskItems', taskItems)

    const closeModal = () => { // Close modal 
        setEdit(false);
    };

    return ( 
        <TouchableOpacity
            disabled={true}
            style={styles.container}
        >
            {/* Popup Modal Screen */}
            <View style={styles.modal}> 
                <View style={styles.headerContainer}>
                    <Text style={styles.headerText}>Edit Task</Text>
                </View>
                <TextInput
                    style={styles.textInput}
                    value={updatedTask}
                    onChangeText={changedText => setUpdatedTask(changedText)}
                />

                <View style={styles.buttonRow}>
                    <TouchableOpacity style={styles.cancelButton} onPress={() => closeModal()}>
                        <Text>Cancel</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.updateButton} onPress={() => {updateTask(updatedTask, index, taskItems, setTaskItems); closeModal()}}>
                        <Text>Update</Text>
                    </TouchableOpacity>
                </View>
                
            </View>
    

        </TouchableOpacity>
        

    )
}

const styles= StyleSheet.create({
    container: {
        flex: 1, 
        alignItems: 'center', 
        justifyContent: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.60)', // set opacity to 0.6
    }, 
    modal: {
        width: '80%', 
        flexDirection: 'column',
        alignItems: 'center', 
        justifyContent: 'center',
        paddingVertical: SCREEN_HEIGHT/60,
        borderColor: 'white',
        borderwidth: 3,
        borderRadius: 10,
        elevation: 5,
        backgroundColor: 'white',
    },
    headerContainer: {
        marginBottom: SCREEN_HEIGHT/70,
    },
    headerText: {
        fontSize: SCREEN_HEIGHT/45,
        fontWeight: '500',
    },
    textInput: {
        paddingHorizontal: SCREEN_WIDTH/50,
        width: '90%', 
        height: SCREEN_HEIGHT/18,
        borderRadius: SCREEN_HEIGHT/90,
        borderColor: 'black',
        borderWidth: 2,
    },
    buttonRow: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: SCREEN_HEIGHT/50,
    },
    cancelButton: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: '40%',
        height: SCREEN_HEIGHT/20,
        borderRadius: SCREEN_HEIGHT/90,
        elevation: 5,
        backgroundColor: 'green',
    },
    updateButton: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: '40%',
        height: SCREEN_HEIGHT/20,
        borderRadius: SCREEN_HEIGHT/90,
        backgroundColor: 'green',
    },

})
