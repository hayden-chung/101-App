import React, {useEffect} from 'react';
import {StyleSheet, Text, View, FlatList, Dimensions, TouchableOpacity} from 'react-native';
import { taskItemsSaved, TaskItemsList } from '../todo/taskItemsList';
import {completedTask, getAspectIndex} from '../todo/taskControls'
import {savedCalendarData, getCurrentDate} from '../wellbeing/calendar/calendarControls'
import Task from '../todo/task';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

const MiniTodoList = ({navigation}) => { // Todo list in Home Dashbaord

    const usingThisTaskList = taskItemsSaved

    const {taskItems, setTaskItems} = TaskItemsList(true);



    console.log('inside function', usingThisTaskList)

    useEffect(() => { // refresh code whenever navigation changes. 
        console.log('reset')
        return () => {
        };
      }, []);

    const updateWellbeingRating = (index) => { // If task is tagged to an aspect, increase the aspect by 1 when task completed. 
        if (usingThisTaskList[index][4] !== null) { // if task is tagged to aspect, increase it by one. 
            const currentDate = getCurrentDate()
          if (savedCalendarData[currentDate] === undefined) {
            savedCalendarData[currentDate] = [1, 1, 1, 1, 1, 1]
          }
          const aspectIndex = getAspectIndex(index, usingThisTaskList)
          if (savedCalendarData[currentDate][aspectIndex] !== 10) {
            savedCalendarData[currentDate][aspectIndex] = savedCalendarData[currentDate][aspectIndex]+1
          }
        }
      };

    return(
        <View style={styles.container}>
            <Text style={styles.headerText}>To Do</Text>
            {/* To Do Tasks */}
            <View style={styles.todoListWrapper}> 
                <FlatList   
                    data = {usingThisTaskList} // Data being inputted for flatlist to access.
                    showsVerticalScrollIndicator={false} // Hide scroll bar.
                    renderItem={({item, index}) =>       // Item and index no. of task in array. 
                    usingThisTaskList[index][1] === false ? (
                    <View                  // Task is responsive to touches
                        > 
                        <Task text={item[0]} timetableGenerator={false} taskStatus={item[1]} taskTime={item[3]} aspect={item[4]} index={index} taskItems={usingThisTaskList} setTaskItems={setTaskItems} miniScreen={true} completedTask={completedTask} updateWellbeingRating={updateWellbeingRating}/> 
                    </View>
                    ) : null
                }/>
            </View>
            <TouchableOpacity style={styles.openButtonRow} onPress={() => navigation.navigate("ToDoScreen")}>
                <Text style={styles.openButtonText}>Open</Text> 
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        height: '100%',
        backgroundColor: 'white',
        alignItems: 'center',
    },
    headerText: {
        fontSize: SCREEN_HEIGHT/29,
        textAlign: 'center',
        fontWeight: '500',
    },
    todoListWrapper: {
        flex: 1,
        marginBottom: SCREEN_HEIGHT/80,
    },
    openButtonRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: '10%',
        width: '90%',
        borderRadius:100,
        marginBottom: SCREEN_HEIGHT/80,
        elevation: 5,
        backgroundColor: 'white',

    },
    openButtonText: {
        fontSize: SCREEN_HEIGHT/40,
        fontWeight: '600',
    },
});

export default MiniTodoList;