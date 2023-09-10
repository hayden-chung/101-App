import React, {useState} from 'react';
import { KeyboardAvoidingView, StyleSheet, Text, View, TextInput, TouchableOpacity, Dimensions, FlatList} from 'react-native';
import Task from '../components/todo/task';
import {addTask, completedTask, deleteTask} from '../components/todo/taskControls'; // import taskControl functions
import {TaskItemsList} from '../components/todo/taskItemsList';
import {updateTaskItems} from "../components/todo/taskItemsList";
import TabBar from '../components/tabBar';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = (Dimensions.get('window').height);

const ToDoScreen = ({navigation}) => { // when user clicks on todo button, navigate to this main function of the to-do screen

  const [task, setTask] = useState([null, false, false, null]); // useState is a hook that allows you to state variables in functional components. In this case: task = [task name, task completion state, task selected state in timetable generator, estimated completion time ] 
  const {taskItems, setTaskItems} = TaskItemsList(); // task list

  const updateTaskList = () => {
 
    setTimeout(() => {
      updateTaskItems(taskItems)
    }, 10);
    console.log('taskItems', taskItems)
    console.log(task)

    
  }

  return (
    <View style={styles.container}> 
      <View style={styles.wrapper}> 

        {/* TITLE of screen */}
        <Text style={styles.taskTitle}>Today's Tasks</Text> 

        {/* enable scrolling using ScrollView */}
        <View style={styles.taskItemsContainer}> 

          {/* iterate over taskItems array using map() function */}
          <FlatList   
            data = {taskItems}                   // Data being inputted for flatlist to access.
            showsVerticalScrollIndicator={false} // Hide scroll bar.
            renderItem={({item, index}) =>       // Item and index no. of task in array. 
              <TouchableOpacity                  // Task is responsive to touches
                onPress={() => {completedTask(index, taskItems, setTaskItems); updateTaskList()}} // when quote pressed, change completed state (compelted/not completed)
                onLongPress={() => {deleteTask(index, taskItems, setTaskItems); updateTaskList()}}
                > 
                {/* Task component displays task item. Parameters 'text' (task text) and 'taskState' (checkbox)*/}
                <Task text={item[0]} timetableGenerator={false} taskStatus={taskItems[index][1]} taskTime={taskItems[index][3]} /> 
              </TouchableOpacity>
          }/>
        </View>

      </View>
      
      {/* Prevent task box and add button from hiding when keyboard appears */}
      <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? "padding" : "height"} // if phone plantform is iOS, use padding to push items, else add height. 
      style={styles.textInputWrapper}
      >
        {/* Text input box. placeholder = when box is empty. value = string value when enter button pressed. onChangeText = when textbox changes,   */}
        <TextInput style={styles.textInput} placeholder={'Write a Task'} value={task[0]} onChangeText={text => setTask([text, false, false, null])}/> 

        {/* Touchable opacity to add task */}
        <TouchableOpacity onPress={() => {addTask(task, taskItems, setTaskItems, setTask); updateTaskList()}}>
          
          {/* ADD BUTTON */}
          <View style={styles.addWrapper}>
            <Text style={styles.addButtonText}>+</Text>
          </View>
        </TouchableOpacity>
      </KeyboardAvoidingView>

      <View style={styles.pushToBottom}></View>
      <TabBar navigation={navigation}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { // whole screen
    flex: 1, 
    backgroundColor: '#E8EAED',
  },
  wrapper: { // Wraps title ('Today's Tasks') and tasks. 
    height: SCREEN_HEIGHT/1.3,
    paddingTop: SCREEN_HEIGHT/20,
    paddingHorizontal: 20,
  },
  taskTitle: { // Style title 'Today's Tasks'
    fontWeight: 'bold',
    fontSize: 24,
  },
  taskItemsContainer: { // container of taskItems
    marginTop: 20,
    marginBottom: SCREEN_HEIGHT/20,
  }, 
  textInputWrapper: { // Text input and add button. 
    width: '100%',
    flexDirection: 'row',
    justifyContent:'space-around',
    alignItems: 'center',
  },
  textInput: { // Text input (for tasks)
    paddingVertical: 15, 
    paddingHorizontal: 15,
    backgroundColor: '#FFF',
    borderRadius: 60,
    borderColor: '#C0C0C0',
    borderWidth: 1,
    width: 250,
  },
  addWrapper: { // Add button
    height: SCREEN_WIDTH/6, 
    width: SCREEN_WIDTH/6,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'black',
    borderWidth: SCREEN_WIDTH/90,
    borderRadius: 100, // any high value i.e. >60 will create a circular shape.  
  },
  addButtonText: {
    fontSize: SCREEN_WIDTH/10
  },
  pushToBottom: {
    flex: 1,    
  },
});

export default ToDoScreen;