import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, Button, Platform, Dimensions, TouchableOpacity} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import {fixedSessions, updateFixedSessions} from './timetableSettingsData'

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

const TimePicker = ({sessionType, startOrFinish, updateAndReRender}) => { // Displaying the start/finish times for sessions. 
    const [time, setTime] = useState(fixedSessions[sessionType][startOrFinish] || new Date()); // initialize 'time' with current date and time. (Gets the date and time of when the date picker was first opened.) 
    const [amOrPm, setAmOrPm] = useState(null);
    const [show, setShow] = useState(false);      // Time picker shows (true/false)
    const [breakSessions, setBreakSessions] = useState(Object.keys(fixedSessions).filter(type => type !== 'start-finish')); // Store break sessions only. Filter out start-finish from the list array.

    useEffect(() => { // Every time 'fixedSessions' changes, run the following to update fixedSessions. 
        const initialBreakSessions = Object.keys(fixedSessions).filter(type => type !== 'start-finish') // re-initialize breakSessions 
        setBreakSessions(initialBreakSessions) // re-set break sessions to update. 
    }, [fixedSessions]); 

    const updateTime = (selectedTime, startOrFinish) => { // Update time displaying, and the fixedSessions array. 
        const currentSetTime = new Date(selectedTime || time); // If there is a selected time, else, initial date (new Date()). 
        setTime(currentSetTime);

        let newTime = new Date(currentSetTime); // create a new Date object to manipulate rather than changing the original 'currentSetTime' object. 
        updateFixedSessions(sessionType, startOrFinish, newTime)
    }

    const checkIfNewBreakClashes = (selectedTime) => { // Check if the newly set time is between the period of another break (ensure breaks don't intersect in time). 
        setBreakSessions(Object.keys(fixedSessions).filter(type => type !== 'start-finish')); // Store break sessions only. Filter out start-finish from the list array.
        for (i=0; i<breakSessions.length; i++) { // repeat for number of breaks. 
            breakName = breakSessions[i] 
            if (breakName !== sessionType) { // e.g. ensure break 1 is not comparing with break 1.
                if (startOrFinish === 1 && new Date(fixedSessions[sessionType][0]) < new Date(fixedSessions[breakName][0])){ // if setting finish time and start time is before start time of another break session. 
                    if (new Date(selectedTime) > new Date(fixedSessions[breakName][1])){ // If newly set time is more than the finishing time of another break. (e.g. break 1: 5:30~6:00pm, break 2: 5:00~6:30pm)
                        selectedTime = fixedSessions[breakName][0] // pull newly set time back to start time of break.
                        console.log('case 1')
                        break // iteration no longer necessary 
                    }
                    if (new Date(selectedTime) > new Date(fixedSessions[breakName][0]) && new Date(selectedTime) < new Date(fixedSessions[breakName][1])){ // if newly set time is between the period of another break session. (e.g. break 1: 5:30~6:00pm, break 2: 5:00~5:45pm)
                        selectedTime = fixedSessions[breakName][0] // pull newly set time back to starting time of a break session. 
                        console.log('case 2')
                        break // iteration no longer necessary 
                    }
                }
                if (startOrFinish === 0 && new Date(fixedSessions[sessionType][1]) > new Date(fixedSessions[breakName][1])){ // if setting start time and finish time is after finish time of another break session. (e.g. break 1: 5:30~6:00pm, break 2: 5:00~6:30pm)

                    if (new Date(selectedTime) < new Date(fixedSessions[breakName][0])){ // if newly set is before another break session. 
                        selectedTime = fixedSessions[breakName][1] // pull newly set time back to the finishing time of the break session. 
                        console.log('case 3')
                        break // iteration no longer necessary 
                    }
                    if (new Date(selectedTime) > new Date(fixedSessions[breakName][0]) && new Date(selectedTime) < new Date(fixedSessions[breakName][1])) { // if newly set starting time is between the period of another break session. (e.g. break 1: 5:30~6:00pm, break 2: 5:45~6:30pm)
                        console.log('case 4')
                        selectedTime = fixedSessions[breakName][1] // pull newly set time back to the finishing time of break session. 
                        break // iteration no longer necessary 
                    }
                }
            }

        }
        return selectedTime;
    }

    const checkIfUpdatedBreakClashes = (selectedTime) => { // check if the updated break period is inside another break period 

        for (let i=0; i<breakSessions.length; i++) {
            breakName = breakSessions[i] // set break name
            if (breakName !== sessionType) {
                if (startOrFinish == 1 && new Date(selectedTime) <= new Date(fixedSessions[breakName][1]) && new Date(selectedTime) >= new Date(fixedSessions[breakName][0])) { // if setting finish time which is pushing the break session to be more than the starting time and less than the finishing time of another break, 
                    console.log('condition 5')
                    selectedTime = new Date(fixedSessions[breakName][1]); // keep newly set break time outside of the compared break time. 
                }
                if (startOrFinish == 0 && new Date(selectedTime) <= new Date(fixedSessions[breakName][1]) && new Date(selectedTime) >= new Date(fixedSessions[breakName][0])) { // if setting finish time which is pushing the break session to be more than the starting time and less than the finishing time of another break, 
                    console.log('condition 6')
                    selectedTime = new Date(fixedSessions[breakName][0]); // keep newly set break time outside of the compared break time. 
                }
            }
        }
        return selectedTime
    }

    const isTimeWithinTimetableRange = (selectedTime) => { // Ensure break periods are within the timetable range 

        if (sessionType !== 'start-finish') { // if ok button pressed and set time is not for timetable
            // Start time cannot be earlier than the start time of the timetable. 
            if (new Date(selectedTime) < new Date(fixedSessions['start-finish'][0])) {  // if ok button pressed, setting time for timetable, and selected time is less than the starting time of tiemtable. 
                selectedTime = new Date(fixedSessions['start-finish'][0]) // pull newly set time back to the start time of the timetable.
                console.log('condition 3')
            }
            // Finish time cannot be later than the finish time of the timetable. 
            if (new Date(selectedTime) > new Date(fixedSessions['start-finish'][1])) { 
                selectedTime = new Date(fixedSessions['start-finish'][1]) // pull newly set time back to the finish time time of timetable. 
                console.log('condition 4')
            }         
        }   
        return selectedTime
    }

    const isFinishLaterThanStart = (selectedTime) => { // Ensure start time is always later than the finish time 

        // If start time is later than finish time: bring start time back to finish time OR If finish time is earlier than start time: bring finish time back to start time. 
        if (startOrFinish === 0 && new Date(selectedTime) >= new Date(fixedSessions[sessionType][1]) || startOrFinish === 1 && new Date(selectedTime) <= new Date(fixedSessions[sessionType][0])) { // If starting time is greater or equal to finishing time
            console.log('condition 1')
            selectedTime = isTimeWithinTimetableRange(selectedTime) 
            selectedTime = checkIfUpdatedBreakClashes(selectedTime)
            updateTime(selectedTime, 0) // set start time.
            updateTime(selectedTime, 1) // set finish time. 
        } 

        return selectedTime
    }

    const checkForTimetableRange = (selectedTime) => { // check if sessionType = 'start-finish'

        // Check if finish time is later than start time:

        if (breakSessions.length >= 1) { // If there are breaks:
            // Find earliest and latest time first. 
            for (i=0; i<breakSessions.length; i++) {
                breakName = breakSessions[i]
                if (i===0) {
                    earliestTime = new Date(fixedSessions[breakName][0])
                    latestTime = new Date(fixedSessions[breakName][1])
                }
                
                if (new Date(fixedSessions[breakName][0]) < new Date(earliestTime)) {
                    earliestTime = new Date(fixedSessions[breakName][0])
                }
                if (new Date(fixedSessions[breakName][1] > new Date(latestTime))) {
                    latestTime = new Date(fixedSessions[breakName][1])
                }
            }
            if (startOrFinish === 0 && new Date(selectedTime) > new Date(earliestTime)) { // If timetable start time is later than the the earliest starting time of a break (this should not be allowed):
                selectedTime = new Date(earliestTime)
                console.log('checked condition 1', selectedTime)
            }
            if (startOrFinish === 1 && new Date(selectedTime) < new Date(latestTime)) { // If timetable finish time is earlier than the the latest starting time of a break (this should not be allowed):
                selectedTime = new Date(latestTime)
                console.log('checked condition 2', selectedTime)
            }

        } else { // If no breaks.
            if (startOrFinish === 1 && new Date(selectedTime) < new Date(fixedSessions['start-finish'][0])) {
                console.log('timetable condition 1')
                fixedSessions['start-finish'][0] = selectedTime
            }
            if (startOrFinish === 0 && new Date(selectedTime) > new Date(fixedSessions['start-finish'][1])) {
                console.log('timetable condition 2')
                fixedSessions['start-finish'][1] = selectedTime
            }
        }

        return selectedTime
    }


    const onChange = (event, selectedTime) => { // event = cancel/ok button, selectedTime = only exists if user presses ok button.
     
        setShow(false); // Hide date picker.     

        if (event.type === 'set') { // If ok button pressed
            if (sessionType == 'start-finish') { // If setting timetable time
                selectedTime = checkForTimetableRange(selectedTime)
            } else { // If setting break time
                selectedTime = checkIfNewBreakClashes(selectedTime)
                selectedTime = isFinishLaterThanStart(selectedTime)
                selectedTime = isTimeWithinTimetableRange(selectedTime)
            }
            updateTime(selectedTime, startOrFinish)
            updateAndReRender()
        }

        console.log('================================================================================================================================================================================================================================================================')
    }

    const showMode = () => { // Show timer picker
        setShow(true); // Set to true (boolean variable).
    }

    return(
        <View style={styles.item}>
            
            {/* When time text pressed, open time picker by calling showMode */}
            <TouchableOpacity style={styles.time} onPress={() => showMode()}> 
                {/* If time text is not empty, display the assigned times. If there is not assigned time, display 'Empty' instead.  */}
                {time !== 'Empty' ? (
                <Text style={styles.text}> 
                    {time.getHours() < 12 // Determine whether time is am or pm. 
                    ? `${time.getHours()}:${time.getMinutes()}am`
                    : time.getHours() === 12 
                        ? `${time.getHours()}:${time.getMinutes()}pm` // If 12pm, don't subtract 12, else subtract 12 to display pm time. 
                        : `${time.getHours()-12}:${time.getMinutes()}pm`
                    }
                    </Text> 
                ) : (
                    <Text>Empty</Text>
                )}

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
    time: {
    },
    text: {
        fontSize: SCREEN_HEIGHT/40,
    }
});

export default TimePicker;