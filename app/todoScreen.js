import React, {useState} from 'react';
import { KeyboardAvoidingView, StyleSheet, Text, View, TextInput, TouchableOpacity, Keyboard, ScrollView, FlatList} from 'react-native';
import colors from '../assets/colors';
import Task from '../components/todo/task';
import {addTask, completedTask, deleteTask} from '../components/todo/taskControls'; // import taskControl functions
import {TaskItemsList} from '../components/todo/taskItemsList';

const ToDoScreen = () => { // when user clicks on todo button, navigate to this main function of the to-do screen

  const [task, setTask] = useState([null, false, false, null]); // useState is a hook that allows you to state variables in functional components. In this case: task = [task name, task completion state, task selected state in timetable generator, estimated completion time ] 
  const {taskItems, setTaskItems} = TaskItemsList();
  console.log(taskItems);

  return (
    <View style={styles.container}> 
      <View style={styles.taskWrapper}> 

        {/* TITLE of screen */}
        <Text style={styles.taskTitle}>Today's Tasks</Text> 

        {/* enable scrolling using ScrollView */}
        <View style={styles.taskItems}> 

          {/* iterate over taskItems array using map() function */}
          <FlatList   
            data = {taskItems}                   // Data being inputted for flatlist to access.
            showsVerticalScrollIndicator={false} // Hide scroll bar.
            renderItem={({item, index}) =>       // Item and index no. of task in array. 
              <TouchableOpacity                  // Task is responsive to touches
                onPress={() => completedTask(index, taskItems, setTaskItems)} // when quote pressed, change completed state (compelted/not completed)
                onLongPress={() => deleteTask(index, taskItems, setTaskItems)}
                > 
                {/* Task component displays task item. Parameters 'text' (task text) and 'taskState' (checkbox)*/}
                <Task text={item[0]} timetableGenerator={false} taskStatus={taskItems[index][1]} taskTime={taskItems[index][3]} /> 
              </TouchableOpacity>
          }/>
        </View>

      </View>
      
      {/* prevent task box and add button from hiding when keyboard appears */}
      <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? "padding" : "height"} // if phone plantform is iOS, use padding to push items, else add height. 
      style={styles.writeTaskWrapper}
      >
        {/* text input box. placeholder = when box is empty. value = string value when enter button pressed. onChangeText = when textbox changes,   */}
        <TextInput style={styles.input} placeholder={'Write a Task'} value={task[0]} onChangeText={text => setTask([text, false, false, null])}/> 

        {/* Touchable opacity to add task */}
        <TouchableOpacity onPress={() => {const { task: updatedTask, taskItems: updatedTaskItems } = addTask(task, taskItems, setTaskItems, setTask)}}>
          {/* ADD BUTTON */}
          <View style={styles.addWrapper}>
            <Text>+</Text>
          </View>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    backgroundColor: colors.background,
  },
  taskWrapper: {
    paddingTop: 80,
    paddingHorizontal: 20,
  },
  taskTitle: {
    fontWeight: 'bold',
    fontSize: 24,
  },
  taskItems: {
    marginTop: 20,
    marginBottom: 150,
  }, 
  writeTaskWrapper: {
    position: 'absolute',
    bottom: 30,
    width: '100%',
    flexDirection: 'row',
    justifyContent:'space-around',
    alignItems: 'center',
  },
  input: {
    paddingVertical: 15, 
    paddingHorizontal: 15,
    backgroundColor: '#FFF',
    borderRadius: 60,
    borderColor: '#C0C0C0',
    borderWidth: 1,
    width: 250,
  },
  addWrapper: {
    height: 60, 
    width: 60,
    backgroundColor: '#FFF',
    borderRadius: 60, 
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#C0C0C0',
    borderWidth: 1,
  },
});

export default ToDoScreen;