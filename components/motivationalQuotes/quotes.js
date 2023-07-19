import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons'; 

const Quote = ({quote, quoteStatus}) => {
    return (
        <View style={styles.item}>
            <View style={styles.checkcircle}>
                {quoteStatus ? (
                    <MaterialIcons name="radio-button-checked" size={24} color="black" />
                ) : (
                    <MaterialIcons name="radio-button-unchecked" size={24} color="black" />
                )}
                
            </View>
                <Text style={[styles.quoteText, {color: 'black'}]}>{quote}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    item: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        borderRadius: 10, 
        backgroundColor: '#E8EAED',
        marginBottom: 10,
    },
    quoteText: {
        maxWidth: '92%',
        marginLeft: 5,
        paddingLeft: 5,
        textAlign: 'center',
        backgroundColor: 'green',
    },
});

export default Quote;