import {useState} from 'react';

export const TaskItemsList = () => {
    const [taskItems, setTaskItems] = useState([["c", false, false, null], ["C3", false, false, 3], ['taskTest', false, false, 2.5], ["C3", false, false, null], [null, false, false, 1], ["C33c", false, false, null], ["C33cc3", false, false, null], ["C33cc3c3", false, false, 2]]); // taskItems = [task (string), completed (boolean), selected for timetable generator (boolean), completion time]
    return {taskItems, setTaskItems};
}