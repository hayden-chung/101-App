import React, {useState} from 'react';
import { KeyboardAvoidingView, StyleSheet, Text, View, TextInput, TouchableOpacity, Keyboard, ScrollView, FlatList, SafeAreaView, Modal, Alert} from 'react-native';
import colors from '../assets/colors';
import Quote from '../components/motivationalQuotes/Quote';
import { quoteToggle } from '../components/motivationalQuotes/quoteControl';
import { QuoteModal } from '../components/motivationalQuotes/quoteControl';
import { MaterialIcons } from '@expo/vector-icons'; 
import { EditDeleteQuoteModal } from '../components/motivationalQuotes/edit&deleteQuoteModal';
import {defaultQuotes} from '../assets/defaultQuotes';


const QuoteScreen = () => { 

    const [quoteList, setQuoteList] = useState(defaultQuotes);
    

    const [isQuoteModalVisible, quoteModalVisible] = useState([false, false]); // [modal display (true/false), edit? (true/false)]
    const [isEditDeleteModalVisible, EditDeleteModalVisible] = useState([false, null]); // [edit/delete modal display (true/false), quote index no.]

    return (
    <SafeAreaView style={styles.container}>
        <View style={styles.wrapper}>
            <View style={styles.header}>
                <Text style={styles.quoteTitle}>QUOTE LIST</Text>

                {/* Add Quote Button */}
                <TouchableOpacity onPress={() => quoteModalVisible([true, false])}>
                    <MaterialIcons name="playlist-add" size={35} color="black" style={styles.addQuote}/>
                </TouchableOpacity>
                
                {/* Add Quote Modal */}
                <Modal
                    transparent ={true} // covers screen completely but allows transparency in empty areas. 
                    animationType='fade' // fade animation when appearing/disappearing.
                    visible={isQuoteModalVisible[0]} // modal is visible (true/false)
                    onRequestClose={() => quoteModalVisible([false, false])} // when backbutton tapped, close modal
                    >
                        
                    <View style={styles.modalBackDrop}> 
                        <QuoteModal 
                        isQuoteModalVisible={isQuoteModalVisible} 
                        quoteModalVisible={quoteModalVisible} // display modal (true/false)
                        setQuoteList={setQuoteList} // set quote list
                        quoteList={quoteList} // quote list
                        isEditDeleteModalVisible = {isEditDeleteModalVisible} // [1] = index number of quote incase of editing quote. 
                        />
                    </View>
                </Modal>
            </View>

            <View style={styles.quoteWrapper}>
                <FlatList
                    data={quoteList}
                    showsVerticalScrollIndicator={false} // hide scroll bar
                    renderItem={({item, index}) => 
                    <TouchableOpacity onPress={() => {const { quoteList: updatedQuoteList} = quoteToggle(index, quoteList, setQuoteList); console.log('short press')}} onLongPress={() => {EditDeleteModalVisible ([true, index]);}}>
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
                    <EditDeleteQuoteModal 
                    quoteModalVisible = {quoteModalVisible}
                    isQuoteModalVisible = {isQuoteModalVisible}
                    isEditDeleteModalVisible={isEditDeleteModalVisible}
                    EditDeleteModalVisible={EditDeleteModalVisible}
                    quoteList = {quoteList}
                    setQuoteList = {setQuoteList}
                    />
                </View>
            </Modal>

        </View>
    </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        backgroundColor: 'white',
    },
    wrapper: { // main wrapper
        paddingTop: 60,
        paddingHorizontal: 22,
    }, 
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent:'space-between',
        backgroundColor: 'white',
        paddingBottom: 20,
        paddingHorizontal: 10,
    },
    quoteTitle: { // header title
        fontWeight: 'bold',
        fontSize: 24,
    },
    quoteWrapper: { 
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
    addQuote: {
        borderRadius: 10,
        borderWidth: 3,
        paddingLeft: 8,
        paddingRight: 1,
        paddingTop: 6,
        paddingBottom: 0,
    },
    modalBackDrop: {
        flex: 1, 
        backgroundColor: 'rgba(0, 0, 0, 0.60)',
    },
});

export default QuoteScreen;