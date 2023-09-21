import React, {useState} from 'react';
import {useNavigation, useRoute} from "@react-navigation/native"
import { Dimensions, StyleSheet, Text, View, FlatList, TouchableOpacity, Image} from 'react-native';
import {timetableSaved} from '../components/timetable/timetableStore'
import {fixedSessions} from '../components/timetable/settings/timetableSettingsData'
import TimeBlock from '../components/timetable/generator/timeBlocks'
import TabBar from '../components/tabBar';
import { MaterialIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = (Dimensions.get('window').height);

const formatTime = (timeObject) => { // format time (e.g. 12:30pm)
    timeString = ''
    const minutes = timeObject.getMinutes()
    let hours = 0
    if ((timeObject.getHours() - 12) > 0) { // format in pm if more than 12
        hours = timeObject.getHours()-12
        return `${hours}:${minutes}pm`
    } else { // else format in am
        hours = timeObject.getHours()
        return `${hours}:${minutes}am`
    }
}

const TimetableScreen = ({navigation}) => { // navigation object allows users to navigate between pages. 

    const timetableStartTimeString = formatTime(fixedSessions["start-finish"][0])
    const timetableEndTimeString = formatTime(fixedSessions["start-finish"][1])

    console.log('FIXEDSESSIONS', fixedSessions)

    const useTimetable = timetableSaved; // '?' ensures timetable is not null or undefined. 
    console.log('timetableStartTimeString:',timetableStartTimeString, 'timetableEndTimeString:', timetableEndTimeString)

    if (useTimetable.length === 0) {
        console.log('true')
    }
    return(
        <View style={styles.container}>

            {/* If timetable length is 0, display screen indicating timetable is empty */}
            {useTimetable.length === 0 ? (
                <View style={styles.noTimetableWrapper}>
                    <Image source={require('../assets/images/timetable/noTimetableImage.png')} style={styles.noTimetableImage}/>

                    <Text style={styles.noTimetableTextHeader}>No Timetable...</Text>
                    <Text style={styles.noTimetableTextSubheader}>Create a timetable with the tasks you want to complete today</Text>

                    {/* Generate New Timetable Button. When pressed, navigate to 'TimetableGenerator' screen. */}
                    <TouchableOpacity onPress={() => navigation.navigate("TimetableGenerator")} style={styles.newTimetableButtonNoTimetable}>
                        <Text style={styles.newTimetableButtonText}>Generate Today’s Timetable</Text>
                    </TouchableOpacity> 
                </View>
            ) : (
                <View style={styles.timetableWrapper}> 
                    <View style={styles.timetableHeaderRow}>

                        <TouchableOpacity style={styles.goBackHomeButton} onPress={() => navigation.goBack()}>  
                            <Ionicons name="chevron-back" size={SCREEN_HEIGHT/20} color="black"/>
                        </TouchableOpacity>

                        <Text style={styles.timetableHeaderText}>Today's Timetable</Text> 

                        <TouchableOpacity onPress={() => navigation.navigate("TimetableGenerator")} style={styles.newTimetableButton}>
                            <MaterialIcons name="post-add" size={SCREEN_HEIGHT/20} color="black" style={styles.newTimetableIcon} />
                        </TouchableOpacity>
                    </View>

                    <Text style={styles.subText}>Timetable Duration: {timetableStartTimeString} ~ {timetableEndTimeString}</Text>
                    <View style={styles.sessionsListContainer}>
                        {/* list of timetable items (timeblocks) */}
                        <FlatList
                            data = {useTimetable || []} // Input timetable data for the timeblock items to render. If useTimetable is not valid, just send an empty string to display nothing. 
                            showsVerticalScrollIndicator={false} // hide scroll bar.
                            renderItem={({item, index}) => // grab item and index of list for every iteration
                            <TimeBlock // Send paramters item and index to timeblock function. 
                                item={item} 
                                index={index}
                            />
                        }/>
                    </View>
                </View>
            )}              

            <View style={styles.pushToBottom}></View>
            <TabBar navigation={navigation}/>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    },
    noTimetableWrapper: {
        flex: 1,
        width: '90%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    },
    timetableWrapper: {
        flex: 1,
        width: '90%',
        marginTop: SCREEN_HEIGHT/7,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    },
    timetableHeaderRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        paddingRight: SCREEN_WIDTH/30,
    },
    noTimetableImage: {
        resizeMode: 'contain',
        height: SCREEN_HEIGHT/4,
        width: SCREEN_WIDTH/2,
    },
    noTimetableTextHeader: {
        fontSize: SCREEN_HEIGHT/30,
        fontWeight: '500',
        marginTop: SCREEN_HEIGHT/20,
        marginBottom: SCREEN_HEIGHT/40,
    },
    noTimetableTextSubheader: {
        fontSize: SCREEN_HEIGHT/50,
        fontWeight: '400',
        textAlign: 'center',
        color: '#969696',
        marginBottom: SCREEN_HEIGHT/20,
    },
    newTimetableButtonNoTimetable: {
        backgroundColor: '#FF9F60',
        alignItems: 'center',
        padding: SCREEN_HEIGHT/70,
        borderRadius: 10,
        elevation: 5,
    },
    timetableHeaderText: {
        fontSize: SCREEN_HEIGHT/33,
        fontWeight: '600',
    },
    newTimetableButton: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: SCREEN_HEIGHT/400,
        borderRadius: 7,
        borderWidth: 2.5,
        elevation: 10,
        backgroundColor: 'white',
    },
    subText: {
        width: '100%',
        marginTop: SCREEN_HEIGHT/50,
        paddingLeft: SCREEN_WIDTH/26,
        color: '#969696',
    },
    newTimetableButtonText: {
        color: 'white',
        fontWeight: '600',
        fontSize: SCREEN_HEIGHT/33,
    },
    sessionsListContainer: {
        marginTop: SCREEN_HEIGHT/50,
        marginBottom: SCREEN_HEIGHT/10,
    },
    
});

export default TimetableScreen;