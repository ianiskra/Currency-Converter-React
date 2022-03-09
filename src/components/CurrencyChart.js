import React, { useState, useEffect, useContext } from 'react';
import CurrencyContext from '../utils/context';
import styles from './CurrencyChart.module.css';

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import faker from 'faker';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);


export default function CurrencyChart() {
    const [labels, setLabels] = useState(['January', 'February', 'March',
        'April', 'May', 'June', 'July']);

    const [dateLabels, setDateLabels] = useState(['2021-04-01', '2021-05-01', '2021-06-01', '2021-07-01', '2021-08-01', '2021-09-01', '2021-10-01']);

    const [MDL, setMDL] = useState([]);
    const [ETB, setETB] = useState([]);
    const [presentNation, setPresentNation] = useState();
    const [initialCountries, setInitialCountries, currentCountry, setCurrentCountry] = useContext(CurrencyContext);

    const fetchHistoricalData = (country) => {
        const url = "https://currencyapi.com/api/v2/historical?date_from=2021-04-01&date_to=2022-01-24&apikey=6ea109e0-57d1-11ec-a47a-8b6c96d68135";

        fetch(url).then((response) => {
            // NOTE: Convert JSON Data to a JS object
            return response.json();
        }).then((results) => {

            // console.log(results);
            setPresentNation([]);
            // map date lables over specified period
            dateLabels.map((ele) => {
                
                let MDLnum = parseFloat(parseFloat(results.data[ele].MDL).toFixed(2) * 1).toFixed(2);
                let ETBnum = parseFloat(parseFloat(results.data[ele].ETB).toFixed(2) * 1).toFixed(2);
                let presCountry = parseFloat(parseFloat(results.data[ele][currentCountry]).toFixed(2) * 1).toFixed(2);

                console.log(MDLnum);
                
                setMDL((prev) => {
                    return [...prev, MDLnum];
                });

                setETB((prev) => {
                    return [...prev, ETBnum];
                });

                setPresentNation((prev) => {
                    return [...prev, presCountry];
                });

                return true;
            })

        }).catch((err) => {
            console.log(err);
        })
    }

    useEffect(() => {
        fetchHistoricalData();
    }, []);
    

    const data = {
        labels,
        datasets: [
            {
                label: 'Dataset 1',
                data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
            {
                label: 'Dataset 2',
                data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
            },
        ],
    };

    const dataCurrency = {
        // Chart.js Documentation
        labels: dateLabels,
        datasets: [
            {
                label: 'MDL vs USD ($100)',
                data: MDL,
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
            {
                label: 'ETB vs USD ($100)',
                data: ETB,
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
            },
            {
                label: `${currentCountry} vs USD ($100)`,
                data: presentNation,
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
            }
        ]
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Chart.js Bar Chart',
            },
        },
    };

    const currencyOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Currency Bar Chart',
            },
        },
    }

    return (
        <div className={styles.container}>
            {/* <Bar options={options} data={data} />; */}
            {MDL.length > 0 && <Bar options={currencyOptions} data={dataCurrency} />}
        </div>
    );
}