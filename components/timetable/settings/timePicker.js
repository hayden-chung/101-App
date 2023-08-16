import React, {useState} from 'react';
import {StyleSheet, Text, View, Button, Platform, Dimensions, TouchableOpacity} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import {fixedSessions, updateFixedSessions} from '../timetableSettingsData'

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

const TimePicker = ({sessionType, startOrFinish}) => { 
    const [time, setTime] = useState(new Date());
    const [show, setShow] = useState(false);
    const [text, setText] = useState(fixedSessions[sessionType][startOrFinish]);
    console.log(text)
    
    const onChange = (event, selectedTime) => { // When date on date picker changes. 
        const currentTime = selectedTime || time; // If there is a selected time, else, initial date (new Date()). 
        setShow(Platform.OS === 'ios'); // For iOS only. Boolean for if date picker shows or not. 
        setTime(currentTime); // Set time to currently selected time. 

        let newTime = new Date(currentTime);
        setText(newTime)
        updateFixedSessions(sessionType, startOrFinish, newTime)
    }

    const showMode = () => {
        setShow(true);
    }

    return(
        <View style={styles.item}>

            <TouchableOpacity style={{margin:20}} onPress={() => showMode()}> 
                {text !== 'Empty' ?  <Text> {text.getHours()}:{text.getMinutes()} </Text> : <Text>Empty</Text>}
            </TouchableOpacity>

            {show && (
                <DateTimePicker
                testID='dateTimerPicker'
                value={time}
                mode='time'
                is24Hour={true}
                display='default'
                onChange={onChange}
                />
            )}

        </View>
    )
}

const styles = StyleSheet.create({
    item: {
        
    },
});

export default TimePicker;