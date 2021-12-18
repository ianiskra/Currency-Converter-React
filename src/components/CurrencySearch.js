import React, { useState, useEffect } from 'react';
import './CurrencySearch.css';
import { currencyList } from '../utils/currencyList';

export const CurrencySearch = () => {

    const [currency, setCurrency] = useState({});
    const [country, setCountry] = useState("");
    const [conversionRate, setConversionRate] = useState(1);
    const [selectedCountries, setSelectedCountries] = useState({
        AUD: "",
        BDT: "",
        BIF: "",
        ETB: "",
        ILS: "",
        MDL: "",
    });

    const fetchCurrency = async (country) => {
        let url = `https://freecurrencyapi.net/api/v2/latest?base_currency=${country}&apikey=${process.env.REACT_APP_FREECURRAPI}`;
        let currencyFetch = await fetch(url);
        let response = await currencyFetch.json();
        console.log('currency', response.data);
        setSelectedCountries({
            AUD: parseFloat(response.data.AUD) * parseFloat(conversionRate),
            BDT: response.data.BDT,
            BIF: response.data.BIF,
            ETB: response.data.ETB,
            ILS: response.data.ILS,
            MDL: response.data.MDL,
        });
        setCurrency(response.data);
        return response.data;
    }

    useEffect(() => {
        // comparing a country with other countries
        fetchCurrency(country);
    }, [country])

    return (
        <div className="page-container">
            <h1>Currency Search</h1>
            <div className="currency-container">
                {/* {Object.keys(currency).length > 0 ? currency.AFN : "No Data"} */}

                {/* Dropdown list of currencies */}
                <div className="currency-search">
                    <div>
                        <h2>Conversion Rate</h2>
                        <input type="text" value={conversionRate} onChange={(e) => {
                            setConversionRate(e.target.value);
                        }} />
                    </div>
                    <div>
                        <h2>Select A Country</h2>
                    </div>
                    <select onChange={(e) => {
                        setCountry(e.target.value);
                    }}>
                        {/* Mapping Country based on selection */}
                        {currencyList.map((country, idx) => {
                            return (
                                <option key={idx} value={country}>{country}</option>
                            );
                        })}
                    </select>
                </div>

                <div className="currency-search">
                    <div className="countries">
                        <span>AUD</span> {selectedCountries.AUD != null ? selectedCountries.AUD : ""}
                    </div>
                    <div className="countries">
                        <span>BDT</span> {selectedCountries.BDT != null ? selectedCountries.BDT : ""}
                    </div>
                    <div className="countries">
                        <span>BIF</span> {selectedCountries.BIF != null ? selectedCountries.BIF : ""}
                    </div>
                    <div className="countries">
                        <span>ETB</span> {selectedCountries.ETB != null ? selectedCountries.ETB : ""}
                    </div>
                    <div className="countries">
                        <span>ILS</span> {selectedCountries.ILS != null ? selectedCountries.ILS : ""}
                    </div>
                    <div className="countries">
                        <span>MDL</span> {selectedCountries.MDL != null ? selectedCountries.MDL : ""}
                    </div>
                </div>

                <div className="currency-search">
                    <h2>Hello WOrld</h2>
                </div>
            </div>
        </div>
    )
}
