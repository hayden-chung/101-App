import React, {useState} from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions} from 'react-native';
import { useIsFocused } from '@react-navigation/native'; 
import QuoteOfDay from '../components/homeScreen/quoteOfDay'
import TodoList from '../components/homeScreen/todoList'
import MiniTimetable from '../components/homeScreen/miniTimetable'
import MiniWellbeingScreen from '../components/homeScreen/miniWellbeingScreen'
import TabBar from '../components/tabBar'
import Carousel from '../components/homeScreen/carousel';
import { Ionicons } from '@expo/vector-icons';
import { Touchable } from 'react-native';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

const HomeScreen = ({navigation}) => { 
    const isFocused = useIsFocused(); // determine current focus state of screen. 

    return(
        <View style={styles.container}>

            <View style={styles.wrapper}>
                <Text style={styles.header}>Dashboard</Text>
                <View style={styles.row1Container}>
                    <View style={styles.row1Wrapper}>
                        {/* --------------------- QUOTE OF THE DAY --------------------- */}
                        <TouchableOpacity style={styles.quoteContainer} onPress={() => navigation.navigate("QuoteScreen")}>
                            {/* If screen focus changes, re-render QuoteOfDay */}
                            {isFocused && <QuoteOfDay/>} 
                        </TouchableOpacity>

                        {/* --------------------- WELLBEING --------------------- */}
                        <TouchableOpacity style={styles.wellbeingContainer} onPress={() => navigation.navigate("WellBeingScreen")}>
                            <MiniWellbeingScreen/>
                        </TouchableOpacity>
                    </View>
                </View>


                <View style={styles.row2Container}>
                    <Text></Text>
                    <View style={styles.row2Wrapper}>
                        <Carousel navigation={navigation}/> 
                    </View>
                </View>
            </View>

            <TabBar navigation={navigation}/>
        </View>
    )
}

const todoAndTimetableContainerHeight = SCREEN_HEIGHT/1.6;
const todoAndTimetableHeaderHeight = SCREEN_HEIGHT/19;
const todoAndTimetableListWrapperHeight = todoAndTimetableContainerHeight - todoAndTimetableHeaderHeight;
const quoteAndWellbeingContainerHeight = SCREEN_HEIGHT/4

const styles = StyleSheet.create({

    container: {
        flex: 1,
    },
    wrapper: {
        flex: 1, 
    },

    // ---------- ROW 1 ---------- // 
    row1Container: {
        justifyContent: 'center',
        flex: 1,
    },
    row1Wrapper: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        width: '100%',
        height: SCREEN_HEIGHT/3,
    },
    quoteContainer: {
        width: SCREEN_WIDTH/2.1,
        height: quoteAndWellbeingContainerHeight,
        borderRadius: SCREEN_HEIGHT/30,
        elevation: 5,
        overflow: 'hidden',
        backgroundColor: 'green',
    },
    wellbeingContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        height: quoteAndWellbeingContainerHeight,
        width: SCREEN_WIDTH/2.1, 
        borderRadius: SCREEN_HEIGHT/30,
        elevation: 5,
        overflow: 'hidden',
        backgroundColor: 'white',
    },

    // ---------- ROW 2 ---------- //
    row2Container: {
        height: todoAndTimetableContainerHeight,
    },
    row2Wrapper: {
        flex: 1,
        flexDirection: 'row',
        marginVertical: SCREEN_HEIGHT/20,
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