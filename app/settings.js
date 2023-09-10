import React, {useState} from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions} from 'react-native';
import TabBar from '../components/tabBar'

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = (Dimensions.get('window').height);

const SettingsScreen = ({navigation}) => { 

    return(
        <View style={styles.container}>

            <View style={styles.pushToBottom}></View>
            
            <View style={styles.navigationBar}>
                <TabBar navigation={navigation}/>
            </View>
            
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

export default SettingsScreen;