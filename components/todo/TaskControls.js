export const addTask = (task, taskItems, setTaskItems, setTask) => { // add a new task to to-do list
    setTaskItems([...taskItems, task]); // assign taskItems with the pre-existing values in the array and the additional 'task'
    setTask([null, false, false]); // task = [null, false] (reasign task to default value)
    return { task: [null, false, false], taskItems: [...taskItems, task] }; // return values to update 
};

export const completedTask = (index, taskItems, setTaskItems) => { // when task is pressed, 
    taskItems[index][1] =!taskItems[index][1]; // inverse the boolean state (if false --> true, if true --> false)
    setTaskItems([...taskItems]); // update the taskItems array 
    return { taskItems: taskItems}; // return values to update
};

export const deleteTask = (index, taskItems, setTaskItems) => { //  delete a task from to-do list
    taskItems.splice(index, 1); // remove the task from the array (1 = number of items to remove)
    setTaskItems([...taskItems]); // update the taskItems array 
    return { taskItems: taskItems}; // return values to update
};

export const selectedTask = (index, taskItems, setTaskItems) => { // when task is pressed, 
    taskItems[index][2] =!taskItems[index][2]; // inverse the boolean state (if false --> true, if true --> false)
    setTaskItems([...taskItems]); // update the taskItems array 
    return { taskItems: taskItems}; // return values to update
};