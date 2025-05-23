import { useState } from 'react';
import { useHover } from '@mantine/hooks';
import { Card, CardSection, Paper, ScrollArea, Slider, Text } from '@mantine/core';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler, BarElement } from 'chart.js' //Title, Tooltip, Legend? Make use of these!
import { Bar, Line } from 'react-chartjs-2';
import TitleFrame from "../components/TitleFrame";
import { Sliders, generateBinomialChartData } from '../algorithms/Graphing';


ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Filler, BarElement)

function generateChart( //split up chart types into 2 functions for reusability standardisation
    [pValueSlider, setpValueSlider],
    [numberSlider, setNumberSlider],
    [probabilitySlider, setProbabilitySlider],
    { probabilitySliderIsHovered, probabilitySliderHoverRef },
    axisLimX) {

    const pVectorTemporary = [[1, 2, 3, 4, 5, 6, 7], [0.1216, 0.2702, 0.2852, 0.1901, 0.0898, 0.0319, 0.0197]]
    const lineChartData = generateBinomialChartData(axisLimX, pValueSlider, probabilitySlider, numberSlider, probabilitySliderIsHovered)

    const barChartData = {
        labels: pVectorTemporary[0],
        datasets: [
            {
                label: 'CDF',
                data: pVectorTemporary[1],
                borderColor: "#4BC0C0",
                backgroundColor: "#1CE3CB33",
                borderWidth: 2,
                barThickness: 10,
                //barPercentage: 0.5
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
                        //background: "black"
                    }}>
                    <Card
                        sx={{
                            height: "fit-content",
                            width: "fit-content",
                            boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                            maxWidth: "500px"
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
                                    padding: "18px 18px 0px 18px",
                                }}>
                                Model Your Own Item
                            </Text>
                            <Text
                                sx={{
                                    fontSize: "110%",
                                    color: "#4BC0C0",
                                    fontStyle: "normal",
                                    letterSpacing: "0.15em",
                                    fontWeight: "700",
                                    textAlign: "center",
                                    paddingBottom: "14px"
                                }}>
                                Cumulative Distribution Function
                            </Text>
                        </CardSection>
                        <Line
                            data={lineChartData}
                            //width={"400%"}
                            //height={"300%"}
                            options={{
                                animation: false,
                                plugins: {
                                    decimation: {
                                        enabled: true,
                                        algorithm: 'lttb',
                                        //samples: 10
                                    },
                                    tooltip: {
                                        
                                    }
                                },
                                responsive: true,
                                borderColor: '#4BC0C0',
                                backgroundColor: "#1CE3CB22",
                                pointRadius: "0"
                            }}
                        />
                        {Sliders(pValueSlider, [numberSlider, setNumberSlider], [probabilitySlider, setProbabilitySlider], axisLimX)}
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
                            onChange={setpValueSlider}
                            min={0.001}
                            max={1}
                            precision={6}
                            step={0.000001}
                            disabled={false}
                        />
                    </Card>

                    <Card
                        sx={{
                            height: "fit-content",
                            width: "fit-content",
                            boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                        }}>
                        <CardSection>
                            <Text
                                sx={{
                                    fontSize: "180%",
                                    color: "cornflowerblue",
                                    fontStyle: "normal",
                                    letterSpacing: "0.15em",
                                    fontWeight: "700",
                                    textAlign: "center",
                                    padding: "18px 18px 0px 18px",
                                }}>
                                Model Your Own Item
                            </Text>
                            <Text
                                sx={{
                                    fontSize: "110%",
                                    color: "#4BC0C0",
                                    fontStyle: "normal",
                                    letterSpacing: "0.15em",
                                    fontWeight: "700",
                                    textAlign: "center",
                                    paddingBottom: "14px"
                                }}>
                                Probability Mass Function
                            </Text>
                        </CardSection>
                        <Bar
                            data={barChartData}
                        />
                    </Card>
                </div>
            </ScrollArea>
        </Paper>
    )
}

export default function generalChartPage() {
    const [numberSlider, setNumberSlider] = useState(240);
    const [pValueSlider, setpValueSlider] = useState(0.01);
    const [probabilitySlider, setProbabilitySlider] = useState(0.9);
    const { hovered: probabilitySliderIsHovered, ref: probabilitySliderHoverRef } = useHover();
    const axisLimX = Math.round(Math.log(1 - 0.999) / Math.log((1 - pValueSlider)));

    return (
        generateChart(
            [pValueSlider, setpValueSlider],
            [numberSlider, setNumberSlider],
            [probabilitySlider, setProbabilitySlider],
            { probabilitySliderIsHovered, probabilitySliderHoverRef },
            axisLimX)
    )
}