
// key-value array with break sessions + start/finish time of timetable
currentTime = new Date() 
console.log('currentTime', currentTime)
nextTime = new Date()
nextTime = new Date(nextTime.setHours(currentTime.getHours() + 4))
console.log('nextTime', nextTime)
differenceInTime = nextTime-currentTime
console.log('SET TIME: ', currentTime, 'next time', nextTime) 
console.log('differenceInTime', differenceInTime)
export const fixedSessions = {"start-finish": [currentTime, nextTime]}


export const updateFixedSessions = (key, index, value) => { // function to update fixed session array. 
    fixedSessions[key][index] = value; // create a new (or not) 
    console.log('after', fixedSessions)
}
