import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons'; 

const Quote = ({item}) => { // item = quote item [quote, author, selected/unselected]
    return (
        <View style={styles.item}>
            <View style={styles.checkcircle}>
                {/* If item[2] = true, display checked button, else, display unchecked button */}
                {item[2] ? ( 
                    <MaterialIcons name="radio-button-checked" size={24} color="black" />
                ) : (
                    <MaterialIcons name="radio-button-unchecked" size={24} color="black" />
                )}
                
            </View>

                {/* Display quote (item[0]), and on the next line, display author (item[1]) */}
                <Text style={[styles.quoteText, {color: 'black'}]}>"{item[0]}" {'\n'}- {item[1]} -</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    item: { // quote Item container
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        borderRadius: 5, 
        backgroundColor: 'white',
        marginBottom: 5,
    },
    quoteText: { // quote Text
        maxWidth: '92%',
        marginLeft: 5,
        paddingLeft: 5,
        textAlign: 'center',
    },
});

export default Quote;