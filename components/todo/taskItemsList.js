import {useState} from 'react';

export let taskItemsSaved = [["Mark this task complete", false, false, 3, null]]

export const TaskItemsList = (state) => { // use this funciton to call current list of tasks
    const [taskItems, setTaskItems] = useState(taskItemsSaved); // taskItems = [task (string), completed (boolean), selected for timetable generator (boolean), completion time, aspect]
    if (state) {
        console.log('re-initialied', new Date(), taskItemsSaved)
    }
    return {taskItems, setTaskItems};
}

export const updateTaskItems = (updatedList) => { // update stored task list
    taskItemsSaved = updatedList
}