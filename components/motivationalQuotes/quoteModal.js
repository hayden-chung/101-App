import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions, TextInput, Alert} from 'react-native';
import { updateQuoteList } from './quoteList&Controls';

// ------------------------ MODAL SCREEN --------------------------------//
const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = (Dimensions.get('window').height);

export const QuoteModal = (props) => { // Add new quote modal 

    const quoteIndex = props.isEditDeleteModalVisible[1] 
    const initialQuote = props.isQuoteModalVisible[1] ? props.quoteList[quoteIndex] : ['', '', false] // grab list if [editing] is true as quote string already exists, else make new empty list for new quote.
    const [quote, setQuote] = useState(initialQuote); // [quote, author, checked/unchecked]

    const CheckEmptyText = () => { // Check if text input box is empty.
        if (quote[1].trim().length == 0) { // when all whitespaces are removed (trim) and string length == 0, this means string is empty. (quote[1] = author)
            quote[1] = 'Anonymous'; // replace empty string with 'Unkown'.
        }
    }

    const closeModal = (update) => {                // update = add/edit quote (boolean).
        CheckEmptyText(quote)                       // check if author is empty.
        if (update) {                               // if edit pressed:
            let updateList = props.quoteList
            if (props.isQuoteModalVisible[1]) {     // edit quote.
                props.quoteList[quoteIndex] = quote // edit (update) exisitng string value (quote).
                updateList[quoteIndex] = quote
                
            } else {    // add pressed.
                props.setQuoteList([...props.quoteList, quote]) 
                updateList.push(quote)
            }
            updateQuoteList(updateList)

        }
        props.quoteModalVisible([false, false]); // set [0] to false as modal should not be visible now.
    }
    
    return ( 
        <TouchableOpacity disabled={true} style={styles.container}>

            {/* Popup Modal Screen */}
            <View style={styles.modal}> 

                {/* Quote text input */}
                <View style={styles.modalTextContainer}>

                    {/* If Editing mode --> display 'Edit Quote', else --> 'Add Quote' */}
                    <Text style={[styles.modalTitle, {fontSize: 20}]}>{props.isQuoteModalVisible[1] ? 'Edit Quote': 'Add Quote'}</Text>
                    <Text style={styles.textInputHeaderQuote}>Quote:</Text>
                    <TextInput 
                        style={styles.textInput} 
                        placeholder={'Enter your quote:'} 
                        value={quote[0]} 
                        onChangeText={quoteText => setQuote([quoteText, quote[1], false])} 
                    />  
                </View>

                {/* Author text input */}
                <View style={styles.modalTextContainer}>
                    <Text style={styles.textInputHeaderAuthor}>Author:</Text>
                    <TextInput 
                        style={styles.textInput} 
                        placeholder={'Author:'}     // When textbox is empty, display 'Author:'
                        value={quote[1]}            // quote[1] = author
                        onChangeText={authorText => { // when text in textbox changes
                            authorText.trim() !== '' ? authorText: 'Unknown'; // trim white spaces from string and when length of remaining = 0, display Unknown
                            setQuote([quote[0], authorText, false])           // create a new quote item [quote, author, quote not selected]
                        }} 
                    />  
                </View>

                <View style={styles.buttonsContainer}>

                    {/* Cancel Button */}
                    <TouchableOpacity style={styles.buttonsStyling} onPress={() => closeModal(false)}>
                        <Text style={[styles.modalButtonText, {color: 'blue'}]}>
                            Cancel
                        </Text>
                    </TouchableOpacity>

                    {/* Ok/Add Button */}
                    <TouchableOpacity style={styles.buttonsStyling} onPress={() => closeModal(true)}>
                        <Text style={[styles.modalButtonText, {color: 'blue',}]}>
                            {/* if editing mode, display 'Ok', 'Add' for button */}
                            {props.isQuoteModalVisible[1] ? 'Ok': 'Add'} 
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
    

        </TouchableOpacity>
        

    )
}

const styles= StyleSheet.create({
    container: { // Main Container
        flex: 1, 
        alignItems: 'center', 
        justifyContent: 'center',
    }, 
    modal: { // Modal Container
        height: SCREEN_HEIGHT/2.4, 
        width: SCREEN_WIDTH -80, 
        paddingTop: 10, 
        backgroundColor: 'white',
        borderColor: 'white',
        borderWidth: 3,
        borderRadius: 10,
    },
    modalTextContainer: { // Consists of text input title & text input box 
        flex: 1, 
        alignItems: 'center',
    }, 
    textInput: { // Text Input Container
        width: '80%',
        borderWidth: 2,
        borderRadius: 10,
        borderColor: '#adadad',
        padding: 10,
    },
    modalTitle: { // Title of modal (e.g. Add Quote, Edit Quote)
        margin: 5, 
        fontSize: 16, 
        fontWeight: 'bold',
    },
    buttonsContainer: { // Button Container
        width: '100%', 
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    }, 
    textInputHeaderQuote: { // Title of quote input.
        width: '80%',
        alignItems: 'center',
        margin: 5, 
        fontSize: 16, 
        fontWeight: 'bold',
    },
    textInputHeaderAuthor: { // Title of author input.
        width: '80%',
        alignItems: 'center',
        margin: 5, 
        fontSize: 16, 
        fontWeight: '400',
    },
    modalButtonText: { // text styling for buttons: Cancel, Ok/Add
        margin: 5, 
        fontSize: 16, 
        fontWeight: 'bold',
    }, 
    buttonsStyling: { // buttons styling for buttons: Cancel, Ok/Add
        flex: 1, 
        paddingVertical: 10, 
        alignItems: 'center',
    }
})