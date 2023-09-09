import {useState} from 'react';

export let timetableSaved = [] 

export const getTimetable = () => {
    const [timetable, setTimetable] = useState(timetableSaved);
    return {timetable, setTimetable}
}

export const updateTimetable = (updatedTimetable) => {
    timetableSaved = updatedTimetable
    console.log('updated', timetableSaved)
}