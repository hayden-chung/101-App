import React, {useState} from 'react';
import {StyleSheet, Text, View, Button, Platform, Dimensions, FlatList, TouchableOpacity, Modal} from 'react-native';
import TimePicker from './timePicker';
import {AddBreakModal} from './addBreakModal'
import {fixedSessions} from './timetableSettingsData'
import { MaterialIcons } from '@expo/vector-icons';


const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

const TimetableSettings = () => { 

    const RemoveBreak = (item) => {
        delete fixedSessions[item];
    };

    const UpdateSessions = () => {
        setBreakSessions(Object.keys(fixedSessions).filter(type => type !== 'start-finish')); // Store break sessions only. Remove start-finish from the list array.
    }

    const [breakSessions, setBreakSessions] = useState(Object.keys(fixedSessions).filter(type => type !== 'start-finish')); // Store break sessions only. Remove start-finish from the list array.
    const [isBreakModalVisible, setBreakModalVisible] = useState(false);

    return(
        <View style={styles.container}>

            <View style={styles.header}>
                <Text style={styles.headerText}>Timetable Settings</Text>
            </View>

            <View style={styles.startFinishContainer}>
                <Text style={styles.startFinishTitleText}>Timetable Start-Finish</Text>

                <View style={styles.startFinishWrapper}>
                    <Text style={styles.startText}>Start</Text>
                    {/* sessionType = name of session, startOrFinish = starting or finishing time (0 = start, 1 = finish)*/}
                    <TimePicker sessionType='start-finish' startOrFinish={0}/> 

                    <Text style={styles.startText}>Finish</Text>
                    <TimePicker sessionType='start-finish' startOrFinish={1}/>  
                </View>
            </View>

            
            <View style={styles.breakSessionsContainer}>
                <Text style={styles.breakSessionsText}>Break Sessions</Text>
                <View style={styles.breakSessionsWrapper}>

                    <FlatList
                        data={breakSessions}
                        renderItem={({item}) => (
                            <View style={styles.breakSessionItems}>
                                <Text style={styles.startText}>Start</Text>
                                <TimePicker sessionType={item} startOrFinish={0}/> 
            
                                <Text style={styles.startText}>Finish</Text>
                                <TimePicker sessionType={item} startOrFinish={1}/>  

                                {/* Delete Button */}
                                <TouchableOpacity style={styles.removeBreak} onPress={() => {RemoveBreak(item), UpdateSessions()}} >
                                    <MaterialIcons name="delete" size={24} color="black" />
                                </TouchableOpacity>
        
                            </View>
                        )
                    }
                    />
                </View>
            </View>
            
            {/* Add new break session */}
            <TouchableOpacity style={styles.addBreakButton} onPress={() => {setBreakModalVisible(true)}}>
                <Text style={styles.addBreakText}>Add Break</Text>
            </TouchableOpacity>

            <Modal
                transparent ={true} // covers screen completely but allows transparency in empty areas. 
                animationType='fade' // fade animation when appearing/disappearing.
                visible={isBreakModalVisible} // modal is visible (true/false)
                onRequestClose={() => setBreakModalVisible(false)} // when backbutton tapped, close modal
            >
                {/* Make a new wellbeing rating (Modal Component) */}
                <AddBreakModal
                    setBreakModalVisible={setBreakModalVisible}
                    UpdateSessions={UpdateSessions}
                />
          </Modal>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: SCREEN_HEIGHT/20,
        alignItems: 'center', // flexDirection: 'column'
        backgroundColor: 'green',
    }, 
    header: {
        
    },
    headerText: {
        fontSize: SCREEN_HEIGHT/20,
    },
    startFinishContainer: {
        width: '100%',
        padding: SCREEN_HEIGHT/50,
        flexDirection: 'column',
        alignContent: 'flex-start',
        backgroundColor: 'white',
    },
    startFinishTitleText: {
    },
    startFinishWrapper: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    startText: {
        fontSize: SCREEN_WIDTH/20,
    },
    breakSessionsContainer: {
        height: 400,
        backgroundColor: '#D3D3D3',
    },
    breakSessionsWrapper: {
        padingBottom: SCREEN_HEIGHT/2,
    },
    breakSessionItems: {
        width: SCREEN_WIDTH/1.2,
        height: SCREEN_HEIGHT/10,
        margin: SCREEN_HEIGHT/100,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'yellow',
    },
    addBreakButton: {
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