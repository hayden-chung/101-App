export const wellbeingData = { 

    label: ['Work', 'Exercise & Nutrition', 'Relaxation', 'Relationships', 'Sleep', 'Personal Development'], // 6 aspects of wellbeing for x axis.
    question: ['How productive and satisfied do you feel with your work today?', 'Did you engage in physical activity and maintain a balanced diet?','Have you had some leisure today to ensure you had time for enjoyable and fulfilling activities that nurture your well-being?', 'How satisfied are you with your social life right now?', 'How many hours of sleep did you get last night? (recommended: 7~8 hrs)', 'Did you make progress towards your personal goals or learn something new today?'],
    datasets: [{ data: [2, 9, 3, 8, 10, 4] }], // aspect rating out of 10. 6 values for the 6 aspects 
    colors: [
        (opacity = 1) => `rgba(86, 139, 229, ${opacity})`, // Change the color to your desired color
    ],
};

export const updateWellbeingData = (selectedDate, calendarData) => { // Provide currently selected date. check if there is stored wellbeing data in that date and update the graph data. 
    const displayData = calendarData[selectedDate] || [1, 1, 1, 1, 1, 1]; 
    wellbeingData.datasets[0].data = displayData
};






  