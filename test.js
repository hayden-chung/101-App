import {useState, useEffect} from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';
import {TaskItemsList} from './components/todo/taskItemsList';

const testAlgorithm = (timetableItems) => {
    const dp = new Array(4).fill(false) // fill array with a length of () with 'false'
    console.log('timemetableItems Function:', dp)
}


const GenerateTimetable = () => {
    const {taskItems, setTaskItems} = TaskItemsList();
    console.log("----------------------------------------------------------------")
    console.log('taskItems', taskItems)
    const [timetableItems, setTimetableItems] = useState([])

    useEffect(() => { // useEffect allows tasks to be managed as a side effect without causing issues by interfering with the main process. This prevents an 'infinite loop' error for re-rendering. 
        const tempTimetableItems = taskItems
            .filter(taskItem => taskItem[3] !== null) // .filter() is used in js to create a new array with items that pass a condition (such as not being null) while iterating through taskItems. 
        setTimetableItems(tempTimetableItems)
    }, [taskItems]) // [taskItems] is the dependency array, meaning everytime this changes, this effect will run.
    
    return (
        <View style={styles.container}>
            <Text>{timetableItems}</Text>
            <Button title='Test Button' onPress={() => testAlgorithm(timetableItems)}/> 
        </View>
    )
}


const styles = StyleSheet.create({
    container: { // screen container
        paddingTop: 100, 
    },
  });

export default GenerateTimetable;