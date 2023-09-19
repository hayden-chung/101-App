import React, {useState} from 'react';
import { KeyboardAvoidingView, StyleSheet, Text, View, TextInput, TouchableOpacity, Keyboard, Button} from 'react-native';
import {getRandomQuote} from '../motivationalQuotes/quoteList&Controls'

const QuoteOfDay = ({navigation}) => { 
    const quoteOfTheDay = getRandomQuote()
    return(
        <View style={styles.container}>        
            {quoteOfTheDay && ( // if quoteOfTheDay is not null or undefined. 
                <View>
                    <Text>{quoteOfTheDay[0]}</Text>
                    <Text>- {quoteOfTheDay[1]} -</Text>
                </View>
            )}
        </View>

    )
}

const styles = StyleSheet.create({
    
});

export default QuoteOfDay;