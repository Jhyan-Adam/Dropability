import { useState } from 'react';
import { Card, Paper, Image, Text, ScrollArea, Slider, } from '@mantine/core';
import TitleFrame from "../components/TitleFrame";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler } from 'chart.js'
import { Line, } from 'react-chartjs-2';
import GeoChart from '../components/GeoChart';

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


//MAKE THIS A FUNCTION SO YOU CAN INPUT THE CUSTOM SLIDER VALUES
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

export default function statisticsPage() {
    const [probability, setProbability] = useState(0.01);
    const [number, setNumber] = useState(1000);
    const [data, setData] = useState(getGeoChartData(number, probability));
    let cardArr = [];

    for (let i = 0; i < 1; i++) {
        cardArr.push(
            <Card
                sx={{
                    height: "fit-content",
                    width: "fit-content",
                    boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                }}>
                <Line
                    data={data}
                    width={"400%"}
                    height={"300%"}
                />
                <Slider
                    //SLIDER CAN BE CONFIGURES WITH PROPS/STATES TO INTERACT WITH EACH OTHER SO 2 SLIDERS ARE VIABLE (FOR CHANCE AND TRIALS)
                    styles={(theme) => ({
                        thumb: {
                            height: 16,
                            width: 16,
                            backgroundColor: theme.colorScheme === 'light' ? theme.colors.gray[5] : theme.colors.dark[5],
                            borderWidth: 1,
                            boxShadow: theme.shadows.sm,
                        },
                    })}
                    value={number}
                    onChange={setNumber}
                    min={2}
                    max={1000}
                />
                <Slider
                    //SLIDER CAN BE CONFIGURES WITH PROPS/STATES TO INTERACT WITH EACH OTHER SO 2 SLIDERS ARE VIABLE (FOR CHANCE AND TRIALS)
                    styles={(theme) => ({
                        thumb: {
                            height: 16,
                            width: 16,
                            backgroundColor: theme.colorScheme === 'light' ? theme.colors.gray[5] : theme.colors.dark[5],
                            borderWidth: 1,
                            boxShadow: theme.shadows.sm,
                        },
                    })}
                    value={probability}
                    onChange={setProbability}
                    min={0}
                    max={1}
                    precision={2}
                    step={0.01}
                />

            </Card >
        )
    }
    return (
        <>
            <Paper
                sx={(theme) => ({
                    height: "100vh",
                    width: "100%",
                    display: "flex",
                    flexFlow: "column",
                    backgroundColor: theme.colorScheme === "light" ? theme.colors.background : theme.colors.dark[7],
                    padding: 0,
                })}>
                <TitleFrame />
                <ScrollArea
                    sx={{
                        //FIX THIS HEIGHT
                        height: "100%",
                        width: "100%",
                        display: "flex",
                        flexFlow: "wrap",
                        alignItems: "flex-start",
                        padding: "0% 4% 0% 4%",
                        //backgroundColor: "black",
                    }}>
                    <div
                        style={{
                            height: "fit-content",
                            width: "fit-content",
                            display: "flex",
                            flexFlow: "wrap",
                            justifyContent: "center",
                            padding: "1% 1% 1% 1%",
                            gap: "30px",
                            //backgroundColor: "black",
                        }}>
                        <div style={{
                            width: 340,
                        }}>
                            <Card
                                sx={{
                                    height: "fit-content",
                                    width: "fit-content",
                                    boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                                }}>
                                <Text size="lg" weight={700} color="#5E5E5E">
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                                </Text>
                            </Card>
                        </div>
                        <Card
                                sx={{
                                    height: "fit-content",
                                    width: "fit-content",
                                    boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                                }}>
                                <Image withPlaceholder src="Trident.png" alt="Trident" height={70} />
                            </Card>
                        {cardArr}
                    </div>

                </ScrollArea>

            </Paper>
        </>
    );
}