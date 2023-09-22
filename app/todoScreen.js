import React, {useState} from 'react';
import { KeyboardAvoidingView, StyleSheet, Text, View, TextInput, TouchableOpacity, Dimensions, FlatList, Modal, ScrollView} from 'react-native';
import Task from '../components/todo/task';
import {addTask, completedTask, getAspectIndex} from '../components/todo/taskControls'; // import taskControl functions
import {TaskItemsList} from '../components/todo/taskItemsList';
import {updateTaskItems} from "../components/todo/taskItemsList";
import TabBar from '../components/tabBar';
import { Ionicons } from '@expo/vector-icons';
import {EditOrDeleteModal} from '../components/todo/editOrDeleteModal';
import {EditModal} from '../components/todo/editModal'
import {savedCalendarData, getCurrentDate} from '../components/wellbeing/calendar/calendarControls'

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = (Dimensions.get('window').height);

const ToDoScreen = ({navigation}) => { // when user clicks on todo button, navigate to this main function of the to-do screen

  const [task, setTask] = useState([null, false, false, null, null]); // useState is a hook that allows you to state variables in functional components. In this case: task = [task name, task completion state, task selected state in timetable generator, estimated completion time, aspect ] 
  const {taskItems, setTaskItems} = TaskItemsList(); // task list
  const [isEditOrDeleteModalVisible, setEditOrDeleteModalVisible] = useState(false);
  const [isEdit, setEdit] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);

  // Find number of uncompleted tasks
  let numberOfUncompletedTasks = 0 
  for (let i = 0; i < taskItems.length; i++) {
    if (taskItems[i][1] === false) {
      numberOfUncompletedTasks += 1
    }
  }

  const updateWellbeingRating = (index) => { // If task is tagged to an aspect, increase the aspect by 1 when task completed. 
    if (taskItems[index][4] !== null) {
      const currentDate = getCurrentDate()
      if (savedCalendarData[currentDate] === undefined) { // if data doesn't exist, make default data
        savedCalendarData[currentDate] = [1, 1, 1, 1, 1, 1]
      }
      const aspectIndex = getAspectIndex(index, taskItems)
      if (savedCalendarData[currentDate][aspectIndex] !== 10) {
        savedCalendarData[currentDate][aspectIndex] = savedCalendarData[currentDate][aspectIndex]+1
      }
    }
  };

  // Create a list with incomplete tasks first then complete tasks
  let orderedList = []

  for (let i = 0; i < taskItems.length; i++) { // incomplete tasks first 
    if (taskItems[i][1] === false) {
      orderedList.push(taskItems[i])
    }
  }
  for (let i = 0; i < taskItems.length; i++) { // complete tasks
    if (taskItems[i][1] === true) {
      orderedList.push(taskItems[i])
    }
  }
  
  return (
    <View style={styles.container}> 
      <View style={styles.wrapper}> 

        <View style={styles.headerRow}>
          {/* Back button */}
          <TouchableOpacity style={styles.goBackHomeButton} onPress={() => navigation.goBack()}>  
              <Ionicons name="chevron-back" size={SCREEN_HEIGHT/20} color="black"/>
          </TouchableOpacity>
          {/* TITLE of screen */}
          <Text style={styles.taskTitle}>To Do</Text> 
        </View>

        {/* Number of tasks remaining */}
        <Text style={styles.subHeaderNumberOfTasksText}>You have {numberOfUncompletedTasks} task(s) today</Text>

        {/* enable scrolling using ScrollView */}
        <View style={styles.taskItemsContainer}> 

          {/* To Do Tasks */}
          <FlatList   
            data = {orderedList} // Data being inputted for flatlist to access.
            showsVerticalScrollIndicator={false} // Hide scroll bar.
            renderItem={({item, index}) => 
              <TouchableOpacity                  // Task is responsive to touches
                activeOpacity={1}  
                onLongPress={() => {setEditOrDeleteModalVisible(true); setEditingIndex(index)}}
                > 
                {/* Task component displays task item. Parameters 'text' (task text) and 'taskState' (checkbox)*/}
                <Task item={item} text={item[0]} timetableGenerator={false} taskStatus={orderedList[index][1]} taskTime={orderedList[index][3]} aspect={orderedList[index][4]} index={index} taskItems={orderedList} setTaskItems={setTaskItems} completedTask={completedTask} updateWellbeingRating={updateWellbeingRating} /> 
              </TouchableOpacity> 
          }/>
        </View>

        {/* ADD TASK */}
        <KeyboardAvoidingView
        enabled={true}
        behavior={Platform.OS === 'ios' ? "padding" : "height"} // if phone plantform is iOS, use padding to push items, else add height. 
        style={styles.textInputRow}
        >
          {/* Text input box. placeholder = when box is empty. value = string value when enter button pressed. onChangeText = when textbox changes,   */}
          <TextInput style={styles.textInput} placeholder={'Write a Task'} value={task[0]} onChangeText={text => setTask([text, false, false, null, null])}/> 

          {/* ADD TASK BUTTON */}
          <TouchableOpacity onPress={() => {if (task[0] !== null) {if (task[0].trim() !== '') {addTask(task, taskItems, setTaskItems, setTask)}}}}>
            <View style={styles.addWrapper}>
              <Text style={styles.addButtonText}>+</Text> 
            </View>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </View>

      {/* Edit or Delete task modal */}
      <Modal
        transparent ={true} // covers screen completely but allows transparency in empty areas. 
        animationType='fade' // fade animation when appearing/disappearing.
        visible={isEditOrDeleteModalVisible} // modal is visible (true/false)
        onRequestClose={() => setEditOrDeleteModalVisible(false)}
      >
        <EditOrDeleteModal
            setEdit={setEdit}
            setEditOrDeleteModalVisible={setEditOrDeleteModalVisible}
            index={editingIndex}
            taskItems={taskItems}
            setTaskItems={setTaskItems}
        />
      </Modal>

      {/* Edit modal */}
      <Modal
        transparent ={true} // covers screen completely but allows transparency in empty areas. 
        animationType='fade' // fade animation when appearing/disappearing.
        visible={isEdit} // modal is visible (true/false)
        onRequestClose={() => setEdit(false)}
      >
        <EditModal
          setEdit={setEdit}
          index={editingIndex}
          taskItems={taskItems}
          setTaskItems={setTaskItems}
        />
      </Modal>
      <TabBar navigation={navigation}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { // whole screen
    flex: 1, 
    backgroundColor: '#E8EAED',
  },
  headerRow: {
    flexDirection: 'row',
  },
  wrapper: { // Wraps title ('Today's Tasks') and tasks. 
    flex: 1,
    marginTop: SCREEN_HEIGHT/20,
  },
  taskTitle: { // Style title 'Today's Tasks'
    fontSize: SCREEN_HEIGHT/22,
    fontWeight: '400',
    paddingHorizontal: SCREEN_WIDTH/30,
  },
  subHeaderNumberOfTasksText: {
    color: '#8C8C8C',
    fontSize: SCREEN_HEIGHT/40,
    paddingHorizontal: SCREEN_WIDTH/30,
  },
  taskItemsContainer: { // container of taskItems
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: SCREEN_HEIGHT/70,
  }, 
  textInputRow: { // Text input and add button. 
    flexDirection: 'row',
    justifyContent:'space-around',
    alignItems: 'center',
    marginBottom: SCREEN_HEIGHT/30,
  },
  textInput: { // Text input (for tasks)
    paddingHorizontal: 15, 
    height: SCREEN_HEIGHT/15,
    borderRadius: SCREEN_HEIGHT/80,
    width: SCREEN_WIDTH/1.48,
    elevation: 5,
    backgroundColor: '#FFF',
  },
  addWrapper: { // Add button
    height: SCREEN_HEIGHT/15,
    width: SCREEN_WIDTH/6,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100, // any high value i.e. >60 will create a circular shape.  
    elevation: 5,
  },
  addButtonText: {
    color: '#4B4B4B',
    fontSize: SCREEN_WIDTH/10,
    top: -SCREEN_HEIGHT/290,
  },
  navBar: {
    
  },
});

export default ToDoScreen;