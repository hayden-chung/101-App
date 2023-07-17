import React, {useState} from 'react';
import { KeyboardAvoidingView, StyleSheet, Text, View, TextInput, TouchableOpacity, Keyboard, ScrollView} from 'react-native';
import colors from '../assets/colors';
import Task from '../components/task';
import {addTask} from '../components/TaskControls';

const ToDoScreen = () => { // when user clicks on todo button, navigate to this function

  const [task, setTask] = useState([null, false]); // useState is a hook that allows you to state variables in functional components. In this case: task = [null, false] (null = taskname, false = state of task completion)
  const [taskItems, setTaskItems] = useState([]); // taskItems = []
  console.log(task, taskItems, setTaskItems, setTask);

  const completedTask = (index) => { // when task is pressed, 
    taskItems[index][1] =!taskItems[index][1]; // inverse the boolean state (if false --> true, if true --> false)
    setTaskItems([...taskItems]); // update the task array 
    console.log(taskItems);
  }

  const deleteTask = (index) => {
    taskItems.splice(index, 1);
    console.log('beforesplice', taskItems)
    setTaskItems([...taskItems]);
    console.log('afteersplice', taskItems);
  }
  
  return (
    <View style={styles.container}> {/* container of screen */}
      <View style={styles.taskWrapper}> {/* */}
        <Text style={styles.taskTitle}>Today's Tasks</Text> {/* title of screen */}

        <ScrollView style={styles.taskItems}> {/* list of tasks (enable scrolling using ScrollView) */}
          {taskItems.map((item, index) => { {/* loop over the list of taksItems */}
            return ( 
              <TouchableOpacity key={index} onPress={() => completedTask(index)}> {/* if task is pressed change checkbox state */}
                <Task text={item} taskState={taskItems[index][1]} /> {/* display task. input parameters 'text' (task text) and 'taskState' (checkbox) */}
              </TouchableOpacity>
            )
          })}
        </ScrollView>

      </View>

      <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? "padding" : "height"}
      style={styles.writeTaskWrapper}
      >
        <TextInput style={styles.input} placeholder={'Write a Task'} value={task[0]} onChangeText={text => setTask([text, false])}/>

        <TouchableOpacity onPress={() => {const { task: updatedTask, taskItems: updatedTaskItems } = addTask(task, taskItems, setTaskItems, setTask)}}>
          <View style={styles.addWrapper}>
            <Text style={styles.addText}>+</Text>
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