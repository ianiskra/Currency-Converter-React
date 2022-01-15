import React, { useState, useEffect } from 'react';
import { Country } from './Country';
import './CurrencySearch.css';
import { currencyList } from '../utils/currencyList';
import { nationList } from '../utils/countryList';

const countryArray = [
    {
        countryImg: "aud",
        nation: "AUD"
    },
    {
        countryImg: "bdt",
        nation: "BDT"
    },
    {
        countryImg: "bif",
        nation: "BIF"
    }
]

export const CurrencySearch = () => {

    const [currency, setCurrency] = useState({});
    const [country, setCountry] = useState('USD');
    const [conversionRate, setConversionRate] = useState(1);
    const [selectedCountries, setSelectedCountries] = useState([]);
    const [localCountries, setLocalCountries] = useState([]);
    const [nation, setNation] = useState('USD');
    const [initialCountries, setInitialCountries] = useState(['AUD', 'BDT', 'BIF', 'ETB', 'ILS', 'MDL']);

    const displayedNations = (currencyResponse) => {

        // Render the 6 default coutries
        initialCountries.map((elem) => {
            let singleNation;

            return setSelectedCountries((prev) => {
                console.log(elem);

                // Make sure conversion country matches the default coutries 
                if(elem === country) {
                    singleNation = {
                        presentCountry: elem,
                        currencyResult: 1 * parseFloat(conversionRate).toFixed(2)
                    } 
                }
                //
                else{
                    singleNation = {
                        presentCountry: elem,
                        currencyResult: parseFloat(currencyResponse.data[elem]).toFixed(2) * parseFloat(conversionRate).toFixed(2)
                    }
                }

                return [...prev, singleNation];
            })
        })
    }

    const fetchCurrency = async (country) => {
        let url = `https://freecurrencyapi.net/api/v2/latest?base_currency=${country}&apikey=${process.env.REACT_APP_FREECURRAPI}`;
        let currencyFetch = await fetch(url);
        let response = await currencyFetch.json();
        console.log('currency', response.data);
        setSelectedCountries([]);

        displayedNations(response);

        setCurrency(response.data);
        return response.data;
    }

    // Run after display items mount
    useEffect(() => {
        if (localStorage.getItem("countries")) {
            let localCTstore = JSON.parse(localStorage.getItem('countries'));
            setLocalCountries(localCTstore);
            fetchCurrency('USD');
        }
        else {
            localStorage.setItem('countries', JSON.stringify(countryArray));
            // setSelectedCountries(countryArray);
            fetchCurrency('USD');
        }
    }, [])

    useEffect(() => {
        // comparing a country with other countries
        if (country !== null) {
            fetchCurrency(country);
        }

    }, [country, conversionRate, initialCountries])

    const addCurrency = (e) => {
        // Returns nothing if nation is added already
        if(nation === ""){
            return false;
        }

        setInitialCountries((prev) => {
            // [...prev] = ["AUE", 'BDT', 'BIF', 'ETB', 'ILS', 'MDL']
           // prev = ['AUD', 'BDT', 'BIF', 'ETB', 'ILS', 'MDL']
            return [...prev, nation];
        });
        // Based on a Default Country Value
        setNation('');
        fetchCurrency(country);
    }

    const removeNations = (e) => {
        // grabbing original countries
        console.log("Test Rocket", e.target.parentElement.name);
        setInitialCountries((prev) => {
            return prev.filter((ele) => ele !== e.target.parentElement.name); 
        })
    }

    /* JSX Code */
    return (
        <div className="page-container">
            <h1 style={{ color: "white" }} >Currency Search</h1>
            <div className="currency-container">
                {/* {Object.keys(currency).length > 0 ? currency.AFN : "No Data"} */}

                {/* Dropdown list of currencies */}
                <div id="conversion" className="currency-search">
                    <div>
                        <h2>Conversion Rate</h2>
                        <input id="conversion-box" type="text" value={conversionRate} onChange={(e) => {
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
                    {selectedCountries.map((elem, idx) => {
                        // to handle no country flag
                        let noFlag = elem.presentCountry.toLowerCase();

                        try{
                            let noFlag1 = require(`../flags/${noFlag}.png`).default;
                            return (
                                <Country
                                    country={elem.presentCountry}
                                    countrycode={elem.presentCountry.toLowerCase()}
                                    currencyValue={elem.currencyResult}
                                    remove={removeNations}
                                    key={idx}
                                />
                            )
                        }
                        catch{
                            noFlag = "nf";
                            return (
                                <Country
                                    country={elem.presentCountry}
                                    countrycode={noFlag}
                                    currencyValue={elem.currencyResult}
                                    remove={removeNations}
                                    key={idx}
                                />
                            )
                        }

                    })}

                    <button onClick={addCurrency}>+ Add Currency</button>

                    <select onChange={(e) => { return(
                        setNation(e.target.value)
                    )}} style={{marginBottom: "20px" }} >
                        {nationList.map((ele, idx) => {
                            return (
                                <option key={idx} value={ele.country}>{ele.country}</option>
                            )
                        })}
                    </select>
                </div>

            </div>
        </div>
    )
}
