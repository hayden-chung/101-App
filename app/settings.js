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

const ICON_SIZE = SCREEN_WIDTH/12;
const ARROW_SIZE = SCREEN_WIDTH/11;

const SettingsScreen = ({navigation}) => { 

    const [vibrationState, setVibrationState] = useState(vibration);
    

    const toggleVibrationSwitch = (value) => { 
        setVibrationState(value);
        updateVibrationState(value)
        if (value) {
            triggerVibration(false)
        }
    }

    return(
        <View style={styles.container}>

            <View style={styles.wrapper}>

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

                {/* ---------- How to Use ---------- */}
                <TouchableOpacity style={styles.buttonRow} onPress={() => navigation.navigate("HowToUseScreen")}>
                    <Feather style={styles.icon} name="help-circle" size={ICON_SIZE} color="black" />
                    <Text style={styles.text}>How to Use</Text>
                    <View style={styles.fillSpaceBetweenTwoItems}></View>
                    <MaterialIcons name="keyboard-arrow-right" style={styles.arrowRight} size={ARROW_SIZE} color="black" />
                </TouchableOpacity>
                <View style={styles.lineDivider}></View>

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
    container: {
        flex: 1, 
        backgroundColor: 'white',
    },
    wrapper: {
        paddingHorizontal: SCREEN_WIDTH/20,
        marginTop: SCREEN_HEIGHT/20,
    },
    headerText: {
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
    icon: {
        marginRight: SCREEN_WIDTH/20,
    },
    text: {
        fontSize: SCREEN_WIDTH/20,
    },
    switch: {
        transform: [{ scaleX: 1.2*(SCREEN_WIDTH/360) }, { scaleY: 1.2*(SCREEN_HEIGHT/725)}],
        marginRight: SCREEN_WIDTH/10,
    },
    fillSpaceBetweenTwoItems:  {
        flex: 1,
    },
    arrowRight: {
        marginRight: SCREEN_WIDTH/10,
    },
    lineDivider: {
        backgroundColor: '#d9d9d9',
        height: SCREEN_HEIGHT/1000,
        width: '90%',
        marginHorizontal: SCREEN_WIDTH/30,
        marginBottom: SCREEN_HEIGHT/50,
    },



    pushToBottom: {
        flex: 1,    
    },
    navigationBar: {
        backgroundColor:'red',
    },

});

export default SettingsScreen;