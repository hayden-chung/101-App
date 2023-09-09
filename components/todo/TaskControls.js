
export const addTask = (task, taskItems, setTaskItems, setTask) => { // add a new task to to-do list
    taskItems.push(task);
    setTaskItems([...taskItems]); // assign taskItems with the pre-existing values in the array and the additional 'task'
    setTask([null, false, false, null]); // task = [null, false, false, null] (reasign task to default value)
    return { task: [null, false, false, null], taskItems: [...taskItems, task] }; // return values to update 
};

export const completedTask = (index, taskItems, setTaskItems) => { // (To Do Screen) When task is pressed, 
    taskItems[index][1] =!taskItems[index][1]; // inverse the boolean state (if false --> true, if true --> false)
    setTaskItems([...taskItems]); // update the taskItems array 
    return { taskItems: taskItems}; // return values to update
};

export const deleteTask = (index, taskItems, setTaskItems) => { //  delete a task from to-do list
    taskItems.splice(index, 1); // remove the task from the array (1 = number of items to remove)
    setTaskItems([...taskItems]); // update the taskItems array 
    return { taskItems: taskItems}; // return values to update
};

export const selectedTask = (index, taskItems, setTaskItems, toggleAlarmMessage, isAlarmMessage) => { // (Timetable Generator) When task is pressed, 
    
    if (taskItems[index][3] !== null) {
        taskItems[index][2] =!taskItems[index][2]; // inverse the boolean state (if false --> true, if true --> false)
        setTaskItems([...taskItems]); // update the taskItems array 
    } else {
        toggleAlarmMessage(true); // set alarm message to asppear
        console.log('cannot select')
    }
    
    return { taskItems: taskItems, toggleAlarmMessage: toggleAlarmMessage}; // return values to update
};