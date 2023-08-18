import React, {useState} from 'react';
import {StyleSheet, Text, View, Button, Platform, Dimensions, TouchableOpacity} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import {fixedSessions, updateFixedSessions} from '../timetableSettingsData'

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

const TimePicker = ({sessionType, startOrFinish}) => { 
    const [time, setTime] = useState(new Date()); // initialize 'time' with current date and time. Gets the date and time of when the date picker was first opened. 
    const [show, setShow] = useState(false);
    const [text, setText] = useState(fixedSessions[sessionType][startOrFinish]);
    
    const onChange = (event, selectedTime) => { // event = cancel/ok button, selectedTime = only exists if user presses ok button.
        if (event.type === 'set' && startOrFinish === 1) { // ok button pressed and setting finish time
            if (selectedTime <= fixedSessions[sessionType][0]) {
                const tempTime = new Date(fixedSessions[sessionType][0]);
                tempTime.setMinutes(fixedSessions[sessionType][0].getMinutes() + 10);


                console.log('Current Date:', selectedTime);
                selectedTime = tempTime;
                console.log('New Date with 10 minutes added:', selectedTime);
            } 
        }
        const currentTime = selectedTime || time; // If there is a selected time, else, initial date (new Date()). 
        setShow(false); // date picker hides now
        setTime(currentTime); // Set time to currently selected time. 

        let newTime = new Date(currentTime); // create a new Date object to manipulate rather than changing the original 'currentTime' object. 
        setText(newTime) // For displaying the time.
        updateFixedSessions(sessionType, startOrFinish, newTime) // Update the time for this session. 
        console.log('event', event, 'selected time', selectedTime, 'ti stil prints')

    }

    const showMode = () => { // Show time picker (true/false).
        setShow(true);
    }

    return(
        <View style={styles.item}>

            <TouchableOpacity style={{margin:20}} onPress={() => showMode()}> 
                {text !== 'Empty' ?  <Text> {text.getHours()}:{text.getMinutes()} </Text> : <Text>Empty</Text>}
            </TouchableOpacity>

            {show && ( // if 'show' is true
                <DateTimePicker
                testID='dateTimerPicker'
                value={time}
                mode='time' // timer picker (not date picker)
                is24Hour={false}
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