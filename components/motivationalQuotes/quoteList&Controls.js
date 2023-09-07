import {useState} from 'react';
import {defaultQuotes} from './defaultQuotes';


export let quoteListSaved = defaultQuotes
 
export const updateQuoteList = (updatedList) => {
    quoteListSaved = updatedList;
    console.log(quoteListSaved)
}


export const QuoteListItems = () => {
    const [quoteList, setQuoteList] = useState(defaultQuotes); // List of quotes
    return {quoteList, setQuoteList}; 
} 

export const quoteToggle = (index, quoteList, setQuoteList) => { // when task is pressed, 
    quoteList[index][2] =!quoteList[index][2]; // inverse the boolean state (if false --> true, if true --> false)
    setQuoteList([...quoteList]); // update the taskItems array 
    return { quoteList: quoteList}; // return values to update
};

export const getRandomQuote = () => {
    listLength = quoteListSaved.length;
    randomIdx = Math.floor(Math.random()*(listLength-1)) 
    returnQuote = quoteListSaved[randomIdx]
    console.log(quoteListSaved)
    return returnQuote
};

