import React, {useState} from 'react';
import { useRoute } from "@react-navigation/native"
import {StyleSheet, Text, View, FlatList} from 'react-native';
import {timetableSaved} from '../timetable/timetableStore'
import TimeBlock from '../timetable/generator/timeBlocks';

const MiniTimetable = ({navigation}) => { 

    console.log('timetableSaved', timetableSaved)
    const useTimetable = timetableSaved; 

    return(
        <FlatList
        data = {useTimetable || []} // Input timetable data for the timeblock items to render. If routeTimetable is not valid, just send an empty string to display nothing. 
        showsVerticalScrollIndicator={false} // hide scroll bar.
        renderItem={({item, index}) => // grab item and index of list for every iteration
        <TimeBlock // Send paramters item and index to timeblock function. 
            item={item} 
            index={index}
        />
        }/>
    )
}

const styles = StyleSheet.create({
    
});

export default MiniTimetable;