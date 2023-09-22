import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, Dimensions, TextInput, Alert, TouchableOpacity} from 'react-native';
import Slider from '@react-native-community/slider';
import { AntDesign } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import NextButton from './modalNextButton';
import {getCurrentDate} from '../calendar/calendarControls';
import {updateCalendarData} from '../calendar/calendarControls'



const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = (Dimensions.get('window').height);

const currentDate = getCurrentDate();

export const NewWellbeingChartModal = (props) => { // modal to make new wellbeing chart
    
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
            if (pageNumber < props.wellbeingData.label.length-1) { // If page number is not larger than the number of aspects (6). (props.wellbeingData.labels.length = 6 and index number starts from 0 so subtract 1) 
                changePageNumber(pageNumber+1)                      // Increase page number by 1.
            } else if (pageNumber === 5) {                          // if pg number is 6 (5 for index number)                
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
                    <Text style={[styles.headerText, {fontSize: 20}]}>New Wellbeing Chart</Text>
                </View> 

                {/* Wellbeing Name */}

                <View style={styles.wellbeingNameContainer}>

                    {/* Display icon depending on page (index) number */}
                    <View style={styles.labelIcon}>
                    {pageNumber === 0 && (
                        <Entypo name={'suitcase'} size={SCREEN_WIDTH/15} color="#3a46bf" />
                    )}

                    {pageNumber === 1 && (
                        <MaterialIcons name={'fitness-center'} size={SCREEN_WIDTH/15} color="orange" />
                    )}
                    
                    {pageNumber === 2 && (
                        <FontAwesome5 name="coffee" size={SCREEN_WIDTH/15} color="#50bfd1" />
                    )}

                    {pageNumber === 3 && (
                        <Entypo name={'chat'} size={SCREEN_WIDTH/15} color="#9e32db" />
                    )}

                    {pageNumber === 4 && (
                        <MaterialCommunityIcons name={'power-sleep'} size={SCREEN_WIDTH/15} color="#f0ca00" />
                    )}

                    {pageNumber === 5 && (
                        <MaterialCommunityIcons name={'head-cog'} size={SCREEN_WIDTH/15} color="#21a177" />
                    )}
                    </View>

                    {/* Rating out of 10 in text */}
                    <Text style={styles.wellbeingNameText}>{props.wellbeingData.label[pageNumber]}: {wellbeingRating[pageNumber]}/10</Text>

                </View>
                
                {/* Line below header text */}
                <View style={styles.lineBelowWellbeingName}></View>

                {/* Wellbeing Question */}
                <View style={styles.questionContainer}>
                    <Text style={styles.questionText}>{props.wellbeingData.question[pageNumber]}</Text>
                </View>

                {/* ------------- Slider Container ------------- */}
                <View style={styles.sliderContainer}> 

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
                            thumbTintColor="magenta"
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
                        <AntDesign name="arrowleft" size={SCREEN_WIDTH/15} color="black" />
                    </TouchableOpacity>

                    {/* Next Butotn (with animation) */}
                    <NextButton 
                        changePage={changePage}
                        pagePercentage={((pageNumber+1) * (100/6))}
                    />

                    {/* Padding on the right just to balance out the horizontal padding so next button stays at middle */}
                    <View style={{paddingRight: SCREEN_WIDTH/10.5}}></View>

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
        backgroundColor: 'rgba(0, 0, 0, 0.60)', // set opacity to 0.6
    }, 
    modal: { // Modal styling.
        alignItem: 'center',
        justifyContent: 'center',
        height: SCREEN_HEIGHT/1.5, 
        width: SCREEN_WIDTH/1.1, 
        paddingTop: 5, 
        backgroundColor: 'white',
        borderColor: '#EBEEF6',
        borderWidth: 3,
        borderRadius: 10,
        elevation: 5,
    },
    modalHeader: { // Modal header. 
        flexDirection: 'row',
        flex: 1, 
        justifyContent: 'center',
    }, 
    headerText: { // Header text styling. 
        margin: 5, 
        fontSize: 16, 
        fontWeight: 'bold',
    },
    wellbeingNameContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    labelIcon: {
        alignItems: 'center',
    },
    lineBelowWellbeingName: {
        height: SCREEN_HEIGHT/800,
        backgroundColor: '#e3e3e3',
        marginHorizontal: SCREEN_WIDTH/30,
        marginVertical: SCREEN_HEIGHT/80,
    },
    questionContainer: { // Question contain (e.g. how much sleep have you had)
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'flex-start',
        paddingHorizontal: SCREEN_WIDTH/30,
    },
    questionText: { // Question text. 
        fontWeight: '300',
        fontSize: SCREEN_HEIGHT/40,
    },
    exitButton: { // Exit button. 
        width: SCREEN_WIDTH/15, 
        paddingLeft: 5,
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
    wellbeingNameText: {
        textAlign: 'center',
        fontSize: SCREEN_HEIGHT/40,
        fontWeight: '600',
        paddingLeft: SCREEN_WIDTH/40,
        paddingRight: SCREEN_WIDTH/10,
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
})