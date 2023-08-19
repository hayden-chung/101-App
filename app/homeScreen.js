import React, {useState} from 'react';
import { KeyboardAvoidingView, StyleSheet, Text, View, TextInput, TouchableOpacity, Keyboard, Button} from 'react-native';


const HomeScreen = ({navigation}) => { 
    return(
        <View>
            <Button
                title="navigate to second screen"
                onPress={() => navigation.navigate("Second")}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    
});

export default HomeScreen;