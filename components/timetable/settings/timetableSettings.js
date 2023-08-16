import React, {useState} from 'react';
import {StyleSheet, Text, View, Button, Platform, Dimensions, FlatList} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import TimePicker from './timePicker';
import {fixedSessions} from '../timetableSettingsData'

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

const TimetableSettings = () => { 

    const breakSessions = Object.keys(fixedSessions).filter(type => type !== 'start-finish'); // remove start-finish from the list array
    console.log(breakSessions);

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
                            </View>
                        )
                    }
                    />
    



                    <Text style={styles.startText}>Start</Text>
                    {/* sessionType = name of session, startOrFinish = starting or finishing time (0 = start, 1 = finish)*/}
                    <TimePicker sessionType='start-finish' startOrFinish={0}/> 

                    <Text style={styles.startText}>Finish</Text>
                    <TimePicker sessionType='start-finish' startOrFinish={1}/>  
                </View>
            </View>





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
    breakSessionItems: {
        width: SCREEN_WIDTH/1.2,
        height: SCREEN_HEIGHT/10,
        margin: SCREEN_HEIGHT/100,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'yellow',
    },
});

export default TimetableSettings;