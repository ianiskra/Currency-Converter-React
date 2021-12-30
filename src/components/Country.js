import React from 'react';
import './Country.css';

export const Country = ({country, countrycode, selectedCountries}) => {
    return (
        <div className="countries">
            <img src={countrycode} alt="Australia" />
            <span>{country} {selectedCountries.AUD != null ? selectedCountries.AUD : ""} </span>
        </div>
    )
}
