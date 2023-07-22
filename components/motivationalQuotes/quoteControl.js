import React, {useState} from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions, TextInput, Alert } from 'react-native';

export const quoteToggle = (index, quoteList, setQuoteList) => { // when task is pressed, 
    quoteList[index][2] =!quoteList[index][2]; // inverse the boolean state (if false --> true, if true --> false)
    setQuoteList([...quoteList]); // update the taskItems array 
    return { quoteList: quoteList}; // return values to update
};

// ------------------------ MODAL SCREEN --------------------------------//
const WIDTH = Dimensions.get('window').width;
const HEIGHT_MODAL = (Dimensions.get('window').height)/2;

export const AddQuoteModal = (props) => {

    const [quote, setQuote] = useState(['', '', false]); // [quote, author, checked/unchecked]

    const CheckEmptyText = () => {
        if (quote[1].trim().length == 0) { // quote[1] = author
            quote[1] = 'Unknown';
        }
        console.log(quote);
    }

    const closeModal = (add) => { // add = add quote to list? (boolean)
        CheckEmptyText(quote)
        console.log("added:", quote)
        if (add) { // if add is true, add the quote to the list
            props.setQuoteList([...props.quoteList, quote])
        }
        console.log(props.quoteList)
        props.addQuoteModalVisible(false); // set to false as mode should not be visible now
    }
    
    return ( 
        <TouchableOpacity
            disabled={true}
            style={styles.container}
        >

            {/* Popup Modal Screen */}
            <View style={styles.modal}> 
                {/*  */}
                <View style={styles.modalTextContainer}>
                    <Text style={[styles.modalTitle, {fontSize: 20}]}>Add Quote</Text>
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
                            Add
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
