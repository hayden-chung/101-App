import {useState} from 'react';

export let taskItemsSaved = [["Task 1", true, false, 3, null], ["Task 2", false, false, 2, null], ["Task 3", true, false, null, null], ["Test task", false, false, 1, null], ["Task x", true, false, 1.5, null], ["Task y", false, false, 0.5, null]]

export const TaskItemsList = () => {
    const [taskItems, setTaskItems] = useState(taskItemsSaved); // taskItems = [task (string), completed (boolean), selected for timetable generator (boolean), completion time, aspect]
    return {taskItems, setTaskItems};
}

export const updateTaskItems = (updatedList) => {
    taskItemsSaved = updatedList
    console.log('updated', taskItemsSaved)
}