import React, {useState} from 'react';
import { KeyboardAvoidingView, StyleSheet, Text, View, Dimensions, TouchableOpacity, FlatList, Animated} from 'react-native';
import Task from '../../todo/task';
import {TaskItemsList} from '../../todo/taskItemsList';
import {selectedTask} from '../../todo/taskControls'; // import taskControl functions
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import {GenerateTimetable} from './timetableGeneratorAlgorithm';
import AlertMessage from '../../alertMessage'
import {getTimetable, updateTimetable} from '../timetableStore'
import TabBar from '../../tabBar';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = (Dimensions.get('window').height); 

const TimetableGenerator = ({navigation}) => { 

    const {taskItems, setTaskItems} = TaskItemsList();// destructure function (TaskItemsList) into 'taskItems' variable and 'setTaskItems' function.
    const [isAlarmMessage, toggleAlarmMessage] = useState(false); // Alarm message for when user presses task with no estimated time. 
    const {timetable, setTimetable} = getTimetable();

    const callbackToFunction = (timetable) => { // send timetable parameter to timetable screen function. 
        navigation.navigate("TimetableScreen", {
            timetable: timetable // reference variable: variable to send
        })
    }

    const onGenerateTimetablePressed = () => {
        let newTimetable = GenerateTimetable(taskItems, [], setTimetable)
        updateTimetable(newTimetable)
        console.log('FINISHED', newTimetable)
        callbackToFunction(newTimetable) 
    }

    return(
        <View style={styles.container}>
            <View style={styles.wrapper}>
                
                <View style={styles.headerContainer}>
                    <Text style={styles.header}>Timetable Generator</Text>

                    <TouchableOpacity style={styles.timetableSettingsButton} onPress={() => navigation.navigate("TimetableSettings")}>
                        <Ionicons name="ios-settings-sharp" size={SCREEN_HEIGHT/23} color="black" />
                    </TouchableOpacity>
                </View>

                <Text style={styles.subHeader}>Select today's tasks...</Text>
   
                <View style={styles.taskWrapper}>
                    <FlatList   
                    data = {taskItems}                   // Data being inputted for flatlist to access.
                    showsVerticalScrollIndicator={false} // Hide scroll bar.
                    renderItem={({item, index}) =>       // Item and index no. of task in array. 
                        <TouchableOpacity                // Task is responsive to touches
                        onPress={() => { // when quote pressed, 
                            selectedTask(index, taskItems, setTaskItems, toggleAlarmMessage, isAlarmMessage); // select/unselect task (if possible)
                        }}>

                        {/* Task component displays task item. Parameters 'text' (task text) and 'taskState' (checkbox)*/}
                        <Task text={item[0]} timetableGenerator={true} taskStatus={taskItems[index][2]} taskTime={taskItems[index][3]} aspect={taskItems[index][4]} index={index} taskItems={taskItems} setTaskItems={setTaskItems} /> 
                        </TouchableOpacity>
                    }/>
                </View>


                <AlertMessage 
                    isAlarmMessage={isAlarmMessage}
                    toggleAlarmMessage={toggleAlarmMessage}
                    text={'You can only select tasks with an estimated time'}
                    fontSize={1}
                    fontColor={'white'}
                />

                {/* ---------- Generate Timetable Button ---------- */}
                <TouchableOpacity style={styles.generateButton} onPress={() => onGenerateTimetablePressed()}> 
                    <MaterialCommunityIcons name="gesture-double-tap" size={SCREEN_HEIGHT/12} color="white" />
                </TouchableOpacity>

                <Text style={styles.buttonDescription}>GENERATE TIMETABLE</Text>
            </View>

            <View style={styles.pushToBottom}></View>
            <TabBar navigation={navigation}/>
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
        paddingTop: SCREEN_HEIGHT/20,
        flexDirection: 'column',
        alignItems: 'center',
        width: '90%',
        height: '75%',
        // backgroundColor: 'yellow',
    },
    headerContainer: {
        paddingHorizontal: SCREEN_WIDTH/20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
    },
    header: {
        fontSize: SCREEN_HEIGHT/30,
        fontWeight: '500',
        color: 'white',
    },
    subHeader: {
        fontSize: SCREEN_HEIGHT/40,
        fontWeight: '500',
        color: 'white',
    },
    taskWrapper: { // container for list of quotes. 
        width: '100%',
        height: '80%',
        marginTop: SCREEN_HEIGHT/80,
        paddingTop: SCREEN_HEIGHT/100,
        paddingHorizontal: SCREEN_HEIGHT/100,
        borderRadius: 15,
        borderWidth: 5, 
        backgroundColor: '#E8EAED',
        borderColor: 'white',
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
    timetableSettingsButton: {
        padding: SCREEN_HEIGHT/300,
        borderRadius: 8,
        borderWidth: 3,
        backgroundColor: 'white',
        alignItems: 'center',
    },
    generateButton: {
        marginTop: SCREEN_HEIGHT/60,
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
    pushToBottom: {
        flex: 1,    
    },
});

export default TimetableGenerator;