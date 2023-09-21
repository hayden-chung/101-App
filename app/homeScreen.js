import React, {useState} from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions} from 'react-native';
import { useIsFocused } from '@react-navigation/native'; 
import { AntDesign } from '@expo/vector-icons';
import MiniQuote from '../components/homeScreen/miniQuote'
import MiniWellbeingScreen from '../components/homeScreen/miniWellbeingScreen'
import TabBar from '../components/tabBar'
import Carousel from '../components/homeScreen/carousel';


const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

const HomeScreen = ({navigation}) => { 
    const isFocused = useIsFocused(); // determine current focus state of screen. 

    return(
        <View style={styles.container}>

            <View style={styles.wrapper}>
                <View style={styles.header}>
                    <AntDesign name="home" size={24} color="black" />
                    <Text style={styles.headerText}>Dashboard</Text>
                </View>
                
                <View style={styles.row1Container}>
                    {/* --------------------- WELLBEING --------------------- */}
                    <TouchableOpacity style={styles.wellbeingContainer} onPress={() => navigation.navigate("WellBeingScreen")}>
                        <MiniWellbeingScreen/>
                    </TouchableOpacity>
                </View>


                <View style={styles.row2Container}>
                        <Carousel navigation={navigation}/> 
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
        alignItems: 'center',
        paddingTop: SCREEN_HEIGHT/30,
        paddingVertical: SCREEN_HEIGHT/40,
        flex: 1, 
        backgroundColor: 'white',
    },
    header: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerText: {
        textAlign: 'center',
        fontSize: SCREEN_HEIGHT/25,
        color: 'black',
        paddingLeft: SCREEN_WIDTH/20,
        marginBottom:SCREEN_HEIGHT/80,
    },

    // ---------- ROW 1 ---------- // 
    row1Container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: '90%',
        height: SCREEN_HEIGHT/2.8,
        paddingHorizontal: SCREEN_WIDTH/15,
    },
    wellbeingContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        paddingVertical: SCREEN_HEIGHT/50,
        borderRadius: SCREEN_HEIGHT/30,
        elevation: 5,
        overflow: 'hidden',
        backgroundColor: 'white',
    },

    // ---------- ROW 2 ---------- //
    row2Container: {
        flexDirection: 'row',
        justifyContent: 'center',
        height: '62%',
    },

});

export default HomeScreen;