import React, { useState } from 'react';
import './App.css';
import { CurrencySearch } from './components/CurrencySearch';
import CurrencyChart from './components/CurrencyChart';
import CurrencyContext from './utils/context';

function App() {
  const [initialCountries, setInitialCountries] = useState(['AUD', 'BDT', 'BIF', 'ETB', 'ILS', 'MDL']);
  const [currentCountry, setCurrentCountry] = useState("");
  return (
    <div className="App">
      {/* Context is providing value to all components nested inside the context provider */}
      <CurrencyContext.Provider value={[initialCountries, setInitialCountries, currentCountry, setCurrentCountry]}>
        <CurrencySearch />
      </CurrencyContext.Provider>
    </div>
  );
}

export default App;
