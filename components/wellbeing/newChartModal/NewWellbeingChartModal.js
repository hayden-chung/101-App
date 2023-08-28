import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, Dimensions, TextInput, Alert, TouchableOpacity} from 'react-native';
import Slider from '@react-native-community/slider';
import { AntDesign } from '@expo/vector-icons';
import NextButton from './modalNextButton';
import {updateWellbeingDataStorage} from '../wellbeingData';
import {getCurrentDate} from '../wellbeingControls';
import {updateCalendarData} from '../calendar/calendarControls'



const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = (Dimensions.get('window').height);

const currentDate = getCurrentDate();

export const NewWellbeingChartModal = (props) => {
    
    const [pageNumber, changePageNumber] = useState(0) // starting page number in modal = 1 (0 for index number).
    const [wellbeingRating, updateWellbeingRating] = useState([1, 1, 1, 1, 1, 1]) // set all default ratings to 1.

    // ------------ Slider Components -------------- //
    const onSliderValueChange = (value) => {
        const updatedRating = [...wellbeingRating] // settings a temporary cloned variable array (updatedRating) is a safe way to ensure state management 
        updatedRating[pageNumber] = value 
        updateWellbeingRating(updatedRating)
      };

    // ------------- Close Modal Function ------------- //
    const closeModal = () => {             // update = add/edit quote (boolean)
        props.newChartModalVisible(false); // set to false as modal should not be visible now.
    };

    // ----------- Change Page in Modal ------------ //
    const changePage = (direction) => {                             // When right button pressed. 
        if (direction === 'right') {                                // If right button pressed
            if (pageNumber < props.wellbeingData.labels.length-1) { // If page number is not larger than the number of aspects (6). (props.wellbeingData.labels.length = 6 and index number starts from 0 so subtract 1) 
                changePageNumber(pageNumber+1)                      // Increase page number by 1.
            } else if (pageNumber === 5) {                          // if pg number is 6 (5 for index number)
                // updateDataHistory(...dataHistory, wellbeingRating)
                
                updateWellbeingDataStorage(wellbeingRating);            // Update wellbeing rating.
                props.wellbeingData.datasets[0].data = wellbeingRating  // Update graph data.
                updateCalendarData(props.setCalendarData, currentDate, wellbeingRating)  // Save wellbeing rating data into current date.
                closeModal()                                            // close modal (and update graph).
            }
            
        } else if (direction === 'left' && pageNumber > 0) {        // If left button pressed & If page number is larger than 0 (as it cannot go below this), change page number by -1 to go to previous page. 
            changePageNumber(pageNumber-1)                          // to previous page
        }
    };

    return ( 
        // ------------------------------- MODAL SCREEN ------------------------------- //
        <TouchableOpacity disabled={true} style={styles.container}> 
            <View style={styles.modal}> 
                
                {/* Close Modal Button */}
                <TouchableOpacity style={styles.exitButton} onPress={() => closeModal()}>
                    <Text style={{fontSize: 20}}>X</Text>
                </TouchableOpacity>

                {/* Modal Title */}
                <View style={styles.modalHeader}>
                    <Text style={[styles.headerText, {fontSize: 20}]}>Update My Wellbeings</Text>
                </View> 

                <View style={styles.modalSubHeader}>
                    <Text style={styles.subHeaderText}>How much sleep have you had?</Text>
                </View>

                {/* ------------- Slider Container ------------- */}
                <View style={styles.sliderContainer}> 
                        <Text style={styles.sliderValue}>{props.wellbeingData.labels[pageNumber]}: {wellbeingRating[pageNumber]}/10</Text>

                    <View style={styles.sliderWrapper}>   

                        {/* minimum value text */}
                        <Text>1</Text> 

                        {/* Slider component. Documentation: https://github.com/callstack/react-native-slider/tree/main */}
                        <Slider
                            style={styles.slider}                           // slider styling
                            minimumValue={1}                                // minimum value of slider
                            maximumValue={10}                               // maximum value of slider
                            value={wellbeingRating[pageNumber]}
                            step={1}                                        // step value of slider
                            minimumTrackTintColor="green"                   // bar color to the left of the button.
                            maximumTrackTintColor="red"                     // bar color to the right of the button
                            onValueChange={onSliderValueChange}             // when slider changes value, call function to update value.
                            accessibilityValue={{ text: `${wellbeingRating[pageNumber]}` }} // ${wellbeingRating} creates a value of a variable (sliderVariable) within a string (like f'' strings in python).
                        />

                        {/* maximum value text */}
                        <Text>10</Text>
                    </View>
                </View>
                {/* -------------------------------------------- */}
                
                {/* Next/Previous Buttons */}
                <View style={styles.nextPreviousButtonContainer}>
                    <TouchableOpacity style={styles.previousButton} onPress={() => changePage('left')}>
                        <AntDesign name="arrowleft" size={30} color="black" />
                    </TouchableOpacity>

                    <NextButton 
                        changePage={changePage}
                        pagePercentage={((pageNumber+1) * (100/6))}
                    />

                </View>
            </View>
        </TouchableOpacity>
        // --------------------------------------------------------------------- //
    )
}


const styles= StyleSheet.create({
    container: { // Entire screen (including transparent background).
        flex: 1, 
        alignItems: 'center', 
        justifyContent: 'center',
    }, 
    modal: { // Modal styling.
        height: SCREEN_HEIGHT/2, 
        width: SCREEN_WIDTH -80, 
        paddingTop: 5, 
        backgroundColor: 'white',
        borderColor: 'white',
        borderWidth: 3,
        borderRadius: 10,
    },
    modalHeader: { // Modal header. 
        flexDirection: 'row',
        flex: 1, 
        justifyContent: 'center',
        // backgroundColor: 'green',
    }, 
    headerText: { // Header text styling. 
        margin: 5, 
        fontSize: 16, 
        fontWeight: 'bold',
    },
    modalSubHeader: { // Question contain (e.g. how much sleep have you had)
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'flex-start',
    },
    subHeaderText: { // Question text. 
        fontWeight: '600',
        fontSize: 18,
    },
    exitButton: { // Exit button. 
        width: SCREEN_WIDTH/15, 
        paddingLeft: 5,
    },
    nextPreviousButtonContainer: { // next & previous button. 
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginHorizontal: 10, 
        marginBottom: 10,
    }, 
    previousButton: { // go to previous page button in modal
        justifyContent: 'center',
        alignItems: 'center',
        width: SCREEN_HEIGHT/18, 
        height: SCREEN_HEIGHT/18,
        borderRadius: 500, // just give the border value any high number as there is a max limit which at that point creates the radius of a circle. 
        borderColor: 'black',
        borderWidth: 2.5,
        backgroundColor: 'white',
        alignSelf: 'flex-end', // bottom of column
    },
    sliderContainer: { // Contains rating text & slider.
        flexDirection: 'column',
        alignItems: 'center',
        paddingBottom: SCREEN_HEIGHT/10,
    },
    sliderWrapper: { // Rating slider wrapper. 
        flexDirection: 'row',
        paddingTop: SCREEN_HEIGHT/40,
    },
    slider: { // Slider 
        width: (SCREEN_WIDTH -80)/1.2, // SCREEN_WIDTH -80 = Modal Width
        marginLeft: 'auto',
        marginRight: 'auto',
    },
    sliderValue: {

    },
})