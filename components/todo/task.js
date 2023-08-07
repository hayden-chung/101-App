import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = (Dimensions.get('window').height);

checkIconSize = SCREEN_HEIGHT/30

const Task = ({text, timetableGenerator, taskStatus}) => {
  return (
    <View style={styles.item}>
        <View style={styles.itemLeft}>
            
            {timetableGenerator ? ( 
                taskStatus ? ( // {If taskStatus = true, display selected circle, else display empty circle
                    <MaterialIcons name="radio-button-checked" size={checkIconSize} color="black" style={styles.checkbox}/>
                ) : (
                    <MaterialIcons name="radio-button-unchecked" size={checkIconSize} color="black" style={styles.checkbox}/>
                )
            ) : (
                taskStatus ? ( // {If taskStatus = true, display checked checkbox, else display empty checkbox 
                    <Ionicons name="checkbox-sharp" size={checkIconSize} color="black" style={styles.checkbox} />
                ) : (
                    <Ionicons name="checkbox-outline" size={checkIconSize} color="black" style={styles.checkbox}/>
                )
            )}

            
            {/*  Task Text */}
            <Text style={styles.taskText}>{text}</Text> 
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
    item: { // quote Item
        padding: 15,
        borderRadius: 10,
        backgroundColor: 'white',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent:'space-between',
        marginBottom: 10,
    },
    itemLeft: { 
        flexDirection: 'row',
        alignItems: 'center',
        flexWrap: 'wrap',
    },
    checkbox: {
        marginRight: 15,
    },
    taskText:{
        maxWidth: '80%',
    },

});

export default Task;