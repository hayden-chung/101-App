import React, {useState} from 'react';
import {useNavigation, useRoute} from "@react-navigation/native"
import { KeyboardAvoidingView, StyleSheet, Text, View, FlatList, TouchableOpacity} from 'react-native';
import {timetable} from '../components/timetable/generator/timetableGenerator'
import TimeBlock from '../components/timetable/generator/timeBlocks'

const TimetableScreen = ({navigation}) => { // navigation object allows users to navigate between pages. 
    console.log('====================================================================================================================================')
    console.log('testing in screen', timetable)  

    const route = useRoute(); // useRoute(), mainly in this context to receive parameter 'timetable' once it's generated. 

    const routeTimetable = route.params?.timetable; // '?' ensures routeTimetable is not null or undefined. 

    return(
        <View style={styles.container}>

            {/* Generate New Timetable Button. When pressed, navigate to 'TimetableGenerator' screen. */}
            <TouchableOpacity onPress={() => navigation.navigate("TimetableGenerator")}>
                <Text>New Timetable</Text>
            </TouchableOpacity> 
                 
                {/* list of timetable items (timeblocks) */}
            <View style={styles.sessionsListContainer}></View>
                <FlatList
                    data = {routeTimetable || []} // Input timetable data for the timeblock items to render. If routeTimetable is not valid, just send an empty string to display nothing. 
                    showsVerticalScrollIndicator={false} // hide scroll bar.
                    renderItem={({item, index}) => // grab item and index of list for every iteration
                    <TimeBlock // Send paramters item and index to timeblock function. 
                        item={item} 
                        index={index}
                    />

                }/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {

    },
    sessionsListContainer: {

    },
});

export default TimetableScreen;