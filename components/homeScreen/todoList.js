import React, {useState} from 'react';
import {StyleSheet, Text, View, FlatList} from 'react-native';
import { TaskItemsList } from '../todo/taskItemsList';
import Task from '../todo/task';

const TodoList = ({navigation}) => { 
    const {taskItems, setTaskItems} = TaskItemsList();

    return(
            <FlatList   
                data = {taskItems}                   // Data being inputted for flatlist to access.
                showsVerticalScrollIndicator={false} // Hide scroll bar.
                renderItem={({item, index}) =>       // Item and index no. of task in array. 
                <View>
                    <Task text={item[0]} timetableGenerator={false} taskStatus={taskItems[index][1]} taskTime={taskItems[index][3]} /> 
                </View>
            }/>
    )
}

const styles = StyleSheet.create({
    
});

export default TodoList;