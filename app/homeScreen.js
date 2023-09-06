import React, {useState} from 'react';
import { KeyboardAvoidingView, StyleSheet, Text, View, TextInput, TouchableOpacity, Keyboard, Button} from 'react-native';


const HomeScreen = ({navigation}) => { 
    return(
        <View styles={styles.container}>

            <TouchableOpacity style={quotesScreen}>
                <Text style={styles.quoteText}></Text>

            </TouchableOpacity>

            <View style={styles.bottomRow}>

                <TouchableOpacity style={todoScreen}></TouchableOpacity>

                <TouchableOpacity style={wellbeingScreen}></TouchableOpacity>

            </View>

        
        </View>
    )
}

const styles = StyleSheet.create({
    
});

export default HomeScreen;