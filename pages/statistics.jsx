import { useState } from 'react';
import { Card, Paper, Image, Text, ScrollArea, Slider, } from '@mantine/core';
import TitleFrame from "../components/TitleFrame";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler, Animation } from 'chart.js'
import { Line } from 'react-chartjs-2';
import { useRouter } from "next/router";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement)


function generateData(n = 1000, p = 0.01) {
    const data = [];
    for (let index = 0; index < n; index++) {
        data.push(1 - ((1 - p) ** index));
    }

    return data;
};

//Full word variable is inherent to chart (might change to global constants imported from DB); single-letter variables are the plugin values
function generateLineData(n = 240, p = 0.9, number = 240, probability = 0.01) {
    const N = Math.round(Math.log(0.0001 + 1 - p) / Math.log((1 - probability)));
    const P = (1 - ((1 - probability) ** n));

    //Swap cases to swap which slider works:
    const lineData = Array(n).fill(P);

    return lineData;
}


export default function statisticsPage() {
    //Probably a good idea to make variable names less confusing in future
    let router = useRouter();
    let id = router.query["item"];
    const [number, setNumber] = useState(240);
    const [probability, setProbability] = useState(0.9);
    //const probability = (1 - ((1 - 0.01) ** number));

    const chartData = {
        labels: Array.from(Array(1000).keys()),
        datasets: [
            {
                label: 'TEST GRAPH',
                //THIS IS WHERE YOU WILL IMPORT ITEM'S CUSTOM DATA
                data: generateData(1000, 0.01),
                fill: false,
                borderColor: '#4BC0C0',
                pointRadius: "0",
                tension: "0.1"
            },
            {
                label: 'TEST LINE_Y',
                //data: Array(number).fill(1 - ((1 - 0.01) ** number)),
                //data: Array((Math.round(Math.log(0.0001+1-probability) / Math.log((1 - 0.01))))).fill(probability),
                data: generateLineData(number, probability),
                fill: false,
                borderColor: '#4BC0C0',
                pointRadius: "0",
            },
            //NEED VERTICAL LINE CORRESPONDENT HERE
        ],
    };



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
                    data={chartData}
                    width={"400%"}
                    height={"300%"}
                    options={{
                        animation: false,
                        plugins: {
                            decimation: {
                                enabled: true,
                                algorithm: 'lttb',
                                samples: 10
                            }
                        }
                    }}
                />
                <div>
                    <Slider
                        //SLIDER CAN BE CONFIGURED WITH PROPS/STATES TO INTERACT WITH EACH OTHER SO 2 SLIDERS ARE VIABLE (FOR CHANCE AND TRIALS)
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
                        min={1}
                        max={1000}
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
                        value={probability}
                        onChange={setProbability}
                        min={0}
                        max={1}
                        precision={2}
                        step={0.01}
                    //disabled={true}
                    />
                </div>

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
                            <Image style={{imageRendering: "pixelated"}} withPlaceholder src={`/minecraftItemIcons/${id}.png`} alt={`${"trident"}`} height={96} />
                        </Card>
                        {cardArr}
                    </div>

                </ScrollArea>

            </Paper>
        </>
    );
}