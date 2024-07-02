import { useState } from 'react';
import { useHover } from '@mantine/hooks';
import TitleFrame from "../components/TitleFrame";
import { Card, CardSection, Paper, ScrollArea, Slider, Text } from '@mantine/core';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler } from 'chart.js'
import { Line } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement)


function generateFunctionOutputData(inputNumber = 1000, pValue = 0.01) {
    const functionOutput = [];
    for (let index = 0; index < inputNumber; index++) {
        functionOutput.push(1 - ((1 - pValue) ** index));
    }

    return functionOutput;
};

function generateHorizontalLineData(pValueFromSlider, [numberFromSlider, setNumberSlider], [probabilityFromSlider, setProbabilitySlider], probabilitySliderIsHovered = false) {
    const n = numberFromSlider;
    const p = probabilityFromSlider;
    //Capital variables are derived from lowercase variables, which come from the sliders
    const N = Math.round(Math.log(1 - Math.min(p, 0.9999)) / Math.log(1 - pValueFromSlider));
    const P = (1 - ((1 - pValueFromSlider) ** n));

    let lineData = []

    //I still need to make the sliders be functions of each other somehow. Currently as soon as the second slider is not hovered, the probabilitySlider prop (?) resets to whatever
    //Currently it might be possible if I don't just have a general "else" and instead say else if the number slider is hovered 
    //But that seems clunky especially because of the redundant variable declaration in each case below and also because useHover is not exactly what I wanted (need something like isHeld)
    //UPDATE: Sliders work now because of line "onChangeEnd"
    if (probabilitySliderIsHovered) {
        lineData = Array(N + 1).fill(p);
    } else {
        lineData = Array(n + 1).fill(P);
    }

    return lineData;
}

function generateChart(
    [pValueSlider, setpValueSlider],
    [numberSlider, setNumberSlider],
    [probabilitySlider, setProbabilitySlider],
    { probabilitySliderIsHovered, probabilitySliderHoverRef },
    axisLimX) {

    const chartData = {
        labels: Array.from(Array(axisLimX).keys()),
        datasets: [
            {
                label: 'GENERAL GRAPH',
                data: generateFunctionOutputData(axisLimX, pValueSlider),
                fill: false,
                borderColor: '#4BC0C0',
                pointRadius: "0",
                tension: "0.1"
            },
            {
                label: 'TRIAL COUNT LINE',
                data: generateHorizontalLineData(pValueSlider, [numberSlider, setNumberSlider], [probabilitySlider, setProbabilitySlider], probabilitySliderIsHovered),
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
                                plugins: {
                                    decimation: {
                                        enabled: true,
                                        algorithm: 'lttb',
                                        //samples: 10
                                    }
                                }
                            }}
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
                            value={numberSlider}
                            onChange={setNumberSlider}
                            onChangeEnd={(val) => setProbabilitySlider(1 - ((1 - pValueSlider) ** val))} //THIS LINE FIXES TEMPORARY HOVER PROBLEM
                            min={0}
                            max={axisLimX}
                            disabled={false}
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
                            value={probabilitySlider}
                            onChange={setProbabilitySlider}
                            onChangeEnd={(val) => setNumberSlider(Math.round(Math.log(1 - Math.min(val, 0.9999)) / Math.log(1 - pValueSlider)))} //THIS LINE FIXES TEMPORARY HOVER PROBLEM
                            min={0}
                            max={1}
                            precision={3}
                            step={0.001}
                            ref={probabilitySliderHoverRef}
                            disabled={false}
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
                            onChange={setpValueSlider}
                            min={0.001}
                            max={1}
                            precision={6}
                            step={0.000001}
                            disabled={false}
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