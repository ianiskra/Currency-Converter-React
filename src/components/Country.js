import React from 'react';
import './Country.css';

export const Country = ({ country, countrycode, currencyValue, remove }) => {
    return (
        <div className="countries">

            {/* Testing if flag.png exists from the flag folder, to dyanmically search imgs */}
            {require(`../flags/${countrycode}.png`) !== undefined ? <img src={require(`../flags/${countrycode}.png`).default}
                alt={countrycode} /> : <img src={require(`../flags/usd.png`).default} alt={countrycode} />}

            <span>{country} {currencyValue != null ? currencyValue : 0} </span>
            <button className="remove-country" name={country} onClick={remove}>
                <i className="fas fa-trash" style={{ fontSize: "1.5em", color: "white" }}></i></button>
        </div>
    )
}