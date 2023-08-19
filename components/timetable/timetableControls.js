import { fixedSessions } from "./settings/timetableSettingsData";


export const toggleCheckbox = (isBreakChecked, setBreakChecked) => {
    isBreakChecked = !isBreakChecked;
    console.log(isBreakChecked);
    setBreakChecked(isBreakChecked);
}

taskItems = [["Task 1", true, true, 3], ["Task 2", false, true, 2], ["Task 3", true, false, null], ["Test task", false, true, 1], ["Task x", true, true, 1.5], ["Task y", false, false, 0.5]]

// start/finish time = [2023-08-19T03:30:03.795Z, 2023-08-19T09:30:03.803Z]
export const GenerateTimetable = () => {

    // Find available time --> Find target.
    const startTime = new Date(fixedSessions['start-finish'][0]);
    const endTime = new Date(fixedSessions['start-finish'][1]);
    const availableTimeInMilliseconds = endTime - startTime; 
    const availableHours = (availableTimeInMilliseconds/(1000*60*60)).toFixed(2); // convert milliseconds to hours. to 2 d.p.
    const target = availableHours*100; // e.g.if available time = 6.5h, target = 650. This is so we can iterate over an integer value as float values don't allow iteration with for loops. 
    
    // Create array of booleans to find closest sum to target. 
    let dp = Array(target + 1); // dp (dynamic programming) = array
    for (let i = 0; i< dp.length; i++) { // fill with false values (for number of target + 1). 
        dp[i] = [false];
    }
    dp[0][0] = true;

    // Make an array that consists of selected items only. 
    selectedTasks = [];
    console.log(selectedTasks)
    console.log('taskItems', taskItems)
    for (let i=0; i < taskItems.length; i++) {
        if (taskItems[i][2] === true) {
            let tempTaskItems = [...taskItems[i]]
            tempTaskItems[3] *= 100
            // console.log('temptaskItems', tempTaskItems)
            selectedTasks.push(tempTaskItems)
        }
    }

    // Subset Sum Algorithm
    for (let num=0; num < selectedTasks.length; num++) { // iterate for length of selectedTasks/
        for (let i = target; i >= selectedTasks[num][3]; i--) { // 

            dp[i][0] = dp[i][0] // If dp[i][0] is true, set to true. dp[i][0] is so that on the next outer for loop with the next num, the true values won't be re-set to false. 
            
            if (dp[i-selectedTasks[num][3]][0]) { // # if dp[i-selectedTasks[num][3]][0] is True, set to True.
                dp[i][0] = dp[i-selectedTasks[num][3]][0] 
                console.log('TESTING', dp[i-selectedTasks[num][3]])
                dp[i].push(...dp[i-selectedTasks[num][3]].slice(1)); // add tasks required to make sum of i-selectedTasks[num][3]
                dp[i].push(selectedTasks[num]) // add task required to make sum of i.
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

    console.log('availableTimeInMilliseconds:', availableTimeInMilliseconds, 'hours:', availableHours, 'target', target, 'dp', );
    console.log(selectedTasks)
    console.log(dp)
    console.log(closest_sum)
}