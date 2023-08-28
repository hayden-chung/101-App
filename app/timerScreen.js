import React, {useState} from 'react';
import { KeyboardAvoidingView, StyleSheet, Text, View, TextInput, TouchableOpacity, Keyboard, Button} from 'react-native';
import Timer from '../components/timer/timer'

const TimerScreen = ({navigation}) => { 
    return(
        <View style={styles.container}>
            <Timer />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
});

export default TimerScreen;