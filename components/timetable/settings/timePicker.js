import React, {useState} from 'react';
import {StyleSheet, Text, View, Button, Platform, Dimensions, TouchableOpacity} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import {fixedSessions, updateFixedSessions} from './timetableSettingsData'

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

const TimePicker = ({sessionType, startOrFinish}) => { 
    const [time, setTime] = useState(new Date()); // initialize 'time' with current date and time. (Gets the date and time of when the date picker was first opened.) 
    const [show, setShow] = useState(false);      // Time picker shows (true/false)
    const [text, setText] = useState(fixedSessions[sessionType][startOrFinish]); // time text to display. 
    
    const onChange = (event, selectedTime) => { // event = cancel/ok button, selectedTime = only exists if user presses ok button.

        if (event.type === 'set' && startOrFinish === 1) { // ok button pressed and setting finish time
            if (selectedTime <= fixedSessions[sessionType][0]) { // if selected time is smaller or equal to starting time
                const tempTime = new Date(fixedSessions[sessionType][0]); // set temporary time to starting time
                tempTime.setMinutes(fixedSessions[sessionType][0].getMinutes() + 10); // set tempTime to 10min more than starting time
                selectedTime = tempTime; // re-set selected time to tempTime. 
            } 
        }
        if (event.type === 'set' && startOrFinish === 0) { // ok button pressed and setting start time
            if (selectedTime >= fixedSessions[sessionType][1]) { // if selected time is smaller or equal to starting time
                const tempTime = new Date(fixedSessions[sessionType][1]); // set temporary time to starting time
                tempTime.setMinutes(fixedSessions[sessionType][1].getMinutes() - 10); // set tempTime to 10min more than starting time
                selectedTime = tempTime; // re-set selected time to tempTime. 
            } 
        } 

        if (event.type === 'set' && startOrFinish === 1 && selectedTime > fixedSessions['start-finish'][1]) { // if finish time is more 
            console.log('more')
            selectedTime = fixedSessions['start-finish'][1]
            console.log(selectedTime)
        }
        
        const currentTime = selectedTime || time; // If there is a selected time, else, initial date (new Date()). 
        setShow(false); // Hide date picker.  
        setTime(currentTime); // Set time to currently selected time. 

        let newTime = new Date(currentTime); // create a new Date object to manipulate rather than changing the original 'currentTime' object. 
        setText(newTime) // For displaying the time.
        updateFixedSessions(sessionType, startOrFinish, newTime) // Update the time for this session. 

        console.log(newTime)
    }

    const showMode = () => { // Show timer picker
        setShow(true); // Set to true (boolean variable).
    }

    return(
        <View style={styles.item}>
            
            {/* When time text pressed, open time picker by calling showMode */}
            <TouchableOpacity style={{margin:20}} onPress={() => showMode()}> 
                {/* If time text is not empty, display the assigned times. If there is not assigned time, display 'Empty' instead.  */}
                {text !== 'Empty' ?  <Text> {text.getHours()}:{text.getMinutes()} </Text> : <Text>Empty</Text>}
            </TouchableOpacity>

            {show && ( // if 'show' is true
                <DateTimePicker
                    testID='dateTimerPicker' // ID of timepicker
                    value={time}             // Current value of what displays in timepicker = time
                    mode='time'              // Timer picker (not date picker)
                    is24Hour={false}         // 24 hour format? (true/false)
                    display='spinner'        // What the time picker looks like.
                    onChange={onChange}      // When time chnages. 
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