import {setTaskItems, setTask, taskItems} from '../app/todo';

export const addTask = (task, setTaskItems, setTask) => {
    setTaskItems([...taskItems, task]);
    setTask([null, false]);
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