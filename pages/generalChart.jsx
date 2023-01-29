import { useState } from 'react';
import TitleFrame from "../components/TitleFrame";
import { Card, CardSection, Paper, ScrollArea, Slider, Text } from '@mantine/core';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler } from 'chart.js'
import { Line } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement)


function generateData(n = 1000, p = 0.01) {
    const data = [];
    for (let index = 0; index < n; index++) {
        data.push(1 - ((1 - p) ** index));
    }

    return data;
};

function generateHorizontalLineData(numberFromSlider = 240, pValue = 0.01) {
    //const N = Math.round((Math.log(1-p))/(Math.log(1-0.01)));
    const P = (1 - ((1 - pValue) ** numberFromSlider));

    //const lineData = Array(n).fill(1 - ((1 - 0.01) ** n));
    //const lineData = Array( Math.round((Math.log(1-p))/(Math.log(1-0.01))) ).fill(p);
    const lineData = Array(numberFromSlider+1).fill(P);

    return lineData;
}

export default function generalChartPage() {
    const [numberSlider, setNumberSlider] = useState(240);
    const [pValueSlider, setProbabilitySlider] = useState(0.01);
    //const [chartMax, setChartMax] = useState(1000);
    //const probability = (1 - ((1 - 0.01) ** number));
    const chartMax = Math.round(Math.log(0.0001 + 1 - 0.999) / Math.log((1 - pValueSlider)));

    const chartData = {
        labels: Array.from(Array(chartMax).keys()),
        datasets: [
            {
                label: 'TEST GRAPH',
                //THIS IS WHERE YOU WILL IMPORT ITEM'S CUSTOM DATA (USING THE URL STRING AS REFERENCE?)
                data: generateData(chartMax, pValueSlider),
                fill: false,
                borderColor: '#4BC0C0',
                pointRadius: "0",
                tension: "0.1"
            },
            {
                label: 'TEST LINE',
                data: generateHorizontalLineData(numberSlider, pValueSlider),
                fill: false,
                borderColor: '#4BC0C0',
                pointRadius: "0",
            }
        ]
    };

    return (
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
                    height: "100%",
                    width: "100%",
                    display: "flex",
                    flexFlow: "wrap",
                    padding: "1% 4% 1% 4%",
                    gap: "10px",
                }}>
                <div
                    style={{
                        display: "flex",
                        flexFlow: "wrap",
                        justifyContent: "center",
                        padding: "1% 1% 1% 1%",
                        gap: "30px",
                    }}>
                    <Card
                        sx={{
                            height: "fit-content",
                            width: "fit-content",
                            boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                        }}>
                        <CardSection>
                            <Text
                                sx={{
                                    fontSize: "200%",
                                    color: "cornflowerblue",
                                    fontStyle: "normal",
                                    letterSpacing: "0.15em",
                                    fontWeight: "700",
                                    textAlign: "center",
                                    padding: "18px",
                                }}>
                                Model Your Own Item
                            </Text>
                        </CardSection>
                        <Line
                            data={chartData}
                            width={"400%"}
                            height={"300%"}
                            options={{
                                animation: false,
                                plugins: {decimation: {
                                    enabled: true, 
                                    algorithm: 'lttb', 
                                    samples: 2
                                }
                            }
                            }}
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
                            value={numberSlider}
                            onChange={setNumberSlider}
                            min={0}
                            max={chartMax}
                        />
                        <Slider
                            styles={(theme) => ({
                                thumb: {
                                    height: 16,
                                    width: 16,
                                    backgroundColor: theme.colorScheme === 'light' ? theme.colors.gray[5] : theme.colors.dark[5],
                                    borderWidth: 1,
                                    boxShadow: theme.shadows.sm,
                                },
                            })}
                            value={pValueSlider}
                            onChange={setProbabilitySlider}
                            min={0}
                            max={1}
                            precision={2}
                            step={0.01}
                            disabled={true}
                        />
                        <Slider
                            styles={(theme) => ({
                                thumb: {
                                    height: 16,
                                    width: 16,
                                    backgroundColor: theme.colorScheme === 'light' ? theme.colors.gray[5] : theme.colors.dark[5],
                                    borderWidth: 1,
                                    boxShadow: theme.shadows.sm,
                                },
                            })}
                            value={pValueSlider}
                            onChange={setProbabilitySlider}
                            min={0.001}
                            max={1}
                            precision={6}
                            step={0.000001}
                        />
                    </Card>
                </div>
            </ScrollArea>
        </Paper>
    )
}