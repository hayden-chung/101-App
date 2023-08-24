import React, {useState} from 'react';
import {StyleSheet, View, Dimensions, Text, TouchableOpacity} from 'react-native';
import {Calendar, LocaleConfig} from 'react-native-calendars';
import { Entypo } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = (Dimensions.get('window').height);

const WellbeingDatePicker = ({setCalendarVisible, setSelectedDate, selectedDate})  => { // When called, open calendar. 

    const [currentSelectedDate, setCurrentSelectedDate] = useState(); // date selected on calendar. 

    return (
        <View style={styles.container}>

            {/* Modal Container */}
            <View style={styles.modalContainer}> 

                {/* Modal Wrapper (contains all except ok button) */}
                <View style={styles.modalWrapper}>

                    {/* Modal Header (contains title (Seleceted Date) and Exit Button) */}
                    <View style={styles.modalHeader}>
                        <Text style={styles.headerText}>Select Date</Text>

                        {/* When pressed, don't show calendar modal anymore */}
                        <TouchableOpacity style={styles.exitModalButton} onPress={() => setCalendarVisible(false)}>
                            <Feather name="x" size={SCREEN_HEIGHT/23} color="black" />
                        </TouchableOpacity>
                    </View>

                    <Calendar
                        style={{
                            borderRadius: 10,
                        }}
                        renderArrow={(direction) => { // custom arrow image for calendar (left&right)
                            if (direction == "left") // When left arrow button pressed. 
                            return (
                                <Entypo name="chevron-left" size={SCREEN_HEIGHT/20} color="#291D89" />
                            );
                            if (direction == "right") // When right arrow button pressed. 
                            return (
                                <Entypo name="chevron-right" size={SCREEN_HEIGHT/20} color="#291D89" />
                            );
                        }}
                        onDayPress={day => { // When a date is pressed
                        setCurrentSelectedDate(day.dateString); // set currentSelectedDate to selected date.
                        }}
                        markedDates={{ // Mark the selected date as blue. 
                        [currentSelectedDate]: {selected: true, disableTouchEvent: true} // For the selected date (currentSelectedDate), selected: true --> indicate the date is marked, disableTouchEvent: true --> selected date cannot be touched anymore, 
                        }}
                    />
                    {/* Use this 'pushBottom' view to push the item below it (ok button) to the bottom */}
                    <View style={styles.pushBottom}/> 

                </View>

                {/* Ok Button. Press once date is selected to navigate to this date */}
                <TouchableOpacity style={styles.okButton} onPress={() => {setSelectedDate(currentSelectedDate); setCalendarVisible(false);}}>
                    <Text style={{fontSize: SCREEN_HEIGHT/40, fontWeight: '500'}}>OK</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
  };
  

const styles = StyleSheet.create({
    container: { // whole screen 
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContainer: { // modal container
        width: SCREEN_WIDTH/1.2,
        height: SCREEN_HEIGHT/1.6,
        // borderWidth: 1,
        borderRadius: 10,
        backgroundColor: 'white',
        elevation: 4,
    },
    modalWrapper: { // area for modal content
        flex: 1,
        padding: 10,
    },
    modalHeader: { // container for title and exit button. 
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 15,
    },
    exitModalButton: {

    },
    headerText: { // Style header text (Select Date)
        fontSize: SCREEN_HEIGHT/33,
        fontWeight: '500',
    },
    title: {

    },
    pushBottom: { // Fill this area with empty space to push the ok button to the bottom. 
        flex: 1,
    },
    okButton: { // Ok button at the bottom 
        height: SCREEN_HEIGHT/16,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomLeftRadius: SCREEN_HEIGHT/90, // Border for bottom left corner only.
        borderBottomRightRadius: SCREEN_HEIGHT/90, // Border for bottom right corner only.
        backgroundColor: 'orange',
    },
});

  export default WellbeingDatePicker;