import React, {useState} from 'react';
import { KeyboardAvoidingView, StyleSheet, Text, View, TextInput, TouchableOpacity, Keyboard, Button} from 'react-native';
import { useIsFocused } from '@react-navigation/native'; // Import useIsFocused
import QuoteOfDay from '../components/homeScreen/quoteOfDay'

const HomeScreen = ({navigation}) => { 
    const isFocused = useIsFocused(); 

    return(
        <View styles={styles.container}>

            <TouchableOpacity style={styles.quotesScreen} onPress={() => navigation.navigate("QuoteScreen")}>
                <Text style={styles.quoteOfDayTitle}>QUOTE OF THE DAY</Text>
                {isFocused && <QuoteOfDay/>}
            </TouchableOpacity>

            <View style={styles.bottomRow}>
                <TouchableOpacity style={styles.todoScreen} onPress={() => navigation.navigate("ToDoScreen")}>
                    <Text styles={styles.todoText}>Todo Screen</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.wellbeingScreen} onPress={() => navigation.navigate("WellBeingScreen")}>
                    <Text styles={styles.todoText}>Wellbeing Screen</Text>
                </TouchableOpacity>

            </View>

        
        </View>
    )
}

const styles = StyleSheet.create({
    
});

export default HomeScreen;