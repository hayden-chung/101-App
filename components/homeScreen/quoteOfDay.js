import React, {useState} from 'react';
import { KeyboardAvoidingView, StyleSheet, Text, View, TextInput, Dimensions} from 'react-native';
import {getRandomQuote} from '../motivationalQuotes/quoteList&Controls'

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

const QuoteOfDay = ({navigation}) => { 
    const quoteOfTheDay = getRandomQuote()
    return(
        <View style={styles.container}>       
            <View style={styles.wrapper}>
                <Text style={styles.quoteOfDayTitle}>QUOTE OF THE DAY</Text>
                {quoteOfTheDay && ( // if quoteOfTheDay is not null or undefined. 
                    <View>
                        <Text>{quoteOfTheDay[0]}</Text>
                        <Text>- {quoteOfTheDay[1]} -</Text>
                    </View>
                )}
            </View> 
        </View>

    )
}

const styles = StyleSheet.create({
    container: {
        padding: SCREEN_WIDTH/50,
    },
    wrapper: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
});

export default QuoteOfDay;