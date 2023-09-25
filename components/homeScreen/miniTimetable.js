import React, {useState} from 'react';
import { useRoute } from "@react-navigation/native"
import {StyleSheet, Text, View, FlatList, Dimensions, TouchableOpacity} from 'react-native';
import {timetableSaved} from '../timetable/timetableStore'
import { Ionicons } from '@expo/vector-icons';
import TimeBlock from '../timetable/generator/timeBlocks';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

const MiniTimetable = ({navigation, small}) => { 

    const useTimetable = timetableSaved; // copy current timetable

    return (
        <View style={small ? styles.containerSmall : styles.containerBig}>
            <Text style={styles.headerText}>Timetable</Text>

            {/* Display list of timetable while iterating over it */}
            {useTimetable.length !== 0 ? ( // Use curly braces for the condition
                <View style={styles.timetableWrapper}>
                    <FlatList
                        data={useTimetable || []}
                        showsVerticalScrollIndicator={false}
                        renderItem={({ item, index }) => (
                            // individual time blocks of timetable
                            <TimeBlock
                                item={item}
                                index={index}
                                miniScreen={true}
                            />
                        )}
                    />
                </View>
                // if timetable doesn't exist, don't display anything
            ) : 
            <View style={styles.blank}>
                <Text style={{fontSize: SCREEN_HEIGHT/35, fontWeight: '300'}}>No Timetable</Text>
            </View>}

            {/* open button at bottom */}
            <TouchableOpacity style={styles.openButtonRow} onPress={() => navigation.navigate("TimetableScreen")}>
                <Text style={styles.buttonText}>Open</Text> 
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    containerBig: { // timetable in main timetable screen
        height: '100%',
        alignItems: 'center',
    },
    containerSmall: { // if timetable is displaying in homescrene
        height: '100%',
        width: '100%',
        alignItems: 'center',
        backgroundColor: 'white',
    },
    headerText: { // title
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
    blank: { // if no timtetable
        flex: 1,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
    },
    openButtonRow: { // open button 
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
    buttonText: { // open text
        fontSize: SCREEN_HEIGHT/40,
        fontWeight: '600',
    },
});

export default MiniTimetable;