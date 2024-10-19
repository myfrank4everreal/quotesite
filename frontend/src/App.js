import logo from './logo.svg';
import './App.css';
import QuotesList from './components/QuotesList';

function App() {
  return (
    <div className="App">
      <header className="App-header">
       <h1> Quotes</h1>
      </header>

      < QuotesList /> {/* render the quotelist  */}
    </div>
  );
}

export default App;
