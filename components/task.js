import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const Task = ({text, taskState}) => {
    console.log(taskState);
  return (
    <View style={styles.item}>
        <View style={styles.itemLeft}>
            {taskState ? (
                <Ionicons name="checkbox-sharp" size={28} color="black" style={styles.checkbox} />
            ) : (
                <Ionicons name="checkbox-outline" size={28} color="black" style={styles.checkbox}/>
            )}
            
            <Text style={styles.taskText}>{text}</Text>
        </View>
        <View style={styles.circular}></View>
    </View>
  );
}

const styles = StyleSheet.create({
    item: { 
        padding: 15,
        borderRadius: 10,
        backgroundColor: 'white',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent:'space-between',
        marginBottom: 20,
    },
    itemLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        flexWrap: 'wrap',
    },
    square: {
        width: 24, 
        height: 24,
        backgroundColor: '#55BCF6',
        opacity: 0.4,
        borderRadius: 5,
        marginRight: 15,
    },
    checkbox: {
        paddingRight: 10,
    },
    taskText:{
        maxWidth: '80%',
    },
    circular: {
        width: 12,
        height: 12,
        borderColor: '#55BCF6',
        borderWidth: 2,
        borderRadius: 5,
    },

});

export default Task;