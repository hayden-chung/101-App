export const updateCalendarData = (setCalendarData, date, ratings) => { // send two parameteres (date, ratings)
    setCalendarData((prevData) => ({ // (prevData) = current data (selectedDate)
      ...prevData, // all properties from previous data
      [date]: ratings, // provide a key & value property (of date and wellbeing rating). What it will look like: e.g. "2023-08-06": [7, 2, 5, 10, 4]
    }));
  };

export const handlePreviousDay = (selectedDate, setSelectedDate) => { // Go 1 day back. 
    const currentDate = new Date(selectedDate);     // create a copy of current selected date
    currentDate.setDate(currentDate.getDate() - 1); // minus 1 day from current date. 
    setSelectedDate(currentDate.toISOString().split('T')[0]); // e.g. 2023-08-03T00:00:00.000Z --> 2023-08-03 
  };

export const handleNextDay = (selectedDate, setSelectedDate) => { // Go 1 day forward. 
    const currentDate = new Date(selectedDate);     // create a copy of current selected date
    currentDate.setDate(currentDate.getDate() + 1); // add 1 day from current date. 
    setSelectedDate(currentDate.toISOString().split('T')[0]); // e.g. 2023-08-03T00:00:00.000Z --> 2023-08-03 
  };