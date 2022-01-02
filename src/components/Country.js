import React from 'react';
import './Country.css';

export const Country = ({country, countrycode, currencyValue}) => {
    return (
        <div className="countries">
            {/* add require method to get info related to flag imgs, to dyanmically search imgs */}
            <img src={require(`../flags/${countrycode}.png`).default} alt={countrycode} />
            <span>{country} {currencyValue != null ? currencyValue : 0} </span>
        </div>
    )
}
{/*  */}
{/* <img src={countrycode} alt="Australia" /> */}