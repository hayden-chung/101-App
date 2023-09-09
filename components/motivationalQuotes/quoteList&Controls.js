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
    let selectedQuotes = []
    let returnQuote = null
    for (let i = 0; i < quoteListSaved.length; i++) {
        if (quoteListSaved[i][2] === true)  {
            selectedQuotes.push(quoteListSaved[i])
        }
    }


    listLength = selectedQuotes.length;
    if (listLength !== 0) {
        randomIdx = Math.floor(Math.random()*(listLength-1)) 
        returnQuote = selectedQuotes[randomIdx]
        console.log(selectedQuotes)
    }
    
    return returnQuote
};

