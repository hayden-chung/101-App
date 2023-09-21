import React, {useState} from 'react';
import {StyleSheet, Text, View, Button, Platform, Dimensions, FlatList, TouchableOpacity, Modal} from 'react-native';
import TimePicker from './timePicker';
import {AddBreakModal} from './addBreakModal'
import {fixedSessions} from './timetableSettingsData'
import { MaterialIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import TabBar from '../../tabBar';


const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

const TimetableSettings = ({navigation}) => { // Timetable Settings Screen.

    const [timetableTime, setTimetableTime] = useState(['start-finish'])
    const [breakSessions, setBreakSessions] = useState(Object.keys(fixedSessions).filter(type => type !== 'start-finish')); // Store break sessions only. Filter out start-finish from the list array.
    const [isNewBreakModalVisible, setNewBreakModalVisible] = useState(false); 

    const deleteBreak = (item) => { // If user presses the delete (trash can) button, delete the tiem. 
        delete fixedSessions[item]; // delete item from fixedSessions array. 'item' = a string (e.g. 'break 1)
    };

    const updateAndReRender = () => { // Update array that stores break sessions. 
        setBreakSessions([]) // Set to empty for the purpose of re-triggering the flatList as flatList will update when the array 'breakSession' changes.
        setBreakSessions(Object.keys(fixedSessions).filter(type => type !== 'start-finish')); // Store break sessions only. Filter out start-finish from the list array.
        setTimetableTime([])
        setTimetableTime(['start-finish'])
    } 

    return(
        <View style={styles.container}>
            <View style={styles.wrapper}>
                {/* Display header text of screen. */}
                <View style={styles.header}>
                    <TouchableOpacity style={styles.goBackHomeButton} onPress={() => navigation.goBack()}>  
                        <Ionicons name="chevron-back" size={SCREEN_HEIGHT/20} color="white"/>
                    </TouchableOpacity>
                    <Text style={styles.headerText}>Timetable Settings</Text>
                </View>

                {/* Display start & finish time of timetable */}
                <View style={styles.timetableStartFinishContainer}>
                    <Text style={styles.startFinishTitleText}>Timetable</Text>

                    

                        <FlatList
                            data={timetableTime}
                            renderItem={({item}) => {
                                return (
                                <View style={styles.startFinishWrapper}>
                                    <Text style={styles.startFinishText}>Start</Text>
                                    {/* sessionType='start-finish because we want to display the start-finish time of timetable. startOrFinish={0} so we can display the start time */}
                                    <TimePicker sessionType={item} startOrFinish={0} updateAndReRender={updateAndReRender}/> 

                                    <Text style={styles.startFinishText}>Finish</Text>
                                    {/* startOrFinish={1} so we can display the finish time of timetable. */}
                                    <TimePicker sessionType={item} startOrFinish={1} updateAndReRender={updateAndReRender}/>  
                                </View>
                            )}}
                        />

                    
                </View>

                {/* Display the rest of break sessions */}
                <View style={styles.breakSessionsContainer}>

                    {/* Break sessions header */}
                    <Text style={styles.breakSessionsHeaderText}>Break Sessions</Text>
                    <View style={styles.breakSessionsWrapper}>

                        {/* FlatList to iterate over the breakSessions array */}
                        <FlatList
                            data={breakSessions}        // input data 'breakSessions' with all the break sessions. 
                            showsVerticalScrollIndicator={false}
                            renderItem={({item}) => {
                            
                                return (   // item = string value of break sessions (e.g. 'break 1')
                                <View style={styles.breakSessionItem}>
                                    {/* Name of break session */}
                                    <View style={styles.itemRow1}>
                                        <Text style={styles.breakTitleText}>{item}</Text>
                                    </View>

                                    <View style={styles.itemRow2}>
                                        {/* Start time of break session */}
                                        <TimePicker sessionType={item} startOrFinish={0} updateAndReRender={updateAndReRender}/> 
                                        <Text style={styles.toText}>to</Text>
                                        {/* Finish time of break session */}
                                        <TimePicker sessionType={item} startOrFinish={1} updateAndReRender={updateAndReRender}/>  

                                        {/* Delete Button (with trash can icon button. When pressed, call deleteBreak to delete the break session and call updateAndReRender to update the breakSessions array after deleted.  */}
                                        <TouchableOpacity style={styles.removeBreak} onPress={() => {deleteBreak(item), updateAndReRender()}} >
                                            <MaterialIcons name="delete" size={24} color="black" />
                                        </TouchableOpacity>
                                    </View>
            
                                </View>
                            )}
                        }

                        />
                    </View>
                </View>
                
                {/* Add new break session button. When pressed, open setNewBreakModalVisible modal */}
                <TouchableOpacity style={styles.addBreakButton} onPress={() => {setNewBreakModalVisible(true)}}>
                    <Text style={styles.addBreakText}>Add Break</Text>
                </TouchableOpacity>
            </View>
            
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
                    updateAndReRender={updateAndReRender}         // if user adds new break session, function needs to update the break sessions so send this function as a paramter. 
                />
          </Modal>

        <View style={styles.pushToBottom}></View>
        <TabBar navigation={navigation}/>

        </View>
    )
}

const styles = StyleSheet.create({
    container: { // container = whole screen of timetable settings 
        flex: 1,
        alignItems: 'center', // flexDirection: 'column'
        backgroundColor: '#fdb386',
    }, 
    wrapper: {
        marginTop: SCREEN_HEIGHT/20,
        justifyContent: 'center',
        alignItems: 'center',
        width: '95%',
        height: SCREEN_HEIGHT/1.2,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: SCREEN_HEIGHT/40,
    },
    headerText: { // style header text (Timetable Settings)
        fontSize: SCREEN_HEIGHT/23,
        fontWeight: '600',
        color: 'white',
    },
    timetableStartFinishContainer: { // Container for displaying start/finish time of timetable. 
        width: '95%',
        padding: SCREEN_HEIGHT/50,
        flexDirection: 'column',
        alignContent: 'flex-start',
        borderRadius: 13,
        elevation: 5,
        backgroundColor: 'white',
    },
    startFinishTitleText: {
        fontSize: SCREEN_HEIGHT/38,
        fontWeight: '400',
        color: '#7A7A7A',
    },
    startFinishWrapper: { // Wrapper for start/finish time of timetable. 
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    startFinishText: { // Text displays start or finish (for time).
        fontSize: SCREEN_WIDTH/20,
    },
    breakSessionsContainer: { // container for listing break sessions. 
        marginTop: SCREEN_HEIGHT/50,
        height: SCREEN_HEIGHT/2,
        width: '95%',
        borderRadius: 10,
        elevation: 10,
        backgroundColor: 'white',
    },
    breakSessionsHeaderText: {
        paddingTop: SCREEN_HEIGHT/70,
        paddingLeft: SCREEN_WIDTH/30,
        fontSize: SCREEN_WIDTH/20,
    },
    breakSessionsWrapper: { // wrapper for list of break sessions. 
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    breakSessionItem: { // Individual item of break sessions. 
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: SCREEN_WIDTH/1.2,
        margin: SCREEN_HEIGHT/100,
        paddingVertical: SCREEN_HEIGHT/70,
        paddingLeft: SCREEN_WIDTH/30,
        borderRadius: 10,
        elevation: 6,
        backgroundColor: 'white',
    },
    itemRow1: {
        flexDirection: 'row',
        width: '100%',
    },
    breakTitleText: {
        color: '#7A7A7A',
    },
    itemRow2: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingLeft: SCREEN_WIDTH/30,
        width: '100%',
        paddingRight: SCREEN_WIDTH/20,
    },
    toText: {
        backgroundColor: 'white',
    },
    addBreakButton: { // Button styling for adding break session. 
        alignItems: 'center',
        justifyContent: 'center',
        width: '95%',
        height: SCREEN_HEIGHT/15,
        borderRadius: 14,
        marginTop: SCREEN_HEIGHT/30,
        backgroundColor: '#8EC685',
    },
    addBreakText: {
        color: 'white',
        fontWeight: '500',
        fontSize: SCREEN_HEIGHT/40,
    },
    pushToBottom: {
        flex: 1,    
    },
});

export default TimetableSettings;