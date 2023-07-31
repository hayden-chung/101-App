import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions, TextInput, Alert} from 'react-native';

export const quoteToggle = (index, quoteList, setQuoteList) => { // when task is pressed, 
    quoteList[index][2] =!quoteList[index][2]; // inverse the boolean state (if false --> true, if true --> false)
    setQuoteList([...quoteList]); // update the taskItems array 
    return { quoteList: quoteList}; // return values to update
};

// ------------------------ MODAL SCREEN --------------------------------//
const WIDTH = Dimensions.get('window').width;
const HEIGHT_MODAL = (Dimensions.get('window').height)/2;

export const QuoteModal = (props) => {

    const quoteIndex = props.isEditDeleteModalVisible[1]
    const initialQuote = props.isQuoteModalVisible[1] ? props.quoteList[quoteIndex] : ['', '', false] // grab list if [editing] is true as quote string already exists, else make new empty list for new quote.
    const [quote, setQuote] = useState(initialQuote); // [quote, author, checked/unchecked]

    const CheckEmptyText = () => { // Check if text input box is empty.
        if (quote[1].trim().length == 0) { // when all whitespaces are removed (trim) and string length == 0, this means string is empty. (quote[1] = author)
            quote[1] = 'Unknown'; // replace empty string with 'Unkown'.
        }
    }

    const closeModal = (update) => {                // update = add/edit quote (boolean).
        CheckEmptyText(quote)                       // check if author is empty.
        if (update) {                               // if udpate is true, add the quote to the list.
            if (props.isQuoteModalVisible[1]) {     // if isQuoteModalVisible[1] is true --> edit quote.
                props.quoteList[quoteIndex] = quote // edit (update) exisitng string value (quote).
            } else {                                            // if isQuoteModalVisible[1] is false --> add new quote to list.
                props.setQuoteList([...props.quoteList, quote]) // add quote
            }
        }
        props.quoteModalVisible([false, false]); // set [0] to false as modal should not be visible now.
    }
    
    return ( 
        <TouchableOpacity
            disabled={true}
            style={styles.container}
        >

            {/* Popup Modal Screen */}
            <View style={styles.modal}> 
                <View style={styles.modalTextContainer}>
                    <Text style={[styles.modalTitle, {fontSize: 20}]}>{props.isQuoteModalVisible[1] ? 'Edit Quote': 'Add Quote'}</Text>
                    <Text style={styles.textInputHeaderQuote}>Quote:</Text>
                    <TextInput style={styles.textInput} placeholder={'Enter your quote:'} value={quote[0]} onChangeText={quoteText => setQuote([quoteText, quote[1], false])} />  
                </View>

                <View style={styles.modalTextContainer}>
                    <Text style={styles.textInputHeaderAuthor}>Author:</Text>
                    <TextInput 
                        style={styles.textInput} 
                        placeholder={'Author:'} 
                        value={quote[1]} 
                        onChangeText={authorText => {
                            authorText.trim() !== '' ? authorText: 'Unknown';
                            setQuote([quote[0], authorText, false])
                        }} 
                    />  
                </View>

                <View style={styles.buttonsView}>
                    <TouchableOpacity 
                        style={styles.touchableOpacity}
                        onPress={() => closeModal(false)}
                    >
                        <Text style={[styles.modalButtonText, {color: 'blue'}]}>
                            Cancel
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity 
                        style={styles.touchableOpacity}
                        onPress={() => closeModal(true)}
                    >
                        <Text style={[styles.modalButtonText, {color: 'blue',}]}>
                            {props.isQuoteModalVisible[1] ? 'Ok': 'Add'}
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
    

        </TouchableOpacity>
        

    )
}

const styles= StyleSheet.create({
    container: {
        flex: 1, 
        alignItems: 'center', 
        justifyContent: 'center',
    }, 
    modal: {
        height: HEIGHT_MODAL, 
        width: WIDTH -80, 
        paddingTop: 10, 
        backgroundColor: 'white',
        borderColor: 'white',
        borderWidth: 3,
        borderRadius: 10,
    },
    textInput: {
        width: '80%',
        // backgroundColor: 'red',
        borderWidth: 2,
        borderRadius: 10,
        padding: 10,
    },
    modalTextContainer: {
        flex: 1, 
        alignItems: 'center',
        // backgroundColor: 'yellow',
    }, 
    modalTitle: {
        margin: 5, 
        fontSize: 16, 
        fontWeight: 'bold',
        // backgroundColor: 'magenta',
    },
    textInputHeaderQuote: {
        width: '80%',
        alignItems: 'center',
        margin: 5, 
        fontSize: 16, 
        fontWeight: 'bold',
        // backgroundColor: 'green',
    },
    textInputHeaderAuthor: {
        width: '80%',
        alignItems: 'center',
        margin: 5, 
        fontSize: 16, 
        fontWeight: '400',
        // backgroundColor: 'green',
    },
    modalButtonText: {
        margin: 5, 
        fontSize: 16, 
        fontWeight: 'bold',
    }, 
    buttonsView: {
        width: '100%', 
        flexDirection: 'row',
    }, 
    touchableOpacity: {
        flex: 1, 
        paddingVertical: 10, 
        alignItems: 'center',
    }
})
