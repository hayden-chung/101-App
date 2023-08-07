import React, {useState} from 'react';
import { KeyboardAvoidingView, StyleSheet, Text, View, Dimensions, TouchableOpacity, Keyboard, ScrollView, FlatList} from 'react-native';
import {QuoteListItems} from '../motivationalQuotes/quoteItemsList';
import Task from '../todo/Task';
import {TaskItemsList} from '../todo/taskItemsList';
import {selectedTask} from '../todo/taskControls'; // import taskControl functions
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import {toggleCheckbox} from './timetableControls';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = (Dimensions.get('window').height);

const TimetableGenerator = () => { 

    const {taskItems, setTaskItems} = TaskItemsList();// destructure function (TaskItemsList) into 'taskItems' variable and 'setTaskItems' function.
    const [isBreakChecked, setBreakChecked] = useState(false);
    
    return(
        <View style={styles.container}>
            <View style={styles.wrapper}>
                <Text style={styles.subTitle}>Select today's tasks...</Text>
                <View style={styles.taskWrapper}>
                    <FlatList   
                    data = {taskItems}                   // Data being inputted for flatlist to access.
                    showsVerticalScrollIndicator={false} // Hide scroll bar.
                    renderItem={({item, index}) =>       // Item and index no. of task in array. 
                        <TouchableOpacity                  // Task is responsive to touches
                        onPress={() => selectedTask(index, taskItems, setTaskItems)} // when quote pressed, change completed state (compelted/not completed)
                        > 
                        {/* Task component displays task item. Parameters 'text' (task text) and 'taskState' (checkbox)*/}
                        <Task text={item[0]} timetableGenerator={true} taskStatus={taskItems[index][2]} /> 
                        </TouchableOpacity>
                    }/>
                </View>

                <View style={styles.breakCheckBoxWrapper}>
                    <Text style={styles.breakCheckBoxText}>Fill With Breaks</Text>
                    
                    <TouchableOpacity onPress={() => {toggleCheckbox(isBreakChecked, setBreakChecked)}}>
                        {isBreakChecked ? (
                            <Ionicons name="ios-checkbox" size={24} color="white" />
                        ) : (
                            <Ionicons name="ios-checkbox-outline" size={24} color="white" />
                        )}
                    </TouchableOpacity>
                </View>

                <TouchableOpacity style={styles.generateButton}> 
                    <MaterialCommunityIcons name="gesture-double-tap" size={SCREEN_HEIGHT/10} color="white" />
                </TouchableOpacity>
                <Text style={styles.buttonDescription}>GENERATE TIMETABLE</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        alignItems: 'center',
        backgroundColor: '#FF7276',
    },
    wrapper: {
        flexDirection: 'column',
        alignItems: 'center',
        width: '90%',
        height: '75%',
        paddingTop: SCREEN_HEIGHT/20,
        // backgroundColor: 'yellow',
    },
    title: {
        fontSize: SCREEN_HEIGHT/25,
        fontWeight: '600',
        color: 'white',
    },
    subTitle: {
        paddingTop: SCREEN_HEIGHT/80,
        fontSize: SCREEN_HEIGHT/40,
        fontWeight: '500',
        color: 'white',
    },
    taskWrapper: { // container for list of quotes. 
        width: '100%',
        height: '90%',
        marginTop: SCREEN_HEIGHT/80,
        paddingTop: SCREEN_HEIGHT/100,
        paddingHorizontal: SCREEN_HEIGHT/100,
        borderRadius: 15,
        borderWidth: 5, 
        backgroundColor: '#E8EAED',
        borderColor: 'black',
    },
    breakCheckBoxWrapper: {
        flexDirection: 'row',
        paddingTop: SCREEN_HEIGHT/70,
    },
    breakCheckBoxText: {
        fontSize: SCREEN_HEIGHT/45,
        paddingRight: SCREEN_WIDTH/30,
        color: 'white',
    },

    generateButton: {
        marginTop: SCREEN_HEIGHT/50,
        padding: SCREEN_HEIGHT/100,
        borderRadius: 200,
        borderWidth: SCREEN_HEIGHT/200,
        borderColor: 'white',
    },
    buttonDescription: {
        color: 'white',
        fontSize: SCREEN_HEIGHT/40,
        fontWeight: '500',
        paddingTop: SCREEN_HEIGHT/50,
        paddingBottom: SCREEN_HEIGHT/50,
    },
});

export default TimetableGenerator;