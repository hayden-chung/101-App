import React, {useState} from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions} from 'react-native';
import { useIsFocused } from '@react-navigation/native'; 
import QuoteOfDay from '../components/homeScreen/quoteOfDay'
import TodoList from '../components/homeScreen/todoList'
import MiniTimetable from '../components/homeScreen/miniTimetable'
import { Ionicons } from '@expo/vector-icons';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = (Dimensions.get('window').height);

const HomeScreen = ({navigation}) => { 
    const isFocused = useIsFocused(); // determine current focus state of screen. 

    return(
        <View styles={styles.container}>

            <View style={styles.row1}>
                {/* --------------------- QUOTE OF THE DAY --------------------- */}
                <TouchableOpacity style={styles.quoteContainer} onPress={() => navigation.navigate("QuoteScreen")}>
                    <Text style={styles.quoteOfDayTitle}>QUOTE OF THE DAY</Text>

                    {/* If screen focus changes, re-render QuoteOfDay */}
                    {isFocused && <QuoteOfDay/>} 
                </TouchableOpacity>

                {/* --------------------- WELLBEING --------------------- */}
                <TouchableOpacity style={styles.wellbeingScreen} onPress={() => navigation.navigate("WellBeingScreen")}>
                    <Text styles={styles.todoText}>Wellbeing Screen</Text>
                </TouchableOpacity>
            </View>


            <View style={styles.row2}>
                {/* --------------------- TODO --------------------- */}
                <View style={styles.todoScreenContainer}>
                    <TouchableOpacity style={styles.todoHeader} onPress={() => navigation.navigate("ToDoScreen")}>
                        <Text styles={styles.todoText}>Todo Screen</Text> 
                        <Ionicons name="open-outline" size={24} color="black" />
                    </TouchableOpacity>
                    {isFocused && <TodoList/>}
                </View>

                <View style={styles.timetableContainer}>
                    <TouchableOpacity style={styles.timetableHeader} onPress={() => navigation.navigate("TimetableScreen")}>
                        <Text styles={styles.timetableText}>Timetable Screen</Text> 
                        <Ionicons name="open-outline" size={24} color="black" />
                    </TouchableOpacity>
                    <MiniTimetable/>
                </View>

            </View>

        
        </View>
    )
}

const styles = StyleSheet.create({

    row1: {
        flexDirection: 'row',
        height: SCREEN_HEIGHT/2,
        backgroundColor: 'yellow',
    },
    quoteContainer: {
        flex: 1,
    },
    wellbeingScreen: {
        flex: 1,
    },

    row2: {
        flexDirection: 'row',
        height: SCREEN_HEIGHT/2,
    },
    todoScreenContainer: {
        flex: 1,
    },
    todoHeader: {
    },

    timetableContainer: {
        flex: 1,
    },
    timetableHeader: {

    },
    timetableText: {
        
    },

});

export default HomeScreen;