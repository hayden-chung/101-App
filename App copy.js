import React, {useState} from 'react';
import { KeyboardAvoidingView, StyleSheet, Text, View, TextInput, TouchableOpacity, Keyboard, ScrollView} from 'react-native';

import colors from './assets/colors';
import Task from './components/task';

export default function App() {

  const [task, setTask] = useState();
  const [taskItems, setTaskItems] = useState([]);

  const handleAddTask = () => {
    //Keyboard.dismiss();
    console.log(task)
    setTaskItems([...taskItems, task]);
    setTask(null);
    console.log([...taskItems])
  }

  const completedTask = (index) => {
    // console.log('taskitems', taskItems, [...taskItems])
    //let itemsCopy = [...taskItems];
    //console.log('step 1 (before splice):', itemsCopy)
    //itemsCopy.splice(index, 1);
    //console.log('step 2 (after splice):', itemsCopy)
    //setTaskItems(itemsCopy);

    // taskItems.splice(index, 1);
    // console.log('beforesplice', taskItems)
    // setTaskItems([...taskItems]);
    // console.log('afteersplice', taskItems);

    taskItems[index][1] = ![1];
    console.log(taskItems);
  }

  return (
    <View style={styles.container}>

      <View style={styles.taskWrapper}>
        <Text style={styles.taskTitle}>Today's Tasks</Text>

        <ScrollView style={styles.items}>
          {taskItems.map((item, index) => { 
            return (
              <TouchableOpacity key={index} onPress={() => completedTask(index)}>
                <Task text={item} />
              </TouchableOpacity>
            )
          
          })}
        </ScrollView>

      </View>

      <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? "padding" : "height"}
      style={styles.writeTaskWrapper}
      >
        <TextInput style={styles.input} placeholder={'Write a Task'} value={task} onChangeText={text => setTask(text)}/>

        <TouchableOpacity onPress={() => handleAddTask()}>
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
