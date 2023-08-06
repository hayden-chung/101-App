export const updateCalendarData = (setCalendarData, date, ratings) => { // send two parameteres (date, ratings)
    setCalendarData((prevData) => ({ // (prevData) = current data (selectedDate)
      ...prevData, // all properties from previous data
      [date]: ratings, // provide a key & value property (of date and wellbeing rating). What it will look like: e.g. "2023-08-06": [7, 2, 5, 10, 4]
    }));
  };

export const handlePreviousDay = (selectedDate, setSelectedDate) => {
    const currentDate = new Date(selectedDate);
    currentDate.setDate(currentDate.getDate() - 1);
    setSelectedDate(currentDate.toISOString().split('T')[0]);
  };

export const handleNextDay = (selectedDate, setSelectedDate) => {
    const currentDate = new Date(selectedDate);
    currentDate.setDate(currentDate.getDate() + 1);
    setSelectedDate(currentDate.toISOString().split('T')[0]);
  };