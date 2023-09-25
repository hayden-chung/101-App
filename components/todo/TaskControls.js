import {updateTaskItems} from "./taskItemsList";

export const addTask = (task, taskItems, setTaskItems, setTask) => { // add a new task to to-do list
    taskItems.push(task);
    setTaskItems([...taskItems]); // assign taskItems with the pre-existing values in the array and the additional 'task'
    setTask([null, false, false, null, null]); // task = [null, false, false, null] (reasign task to default value)
    updateTaskItems(taskItems);
    return { task: [null, false, false, null, null], taskItems: taskItems }; // return values to update 
};

export const updateTask = (updatedTask, index, taskItems, setTaskItems) => {
    if (updatedTask !== null && updatedTask.trim() !== '') { 
        taskItems[index][0] = updatedTask
        setTaskItems([...taskItems]);
    }
};

export const completedTask = (index, taskItems, setTaskItems) => { // (To Do Screen) When task is pressed, 
    taskItems[index][1] =!taskItems[index][1]; // inverse the boolean state (if false --> true, if true --> false)
    setTaskItems([...taskItems]); // update the taskItems array 
    updateTaskItems(taskItems);
    return { taskItems: taskItems}; // return values to update
};

export const deleteTask = (index, taskItems, setTaskItems) => { //  delete a task from to-do list
    taskItems.splice(index, 1); // remove the task from the array (1 = number of items to remove)
    setTaskItems([...taskItems]); // update the taskItems array 
    updateTaskItems(taskItems);
    return { taskItems: taskItems}; // return values to update
};

export const selectedTask = (index, taskItems, setTaskItems, toggleAlarmMessage, isAlarmMessage) => { // (Timetable Generator) When task is pressed, 
    
    if (taskItems[index][3] !== null) {
        taskItems[index][2] =!taskItems[index][2]; // inverse the boolean state (if false --> true, if true --> false)
        setTaskItems([...taskItems]); // update the taskItems array 
    } else {
        toggleAlarmMessage(true); // set alarm message to asppear
    }
    return { taskItems: taskItems, toggleAlarmMessage: toggleAlarmMessage}; // return values to update
};

export const updateTag = (index, taskItems, setTaskItems, aspect) => { // Update new tag 
    let newTaskItems = taskItems
    newTaskItems[index][4] = aspect
    setTaskItems([...newTaskItems])
};

export const getAspectIndex = (index, taskItems) => { // get index number of wellbeing aspect
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