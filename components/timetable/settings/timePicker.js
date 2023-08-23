import React, {useState} from 'react';
import {StyleSheet, Text, View, Button, Platform, Dimensions, TouchableOpacity} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import {fixedSessions, updateFixedSessions} from './timetableSettingsData'

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

const TimePicker = ({sessionType, startOrFinish, updateBreakSessions}) => {  
    const [time, setTime] = useState(fixedSessions[sessionType][startOrFinish] || new Date()); // initialize 'time' with current date and time. (Gets the date and time of when the date picker was first opened.) 
    const [show, setShow] = useState(false);      // Time picker shows (true/false)
    const [text, setText] = useState(fixedSessions[sessionType][startOrFinish]); // time text to display. 
    const [breakSessions, setBreakSessions] = useState(Object.keys(fixedSessions).filter(type => type !== 'start-finish')); // Store break sessions only. Filter out start-finish from the list array.

    const updateTime = (selectedTime, startOrFinish) => {
        const currentSetTime = new Date(selectedTime || time); // If there is a selected time, else, initial date (new Date()). 
        setTime(currentSetTime); // Set time to currently selected time. 

        let newTime = new Date(currentSetTime); // create a new Date object to manipulate rather than changing the original 'currentSetTime' object. 
        setText(newTime) // Text for displaying time.
        updateFixedSessions(sessionType, startOrFinish, newTime) // Update the timetable for this session. 
    }

    const checkBreakClashes = (selectedTime) => {
        setBreakSessions(Object.keys(fixedSessions).filter(type => type !== 'start-finish')); // Store break sessions only. Filter out start-finish from the list array.
        for (i=0; i<breakSessions.length; i++) {
            breakName = breakSessions[i]
            if (breakName !== sessionType) {
                if (startOrFinish === 1 && new Date(fixedSessions[sessionType][0]) < new Date(fixedSessions[breakName][0])){ // if setting finish time and start time is before start time of another break session. 
                    if (selectedTime > new Date(fixedSessions[breakName][1])){
                        selectedTime = fixedSessions[breakName][0]
                        console.log('case 1')
                        break
                    }
                    if (new Date(fixedSessions[breakName][0] < selectedTime < new Date(fixedSessions[breakName][1]))){
                        selectedTime = fixedSessions[breakName][0]
                        console.log('case 2')
                        break
                    }
                }
                if (startOrFinish === 0 && new Date(fixedSessions[sessionType][1]) > new Date(fixedSessions[breakName][1])){ // if setting start time and finish time is after finish time of another break session. 
                    if (selectedTime < new Date(fixedSessions[breakName][0])){
                        selectedTime = fixedSessions[breakName][1]
                        console.log('case 3')
                        break
                    }
                    if (new Date(fixedSessions[breakName][0]) < selectedTime < new Date(fixedSessions[breakName][1])){
                        selectedTime = fixedSessions[breakName][1]
                        console.log('case 4')
                        break
                    }
                }
            }

        }
        return selectedTime;
    }

    const isTimeWithinRange = (event, selectedTime) => {
        // -------------------- Ensure break periods are within the timetable range -------------------- //

        // Start time cannot be earlier than the start time of the timetable. 
        if (event.type === 'set' && sessionType !== 'start-finish' && selectedTime < fixedSessions['start-finish'][0]) {  // if ok button pressed, setting time for timetable, and selected time is less than the starting time of tiemtable. 
            selectedTime = new Date(fixedSessions['start-finish'][0])
            console.log('condition 3', selectedTime)
        }
        // Finish time cannot be later than the finish time of the timetable. 
        if (event.type === 'set' && sessionType !== 'start-finish' && selectedTime > fixedSessions['start-finish'][1]) { 
            selectedTime = new Date(fixedSessions['start-finish'][1])
            console.log('condition 4')
        }            
        return selectedTime
    }

    const isFinishLaterThanStart = (event, selectedTime) => {
        // -------------------- Ensure start time is always later than the finish time -------------------- //

        // If start time is later than finish time of task: set the start time to the set time, and finish time to 1min later than the set start time. 
        if (event.type === 'set' && startOrFinish === 0 && selectedTime >= fixedSessions[sessionType][1]) { // if ok button pressed & setting start time & if start time is greater or equal to finishing time
            console.log('condition 1')
            selectedTime = isTimeWithinRange(event, selectedTime)
            updateTime(selectedTime, 0)
            updateTime(selectedTime, 1)
        } 
        // If finish time is earlier than start time:
        if (event.type === 'set' && startOrFinish === 1 && selectedTime <= fixedSessions[sessionType][0]) { // if ok button pressed & setting finish time & if selected time is smaller or equal to starting time
            console.log('condition 2')
            selectedTime = isTimeWithinRange(event, selectedTime)
            updateTime(selectedTime, 1)
            updateTime(selectedTime, 0)
        } 
        return selectedTime
    }

    const onChange = (event, selectedTime) => { // event = cancel/ok button, selectedTime = only exists if user presses ok button.
     
        setShow(false); // Hide date picker.     

        selectedTime = checkBreakClashes(selectedTime);
        selectedTime = isFinishLaterThanStart(event, selectedTime)
        selectedTime = isTimeWithinRange(event, selectedTime)
        updateTime(selectedTime, startOrFinish)



        updateBreakSessions()

        console.log('================================================================================================================================================================================================================================================================')
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