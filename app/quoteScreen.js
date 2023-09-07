import React, {useState} from 'react';
import { KeyboardAvoidingView, StyleSheet, Text, View, TextInput, TouchableOpacity, Keyboard, ScrollView, FlatList, SafeAreaView, Modal, Alert} from 'react-native';
import Quote from '../components/motivationalQuotes/quote';
import { quoteToggle } from '../components/motivationalQuotes/quoteList&Controls';
import { QuoteModal } from '../components/motivationalQuotes/quoteModal';
import { MaterialIcons } from '@expo/vector-icons'; 
import { EditDeleteQuoteModal } from '../components/motivationalQuotes/edit&deleteQuoteModal';
import {QuoteListItems} from '../components/motivationalQuotes/quoteList&Controls';
import {quoteListSaved} from '../components/motivationalQuotes/quoteList&Controls'

const QuoteScreen = () => { 
    
    const [isQuoteModalVisible, quoteModalVisible] = useState([false, false]); // [modal display (true/false), edit? (true/false)]
    const [isEditDeleteModalVisible, EditDeleteModalVisible] = useState([false, null]); // [edit/delete modal display (true/false), quote index no.]
    const {quoteList, setQuoteList} = QuoteListItems(); // destructure function (QuoteListItems) into 'quoteList' variable and 'setQuoteList' function.

    console.log('quoteList', quoteListSaved)

    return (
    <SafeAreaView style={styles.container}>
        <View style={styles.wrapper}>
            <View style={styles.header}>
                <Text style={styles.quoteTitle}>QUOTE LIST</Text> 

                {/* Add Quote Button. When button pressed, open modal by setting variable to 'true' */}
                <TouchableOpacity onPress={() => quoteModalVisible([true, false])}>
                    <MaterialIcons name="playlist-add" size={35} color="black" style={styles.addQuote}/>
                </TouchableOpacity>
                
                {/* Add Quote Modal */}
                <Modal
                    transparent ={true} // covers screen completely but allows transparency in empty areas outside of modal.
                    animationType='fade' // fade animation when modal appears/disappears.
                    visible={isQuoteModalVisible[0]} // modal is visible (true/false)
                    onRequestClose={() => quoteModalVisible([false, false])} // when backbutton on phone tapped, close modal
                    >
                    
                    <View style={styles.modalBackDrop}> 
                        <QuoteModal // while modal is true, use quote modal component.
                        isQuoteModalVisible={isQuoteModalVisible}               // [modal display (true/false), edit? (true/false)]
                        quoteModalVisible={quoteModalVisible}                   // display modal (true/false)
                        setQuoteList={setQuoteList}                             // set quote list
                        quoteList={quoteList}                                   // quote list
                        isEditDeleteModalVisible = {isEditDeleteModalVisible}   // isEditDeleteModalVisible[1] = index number of quote incase of editing quote. 
                        />
                    </View>
                </Modal>
            </View>

            {/* Quote Container */}
            <View style={styles.quoteWrapper}> 
                <FlatList                                // FlatList to render lists.
                    data={quoteList}                     // data being inputted for flatlist to access.
                    showsVerticalScrollIndicator={false} // hide scroll bar.
                    renderItem={({item, index}) =>       // quote item in the list array & index. 
                    <TouchableOpacity                    // quote is responsive to touches
                        onPress={() => {const {quoteList: updatedQuoteList} = quoteToggle(index, quoteList, setQuoteList)}} // when quote pressed, change between selected/unselected.
                        onLongPress={() => {EditDeleteModalVisible ([true, index]);}} // when quote is long pressed, set modal to appear ([0] = true).
                        >
                        {/* Quote Item */}
                        <Quote item={item}/> 
                    </TouchableOpacity>
                }/>
            </View>

            {/* Edit & Delete Quote Modal */}
            <Modal
                transparent ={true}
                animationType='fade' // fade animation
                visible={isEditDeleteModalVisible[0]} // modal is visible (true)
                onRequestClose={() => EditDeleteModalVisible([false, isEditDeleteModalVisible[1]])} // when backbutton tapped, close modal
            >
                <View style={styles.modalBackDrop}>
                    <EditDeleteQuoteModal // Popup screen (edit & delete quotes)
                    quoteModalVisible = {quoteModalVisible}             // send function so when user presses on edit button, the quote modal appears to edit. 
                    isQuoteModalVisible = {isQuoteModalVisible}         // quote modal is visible and edit is true
                    isEditDeleteModalVisible={isEditDeleteModalVisible} // edit/delete modal visible (true/false) and quote index.
                    EditDeleteModalVisible={EditDeleteModalVisible}     // send function so modal visible can be set back to false to close. 
                    quoteList = {quoteList}                             // send quoteList to modify.
                    setQuoteList = {setQuoteList}                       // send setQuoteList to update quoteList.
                    />
                </View>
            </Modal>

        </View>
    </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { // whole screen
        flex: 1, 
        backgroundColor: 'white',
    },
    wrapper: { // main wrapper (area items will go in)
        paddingTop: 60,
        paddingHorizontal: 22,
    }, 
    header: { // Header container
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent:'space-between',
        backgroundColor: 'white',
        paddingBottom: 20,
        paddingHorizontal: 10,
    },
    quoteTitle: { // Header title
        fontWeight: 'bold',
        fontSize: 24,
    },
    quoteWrapper: { // container for list of quotes. 
        height: '75%',
        borderRadius: 10,
        borderWidth: 5, 
        backgroundColor: '#E8EAED',
        borderColor: '#E8EAED',
    },
    addWrapper: { // add quote button
        paddingHorizontal: 12,
        paddingVertical: 1,
        borderRadius: 10,
        borderWidth: 4,
        borderBottomColor: 'black',
        backgroundColor: 'white',
        alignItems: 'flex-end',
    },
    addQuote: { // Add quote button
        borderRadius: 10,
        borderWidth: 3,
        paddingLeft: 8,
        paddingRight: 1,
        paddingTop: 6,
        paddingBottom: 0,
    },
    modalBackDrop: { // for empty areas (outside of modal)
        flex: 1, 
        backgroundColor: 'rgba(0, 0, 0, 0.60)', // set opacity to 0.6
    },
});

export default QuoteScreen;