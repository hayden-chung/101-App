import React, {useState} from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions} from 'react-native';
import { useIsFocused } from '@react-navigation/native'; 
import QuoteOfDay from '../components/homeScreen/quoteOfDay'
import TodoList from '../components/homeScreen/todoList'
import MiniTimetable from '../components/homeScreen/miniTimetable'
import TabBar from '../components/tabBar'
import { Ionicons } from '@expo/vector-icons';
import { Touchable } from 'react-native';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = (Dimensions.get('window').height);

const HomeScreen = ({navigation}) => { 
    const isFocused = useIsFocused(); // determine current focus state of screen. 

    return(
        <View style={styles.container}>

            <View style={styles.dashboardContainer}>
                <View style={styles.row1Container}>
                    <View style={styles.row1Wrapper}>
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
                </View>


                <View style={styles.row2Container}>
                    <View style={styles.row2Wrapper}>
                        {/* --------------------- TODO --------------------- */}
                        <View style={styles.todoScreenContainer}>
                            <TouchableOpacity style={styles.todoHeader} onPress={() => navigation.navigate("ToDoScreen")}>
                                <Text styles={styles.todoText}>Todo Screen</Text> 
                                <Ionicons name="open-outline" size={24} color="black" />
                            </TouchableOpacity>
                            <View style={styles.todoListWrapper}>
                                {isFocused && <TodoList/>}
                            </View>
                        </View>

                        {/* --------------------- TIMETABLE --------------------- */}
                        <View style={styles.timetableContainer}>
                            <TouchableOpacity style={styles.timetableHeader} onPress={() => navigation.navigate("TimetableScreen")}>
                                <Text styles={styles.timetableText}>Timetable Screen</Text> 
                                <Ionicons name="open-outline" size={24} color="black" />
                            </TouchableOpacity>
                            <MiniTimetable/>
                        </View>
                    </View>
                </View>
            </View>

            <View style={styles.pushToBottom}></View>    
            <TabBar navigation={navigation}/>
        </View>
    )
}

const todoAndTimetableContainerHeight = SCREEN_HEIGHT/2.4;
const todoAndTimetableHeaderHeight = SCREEN_HEIGHT/19;
const todoAndTimetableListWrapperHeight = todoAndTimetableContainerHeight - todoAndTimetableHeaderHeight;

const styles = StyleSheet.create({

    container: {
        flex: 1,
    },
    dashboardContainer: {
        height: SCREEN_HEIGHT/1.2
    },

    // ---------- ROW 1 ---------- // 
    row1Container: {
        justifyContent: 'center',
        height: '50%',
        backgroundColor: 'yellow',
    },
    row1Wrapper: {
        flexDirection: 'row',
        backgroundColor: 'red',
        width: '100%',
        height: SCREEN_HEIGHT/3,
    },
    quoteContainer: {
        flex: 1,

    },
    wellbeingScreen: {
        flex: 1,
    },

    // ---------- ROW 2 ---------- //
    row2Container: {
        height: todoAndTimetableContainerHeight,
        backgroundColor: 'magenta',
    },
    row2Wrapper: {
        flexDirection: 'row',
    },

    todoScreenContainer: {
        flex: 1,
    },
    todoListWrapper: {
        height: todoAndTimetableListWrapperHeight,
    },
    todoHeader: {
        flexDirection: 'row',
        height: todoAndTimetableHeaderHeight,
    },

    timetableContainer: {
        flex: 1,
    },
    timetableHeader: {
        flexDirection: 'row',
    },
    timetableText: {
        
    },
    pushToBottom: {
        flex: 1,    
    },

});

export default HomeScreen;