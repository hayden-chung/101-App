import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions } from 'react-native';
import {timetable} from './timetableGenerator'
import {fixedSessions} from './settings/timetableSettingsData'

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = (Dimensions.get('window').height);

const TimeBlock = ({item, index}) => {
    console.log('item', item)
    console.log('fixed session', fixedSessions)
    console.log(item[3])
    const timeBlockName = item[0]

    // setting start and finish times 
    if (item[3]) { // if item is a task block
        console.log('hi')
        for (let i = 0; i < index+2 && item[3]; i++) { // index = 4, i < 6
            if (timetable[index - i] && timetable[index - i][1] && timetable[index - i][1][1] && item[3]) { // if 'i' blocks before this item was a break period.
                console.log(item, 'previous block', timetable[index-i][1][1])
                let addTime = 0
                for (j=i-1; j > 0; j--) {
                    addTime = addTime + timetable[index-j][3]
                    console.log('testing', timetable[index-j][3])
                }
                
                console.log("THIS", timetable[index-i][1][1]) 
                const startTime = new Date(timetable[index-1][1][1].getTime() + addTime*60*60*10) 
                const endTime = new Date(startTime.getTime() + item[3]*60*60*10) // e.g. 1(hr) * 60 * 60 * 1000 = 100 * 60 * 60 * 10
                console.log('startime', startTime, 'endime', endTime) 
                break
            }  
            if (index - i < 0) {// if index is below 0 then use the start time of the timetable
                let addTime = 0
                for (k=i-1; k > 0; k--) { 
                    addTime = addTime + timetable[index-k][3]
                }
                const startTime = new Date(fixedSessions['start-finish'][0].getTime() + addTime*60*60*10)

                const endTime = new Date(startTime.getTime() + item[3]*60*60*10)
                console.log('ITEM', item, 'BELOW INDEX OF ARRAY - startime', startTime, 'endime', endTime) 
            }
        } 
        
    }
    else { // if item is a break block
        const startTime = item[1][0]
        const endTime = item[1][1]
    }
    console.log('------------------------------------------------------------------------------------------------')
    return (
        <View style={styles.item}> 
            <Text>

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