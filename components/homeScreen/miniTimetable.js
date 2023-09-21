import React, {useState} from 'react';
import { useRoute } from "@react-navigation/native"
import {StyleSheet, Text, View, FlatList, Dimensions, TouchableOpacity} from 'react-native';
import {timetableSaved} from '../timetable/timetableStore'
import { Ionicons } from '@expo/vector-icons';
import TimeBlock from '../timetable/generator/timeBlocks';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

const MiniTimetable = ({navigation, small}) => { 

    const useTimetable = timetableSaved; 

return (
    <View style={small ? styles.containerSmall : styles.containerBig}>
        <Text style={styles.headerText}>Timetable</Text>
        {useTimetable.length !== 0 ? ( // Use curly braces for the condition
            <View style={styles.timetableWrapper}>
                <FlatList
                    data={useTimetable || []}
                    showsVerticalScrollIndicator={false}
                    renderItem={({ item, index }) => (
                        <TimeBlock
                            item={item}
                            index={index}
                            miniScreen={true}
                        />
                    )}
                />
            </View>
        ) : <View style={styles.blank}></View>}
        <TouchableOpacity style={styles.openButtonRow} onPress={() => navigation.navigate("TimetableScreen")}>
            <Text style={styles.buttonText}>Open</Text> 
        </TouchableOpacity>
    </View>
);
}

const styles = StyleSheet.create({
    containerBig: {
        height: '100%',
        alignItems: 'center',
    },
    containerSmall: {
        height: '100%',
        width: '100%',
        alignItems: 'center',
        backgroundColor: 'white',
    },
    headerText: {
        fontSize: SCREEN_WIDTH/17,
        textAlign: 'center',
        fontWeight: '600',
        marginTop: SCREEN_HEIGHT/90,
        marginBottom: SCREEN_HEIGHT/60,
        color: 'black',
    },
    timetableWrapper: {
        flex: 1,
        marginBottom: SCREEN_HEIGHT/80,
    },
    blank: {
        flex: 1,
        backgroundColor: 'white',
    },
    openButtonRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: '10%',
        width: '90%',
        borderRadius:100,
        marginBottom: SCREEN_HEIGHT/80,
        backgroundColor: 'white',
        elevation: 5,
    },
    buttonText: {
        fontSize: SCREEN_HEIGHT/40,
        fontWeight: '600',
    },
});

export default MiniTimetable;