export let savedCalendarData =  {"2023-08-02": [10, 1, 2, 5, 1, 1]}

export const updateCalendarData = (setCalendarData, date, ratings) => { // send two parameteres (date, ratings)
    setCalendarData((prevData) => ({ // (prevData) = current data (selectedDate)
      ...prevData, // all properties from previous data
      [date]: ratings, // provide a key & value property (of date and wellbeing rating). What it will look like: e.g. "2023-08-06": [7, 2, 5, 10, 4]
    }));
    savedCalendarData = {...savedCalendarData, [date]: ratings,};
  };

export const handlePreviousDay = (selectedDate, setSelectedDate) => { // Go 1 day back. 
    const currentDate = new Date(selectedDate);     // create a copy of current selected date
    currentDate.setDate(currentDate.getDate() - 1); // minus 1 day from current date. 
    setSelectedDate(currentDate.toISOString().split('T')[0]); // e.g. 2023-08-03T00:00:00.000Z --> 2023-08-03 
  };

export const handleNextDay = (selectedDate, setSelectedDate) => { // Go 1 day forward. 
      const currentDate = new Date(selectedDate);     // create a copy of current selected date
      currentDate.setDate(currentDate.getDate() + 1); // add 1 day from current date. 
      // setSelectedDate(currentDate.toISOString().split('T')[0]); // e.g. 2023-08-03T00:00:00.000Z --> 2023-08-03 
      setSelectedDate(currentDate.toISOString().split('T')[0]);
  };

export const getCurrentDate = () => {
  const today = new Date(); // new Date(); creates a 'Date' object representing the current date & time (e.g. 2023-08-06T08:06:35.800Z)
  const year = today.getFullYear(); // get the year of the date (today)
  const month = String(today.getMonth() + 1).padStart(2, '0'); // Get the month of the date. Add 1 to the index based month. padStart: 2 = desired no. of digits (e.g. if the month is 2, it will be 02) and '0' is for the padding --> the string number that will be added to make the string 2 digits. 
  const day = String(today.getDate()).padStart(2, '0'); // Get the day of the date. Add 1 to the index based day.

  return `${year}-${month}-${day}`; // make date into string to display
}; 
