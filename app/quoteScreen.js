import React, {useState} from 'react';
import { KeyboardAvoidingView, StyleSheet, Text, View, TextInput, TouchableOpacity, Keyboard, ScrollView, FlatList, SafeAreaView, Modal, Alert} from 'react-native';
import colors from '../assets/colors';
import Quote from '../components/motivationalQuotes/quotes';
import { quoteToggle } from '../components/motivationalQuotes/quoteControl';
import { AddQuoteModal } from '../components/motivationalQuotes/quoteControl';
import { MaterialIcons } from '@expo/vector-icons'; 
import { EditDeleteModal } from '../components/motivationalQuotes/edit&delete';

const QuoteScreen = () => { 

    const [quoteList, setQuoteList] = useState([['5.	“You’ve gotta dance like there’s nobody watching, love like you’ll never be', 'hilliam W. Purkey 1', false], ['quote 2', 'author 2', false], ['quote 3', 'author 3', false], ['quote 4', 'author 4', false]]);

    const [isQuoteModalVisible, addQuoteModalVisible] = useState(false); // modal display (true/false)
    const [isEditDeleteModalVisible, EditDeleteModalVisible] = useState([false, null]); // modal display (true/false), index no. for when editing or deleting

    return (
    <SafeAreaView style={styles.container}>
        <View style={styles.wrapper}>
            <View style={styles.header}>
                <Text style={styles.quoteTitle}>QUOTE LIST</Text>

                {/* Add Quote Button */}
                <TouchableOpacity onPress={() => addQuoteModalVisible(true)}> 
                    <MaterialIcons name="playlist-add" size={35} color="black" style={styles.addQuote}/>
                </TouchableOpacity>
                
                {/* Add Quote Modal */}
                <Modal
                    transparent ={true}
                    animationType='fade' // fade animation
                    visible={isQuoteModalVisible} // modal is visible (true)
                    onRequestClose={() => addQuoteModalVisible(false)} // when backbutton tapped, close modal
                    >

                    {/* modalBackDrop = darker background */}
                    <View style={styles.modalBackDrop}> 
                        <AddQuoteModal 
                        addQuoteModalVisible={addQuoteModalVisible} // display modal (true/false)
                        setQuoteList={setQuoteList} // set quote list
                        quoteList={quoteList} // quote list
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
                onRequestClose={() => EditDeleteModalVisible([false, null])} // when backbutton tapped, close modal
            >
                <View style={styles.modalBackDrop}>
                    <EditDeleteModal 
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