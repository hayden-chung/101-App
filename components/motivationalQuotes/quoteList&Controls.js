import {useState} from 'react';
import {defaultQuotes} from './defaultQuotes';


export let quoteListSaved = defaultQuotes
 
export const updateQuoteList = (updatedList) => { // update quote list 
    quoteListSaved = updatedList;
}

export const quoteListItems = () => {
    const [quoteList, setQuoteList] = useState(defaultQuotes); // List of quotes
    return {quoteList, setQuoteList}; 
} 

export const quoteToggle = (index, quoteList, setQuoteList) => { // when task is pressed, 
    quoteList[index][2] =!quoteList[index][2]; // inverse the boolean state (if false --> true, if true --> false)
    setQuoteList([...quoteList]); // update the taskItems array 
    return { quoteList: quoteList}; // return values to update
};

export const getRandomQuote = () => { // get a random quote to diplsay on home screen. 
    let selectedQuotes = []
    let returnQuote = null
    for (let i = 0; i < quoteListSaved.length; i++) { // make an array with selected quotes
        if (quoteListSaved[i][2] === true)  {
            selectedQuotes.push(quoteListSaved[i])
        }
    }
    listLength = selectedQuotes.length;
    if (listLength !== 0) { // if no. of selected quotes is not 0, get a random quote. 
        randomIdx = Math.floor(Math.random()*(listLength-1)) 
        returnQuote = selectedQuotes[randomIdx]
    }

    return returnQuote
};

