// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// const QuoteList = () => {
//   const [quotes, setQuotes] = useState([]);

//   useEffect(() => {
//     const fetchQuotes = async () => {
//       try {
//         const response = await axios.get('http://localhost:8000/api/quotes/');
//         setQuotes(response.data);
//       } catch (error) {
//         console.error('Error fetching quotes:', error);
//       }
//     };

//     fetchQuotes();
//   }, []);
// a
//   return (
//     <div>
//       <h2>Quote List</h2>
//       <ul>
//         {quotes.map(quote => (
//           <li key={quote.id}>{quote.text} - {quote.author}</li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default QuoteList;

// ***********************modified***************************************************************
//  we have an unauthorized : /api/quotes/ error so we 
// introducing a an attached token for the authorization header


import { useState, useEffect } from 'react';
import axios from 'axios';

const QuoteList = () => {
  const [quotes, setQuotes] = useState([]);

  useEffect(() => {
    // Retrieve token from localStorage or auth state
    // const token = localStorage.getItem('userRole');  // Make sure this points to the correct token key
    const token = localStorage.getItem('authToken');  // Use the correct key for the token

    axios.get('http://localhost:8000/api/quotes/', {
      headers: {
        Authorization: `Bearer ${token}`,  // Attach the token in the Authorization header
      },
    })
      .then((response) => {
        setQuotes(response.data);
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
