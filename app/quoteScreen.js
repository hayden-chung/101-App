import React, {useState} from 'react';
import { KeyboardAvoidingView, StyleSheet, Text, View, TextInput, TouchableOpacity, Keyboard, ScrollView, FlatList, SafeAreaView, Modal} from 'react-native';
import colors from '../assets/colors';
import Quote from '../components/motivationalQuotes/quotes';
import { quoteToggle } from '../components/motivationalQuotes/quoteControl';
import { SimpleModal } from '../components/motivationalQuotes/quoteControl';

const QuoteScreen = () => { 

    const [quoteList, setQuoteList] = useState([['5.	“You’ve gotta dance like there’s nobody watching, love like you’ll never be hilliam W. Purkey 1', false], ['quote 2', false], ['quote 3', false], ['quote 4', false]]);
    const [quote, setQuote] = useState([null, false]);

    const[isModalVisible, setIsModalVisible] = useState(false);
    const [chooseData, setchooseData] = useState();
    const changeModalVisible = (bool) => {
        setIsModalVisible(bool);
    }

    const setData = (data) => {
        setchooseData(data);
    }

    console.log(quoteList);

    return (
    <SafeAreaView style={styles.container}>
        <View style={styles.wrapper}>
            <View style={styles.header}>
                <Text style={styles.quoteTitle}>MY QUOTES</Text>

                <TouchableOpacity
                onPress={() => changeModalVisible(true)}>
                    <View style={styles.addWrapper}>
                        <Text style={styles.addQuote}>+</Text>
                    </View>
                </TouchableOpacity>
                <Modal
                transparent={true}
                animationType='fade'
                visible={isModalVisible}
                nRequestCLose={() => changeModalVisible(false)}
                >
                    <SimpleModal 
                    changeModalVisible={changeModalVisible}
                    setData={setData}
                    />
                </Modal>

            </View>

            <View style={styles.quoteWrapper}>
                    <FlatList
                        data={quoteList}
                        showsVerticalScrollIndicator={false} // hide scroll bar
                        renderItem={({item, index}) => 
                        <TouchableOpacity onPress={() => {const { quoteList: updatedQuoteList} = quoteToggle(index, quoteList, setQuoteList)}}>
                            <Quote quote={item[0]} quoteStatus={item[1]} />
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
        backgroundColor: colors.background,
      },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent:'space-between',
        backgroundColor: 'tomato',
        paddingBottom: 20,
    },
    quoteTitle: { // header title
        fontWeight: 'bold',
        fontSize: 24,
        paddingLeft: 20,
    },
    addWrapper: { // add quote button
        marginRight: 10,
        paddingHorizontal: 15,
        paddingVertical: 9,
        borderRadius: 10,
        borderWidth: 5,
        borderBottomColor: 'black',
        backgroundColor: 'green',
        alignItems: 'flex-end',

    },
    wrapper: { // main wrapper
        paddingTop: 80,
        paddingHorizontal: 20,
    }, 
    quoteWrapper: { 
        maxHeight: '80%',
        paddingVertical : 20,
        paddingHorizontal: 20,
        borderRadius: 10,
        backgroundColor: 'red',
    },
    addQuote: {
    },
});

export default QuoteScreen;