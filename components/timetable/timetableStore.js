import {useState} from 'react';

export let timetableSaved = [] // array for stored timetable

export const getTimetable = () => { // use this function to call stored timetable
    const [timetable, setTimetable] = useState(timetableSaved);
    return {timetable, setTimetable}
}

export const updateTimetable = (updatedTimetable) => { // update timetable to store 
    timetableSaved = updatedTimetable
}