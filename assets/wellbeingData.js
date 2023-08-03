import {useState} from 'react';

const wellbeingDataStorage = [[2, 9, 3, 8, 10, 4]];

export const updateWellbeingDataStorage = (newArray) => { // update new array to existing array storage 
    console.log('before', wellbeingDataStorage)
    wellbeingDataStorage.push(newArray);
    console.log('after', wellbeingDataStorage);
};

export const wellbeingData = { 

    labels: ['Work', 'Exercise & Nutrition', 'Relaxation', 'Relationships', 'Sleep', 'Personal Development'], // 6 aspects of wellbeing for x axis.
    datasets: [{ data: [2, 9, 3, 8, 10, 4] }], // aspect rating out of 10. 6 values for the 6 aspects 
};






  