const wellbeingDataStorage = [[2, 9, 3, 8, 10, 4]];

export const updateWellbeingDataStorage = (newArray) => { // update new array to existing array storage 
    wellbeingDataStorage.push(newArray);
};

export const wellbeingData = { 

    labels: ['Work', 'Exercise & Nutrition', 'Relaxation', 'Relationships', 'Sleep', 'Personal Development'], // 6 aspects of wellbeing for x axis.
    datasets: [{ data: [2, 9, 3, 8, 10, 4] }], // aspect rating out of 10. 6 values for the 6 aspects 
};

export const updateWellbeingData = (selectedDate, calendarData) => { // Provide currently selected date. check if there is stored wellbeing data in that date and update the graph data. 
    console.log('----------------------------------------------------------------')
    console.log('updateWellbeingData:', calendarData[selectedDate])
    const defaultData = [1, 1, 1, 1, 1, 1];
    const displayData = calendarData[selectedDate] || defaultData;
    console.log('displayData:', displayData);
    wellbeingData.datasets[0].data = displayData
    console.log('new wellbeingData', wellbeingData.datasets)
    console.log('----------------------------------------------------------------')
};






  