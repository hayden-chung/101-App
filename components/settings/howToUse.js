import React, {useState} from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions} from 'react-native';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = (Dimensions.get('window').height);

const HowToUseScreen = ({navigation}) => { 

    return(
        <View style={styles.container}>

            
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1, 
    },
    pushToBottom: {
        flex: 1,    
    },
    navigationBar: {
        backgroundColor:'red',
    },

});

export default HowToUseScreen;