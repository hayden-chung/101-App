import React, {useState} from 'react';
import { KeyboardAvoidingView, StyleSheet, Text, View, FlatList, TouchableOpacity} from 'react-native';
import {timetable} from '../components/timetable/timetableGenerator'
import TimeBlock from '../components/timetable/timetableBlocks'

const TimetableScreen = ({navigation}) => { // navigation object allows users to navigate between pages. 
    console.log('====================================================================================================================================')
    console.log('testing in screen', timetable)  
    return(
        <View>

            {/* Generate New Timetable Button. When pressed, navigate to 'TimetableGenerator' screen. */}
            <TouchableOpacity onPress={() => navigation.navigate("TimetableGenerator")}>
                <Text>New Timetable</Text>
            </TouchableOpacity> 
                 
                {/* list of timetable items (timeblocks) */}
                <FlatList
                    data = {timetable} // Input timetable data for the timeblock items to render. 
                    renderItem={({item, index}) => 
                    <TimeBlock
                        item={item}
                        index={index}
                    />

                }/>
        </View>
    )
}

const styles = StyleSheet.create({
    
});

export default TimetableScreen;