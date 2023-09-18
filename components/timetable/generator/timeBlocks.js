import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions } from 'react-native';
import {timetableSaved} from '../timetableStore'
import {fixedSessions} from '../settings/timetableSettingsData'
import { Ionicons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = (Dimensions.get('window').height);

const TimeBlock = ({item, index}) => {
    let startTime = 0
    let endTime = 0
    const timetable = timetableSaved
    const isBreak = Array.isArray(item[1])
    let timeInHours = null
    if (isBreak) {
        timeInHours = ((item[1][1]-item[1][0])/(1000*60*60)).toFixed(2) // finish time - start time. Convert to hours from ms and round to 2dp. 
    } else {
        timeInHours = item[3]/100
    }

    // setting start and finish times. Order of time blocks has been set in the timetable generator function, so now we need to set the exact time of the timeblocks (e.g. 15:30-18:30))
    if (item[3]) { // First make sure the timeBlock is valid (not null or undefined)
        for (let i = 0; i < index+2 && item[3]; i++) { 
            if (timetable[index - i] && timetable[index - i][1] && timetable[index - i][1][1] && item[3]) { // if these conditions are true (basically, if there is a break session before the current task), it indicates a break is present at index 'index-1'.
                let addTime = 0
                for (j=i-1; j > 0; j--) { // Sum up the time of all sessions before the current task to the break session to set the starting time. 
                    addTime = addTime + timetable[index-j][3] // 
                }
                
                startTime = new Date(timetable[index-i][1][1].getTime() + addTime*60*60*10) 
                endTime = new Date(startTime.getTime() + item[3]*60*60*10) // e.g. 1(hr) * 60 * 60 * 1000 = 100 * 60 * 60 * 10
            
                break
            }  
            if (index - i < 0) {// if index is below 0 then use the start time of the timetable
                let addTime = 0
                for (k=i-1; k > 0; k--) { 
                    addTime = addTime + timetable[index-k][3]
                }

                startTime = new Date(fixedSessions['start-finish'][0].getTime() + addTime*60*60*10)
                endTime = new Date(startTime.getTime() + item[3]*60*60*10)
            
            }
        } 
    }
    else { // if item is a break block
        startTime = item[1][0]
        endTime = item[1][1]
    }

    let displayStartTimeMinutes = null
    let displayEndTimeMinutes = null
    // Format Time. If e.g. minutes = 5min --> 05min
    if (startTime !== 0 && startTime !== undefined && startTime !== null) {
        displayStartTimeMinutes = startTime.getMinutes().toString().padStart(2, '0');
        displayEndTimeMinutes = endTime.getMinutes().toString().padStart(2, '0');
    }

    return (
        <View style={{...styles.item, borderColor: isBreak? '#a1cc9f' : '#f59999'}}> 

            <View style={styles.row1}>
                {/* Task name */}
                <Text style={styles.taskText}>{item[0]}</Text> 

                {item[4] === 'work' && (
                    <Entypo name={'suitcase'} size={SCREEN_WIDTH/15} color="#3a46bf" />
                )}
                {item[4] === 'exercise&nutrition' && (
                    <MaterialIcons name={'fitness-center'} size={SCREEN_WIDTH/15} color="orange" />
                )}
                {item[4] === 'relaxation' && (
                    <FontAwesome5 name="coffee" size={SCREEN_WIDTH/19} color="#50bfd1" />
                )}
                {item[4] === 'relationships' && (
                    <Entypo name={'chat'} size={SCREEN_WIDTH/15} color="#9e32db" />
                )}
                {item[4] === 'sleep' && (
                    <MaterialCommunityIcons name={'power-sleep'} size={SCREEN_WIDTH/15} color="#f0ca00" />
                )}
                {item[4] === 'personaldevelopment' && (
                    <MaterialCommunityIcons name={'head-cog'} size={SCREEN_WIDTH/15} color="#21a177" />
                )}
                {item[4] === null && (
                    <View></View>
                )}
            </View>
 
            <View style={styles.row2}>

                <Text>({timeInHours}h)</Text>
                
                {startTime !== 0 && startTime !== undefined && startTime !== null && (
                    <Text>
                        {startTime.getHours() < 12 // Determine whether time is am or pm. 
                            ? `${startTime.getHours()}:${displayStartTimeMinutes}am`
                            : startTime.getHours() === 12 
                                ? `${startTime.getHours()}:${displayStartTimeMinutes}pm` // If 12pm, don't subtract 12, else subtract 12 to display pm time. 
                                : `${startTime.getHours()-12}:${displayStartTimeMinutes}pm`
                        }
                        ~
                        {endTime.getHours() < 12 // Determine whether time is am or pm. 
                            ? `${endTime.getHours()}:${displayEndTimeMinutes}am`
                            : endTime.getHours() === 12 
                                ? `${endTime.getHours()}:${displayEndTimeMinutes}pm` // If 12pm, don't subtract 12, else subtract 12 to display pm time. 
                                : `${endTime.getHours()-12}:${displayEndTimeMinutes}pm`
                        }
                    </Text> 
                )}

            </View>
            
        </View>
    );
}

const styles = StyleSheet.create({
    item: { // quote Item
        flexDirection: 'column',
        width: SCREEN_WIDTH/1.15,
        padding: 20,
        borderRadius: 10,  
        borderWidth: 3,
        marginBottom: 10,
        backgroundColor: 'white',
    },
    row1: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        paddingBottom: SCREEN_HEIGHT/50,
    },
    taskText: {
        fontWeight: '600',
        fontSize: SCREEN_HEIGHT/50,
    },
    row2: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
});

export default TimeBlock;