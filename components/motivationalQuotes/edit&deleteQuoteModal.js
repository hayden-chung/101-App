import React, {useState} from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions, TextInput, Alert } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { updateQuoteList } from './quoteList&Controls';


// ------------------------ MODAL SCREEN --------------------------------//
const WIDTH_MODAL = (Dimensions.get('window').width)/1.8;
const HEIGHT_MODAL = (Dimensions.get('window').height)/7;

export const EditDeleteQuoteModal = (props) => { // edit and delete quotes

    const closeModal = () => { // Close modal 
        props.EditDeleteModalVisible([false, props.isEditDeleteModalVisible[1]]); // set to false as mode should not be visible now
    }

    const deleteQuote = () => { //  delete a quote from quoteList
        props.quoteList.splice(props.isEditDeleteModalVisible[1], 1); // remove the quote from the array (1 = number of items to remove)
        props.setQuoteList([...props.quoteList]); // update the taskItems array 
        updateQuoteList(props.quoteList)
        closeModal()
    };

    const editQuote = () => { // edit a quote
        props.quoteModalVisible([true, true]); // quoteModal = true ==> display
        updateQuoteList(props.quoteList)
        closeModal()
    };
    
    return ( 
        <TouchableOpacity
            disabled={true}
            style={styles.container}
        >
            {/* Popup Modal Screen */}
            <View style={styles.modal}> 

                    {/* Edit Button */}
                    <TouchableOpacity 
                        style={styles.editButton}
                        onPress={() => editQuote()}
                    >
                        <Text style={[styles.modalButtonText, {color: 'black'}]}>
                            Edit
                        </Text>
                        <MaterialIcons name="edit" size={24} color="black" />
                    </TouchableOpacity>
                    
                    {/* Divider line between edit and delete button */}
                    <View style={styles.divider}></View>

                    {/* Delete Button */}
                    <TouchableOpacity 
                        style={styles.deleteButton}
                        onPress={() => deleteQuote()}
                    >
                        <Text style={[styles.modalButtonText, {color: 'red',}]}>
                            Delete
                        </Text>
                        <MaterialIcons name="delete" size={24} color="red" />
                    </TouchableOpacity>
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
        width: WIDTH_MODAL, 
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: 'white',
        borderColor: 'white',
        borderwidth: 3,
        borderRadius: 10,
    },
    modalButtonText: { // text: edit, delete
        margin: 5, 
        fontSize: 16, 
        fontWeight: 'bold',
    }, 
    editButton: { // edit & delete button
        width: '100%', 
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 30,
        flex: 1, 
        alignItems: 'center',
    },
    divider: { // divide edit and delete button with a line
        height: '1%',
        width: '100%',
        backgroundColor: '#D3D3D3',
    },
    deleteButton: { // edit & delete button
        width: '100%', 
        flexDirection: 'row',
        justifyContent: 'space-between',
        flex: 1, 
        paddingHorizontal: 30,
        alignItems: 'center',
    },
})
