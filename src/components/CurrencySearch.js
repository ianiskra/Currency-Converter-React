import React, { useState, useEffect } from 'react';
import './CurrencySearch.css';

export const CurrencySearch = () => {

    const [currency, setCurrency] = useState({});

    const fetchCurrency = async (country) => {
        let url = `https://freecurrencyapi.net/api/v2/latest?base_currency=${country}&apikey=${process.env.REACT_APP_FREECURRAPI}`;
        let currencyFetch = await fetch(url);
        let response = await currencyFetch.json();
        console.log('currency', response.data);
        setCurrency(response.data);
        return response.data;
    }

    useEffect(() => {
        // fetchCurrency('USD');
    }, [])

    return (
        <div className="page-container">
            <h1>Currency Search</h1>
            <div className="currency-container">
                {/* {Object.keys(currency).length > 0 ? currency.AFN : "No Data"} */}

                <div className="currency-search">
                    <h2>Hello WOrld</h2>
                </div>

                <div className="currency-search">
                    <h2>Hello WOrld</h2>
                </div>

                <div className="currency-search">
                    <h2>Hello WOrld</h2>
                </div>
            </div>
        </div>
    )
}
