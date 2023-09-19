import React, {useState} from 'react';
import { KeyboardAvoidingView, StyleSheet, Text, View, TextInput, TouchableOpacity, Dimensions, FlatList, Modal, ScrollView} from 'react-native';
import Task from '../components/todo/task';
import {addTask, completedTask, deleteTask} from '../components/todo/taskControls'; // import taskControl functions
import {TaskItemsList} from '../components/todo/taskItemsList';
import {updateTaskItems} from "../components/todo/taskItemsList";
import TabBar from '../components/tabBar';
import {EditOrDeleteModal} from '../components/todo/editOrDeleteModal';
import {EditModal} from '../components/todo/editModal'
import {savedCalendarData} from '../components/wellbeing/calendar/calendarControls'
import {getCurrentDate} from '../components/wellbeing/calendar/calendarControls'

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = (Dimensions.get('window').height);

const ToDoScreen = ({navigation}) => { // when user clicks on todo button, navigate to this main function of the to-do screen

  const [task, setTask] = useState([null, false, false, null, null]); // useState is a hook that allows you to state variables in functional components. In this case: task = [task name, task completion state, task selected state in timetable generator, estimated completion time, aspect ] 
  const {taskItems, setTaskItems} = TaskItemsList(); // task list
  console.log('in screen', task)
  const [isEditOrDeleteModalVisible, setEditOrDeleteModalVisible] = useState(false);
  const [isEdit, setEdit] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);

  const updateTaskList = () => { // Update task list with a 10ms delay to ensure the updated taskItems is inputted. 
    setTimeout(() => {
      updateTaskItems(taskItems)
    }, 10);
  };

  const getAspectIndex = (index) => {
    if (taskItems[index][4] === 'work') {
      return 0
    }
    else if (taskItems[index][4] === 'exercise&nutrition') {
      return 1
    }
    else if (taskItems[index][4] === 'relaxation') {
      return 2
    }
    else if (taskItems[index][4] === 'relationships') {
      return 3
    }
    else if (taskItems[index][4] === 'sleep') {
      return 4
    }
    else if (taskItems[index][4] === 'personaldevelopment') {
      return 5
    }
  }

  const updateWellbeingRating = (index) => { // If task is tagged to an aspect, increase the aspect by 1 when task completed. 
    if (taskItems[index][4] !== null) {
      const currentDate = getCurrentDate()
      if (savedCalendarData[currentDate] === undefined) {
        savedCalendarData[currentDate] = [1, 1, 1, 1, 1, 1]
      }
      const aspectIndex = getAspectIndex(index)
      savedCalendarData[currentDate][aspectIndex] = savedCalendarData[currentDate][aspectIndex]+1
    }
  };
  console.log('task added,', task)

  return (
    <View style={styles.container}> 
      <View style={styles.wrapper}> 

        {/* TITLE of screen */}
        <Text style={styles.taskTitle}>Today's Tasks</Text> 

        {/* enable scrolling using ScrollView */}
        <View style={styles.taskItemsContainer}> 

          {/* iterate over taskItems to display task items */}
          <FlatList   
            data = {taskItems} // Data being inputted for flatlist to access.
            showsVerticalScrollIndicator={false} // Hide scroll bar.
            renderItem={({item, index}) =>       // Item and index no. of task in array. 
              taskItems[index][1] === false ? (
              <TouchableOpacity                  // Task is responsive to touches
                onPress={() => {completedTask(index, taskItems, setTaskItems); updateWellbeingRating(index); updateTaskList()}} // when quote pressed, change completed state (compelted/not completed)
                onLongPress={() => {setEditOrDeleteModalVisible(true); setEditingIndex(index)}}
                > 
                {/* Task component displays task item. Parameters 'text' (task text) and 'taskState' (checkbox)*/}
                <Task text={item[0]} timetableGenerator={false} taskStatus={taskItems[index][1]} taskTime={taskItems[index][3]} aspect={taskItems[index][4]} index={index} taskItems={taskItems} setTaskItems={setTaskItems}/> 
              </TouchableOpacity>
              ) : null
          }/>
        </View>
        
        {/* Complete Tasks */}
        <View style={styles.completedtaskItemsContainer}>
          <Text style={styles.completedText}>Completed</Text>
          {/* iterate over taskItems array */}
          <FlatList   
            data = {taskItems}                   // Data being inputted for flatlist to access.
            showsVerticalScrollIndicator={false} // Hide scroll bar.
            renderItem={({item, index}) =>       // Item and index no. of task in array. 
              taskItems[index][1] === true ? (
              <TouchableOpacity                  // Task is responsive to touches
                onPress={() => {completedTask(index, taskItems, setTaskItems); updateTaskList()}} // when quote pressed, change completed state (compelted/not completed)
                onLongPress={() => {setEditOrDeleteModalVisible(true); setEditingIndex(index)}}
                > 
                {/* Task component displays task item. Parameters 'text' (task text) and 'taskState' (checkbox)*/}
                <Task text={item[0]} timetableGenerator={false} taskStatus={taskItems[index][1]} taskTime={taskItems[index][3]} aspect={taskItems[index][4]} index={index} taskItems={taskItems} setTaskItems={setTaskItems}/> 
              </TouchableOpacity>
              ) : null
          }/>
        </View>
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
              updateTaskList={updateTaskList}
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
            updateTaskList={updateTaskList}
          />
        </Modal>
      
      {/* ADD TASK */}
      <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? "padding" : "height"} // if phone plantform is iOS, use padding to push items, else add height. 
      style={styles.textInputWrapper}
      >
        {/* Text input box. placeholder = when box is empty. value = string value when enter button pressed. onChangeText = when textbox changes,   */}
        <TextInput style={styles.textInput} placeholder={'Write a Task'} value={task[0]} onChangeText={text => setTask([text, false, false, null, null])}/> 

        {/* ADD TASK BUTTON */}
        <TouchableOpacity onPress={() => {if (task[0] !== null) {if (task[0].trim() !== '') {addTask(task, taskItems, setTaskItems, setTask); updateTaskList()}}}}>
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
    paddingTop: SCREEN_HEIGHT/80,
    paddingHorizontal: 20,
  },
  taskTitle: { // Style title 'Today's Tasks'
    fontWeight: 'bold',
    fontSize: 24,
  },
  taskItemsContainer: { // container of taskItems
    height: SCREEN_HEIGHT/2.5,
    marginTop: 20,
  }, 
  completedtaskItemsContainer: {
    height: SCREEN_HEIGHT/2.5,
  },
  completedText: {
    fontSize: SCREEN_HEIGHT/40,
    fontWeight: '500',
    marginBottom: SCREEN_HEIGHT/70,
  },
  textInputWrapper: { // Text input and add button. 
    flex: 1,
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