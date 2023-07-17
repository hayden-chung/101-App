export const addTask = (task, taskItems, setTaskItems, setTask) => { // add a new task to to-do list
    setTaskItems([...taskItems, task]); // assign taskItems with the pre-existing values in the array and the additional 'task'
    setTask([null, false]); // task = [null, false] (reasign task to default value)
    return { task: [null, false], taskItems: [...taskItems, task] }; // return values to update 
};

export const completedTask = (index) => {
    taskItems[index][1] =!taskItems[index][1];
    setTaskItems([...taskItems]);
    console.log(taskItems);
};

export const deleteTask = (index) => {
    taskItems.splice(index, 1);
    console.log('beforesplice', taskItems)
    setTaskItems([...taskItems]);
    console.log('afteersplice', taskItems);
};