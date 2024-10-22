import { useState, useEffect } from 'react';
import axios from 'axios';

const QuoteList = () => {
  const [quotes, setQuotes] = useState([]); // Initialize quotes as an empty array

  useEffect(() => {
    axios.post('http://localhost:8000/api/quotes/') // Replace with your API endpoint
      .then((response) => {
        setQuotes(response.data); // Set the fetched quotes to the state
      })
      .catch((error) => {
        console.error('Error fetching quotes:', error);
      });
  }, []);

  return (
    <div>
      {quotes.length > 0 ? (
        quotes.map((quote) => (
          <div key={quote.id}>
            <p>{quote.text}</p>
            <p>- {quote.author}</p>
          </div>
        ))
      ) : (
        <p>No quotes available</p>
      )}
    </div>
  );
};

export default QuoteList;
