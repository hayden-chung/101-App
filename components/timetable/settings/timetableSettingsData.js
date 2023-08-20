import {useState} from 'react';

export const fixedSessions = {"Ub": [new Date('2023-08-20T11:10:20.685Z'), new Date('2023-08-20T11:20:20.690Z')],"break1": [new Date('2023-08-20T05:30:29.011Z'), new Date('2023-08-20T06:00:29.017Z')], "break2": [new Date('2023-08-20T08:30:29.035Z'), new Date('2023-08-20T08:40:29.035Z')], "start-finish": [new Date('2023-08-20T03:30:28.985Z'), new Date('2023-08-20T11:30:28.991Z')]}


export const updateFixedSessions = (key, index, value) => {
    fixedSessions[key][index] = value;
    console.log('after', fixedSessions)
}

