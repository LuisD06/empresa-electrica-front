import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { useEffect, useState } from 'react';

import { Line } from "react-chartjs-2";
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

export const newData = {
    labels,
    datasets: [
        {
            label: 'Dataset 1',
            data: [-10, 1, 2, 3, 4, 5, 6],
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
            
        },
    ],
};
export const ChartVoltaje = ({labels, datasets }) => {
    const [data, setData] = useState({
        labels: labels,
        datasets: [
            {
                label: 'Volts',
                data: datasets,
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            }
        ]
    });
    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top'
            },
            title: {
                display: true,
                text: 'Voltaje',
            },
        },
        scales: {
            y: {
                stepSize: 5
            }
        },
        mantainAspectRadio: false
    };
    useEffect(
        () => {
            setData({
                labels: labels,
                datasets: [
                    {
                        label: 'Volts',
                        data: datasets,
                        borderColor: 'rgb(255, 99, 132)',
                        backgroundColor: 'rgba(255, 99, 132, 0.5)',
                    }
                ]
            })
        },
        [labels, datasets]
    );

    return (
        <div>
            <Line width="50px" height="50px"  options={options} data={data} />
        </div>
    );
}