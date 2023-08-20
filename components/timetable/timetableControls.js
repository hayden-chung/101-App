import { useInsertionEffect } from "react";
import { fixedSessions } from "./settings/timetableSettingsData";
import { selectedTask } from "../todo/taskControls";

const makeSelectedTasksArr = (taskItems) => {
    // Make an array that consists of selected items only. 
    selectedTasks = [];
    console.log('selected tasks', selectedTasks);
    console.log('taskItems', taskItems)
    for (let i=0; i < taskItems.length; i++) {
        if (taskItems[i][2] === true) {
            let tempTaskItems = [...taskItems[i]]
            tempTaskItems[3] *= 100
            // console.log('temptaskItems', tempTaskItems)
            selectedTasks.push(tempTaskItems)
        }
    }
    return selectedTasks
}

// start/finish time = [2023-08-19T03:30:03.795Z, 2023-08-19T09:30:03.803Z]
export const subsetSum = (selectedTasks, startAndEndTime) => {

    // Find available time --> Find target.
    const startTime = new Date(startAndEndTime[0]);
    const endTime = new Date(startAndEndTime[1]);
    const availableTimeInMilliseconds = endTime - startTime; 
    const availableHours = (availableTimeInMilliseconds/(1000*60*60)).toFixed(2); // convert milliseconds to hours. to 2 d.p.
    const target = availableHours*100; // e.g.if available time = 6.5h, target = 650. This is so we can iterate over an integer value as float values don't allow iteration with for loops. 
    
    // Create array of booleans to find closest sum to target. 
    let dp = Array(target + 1); // dp (dynamic programming) = array
    for (let i = 0; i< dp.length; i++) { // fill with false values (for number of target + 1). 
        dp[i] = [false];
    }
    dp[0][0] = true;

    // Subset Sum Algorithm
    for (let num=0; num < selectedTasks.length; num++) { // iterate for length of selectedTasks/
        for (let i = target; i >= selectedTasks[num][3]; i--) { // 

            dp[i][0] = dp[i][0] // If dp[i][0] is true, set to true. dp[i][0] is so that on the next outer for loop with the next num, the true values won't be re-set to false. 
            
            if (dp[i-selectedTasks[num][3]][0]) { // # if dp[i-selectedTasks[num][3]][0] is True, set to True.
                
                dp[i][0] = dp[i-selectedTasks[num][3]][0] // set dp[i][0] to true

                // to prevent overlaps 
                sumOfTasks = 0
                lengthOfTasks = dp[i].slice(1).length
                console.log('lengthof Tasks',  lengthOfTasks)
                for (let j = 0; j < lengthOfTasks; j++) {
                    sumOfTasks = sumOfTasks + dp[i][j+1][3]
                }
                
                if (sumOfTasks !== target){
                    dp[i].push(...dp[i-selectedTasks[num][3]].slice(1)); // add tasks required to make sum of i-selectedTasks[num][3]
                    dp[i].push(selectedTasks[num]) // add task required to make sum of i.
                }

            }

        }
    }

    // Find the closest sum
    let closest_sum = 0
    for (let i = target; i > -1; i--) {
        if (dp[i][0]) {
            closest_sum = i
            break;
        }
    }
    // console.log('closest sum', closest_sum)

    // console.log(dp)
    return dp[closest_sum].slice(1)
}

const getSessions = () => {
    let fixedSessionsCopy = {...fixedSessions}
    let sessionsBetweenBreaks = []
    let breakOrder = []
    breaks = Object.keys(fixedSessions).filter(type => type !== 'start-finish')

    timetableStart = fixedSessionsCopy['start-finish'][0]
    timetableEnd = fixedSessionsCopy['start-finish'][1]

    // Find earliest break start
    let earliestNextBreakStart = breaks[0] // 
    for (i = 0; i < breaks.length; i++) {
        if (fixedSessionsCopy[breaks[i]][0] < fixedSessionsCopy[earliestNextBreakStart][0]) {
            earliestNextBreakStart = breaks[i] // first break (earliest break out of breaks) that the productive session will end at to have a break. 
        }
    }

    breakOrder.push(earliestNextBreakStart)
    sessionsBetweenBreaks.push([timetableStart, fixedSessionsCopy[earliestNextBreakStart][0]])

    // remove already-occupied break session from list. 
    breaks = breaks.filter(type => type !== earliestNextBreakStart)

    // earliestNextBreakStart 
    currentStartTime = fixedSessionsCopy[earliestNextBreakStart][1]

    fixedBreakLength = breaks.length // prevent bug as the length of breaks may change. 
    
    for (i = 0; i < fixedBreakLength; i++) {
        earliestNextBreakStart = breaks[0]
        for (j = 0; j < breaks.length; j++) {
            if (fixedSessionsCopy[breaks[j]][0] < fixedSessionsCopy[earliestNextBreakStart][0]) {
                earliestNextBreakStart = breaks[j]
            }
        }
        breakOrder.push(earliestNextBreakStart)
        sessionsBetweenBreaks.push([currentStartTime, fixedSessionsCopy[earliestNextBreakStart][0]])
        currentStartTime = fixedSessionsCopy[earliestNextBreakStart][1]
        breaks = breaks.filter(type => type !== earliestNextBreakStart)
    }

    sessionsBetweenBreaks.push([fixedSessionsCopy[earliestNextBreakStart][1], timetableEnd])
    console.log('Final sessionsBetweenBreaks', sessionsBetweenBreaks)
    return [sessionsBetweenBreaks, breakOrder]
}



const insertSessions = (timetable, breakSession, usedTasks) => {
    console.log('breakSession', breakSession, 'timetable:', timetable, 'used tasks', usedTasks)
    timetable = timetable.concat(usedTasks)
    console.log('timetable after concat', timetable)
    if (breakSession !== undefined) {
        timetable.push([breakSession, fixedSessions[breakSession]])
    }
    console.log('timetable after', timetable)
    return timetable
}

const eliminateTasks = (selectedTasks, usedTasks) => {
    let removeTasks = [...usedTasks]
    for (idx = 0; idx < removeTasks.length; idx++) {
        selectedTasks = selectedTasks.filter(task => task !== removeTasks[idx])
    }
    return selectedTasks
}

export const GenerateTimetable = (taskItems, timetable) => {

    const [sessionsBetweenBreaks, breakOrder] = getSessions()

    // Generating Timetable
    selectedTasks = makeSelectedTasksArr(taskItems)

    for (i = 0; i < sessionsBetweenBreaks.length; i++) {
        let usedTasks = subsetSum(selectedTasks, sessionsBetweenBreaks[i])
        timetable = insertSessions(timetable, breakOrder[i], usedTasks)
        selectedTasks = eliminateTasks(selectedTasks, usedTasks)
    }
    console.log('final timetable', timetable)
    return timetable 
}
