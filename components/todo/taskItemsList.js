import {useState} from 'react';

export let taskItemsSaved = [["Task 1", true, false, 3], ["Task 2", false, false, 2], ["Task 3", true, false, null], ["Test task", false, false, 1], ["Task x", true, false, 1.5], ["Task y", false, false, 0.5]]

export const TaskItemsList = () => {
    const [taskItems, setTaskItems] = useState(taskItemsSaved); // taskItems = [task (string), completed (boolean), selected for timetable generator (boolean), completion time]
    return {taskItems, setTaskItems};
}

export const updateTaskItems = (updatedList) => {
    taskItemsSaved = updatedList
    console.log('updated', taskItemsSaved)
}