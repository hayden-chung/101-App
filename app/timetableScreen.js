import React, {useState} from 'react';
import {useNavigation, useRoute} from "@react-navigation/native"
import { KeyboardAvoidingView, StyleSheet, Text, View, FlatList, TouchableOpacity} from 'react-native';
import {timetableSaved} from '../components/timetable/timetableStore'
import TimeBlock from '../components/timetable/generator/timeBlocks'
import TabBar from '../components/tabBar';

const TimetableScreen = ({navigation}) => { // navigation object allows users to navigate between pages. 

    const useTimetable = timetableSaved; // '?' ensures timetable is not null or undefined. 
    console.log('timetable in screen:',useTimetable, 'and', timetableSaved)

    return(
        <View style={styles.container}>

            {/* Generate New Timetable Button. When pressed, navigate to 'TimetableGenerator' screen. */}
            <TouchableOpacity onPress={() => navigation.navigate("TimetableGenerator")}>
                <Text>New Timetable</Text>
            </TouchableOpacity> 
                 
                {/* list of timetable items (timeblocks) */}
            <View style={styles.sessionsListContainer}></View>
                <FlatList
                    data = {useTimetable || []} // Input timetable data for the timeblock items to render. If useTimetable is not valid, just send an empty string to display nothing. 
                    showsVerticalScrollIndicator={false} // hide scroll bar.
                    renderItem={({item, index}) => // grab item and index of list for every iteration
                    <TimeBlock // Send paramters item and index to timeblock function. 
                        item={item} 
                        index={index}
                    />
                }/>

            
            <View style={styles.pushToBottom}></View>
            <TabBar navigation={navigation}/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    sessionsListContainer: {

    },
    pushToBottom: {
        flex: 1,    
    },
});

export default TimetableScreen;