import React, {useState} from 'react';
import {StyleSheet, Text, View, Button, Platform, Dimensions, FlatList, TouchableOpacity, Modal} from 'react-native';
import TimePicker from './timePicker';
import {AddBreakModal} from './addBreakModal'
import {fixedSessions} from './timetableSettingsData'
import { MaterialIcons } from '@expo/vector-icons';


const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

const TimetableSettings = () => { // Timetable Settings Screen.

    const [breakSessions, setBreakSessions] = useState(Object.keys(fixedSessions).filter(type => type !== 'start-finish')); // Store break sessions only. Filter out start-finish from the list array.
    const [isNewBreakModalVisible, setNewBreakModalVisible] = useState(false); 

    const deleteBreak = (item) => { // If user presses the delete (trash can) button, delete the tiem. 
        delete fixedSessions[item]; // delete item from fixedSessions array. 'item' = a string (e.g. 'break 1)
    };

    const updateBreakSessions = () => { // Update array that stores break sessions. 
        setBreakSessions(Object.keys(fixedSessions).filter(type => type !== 'start-finish')); // Store break sessions only. Filter out start-finish from the list array.
    }

    console.log('fixed opening session', fixedSessions)

    return(
        <View style={styles.container}>

            {/* Display header text of screen. */}
            <View style={styles.header}>
                <Text style={styles.headerText}>Timetable Settings</Text>
            </View>

            {/* Display start & finish time of timetable */}
            <View style={styles.timetableStartFinishContainer}>
                <Text style={styles.startFinishTitleText}>Timetable Start-Finish</Text>

                <View style={styles.startFinishWrapper}>

                    {/* sessionType='start-finish because we want to display the start-finish time of timetable. startOrFinish={0} so we can display the start time */}
                    <Text style={styles.startFinishText}>Start</Text>
                    <TimePicker sessionType='start-finish' startOrFinish={0}/> 

                    {/* startOrFinish={1} so we can display the finish time of timetable. */}
                    <Text style={styles.startFinishText}>Finish</Text>
                    <TimePicker sessionType='start-finish' startOrFinish={1}/>  
                </View>
            </View>

            {/* Display the rest of break sessions */}
            <View style={styles.breakSessionsContainer}>

                {/* Break sessions header */}
                <Text style={styles.breakSessionsHeader}>Break Sessions</Text>
                <View style={styles.breakSessionsWrapper}>

                    {/* FlatList to iterate over the breakSessions array */}
                    <FlatList
                        data={breakSessions}        // input data 'breakSessions' with all the break sessions. 
                        renderItem={({item}) => (   // item = string value of break sessions (e.g. 'break 1')
                            <View style={styles.breakSessionItems}>
                                {/* Name of break session */}
                                <Text>{item}</Text>


                                {/* Start time of break session */}
                                <Text style={styles.startFinishText}>Start</Text>
                                <TimePicker sessionType={item} startOrFinish={0}/> 

                                {/* Finish time of break session */}
                                <Text style={styles.startFinishText}>Finish</Text>
                                <TimePicker sessionType={item} startOrFinish={1}/>  

                                {/* Delete Button (with trash can icon button. When pressed, call deleteBreak to delete the break session and call updateBreakSessions to update the breakSessions array after deleted.  */}
                                <TouchableOpacity style={styles.removeBreak} onPress={() => {deleteBreak(item), updateBreakSessions()}} >
                                    <MaterialIcons name="delete" size={24} color="black" />
                                </TouchableOpacity>
        
                            </View>
                        )
                    }
                    />
                </View>
            </View>
            
            {/* Add new break session button. When pressed, open setNewBreakModalVisible modal */}
            <TouchableOpacity style={styles.addBreakButton} onPress={() => {setNewBreakModalVisible(true)}}>
                <Text style={styles.addBreakText}>Add Break</Text>
            </TouchableOpacity>
            
            {/* <Modal/> component ensures <AddBreakModal/> is only viisble when visible={true} */}
            <Modal
                transparent ={true} // covers screen completely but allows transparency in empty areas. 
                animationType='fade' // fade animation when appearing/disappearing.
                visible={isNewBreakModalVisible} // modal is visible (true/false)
                onRequestClose={() => setNewBreakModalVisible(false)} // when backbutton tapped, close modal
            >
                {/* Display modal to add a break session */}
                <AddBreakModal
                    setNewBreakModalVisible={setNewBreakModalVisible} // send setNewBreakModalVisible as a parameter so the AddBreakModal function can set it to false when user closes the modal.
                    updateBreakSessions={updateBreakSessions}         // if user adds new break session, function needs to update the break sessions so send this function as a paramter. 
                />
          </Modal>

        </View>
    )
}

const styles = StyleSheet.create({
    container: { // container = whole screen of timetable settings 
        flex: 1,
        paddingTop: SCREEN_HEIGHT/20,
        alignItems: 'center', // flexDirection: 'column'
        backgroundColor: 'green',
    }, 
    header: {
        
    },
    headerText: { // style header text (Timetable Settings)
        fontSize: SCREEN_HEIGHT/20,
    },
    timetableStartFinishContainer: { // Container for displaying start/finish time of timetable. 
        width: '100%',
        padding: SCREEN_HEIGHT/50,
        flexDirection: 'column',
        alignContent: 'flex-start',
        backgroundColor: 'white',
    },
    startFinishTitleText: {
    },
    startFinishWrapper: { // Wrapper for start/finish time of timetable. 
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    startFinishText: { // Text displays start or finish (for time).
        fontSize: SCREEN_WIDTH/20,
    },
    breakSessionsContainer: { // container for listing break sessions. 
        height: 400,
        backgroundColor: '#D3D3D3',
    },
    breakSessionsWrapper: { // wrapper for list of break sessions. 
        padingBottom: SCREEN_HEIGHT/2,
    },
    breakSessionItems: { // Individual item of break sessions. 
        width: SCREEN_WIDTH/1.2,
        height: SCREEN_HEIGHT/10,
        margin: SCREEN_HEIGHT/100,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'yellow',
    },
    addBreakButton: { // Button styling for adding break session. 
        alignItems: 'center',
        justifyContent: 'center',
        width: SCREEN_WIDTH/1.2,
        height: SCREEN_HEIGHT/10,
        backgroundColor: 'pink',
    },
    addBreakText: {

    }
});

export default TimetableSettings;