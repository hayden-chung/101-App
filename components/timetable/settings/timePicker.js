import React, {useState} from 'react';
import {StyleSheet, Text, View, Button, Platform, Dimensions, TouchableOpacity} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import {fixedSessions, updateFixedSessions} from './timetableSettingsData'

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

const TimePicker = ({sessionType, startOrFinish}) => { 
    const [time, setTime] = useState(fixedSessions[sessionType][startOrFinish] || new Date()); // initialize 'time' with current date and time. (Gets the date and time of when the date picker was first opened.) 
    const [show, setShow] = useState(false);      // Time picker shows (true/false)
    const [text, setText] = useState(fixedSessions[sessionType][startOrFinish]); // time text to display. 
    
    const updateTime = (selectedTime, startOrFinish) => {
        const currentSetTime = new Date(selectedTime || time); // If there is a selected time, else, initial date (new Date()). 
        setTime(currentSetTime); // Set time to currently selected time. 

        let newTime = new Date(currentSetTime); // create a new Date object to manipulate rather than changing the original 'currentSetTime' object. 
        setText(newTime) // Text for displaying time.
        updateFixedSessions(sessionType, startOrFinish, newTime) // Update the timetable for this session. 
    }


    const onChange = (event, selectedTime) => { // event = cancel/ok button, selectedTime = only exists if user presses ok button.
     
        setShow(false); // Hide date picker.  

        // -------------------- Ensure break periods are within the timetable range -------------------- //

        // Start time cannot be earlier than the start time of the timetable. 
        if (event.type === 'set' && startOrFinish === 0 && sessionType !== 'start-finish' && selectedTime < fixedSessions['start-finish'][0]) { 
            selectedTime = new Date(fixedSessions['start-finish'][0])
        }

        // Finish time cannot be later than the finish time of the timetable. 
        if (event.type === 'set' && startOrFinish === 1 && sessionType !== 'start-finish' && selectedTime > fixedSessions['start-finish'][1]) { 
            console.log('selectedTime:', selectedTime, "fixedSessions['start-finish'][1]:", fixedSessions['start-finish'][1])
            selectedTime = new Date(fixedSessions['start-finish'][1])
            console.log('new selected time', selectedTime)
        }

        // -------------------- Ensure start time is always later than the finish time -------------------- //

        // If start time is later than finish time: set the start time to the set time, and finish time to 1min later than the set start time. 
        if (event.type === 'set' && startOrFinish === 0 && selectedTime >= fixedSessions[sessionType][1]) { // if ok button pressed & setting start time & if finish time is smaller or equal to starting time
            updateTime(selectedTime, 0)
            
            
            const newFinishTime = new Date(fixedSessions[sessionType][1]); // set temporary time to starting time
            newFinishTime.setMinutes(fixedSessions[sessionType][1].getMinutes() + 1); // set newFinishTime to 1 min more than starting time
            selectedTime = newFinishTime; // re-set selected time to tempTime. 
            updateTime(selectedTime, 0)
        } 

        // If finish time is earlier than start time:
        if (event.type === 'set' && startOrFinish === 1 && selectedTime <= fixedSessions[sessionType][0]) { // if ok button pressed & setting finish time & if selected time is smaller or equal to starting time
                console.log('push start time')
                updateTime(selectedTime, 1)
                console.log('start time', selectedTime)
                const tempTime = new Date(selectedTime); // set temporary time to starting time
                tempTime.setMinutes(tempTime.getMinutes() -1); // set tempTime to 10min more than starting time
                console.log('temp time', selectedTime)
                selectedTime = new Date(tempTime); // re-set selected time to tempTime. 
                console.log('selectedTime', selectedTime)
            } 
        updateTime(selectedTime, 0)

        console.log('hidden')
    }

    const showMode = () => { // Show timer picker
        console.log('show')
        setShow(true); // Set to true (boolean variable).
    }

    return(
        <View style={styles.item}>
            
            {/* When time text pressed, open time picker by calling showMode */}
            <TouchableOpacity style={{margin:20}} onPress={() => showMode()}> 
                {/* If time text is not empty, display the assigned times. If there is not assigned time, display 'Empty' instead.  */}
                {time !== 'Empty' ?  <Text> {time.getHours()}:{time.getMinutes()} </Text> : <Text>Empty</Text>}
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