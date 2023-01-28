import { useState } from 'react';
import { Card, Paper, Image, Text, ScrollArea, Slider, } from '@mantine/core';
import TitleFrame from "../components/TitleFrame";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler, Animation } from 'chart.js'
import { Line } from 'react-chartjs-2';
import { useRouter } from "next/router";
import fsPromises from 'fs/promises';
import path from 'path'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement)


export async function getStaticProps() {
    const filePath = path.join(process.cwd(), 'minecraftData.json');
    const jsonData = await fsPromises.readFile(filePath);
    const objectData = JSON.parse(jsonData);

    return {
        props: objectData
    }
}


function getItemData(props, itemIDfromURL) {
    const itemsTable = props.items;
    //let itemName, itemDescription;

    const matchingItem = itemsTable.find(item => item.gameID == itemIDfromURL);
    const itemName = matchingItem?.itemName;
    const itemDescription = matchingItem?.itemDescription;

    return [itemName, itemDescription];
}


function getSourceData(props, itemIDfromURL) {
    const itemsTable = props.items;
    const bridgeTable = props.javaItemSourceLink;
    const sourcesTable = props.sources;
    const binomialTable = props.javaBinomialSources;
    let sourceArray = [];

    //returns matching item entry from itemsTable
    const matchingItem = itemsTable.find(item => item.gameID == itemIDfromURL);
    const itemID = matchingItem?.itemID;

    //returns all entries matching itemID from bridgeTable
    const matchingBridgeEntries = bridgeTable?.filter(entry => entry.itemID == itemID);

    //builds a comprehensive array of each source's relevent data from all 3 tables (transforms a certain database entry into a denormalised result)
    //MAY NEED REVISION AFTER EQUIPMENT ITEMS ARE SEPARATED
    for (let entry in matchingBridgeEntries) {
        if (sourcesTable.find(source => source.sourceID == matchingBridgeEntries[entry].sourceID).type) {
            sourceArray.push(
                {
                    "bridgeEntry": matchingBridgeEntries[entry],
                    "source": sourcesTable.find(source => source.sourceID == matchingBridgeEntries[entry].sourceID),
                    "binomialData": binomialTable.find(b => b.sourceID == matchingBridgeEntries[entry].sourceID)
                }
            )
        }
    }

    //RETURN
    return sourceArray;
}


function generateFunctionOutputData(inputNumber = 1000, pValue = 0.01) {
    const functionOutput = [];
    for (let index = 0; index < inputNumber; index++) {
        functionOutput.push(1 - ((1 - pValue) ** index));
    }

    return functionOutput;
};


function generateHorizontalLineData(number = 240, pValue = 0.01, numberFromSlider = 240, probabilityFromSlider = 0.9) {
    const N = Math.round(Math.log(0.0001 + 1 - probabilityFromSlider) / Math.log((1 - pValue)));
    const P = (1 - ((1 - pValue) ** numberFromSlider));

    //Swap cases to swap which slider works:
    const lineData = Array(numberFromSlider+1).fill(P);

    return lineData;
}


function generateChartData(inputNumber = 1000, pValue = 0.01, numberFromSlider = 240, probabilityFromSlider = 0.9) {
    const chartData = {
        labels: Array.from(Array(inputNumber).keys()), //optimal?
        datasets: [
            {
                label: 'TEST GRAPH',
                data: generateFunctionOutputData(inputNumber, pValue),
                fill: false,
                borderColor: '#4BC0C0',
                pointRadius: "0",
                tension: "0.1"
            },
            {
                label: 'TEST LINE Y',
                //data: Array(number).fill(1 - ((1 - 0.01) ** number)),
                //data: Array((Math.round(Math.log(0.0001+1-probability) / Math.log((1 - 0.01))))).fill(probability),
                data: generateHorizontalLineData(inputNumber, pValue, numberFromSlider, probabilityFromSlider),
                fill: false,
                borderColor: '#4BC0C0',
                pointRadius: "0",
            },
            //NEED VERTICAL LINE CORRESPONDENT HERE
        ],
    };

    return chartData;
}


export default function statisticsPage(props) {
    //Probably a good idea to make variable names less confusing in future
    const router = useRouter();
    const itemIDfromURL = router.query["item"];
    const itemData = getItemData(props, itemIDfromURL)
    const sourceArray = getSourceData(props, itemIDfromURL);
    //const itemName = getItemData(props)[0]; 
    //const itemDescription = getItemData(props)[1];
    const [numberSlider, setNumberSlider] = useState(0);
    const [probabilitySlider, setProbabilitySlider] = useState(0.9);
    //const probability = (1 - ((1 - 0.01) ** number));

    let cardArr = [];

    for (let source in sourceArray) {
        const pValue = eval(sourceArray[source].binomialData.pValue);
        const nValue = Math.round(Math.log(0.0001 + 1 - 0.999) / Math.log((1 - pValue)));
        //console.log(sourceArray[source]);

        cardArr.push(
            <Card
                sx={{
                    maxWidth: "450px",
                    width: "fit-content",
                    boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                }}>
                <Line
                    //THIS IS WHERE YOU WILL IMPORT ITEM'S CUSTOM DATA - perhaps make n a function of p to avoid overly large data?
                    data={generateChartData(nValue, pValue, numberSlider, probabilitySlider)}
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
                        value={numberSlider}
                        onChange={setNumberSlider}
                        min={1}
                        max={nValue}
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
                        min={0}
                        max={1}
                        precision={2}
                        step={0.01}
                        disabled={true}
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
                        padding: "0% 4% 0% 4%"
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
                            //background: "black"
                        }}>
                        <div style={{
                            width: "fit-content"
                        }}>
                            <Card
                                sx={{
                                    id: "itemNameCard",
                                    height: "fit-content",
                                    width: "fit-content",
                                    boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                                }}>
                                <Text size="itemTitle" weight={700} color="#4BC0C0">
                                    {itemData[0]}
                                </Text>
                            </Card>
                        </div>
                        <div style={{
                            width: "fit-content"
                        }}>
                            <Card
                                sx={(theme) => ({
                                    height: "fit-content",
                                    width: "fit-content",
                                    boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                                    background: theme.colors.button,
                                    borderRadius: "32px"
                                })}>
                                <Image style={{ imageRendering: "pixelated" }} withPlaceholder src={`/minecraftItemIcons/${itemIDfromURL}.png`} alt={"trident"} height={96} />
                            </Card>
                        </div>
                        <div style={{
                            maxWidth: "320px",
                            width: "fit-content"
                        }}>
                            <Card
                                sx={(theme) => ({
                                    id: "itemDescriptionCard",
                                    height: "fit-content",
                                    width: "fit-content",
                                    boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                                })}>
                                <Text size="lg" weight={700} color="dimCyan">
                                    {itemData[1]}
                                </Text>
                            </Card>
                        </div>
                    </div>
                    <div
                        style={{
                            height: "fit-content",
                            width: "fit-content",
                            display: "flex",
                            flexFlow: "wrap",
                            justifyContent: "center",
                            padding: "1% 1% 1% 1%",
                            gap: "30px"
                        }}>
                        {cardArr}
                    </div>

                </ScrollArea>

            </Paper>
        </>
    );
}