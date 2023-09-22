
export const fixedSessions = {"start-finish": [new Date('2023-08-22T03:30:13.289Z'), new Date('2023-08-22T11:30:13.294Z')]} // stored fixed sessions (from timetable settings)

export const updateFixedSessions = (key, index, value) => { // function to update fixed session array. 
    fixedSessions[key][index] = value; // create a new (or not) 
}
