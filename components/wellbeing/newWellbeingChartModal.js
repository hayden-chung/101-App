import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, Dimensions, TextInput, Alert, TouchableOpacity} from 'react-native';
import Slider from '@react-native-community/slider';
import { AntDesign } from '@expo/vector-icons';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = (Dimensions.get('window').height);

export const NewWellbeingChartModal = (props) => {

    const [currentWellbeingRating, updateCurrentWellbeingRating] = useState([])

    {/* --------- Slider Components --------- */}
    const [sliderValue, setSliderValue] = useState(0);

    const onSliderValueChange = (value) => {
        setSliderValue(value);
      };

    {/* ------- Close modal function ------- */}
    const closeModal = () => {             // update = add/edit quote (boolean)
        props.newChartModalVisible(false); // set to false as modal should not be visible now.
    }


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
                        <Text style={styles.sliderValue}>Sleep: {sliderValue}/10</Text>

                    <View style={styles.sliderWrapper}>   

                        {/* minimum value text */}
                        <Text>1</Text> 

                        {/* Slider component */}
                        <Slider
                            style={styles.slider}                           // slider styling
                            minimumValue={0}                                // minimum value of slider
                            maximumValue={10}                               // maximum value of slider
                            step={1}                                        // step value of slider
                            minimumTrackTintColor="green"                   // bar color to the left of the button.
                            maximumTrackTintColor="red"                     // bar color to the right of the button
                            onValueChange={onSliderValueChange}             // when slider changes value
                            accessibilityValue={{ text: `${sliderValue}` }} // ${sliderValue} creates a value of a vraible (sliderVariable) within a string (like f'' strings in python).
                        />

                        {/* maximum value text */}
                        <Text>10</Text>
                    </View>
                </View>
                {/* -------------------------------------------- */}
                
                {/* Next/Previous Buttons */}
                <View style={styles.buttonsView}>
                    <TouchableOpacity style={styles.nextPreviousButton}>
                        <AntDesign name="arrowleft" size={30} color="orange" />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.nextPreviousButton}>
                        <AntDesign name="arrowright" size={30} color="orange" />
                    </TouchableOpacity>
                </View>
            </View>
        </TouchableOpacity>
        // --------------------------------------------------------------------- //
    )
}


const styles= StyleSheet.create({
    container: { // entire screen (including transparent background)
        flex: 1, 
        alignItems: 'center', 
        justifyContent: 'center',
    }, 
    modal: { 
        height: SCREEN_HEIGHT/2, 
        width: SCREEN_WIDTH -80, 
        paddingTop: 5, 
        backgroundColor: 'white',
        borderColor: 'white',
        borderWidth: 3,
        borderRadius: 10,
    },
    modalHeader: {
        flexDirection: 'row',
        flex: 1, 
        justifyContent: 'center',
        // backgroundColor: 'green',
    }, 
    headerText: {
        margin: 5, 
        fontSize: 16, 
        fontWeight: 'bold',
        // backgroundColor: 'magenta',
    },
    modalSubHeader: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'flex-start',
        // backgroundColor: 'red',
    },
    subHeaderText: {
        fontWeight: '600',
        fontSize: 18,
    },
    exitButton: { 
        width: SCREEN_WIDTH/15, 
        paddingLeft: 5,
        // backgroundColor: 'red',
    },
    buttonsView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 10,
        marginBottom: 10,
    }, 
    nextPreviousButton: {
        paddingVertical: 10, 
        alignItems: 'center',
        width: 50, 
        height: 50,
        borderRadius: 30,
        backgroundColor: 'white',
        borderColor: 'orange',
        borderWidth: 2.5,
    },
    sliderContainer: {
        flexDirection: 'column',
        alignItems: 'center',
        paddingBottom: SCREEN_HEIGHT/10,
    },
    sliderWrapper: {
        flexDirection: 'row',
        paddingTop: SCREEN_HEIGHT/40,
    },
    slider: {
        width: (SCREEN_WIDTH -80)/1.2, // SCREEN_WIDTH -80 = Modal Width
        marginLeft: 'auto',
        marginRight: 'auto',
    },
    sliderValue: {

    },
})