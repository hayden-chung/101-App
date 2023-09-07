import React, {useState} from 'react';
import { KeyboardAvoidingView, StyleSheet, Text, View, TextInput, TouchableOpacity, Keyboard, Button} from 'react-native';
import {getRandomQuote} from '../motivationalQuotes/quoteList&Controls'

const QuoteOfDay = ({navigation}) => { 
    return(
        <View styles={styles.container}>
            <Text>{getRandomQuote()}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    
});

export default QuoteOfDay;