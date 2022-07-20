import { Card, Paper, Text, ScrollArea, } from '@mantine/core';
import TitleFrame from "../components/TitleFrame";
import {Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler} from 'chart.js'
import { Line } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement)

export default function StatisticsPage() {

    let cardArr = [];
    for (let items = 0; items < 4; items++) {
        cardArr.push(
            <Card
                sx={{
                    height: "fit-content",
                    width: "fit-content",
                    boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                }}>
                <Line data={{
                    labels: [0, 1, 2, 3, 4, 5, 6, 7],
                    datasets: [{
                        label: 'My First Dataset',
                        data: [65, 59, 80, 81, 56, 55, 40],
                        fill: false,
                        borderColor: 'rgb(75, 192, 192)',
                        tension: 0.1
                    }]
                }} >
                </Line>
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
                <TitleFrame text="Trident" />
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
                        {cardArr}
                    </div>

                </ScrollArea>

            </Paper>
        </>
    );
}