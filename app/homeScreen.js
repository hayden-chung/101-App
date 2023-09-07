import React, {useState} from 'react';
import { KeyboardAvoidingView, StyleSheet, Text, View, TextInput, TouchableOpacity, Keyboard, Button} from 'react-native';
import QuoteOfDay from '../components/homeScreen/quoteOfDay'

const HomeScreen = ({navigation}) => { 
    return(
        <View styles={styles.container}>

            <TouchableOpacity style={styles.quotesScreen} onPress={() => navigation.navigate("QuoteScreen")}>
                <Text style={styles.quoteText}>Quote Screen</Text>
                <QuoteOfDay/>
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