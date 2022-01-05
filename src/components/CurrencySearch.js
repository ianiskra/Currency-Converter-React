import React, { useState, useEffect } from 'react';
import { Country } from './Country';
import './CurrencySearch.css';
import { currencyList } from '../utils/currencyList';
import { nationList } from '../utils/countryList';
// import aud from '../flags/aud.png';
// import bdt from '../flags/bdt.png';
// import bif from '../flags/bif.png';
// import etb from '../flags/etb.png';
// import ils from '../flags/ils.png';
// import mdl from '../flags/mdl.png';

// const nationArray = []
// currencyList.map((currency) => {
//     return nationArray.push(
//         {
//             countryImg: currency.toLowerCase(),
//             country: currency
//         }
//     )
// })
// console.log(nationArray);

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
    const [country, setCountry] = useState("");
    const [conversionRate, setConversionRate] = useState(1);
    const [selectedCountries, setSelectedCountries] = useState([]);
    const [localCountries, setLocalCountries] = useState([]);
    const [nation, setNation] = useState("");
    const [initialCountries, setInitialCountries] = useState(['AUD', 'BDT', 'BIF', 'ETB', 'ILS', 'MDL']);

    const fetchCurrency = async (country) => {
        let url = `https://freecurrencyapi.net/api/v2/latest?base_currency=${country}&apikey=${process.env.REACT_APP_FREECURRAPI}`;
        let currencyFetch = await fetch(url);
        let response = await currencyFetch.json();
        console.log('currency', response.data);
        setSelectedCountries([]);


        initialCountries.map((elem) => {
            return setSelectedCountries((prev) => {
                console.log(elem);
                return [...prev, {
                    presentCountry: elem,
                    currencyResult: parseFloat(response.data[elem]).toFixed(2) * parseFloat(conversionRate)    
                }];
            })
        })

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

    }, [country, conversionRate])

    const addCurrency = (e) => {
        setInitialCountries((prev) => {
            return [...prev, nation];
        });
        setNation('');
        fetchCurrency(country);
    }

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
                    {selectedCountries.map((elem) => {
                        return (
                            <Country
                                country={elem.presentCountry}
                                countrycode={elem.presentCountry.toLowerCase()}
                                currencyValue={elem.currencyResult}
                            />
                        )
                    })}

                    <button onClick={addCurrency}>+ Add Currency</button>

                    <select onChange={(e) => { return(
                        setNation(e.target.value)
                    )}} style={{marginBottom: "20px" }} >
                        {nationList.map((ele) => {
                            return (
                                <option value={ele.country}>{ele.country}</option>
                            )
                        })}
                    </select>

                    {/* <div className="countries">
                        <img src={aud} alt="Australia" />
                        <span>AUD {selectedCountries.AUD != null ? selectedCountries.AUD : ""} </span>
                    </div> */}
                    {/* <div className="countries">
                        <img src={bdt} alt="Bangladesh" />
                        <span>BDT {selectedCountries.BDT != null ? selectedCountries.BDT : ""} </span>
                    </div>
                    <div className="countries">
                        <img src={bif} alt="Burundia" />
                        <span>BIF {selectedCountries.BIF != null ? selectedCountries.BIF : ""} </span>
                    </div>
                    <div className="countries">
                        <img src={etb} alt="Ethopia" />
                        <span>ETB {selectedCountries.ETB != null ? selectedCountries.ETB : ""} </span>
                    </div>
                    <div className="countries">
                        <img src={ils} alt="Israel" />
                        <span>ILS {selectedCountries.ILS != null ? selectedCountries.ILS : ""} </span>
                    </div>
                    <div className="countries">
                        <img src={mdl} alt="Moldova" />
                        <span>MDL {selectedCountries.MDL != null ? selectedCountries.MDL : ""} </span>
                    </div> */}
                </div>

            </div>
        </div>
    )
}
