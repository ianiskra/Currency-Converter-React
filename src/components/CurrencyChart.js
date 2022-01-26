import React, { useState, useEffect } from 'react';
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

    const fetchHistoricalData = (country) => {
        const url = "https://freecurrencyapi.net/api/v2/historical?date_from=2021-06-01&date_to=2022-01-24&apikey=6ea109e0-57d1-11ec-a47a-8b6c96d68135";

        fetch(url).then((response) => {
            // NOTE: Convert JSON Data to a JS object
            return response.json();
        })
        .then((results) => {
            console.log('results: ', results.data);
            const keysArr = Object.keys(results.data);
            console.log('keysArr:', keysArr)
            // dateLabels.map((date) => {
            //     if(date == results[date])
            // })
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

    return (
        <div style={{ width: "600px", margin: "2rem auto" }}>
            <Bar options={options} data={data} />;
        </div>
    );
}

// https://freecurrencyapi.net/api/v2/historical?date_from=2021-06-01&date_to=2022-01-24&apikey=6ea109e0-57d1-11ec-a47a-8b6c96d68135
