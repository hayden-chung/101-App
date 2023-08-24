import {useState} from 'react';
import {defaultQuotes} from './defaultQuotes';


export const QuoteListItems = () => {
    const [quoteList, setQuoteList] = useState(defaultQuotes); // List of quotes
    return {quoteList, setQuoteList}; 
} 
