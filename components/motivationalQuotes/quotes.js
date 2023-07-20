import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons'; 

const Quote = ({item}) => {
    console.log(item)
    console.log(item[1])
    return (
        <View style={styles.item}>
            <View style={styles.checkcircle}>
                {item[2] ? (
                    <MaterialIcons name="radio-button-checked" size={24} color="black" />
                ) : (
                    <MaterialIcons name="radio-button-unchecked" size={24} color="black" />
                )}
                
            </View>
                <Text style={[styles.quoteText, {color: 'black'}]}>"{item[0]}" {'\n'}- {item[1]} -</Text>
                {/* <Text style={[styles.quoteText, {color: 'black'}]}></Text> */}
        </View>
    );
}

const styles = StyleSheet.create({
    item: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        borderRadius: 10, 
        backgroundColor: 'white',
        marginBottom: 5,
    },
    quoteText: { 
        maxWidth: '92%',
        marginLeft: 5,
        paddingLeft: 5,
        textAlign: 'center',
    },
});

export default Quote;