import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions } from 'react-native';
import {timetableSaved} from '../timetableStore'
import {fixedSessions} from '../settings/timetableSettingsData'

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = (Dimensions.get('window').height);

const TimeBlock = ({item, index}) => {
    const timeBlockName = item[0]
    let startTime = 0
    let endTime = 0
    const timetable = timetableSaved
    
    // setting start and finish times. Order of time blocks has been set in the timetable generator function, so now we need to set the exact time of the timeblocks (e.g. 15:30-18:30))
    if (item[3]) { // First make sure the timeBlock is a task (not a break)
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


    return (
        <View style={styles.item}> 
            <Text>
                {item[0]}
                
            </Text> 
            <Text>
                Time:
                {startTime.getHours()}:{startTime.getMinutes()} ~ {endTime.getHours()}:{endTime.getMinutes()}
            </Text> 
        </View>
    );
}

const styles = StyleSheet.create({
    item: { // quote Item
        padding: 15,
        borderRadius: 10,   
        backgroundColor: 'white',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent:'space-between', 
        marginBottom: 10,
    },

});

export default TimeBlock;