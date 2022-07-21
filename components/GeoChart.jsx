import { useState } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler } from 'chart.js'
import { Line, } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement,
    {
        id: "function",
        beforeInit: function (chart) {
            var data = chart.config.data;

            for (var i = 0; i < data.datasets.length; i++) {
                for (var j = 0; j < data.labels.length; j++) {
                    var fct = data.datasets[i].function,
                        x = data.labels[j],
                        y = fct(x);
                    data.datasets[i].data.push(y);
                }
            }
        }
    })


function getGeoChartData(n, p) {
    return ({
        labels: Array.from(Array(n).keys()),
        datasets: [{
            label: 'TEST GRAPH',
            function: function (x) { return (1 - ((1 - p) ** x)) },
            data: [],
            fill: false,
            borderColor: '#4BC0C0',
            pointRadius: "0",
            tension: "0.1"
        }]
    }
    )
}

function GeoChart(n = 1000, p = 0.01) {
    const data = getGeoChartData(n, p);

    return (
        <Line
            data={getGeoChartData(n, p)}
            width={"400%"}
            height={"300%"}
        />
    )
}

export default GeoChart;