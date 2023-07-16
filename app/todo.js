import React, {useState} from 'react';
import { KeyboardAvoidingView, StyleSheet, Text, View, TextInput, TouchableOpacity, Keyboard, ScrollView} from 'react-native';
import colors from '../assets/colors';
import Task from '../components/task';

const ToDoScreen = () => {

  const [task, setTask] = useState([null, false]);
  const [taskItems, setTaskItems] = useState([]);

  const addTask = () => {
    //Keyboard.dismiss();
    console.log(task)
    setTaskItems([...taskItems, task]);
    setTask([null, false]);
    console.log(taskItems)
    console.log([...taskItems])
  }

  const completedTask = (index) => {
    taskItems[index][1] =!taskItems[index][1];
    setTaskItems([...taskItems]);
    console.log(taskItems);
  }

  const deleteTask = (index) => {
    taskItems.splice(index, 1);
    console.log('beforesplice', taskItems)
    setTaskItems([...taskItems]);
    console.log('afteersplice', taskItems);
  }
  
  return (
    <View style={styles.container}>
      <View style={styles.taskWrapper}>
        <Text style={styles.taskTitle}>Today's Tasks</Text>

        <ScrollView style={styles.items}>
          {taskItems.map((item, index) => { 
            return (
              <TouchableOpacity key={index} onPress={() => completedTask(index)}>
                <Task text={item} taskState={taskItems[index][1]} />
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

        <TouchableOpacity onPress={() => addTask()}>
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
  items: {
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