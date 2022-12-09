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

export const ChartVoltaje = ({labels, datasets, title}) => {
    const [data, setData] = useState({
        labels: labels,
        datasets: datasets
    });
    const [chartTitle, setChartTitle] = useState("");
    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top'
            },
            title: {
                display: true,
                text: chartTitle,
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
                datasets: datasets
            })
        },
        [labels, datasets]
    );
    useEffect(
        () => {
            setChartTitle(title);
        },
        [title]
    )

    return (
        <div>
            <Line width="50px" height="50px"  options={options} data={data} />
        </div>
    );
}