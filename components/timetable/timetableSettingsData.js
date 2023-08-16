import {useState} from 'react';

export const fixedSessions = {'start-finish':['Empty', 'Empty'], 'afternoon tea':['Empty', 'Empty'],'dinner':['Empty', 'Empty'], 'another break':['Empty', 'Empty']};

export const updateFixedSessions = (key, index, value) => {
    console.log('before', fixedSessions)
    fixedSessions[key][index] = value;
    console.log('after', fixedSessions)
}

