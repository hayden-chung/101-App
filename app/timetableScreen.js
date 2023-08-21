import React, {useState, useEffect} from 'react';
import { KeyboardAvoidingView, StyleSheet, Text, View, FlatList, TouchableOpacity} from 'react-native';
import {timetable} from '../components/timetable/timetableGenerator'
import {TimetableGenerator} from '../components/timetable/timetableGenerator'
import TimeBlock from '../components/timetable/timetableBlocks'

// const setToTimeObject = () => {
//     for (let i = 0; i < timetable.length; i++) {
//         if (timetable[3]) {
//             console.
//         }
//     }
// } 


const TimetableScreen = ({navigation}) => { 

    console.log('====================================================================================================================================')
    console.log('testing in screen', timetableData)  

    // useEffect(() => {
    //     console.log('TimetableData has changed:', timetableData);
    // }, [timetableData]);

    const handleGenerate = (updatedTimetableData) => {
        const copyUpdatedTimetableData = [...updatedTimetableData]
        setTimetableData(copyUpdatedTimetableData);
        console.log('TIMETABLE DATA', timetableData, 'copied', copyUpdatedTimetableData)
    };

    return( 
        <View>

            {/* Generate New Timetable Button. When pressed, navigate to 'TimetableGenerator' screen. */}
            <TouchableOpacity onPress={() => 
                navigation.navigate("TimetableGenerator", {
                    timetableData: timetableData,
                    setTimetableData: setTimetableData,
                    // onGenerate: handleGenerate,
            })}>
                <Text>New Timetable</Text>
            </TouchableOpacity> 
                 
                <FlatList
                    data = {timetable}
                    renderItem={({item, index}) => 
                    <TimeBlock
                        item={item}
                        index={index}
                    />

                }/>

            <TouchableOpacity onPress={() => navigation.navigate("TimetableGenerator")}>
                <Text>New Timetable</Text>
            </TouchableOpacity> 
                 
                <FlatList
                    data = {timetable}
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