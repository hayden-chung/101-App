import React, {useState} from 'react';
import { Switch, StyleSheet, Text, View, TouchableOpacity, Dimensions} from 'react-native';
import TabBar from '../components/tabBar';
import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import {openContactSupport} from '../components/settings/supportContact'
import {triggerVibration} from '../components/vibration'
import {vibration, updateVibrationState} from '../components/settings/vibrationState'

const SCREEN_WIDTH = Dimensions.get('window').width; 
const SCREEN_HEIGHT = (Dimensions.get('window').height);

const ICON_SIZE = SCREEN_WIDTH/12; // Icons: vibration, privacy policy, how to use, contact support
const ARROW_SIZE = SCREEN_WIDTH/11; // arrow of privacy policy, how to use, contact support

const SettingsScreen = ({navigation}) => { // Settings Screen component

    const [vibrationState, setVibrationState] = useState(vibration); //

    const toggleVibrationSwitch = (value) => { // toggle vibration switch on/off
        setVibrationState(value);
        updateVibrationState(value)
        if (value) { // if vibration turns on, vibrate phone
            triggerVibration(false) // vibrate phone, no infinite vibration
        }
    }

    return(
        <View style={styles.container}>

            <View style={styles.wrapper}>
                {/* Header Text */}
                <Text style={styles.headerText}>Settings</Text>

                {/* ---------- Vibration ---------- */}
                <View style={styles.buttonRow}>
                    
                    {vibrationState 
                    ? <MaterialCommunityIcons style={styles.icon} name="vibrate" size={ICON_SIZE} color="black" />
                    : <MaterialCommunityIcons style={styles.icon} name="vibrate-off" size={ICON_SIZE} color="black" 
                    />}

                    <Text style={styles.text}>Vibration</Text>

                    <View style={styles.fillSpaceBetweenTwoItems}></View>

                    <Switch
                        trackColor={{false:"#767577", true: "#4ed164ff"}}
                        thumbColor={vibrationState ? "#f4f3f4" : "#f4f3f4"}
                        onValueChange={toggleVibrationSwitch}
                        value={vibrationState}
                        style={styles.switch}
                    />
                </View>
                <View style={styles.lineDivider}></View>

                {/* ---------- Privacy Policy ---------- */}
                <TouchableOpacity style={styles.buttonRow} onPress={() => navigation.navigate("PrivacyPolicyScreen")}>
                    <MaterialIcons style={styles.icon} name="privacy-tip" size={ICON_SIZE} color="black" />
                    <Text style={styles.text}>Privacy Policy</Text>
                    <View style={styles.fillSpaceBetweenTwoItems}></View>
                    <MaterialIcons name="keyboard-arrow-right" style={styles.arrowRight} size={ARROW_SIZE} color="black" />
                </TouchableOpacity>
                <View style={styles.lineDivider}></View>

                {/* ---------- How to Use ---------- (commented out for now as it is future improvement (not created yet)) */}
                {/* <TouchableOpacity style={styles.buttonRow} onPress={() => navigation.navigate("HowToUseScreen")}>
                    <Feather style={styles.icon} name="help-circle" size={ICON_SIZE} color="black" />
                    <Text style={styles.text}>How to Use</Text>
                    <View style={styles.fillSpaceBetweenTwoItems}></View>
                    <MaterialIcons name="keyboard-arrow-right" style={styles.arrowRight} size={ARROW_SIZE} color="black" />
                </TouchableOpacity>
                <View style={styles.lineDivider}></View> */}

                {/* ---------- Contact Support ---------- */}
                <TouchableOpacity style={styles.buttonRow} onPress={() => openContactSupport()}>
                    <MaterialIcons style={styles.icon} name="quick-contacts-mail" size={ICON_SIZE} color="black" />
                    <Text style={styles.text}>Contact support</Text>
                    <View style={styles.fillSpaceBetweenTwoItems}></View>
                    <MaterialIcons name="keyboard-arrow-right" style={styles.arrowRight} size={ARROW_SIZE} color="black" />
                </TouchableOpacity>
                <View style={styles.lineDivider}></View>
            </View>
            

            <View style={styles.pushToBottom}></View>
            <TabBar navigation={navigation}/>
            
        </View>
    )
}

const styles = StyleSheet.create({
    container: { // whole screen
        flex: 1, 
        backgroundColor: 'white',
    },
    wrapper: { // available space. 
        paddingHorizontal: SCREEN_WIDTH/20,
        marginTop: SCREEN_HEIGHT/20,
    },
    headerText: { // Settings title
        textAlign: 'center',
        fontSize: SCREEN_HEIGHT/30,
        marginBottom: SCREEN_HEIGHT/20,
        marginTop: SCREEN_HEIGHT/20,
        fontWeight: '500',
    },
    buttonRow: { 
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: SCREEN_WIDTH/20,
        marginBottom: SCREEN_HEIGHT/80,
    },
    icon: { // button icon
        marginRight: SCREEN_WIDTH/20,
    },
    text: { // button text
        fontSize: SCREEN_WIDTH/20,
    },
    switch: { // vibration switch
        transform: [{ scaleX: 1.2*(SCREEN_WIDTH/360) }, { scaleY: 1.2*(SCREEN_HEIGHT/725)}],
        marginRight: SCREEN_WIDTH/10,
    },
    fillSpaceBetweenTwoItems:  { // max items stretch to the side. 
        flex: 1,
    },
    arrowRight: { // arrow of: privacy policy, how to use, contact support
        marginRight: SCREEN_WIDTH/10,
    },
    lineDivider: { // thin line between components
        backgroundColor: '#d9d9d9',
        height: SCREEN_HEIGHT/1000,
        width: '90%',
        marginHorizontal: SCREEN_WIDTH/30,
        marginBottom: SCREEN_HEIGHT/50,
    },
    pushToBottom: { // push tab bar to bottom
        flex: 1,    
    },

});

export default SettingsScreen;