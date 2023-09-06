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
