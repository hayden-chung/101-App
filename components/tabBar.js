import React, {useState} from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions} from 'react-native';
import { Octicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

const ICON_SIZE = SCREEN_WIDTH/13;

const TabBar = ({navigation}) => { 

    return(
        <View style={styles.tabBarContainer}>

            <TouchableOpacity style={styles.homeButton} onPress={() => navigation.navigate("HomeScreen")}>
                <AntDesign name="home" size={ICON_SIZE} color="black" />
            </TouchableOpacity>

            <TouchableOpacity style={styles.productivityTimerButton} onPress={() => navigation.navigate("TimerScreen")}>
                <MaterialIcons name="timer" size={ICON_SIZE} color="black" />
            </TouchableOpacity>

            <TouchableOpacity style={styles.settingsButton} onPress={() => navigation.navigate("ToDoScreen")}>
                <Octicons name="checklist" size={ICON_SIZE} color="black" />
            </TouchableOpacity>

            <TouchableOpacity style={styles.settingsButton} onPress={() => navigation.navigate("SettingsScreen")}>
                <Ionicons name="ios-settings-outline" size={ICON_SIZE} color="black" />
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    // ---------- Tab Bar ---------- //
    tabBarContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: SCREEN_HEIGHT/15,
        width: '100%',
        paddingHorizontal: SCREEN_WIDTH/15,
        backgroundColor: '#ffffffff',
    },
});

export default TabBar;