import React, { useEffect, useState } from 'react';
import axios from 'axios';

const QuoteList = () => {
  const [quotes, setQuotes] = useState([]);

  useEffect(() => {
    const fetchQuotes = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/quotes/');
        setQuotes(response.data);
      } catch (error) {
        console.error('Error fetching quotes:', error);
      }
    };

    fetchQuotes();
  }, []);

  return (
    <div>
      <h2>Quote List</h2>
      <ul>
        {quotes.map(quote => (
          <li key={quote.id}>{quote.text} - {quote.author}</li>
        ))}
      </ul>
    </div>
  );
};

export default QuoteList;
