import './App.css';
import { CurrencySearch } from './components/CurrencySearch';
import CurrencyChart from './components/CurrencyChart';

function App() {
  return (
    <div className="App">
      <CurrencySearch />
      <CurrencyChart />
    </div>
  );
}

export default App;
