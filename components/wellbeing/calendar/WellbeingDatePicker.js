import React, {useState} from 'react';
import {StyleSheet, View, Dimensions, Text, TouchableOpacity} from 'react-native';
import {Calendar, LocaleConfig} from 'react-native-calendars';
import { Entypo } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = (Dimensions.get('window').height);

const WellbeingDatePicker = ({setCalendarVisible, setSelectedDate, selectedDate})  => {

    const [tempSelectedDate, setTempSelectedDate] = useState();

    return (
        <View style={styles.container}>
            <View style={styles.modalContainer}> 
                <View style={styles.modalWrapper}>
                    <View style={styles.modalHeader}>
                        <Text style={styles.headerText}>Select Date</Text>

                        <TouchableOpacity style={styles.exitModalButton} onPress={() => setCalendarVisible(false)}>
                            <Feather name="x" size={SCREEN_HEIGHT/23} color="black" />
                        </TouchableOpacity>
                    </View>
                    <Calendar
                        style={{
                            borderRadius: 10,
                        }}
                        renderArrow={(direction) => { // custom arrow image for calendar (left&right)
                            if (direction == "left")
                            return (
                                <Entypo name="chevron-left" size={SCREEN_HEIGHT/20} color="#291D89" />
                            );
                            if (direction == "right")
                            return (
                                <Entypo name="chevron-right" size={SCREEN_HEIGHT/20} color="#291D89" />
                            );
                        }}
                        onDayPress={day => { // When a day is pressed
                        setTempSelectedDate(day.dateString); // setSelectedDate to selected date.
                        }}
                        markedDates={{ 
                        [tempSelectedDate]: {selected: true, disableTouchEvent: true} // For the selected date (tempSelectedDate), selected: true --> indicate the date is marked, disableTouchEvent: true --> selected date cannot be touched anymore, 
                        }}
                    />
                    {/* Use this 'pushBottom' view to push the item below it to the bottom */}
                    <View style={styles.pushBottom}/> 

                </View>
                <TouchableOpacity style={styles.okButton} onPress={() => {setSelectedDate(tempSelectedDate); setCalendarVisible(false);}}>
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
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 15,
    },
    exitModalButton: {

    },
    headerText: {
        fontSize: SCREEN_HEIGHT/33,
        fontWeight: '500',
    },
    title: {

    },
    pushBottom: { // Fill this area with empty space to push the ok button to the bottom. 
        flex: 1,
    },
    okButton: {
        height: SCREEN_HEIGHT/16,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomLeftRadius: 10, // Border for bottom left corner only.
        borderBottomRightRadius: 10, // Border for bottom right corner only.
        backgroundColor: 'orange',
    },
});

  export default WellbeingDatePicker;