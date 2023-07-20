import React, {useState} from 'react';
import { KeyboardAvoidingView, StyleSheet, Text, View, TextInput, TouchableOpacity, Keyboard, ScrollView, FlatList, SafeAreaView, Modal} from 'react-native';
import colors from '../assets/colors';
import Quote from '../components/motivationalQuotes/quotes';
import { quoteToggle } from '../components/motivationalQuotes/quoteControl';
import { SimpleModal } from '../components/motivationalQuotes/quoteControl';
import { MaterialIcons } from '@expo/vector-icons'; 

const QuoteScreen = () => { 

    const [quoteList, setQuoteList] = useState([['5.	“You’ve gotta dance like there’s nobody watching, love like you’ll never be hilliam W. Purkey 1', 'awdawd', false], ['quote 2', 'awdaw', false], ['quote 3', 'awda', false], ['quote 4', 'awdawd', false]]);


    // ----------- Modal Screen (for add quote) ----------- //
    const [isModalVisible, setIsModalVisible] = useState(false); // modal display (true/false)
    // const [chooseData, setchooseData] = useState();

    // const changeModalVisible = (bool) => {
    //     setIsModalVisible(bool);
    // }
    // const setData = (data) => {
    //     setchooseData(data);
    // }
    // ---------------------------------------------------- //
    return (
    <SafeAreaView style={styles.container}>
        <View style={styles.wrapper}>
            <View style={styles.header}>
                <Text style={styles.quoteTitle}>QUOTE LIST</Text>

                <TouchableOpacity onPress={() => setIsModalVisible(true)}>
                    <MaterialIcons name="playlist-add" size={35} color="black" style={styles.addQuote}/>
                </TouchableOpacity>
                
                <Modal
                transparent={true}
                animationType='fade' // fade animation
                visible={isModalVisible} // visible = true
                onRequestClose={() => setIsModalVisible(false)}
                >
                    <TouchableOpacity onPress={() => setIsModalVisible(false)} style={styles.modalBackDrop} activityOpacity={1}>

                        <SimpleModal 
                        setIsModalVisible={setIsModalVisible} // display modal (true/false)
                        setQuoteList={setQuoteList} // set quote list
                        quoteList={quoteList} // quote list
                        />

                    </TouchableOpacity>
                </Modal>

            </View>

            <View style={styles.quoteWrapper}>
                    <FlatList
                        data={quoteList}
                        showsVerticalScrollIndicator={false} // hide scroll bar
                        renderItem={({item, index}) => 
                        <TouchableOpacity onPress={() => {const { quoteList: updatedQuoteList} = quoteToggle(index, quoteList, setQuoteList); console.log(quoteList);}}>
                            <Quote item={item}/>
                        </TouchableOpacity>
                    }
                    />
            </View>
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
        paddingVertical : 20,
        paddingHorizontal: 20,
        borderRadius: 10,
        backgroundColor: '#E8EAED',
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