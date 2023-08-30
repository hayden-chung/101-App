import { fixedSessions } from "../settings/timetableSettingsData";

const makeSelectedTasksArr = (taskItems) => { // create a list of tasks that are selected. 
    selectedTasks = []; // Make an array that consists of selected items only. 
    for (let i=0; i < taskItems.length; i++) { // iterate for length of taskItems
        if (taskItems[i][2] === true) { // if task is seleceted to be included in the timetable generator
            let tempTaskItems = [...taskItems[i]] // temp var = task item (from list)
            tempTaskItems[3] *= 100 // the estimated time [3] has to be multiplied by 100 to convert it from a float to integer, so later it can be itearted. 
            selectedTasks.push(tempTaskItems) // add taskItem to selectedTasks list. 
        }
    }
    return selectedTasks
}

const subsetSum = (tasksToPutInTimetable, startAndEndTime) => { // 

    // Find available time --> Find target.
    startTime = new Date(startAndEndTime[0]).getTime();
    endTime = new Date(startAndEndTime[1]).getTime();
    availableTimeInMilliseconds = endTime - startTime;
    const availableHours = (availableTimeInMilliseconds/(1000*60*60)).toFixed(2); // convert milliseconds to hours. to 2 d.p.
    const target = Math.round(availableHours*100); // e.g.if available time = 6.5h, target = 650. This is so we can iterate over an integer value as float values don't allow iteration with for loops. Thus, also round to integer after calculation.  
    console.log('availableHours', availableHours)
    // Create array of booleans to find closest sum to target.  
    let dp = Array(target + 1); // dp (dynamic programming) = array
    for (let i = 0; i< dp.length; i++) { // fill with false values (for number of target + 1). 
        dp[i] = [false];
    }
    dp[0][0] = true;

    // Subset Sum Algorithm
    for (let num=0; num < tasksToPutInTimetable.length; num++) { // iterate for length of selectedTasks

        capacityOfCurrentTask = tasksToPutInTimetable[num][3]

        for (let i = target; i >= capacityOfCurrentTask; i--) { // repeat for amount of available time (e.g. idx 3 of ["Test task", false, true, 100])
            dp[i][0] = dp[i][0] // If dp[i][0] is true, set to true. dp[i][0] is so that on the next outer for loop with the next num, the true values won't be re-set to false. 
            
            if (dp[i-capacityOfCurrentTask][0]) { // # if current pos - amount of available time of task = true, (dp[i-selectedTasks[num][3]][0] is True), set to True.
                
                dp[i][0] = dp[i-capacityOfCurrentTask][0] // set dp[i][0] to true

                // to prevent more tasks being added than the target value. 
                sumOfTasks = 0
                lengthOfTasks = dp[i].slice(1).length
                for (let j = 0; j < lengthOfTasks; j++) { // add up the value of all  tasks currently added in that index 
                    sumOfTasks = sumOfTasks + dp[i][j+1][3]
                }

            
                if ((sumOfTasks + capacityOfCurrentTask) <= target){ // if sum of all tasks + new task is equal or less than target. 
                    dp[i].push(...dp[i-capacityOfCurrentTask].slice(1)); // add tasks required to make sum of i-selectedTasks[num][3]
                    dp[i].push(tasksToPutInTimetable[num]) // add task required to make sum of i.
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
    console.log(dp)
    return dp[closest_sum].slice(1) // extract the array starting from index 1 to the end. (e.g. [true, ["Task 1", true, true, 300], ["Task 2", false, true, 200]] --> ["Task 1", true, true, 300], ["Task 2", false, true, 200])
}

export const getSessions = () => { // get (available) session times apart from break times. 
    let fixedSessionsCopy = {...fixedSessions}
    let sessionsBetweenBreaks = []
    let breakOrder = []
    breaks = Object.keys(fixedSessionsCopy).filter(type => type !== 'start-finish')
    timetableStart = fixedSessionsCopy['start-finish'][0]
    timetableEnd = fixedSessionsCopy['start-finish'][1]

    if (breaks.length !== 0) { // Create a list of breaks in order from earliest to latest. run only if breaks exist 
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

        fixedBreakLength = breaks.length // create a copy to prevent bug as the length of breaks may change. 
        
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
    }
    else {
        sessionsBetweenBreaks.push([timetableStart, timetableEnd])
    }
    
    return [sessionsBetweenBreaks, breakOrder]
}



const insertSessions = (timetable, breakSession, usedTasks) => {
    timetable = timetable.concat(usedTasks) // combine 
    if (breakSession !== undefined) {
        timetable.push([breakSession, fixedSessions[breakSession]]) // add break session after the used tasks
    }
    console.log('timetable', timetable)
    return timetable
}

const eliminateTasks = (tasksToPutInTimetable, usedTasks) => { // Eliminate task that was included in timetable already. 
    let removeTasks = [...usedTasks]
    for (idx = 0; idx < removeTasks.length; idx++) {
        tasksToPutInTimetable = tasksToPutInTimetable.filter(task => task !== removeTasks[idx])
    }
    console.log('tasksToPutInTimetable', tasksToPutInTimetable)
    return tasksToPutInTimetable
}

export const GenerateTimetable = (taskItems, timetable) => {
    const [sessionsBetweenBreaks, breakOrder] = getSessions()
    // Generating Timetable
    tasksToPutInTimetable = makeSelectedTasksArr(taskItems)
    for (i = 0; i < sessionsBetweenBreaks.length; i++) {
        let usedTasks = subsetSum(tasksToPutInTimetable, sessionsBetweenBreaks[i]) // used tasks in available times (excluding breaks)
        timetable = insertSessions(timetable, breakOrder[i], usedTasks)            // 
        tasksToPutInTimetable = eliminateTasks(tasksToPutInTimetable, usedTasks)   // remaining tasks to put in available times. 
    }
    console.log('-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------')
    return timetable 
}
