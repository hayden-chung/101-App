import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions } from 'react-native';
import {timetable} from './timetableGenerator'
import {fixedSessions} from './settings/timetableSettingsData'

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = (Dimensions.get('window').height);

const TimeBlock = ({item, index}) => {
    const timeBlockName = item[0]
    let startTime = 0
    let endTime = 0

    // setting start and finish times 
    if (item[3]) { // if item is a task block
        for (let i = 0; i < index+2 && item[3]; i++) { // index = 4, i < 6
            if (timetable[index - i] && timetable[index - i][1] && timetable[index - i][1][1] && item[3]) { // if 'i' blocks before this item was a break period.
                let addTime = 0
                for (j=i-1; j > 0; j--) {
                    addTime = addTime + timetable[index-j][3]
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