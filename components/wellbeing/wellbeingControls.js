export const getCurrentDate = () => {
    const today = new Date(); // new Date(); creates a 'Date' object representing the current date & time (e.g. 2023-08-06T08:06:35.800Z)
    const year = today.getFullYear(); // get the year of the date (today)
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Get the month of the date. Add 1 to the index based month. padStart: 2 = desired no. of digits (e.g. if the month is 2, it will be 02) and '0' is for the padding --> the string number that will be added to make the string 2 digits. 
    const day = String(today.getDate()).padStart(2, '0'); // Get the day of the date. Add 1 to the index based day.

    return `${year}-${month}-${day}`; // make date into string to display
}; 
