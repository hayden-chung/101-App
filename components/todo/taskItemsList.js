import {useState} from 'react';

export const TaskItemsList = () => {
    const [taskItems, setTaskItems] = useState([["Ec", false, false], ["C3", false, false], [null, false, false], ["C3", false, false], [null, false, false], ["C33c", false, false], ["C33cc3", false, false], ["C33cc3c3", false, false]]); // taskItems = [task (string), completed (boolean), selected for timetable generator (boolean)]
    return {taskItems, setTaskItems};
}