import React, {useState} from 'react';
import {StyleSheet, Text, View, FlatList, Dimensions, TouchableOpacity} from 'react-native';
import { TaskItemsList } from '../todo/taskItemsList';
import Task from '../todo/task';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

const TodoList = ({navigation}) => { 
    const {taskItems, setTaskItems} = TaskItemsList();

    return(
        <View style={styles.container}>
            <Text style={styles.headerText}>To Do</Text>
            {/* To Do Tasks */}
            <FlatList   
                data = {taskItems} // Data being inputted for flatlist to access.
                showsVerticalScrollIndicator={false} // Hide scroll bar.
                renderItem={({item, index}) =>       // Item and index no. of task in array. 
                taskItems[index][1] === false ? (
                <View                  // Task is responsive to touches
                    > 
                    <Task text={item[0]} timetableGenerator={false} taskStatus={taskItems[index][1]} taskTime={taskItems[index][3]} aspect={taskItems[index][4]} index={index} taskItems={taskItems} setTaskItems={setTaskItems}/> 
                </View>
                ) : null
            }/>
            <TouchableOpacity style={styles.openButtonRow} onPress={() => navigation.navigate("ToDoScreen")}>
                <Text style={styles.buttonText}>Open</Text> 
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingVertical: SCREEN_HEIGHT/200,
        paddingBottom: SCREEN_HEIGHT/50,
        backgroundColor: 'white',
        alignItems: 'center',
        height: '100%',
    },
    headerText: {
        fontSize: SCREEN_WIDTH/20,
        textAlign: 'center',
        fontWeight: '500',
    },
    openButtonRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: '10%',
        width: '90%',
        borderRadius:100,
        marginBottom: SCREEN_HEIGHT/80,
        backgroundColor: 'white',
        elevation: 5,
    },
});

export default TodoList;