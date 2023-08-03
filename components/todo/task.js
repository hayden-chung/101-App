import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const Task = ({text, taskStatus}) => {
  return (
    <View style={styles.item}>
        <View style={styles.itemLeft}>
            {/* If taskStatus = true, display checked checkbox, else display empty checkbox */}
            {taskStatus ? ( 
                <Ionicons name="checkbox-sharp" size={28} color="black" style={styles.checkbox} />
            ) : (
                <Ionicons name="checkbox-outline" size={28} color="black" style={styles.checkbox}/>
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
        marginBottom: 20,
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