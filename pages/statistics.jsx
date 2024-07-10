//GENERAL COMMENTS:
//I might have to restructure everything to be more modular by using separate functional components instead of generating everything directly with the default function 

import { useState, useEffect } from 'react'; //useEffect?
import { Card, Paper, Image, Text, ScrollArea, Slider, CardSection, } from '@mantine/core';
import { useHover } from '@mantine/hooks';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler, Animation, BarElement } from 'chart.js' //Unused stuff might be useful?
import { Line } from 'react-chartjs-2';
import { useRouter } from "next/router";
import fsPromises from 'fs/promises';
import path from 'path'
import TitleFrame from "../components/TitleFrame"; 
import { generateCDFOutputData } from '../components/generateFunctionOutputData'; //Make more functions globally accessible like this

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Filler, BarElement)

//Investigate server-side rendering here; bugfix for placeholder in Mantine 7.x
export async function getStaticProps() {
    const filePath = path.join(process.cwd(), 'minecraftData.json');
    const jsonData = await fsPromises.readFile(filePath);
    const objectData = JSON.parse(jsonData);

    return {
        props: objectData
    }
}


function fetchItemData(props, itemIDfromURL) {
    const itemsTable = props.items;
    //let itemName, itemDescription;

    const matchingItem = itemsTable.find(item => item.gameID == itemIDfromURL);
    const itemName = matchingItem?.itemName;
    const itemDescription = matchingItem?.itemDescription;

    return [itemName, itemDescription];
}


function fetchSourceData(props, itemIDfromURL) {
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





function generateHorizontalLineData(pValue, numberFromSlider, probabilityFromSlider, probabilitySliderIsHovered = false) {
    const n = numberFromSlider;
    const p = probabilityFromSlider;
    //Capital variables are derived from lowercase variables, which come from the sliders
    const N = Math.round(Math.log(1 - Math.min(p, 0.9999)) / Math.log(1 - pValue));
    const P = (1 - ((1 - pValue) ** n));

    let lineData = []

    //I still need to make the sliders be functions of each other somehow. Currently as soon as the second slider is not hovered, the probabilitySlider prop (?) resets to whatever
    //Currently it might be possible if I don't just have a general "else" and instead say else if the number slider is hovered 
    //But that seems clunky especially because of the redundant variable declaration in each case below and also because useHover is not exactly what I wanted (need something like isHeld)
    //UPDATE: Sliders work well enough after onChangeEnd but still don't update if not hovered
    if (probabilitySliderIsHovered) {
        lineData = Array(N + 1).fill(p);
    } else {
        lineData = Array(n + 1).fill(P);
    }

    return lineData;
}


function generateChartData(axisLimX = 1000, pValue = 0.01, [numberFromSlider, setNumberSlider], [probabilityFromSlider, setProbabilitySlider], probabilitySliderIsHovered) {
    const chartData = {
        labels: Array.from(Array(axisLimX).keys()), //optimal?
        datasets: [
            {
                label: 'GEOMETRIC GRAPH',
                data: generateCDFOutputData(axisLimX, pValue),
                fill: "origin",
                tension: "0.1"
            },
            //This needs to have some sort of readout of the probability value - axis labels are insufficient for accuracy
            //Also when using the probability slider this does not always align to the curve because the x-coordinate snaps to the closest value. 
            //Maybe use a floor or ceiling function? I'm not entirely sure how to fix this yet...
            {
                label: 'TRIAL COUNT LINE',
                data: generateHorizontalLineData(pValue, numberFromSlider, probabilityFromSlider, probabilitySliderIsHovered)
            },
            //NEED VERTICAL LINE CORRESPONDENT HERE; also needs a similar readout for N(trials)
        ],
    };

    return chartData;
}


function generateChart(
    sourceName,
    sourceText,
    pValue,
    [numberSlider, setNumberSlider],
    [probabilitySlider, setProbabilitySlider],
    { probabilitySliderIsHovered, probabilitySliderHoverRef },
    axisLimX) {

    return <Card
        sx={{// Issues with this: inconsistent size and changes on refresh for some reason
            boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
            minWidth: "400px",
            //height: "fit-content"
        }}>
        <CardSection sx={{ paddingInlineStart: "4%" }}>
            <Text
                sx={{//make function of theme -> ??? I forgot what I meant here
                    fontSize: "200%",
                    color: "cornflowerblue",
                    fontStyle: "normal",
                    letterSpacing: "0.15em",
                    fontWeight: "700",
                    textAlign: "start",
                    padding: "4%",
                }}>
                {sourceName}
            </Text>
        </CardSection>
        <Line
            //THIS IS WHERE YOU WILL IMPORT ITEM'S CUSTOM DATA - perhaps make n a function of p to avoid overly large data? <----- DONE
            //width and height parameters are inverted here for some reason
            //height={"60vh"}
            data={generateChartData(axisLimX, pValue, [numberSlider, setNumberSlider], [probabilitySlider, setProbabilitySlider], probabilitySliderIsHovered)}
            options={{
                animation: false,
                plugins: {
                    decimation: {
                        enabled: true,
                        algorithm: 'lttb',
                        //samples: 10
                    }
                },
                responsive: true, //not working: investigate
                borderColor: '#4BC0C0',
                backgroundColor: "#1CE3CB22",
                datasets: { line: { pointRadius: "0" } }
            }}
        />
        <CardSection sx={{maxWidth: "600px"}}>
            <Text
                sx={{
                    fontSize: "120%",
                    color: "gray",
                    fontStyle: "normal",
                    letterSpacing: "0.15em",
                    fontWeight: "700",
                    textAlign: "start",
                    padding: "2% 4% 3% 4%",
                    wordWrap: "break-word",
                }}>
                {sourceText}
            </Text>
        </CardSection>
        <div>
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
                onChangeEnd={(val) => setProbabilitySlider(1 - ((1 - pValue) ** val))}
                min={1}
                max={axisLimX}
                precision={0}
                step={Math.ceil(axisLimX / 1000)}
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
                onChangeEnd={(val) => setNumberSlider(Math.round(Math.log(1 - Math.min(val, 0.9999)) / Math.log(1 - pValue)))}
                min={0}
                max={1}
                precision={3}
                step={0.001}
                ref={probabilitySliderHoverRef}
                disabled={false}
            />
        </div>

    </Card >
}


export default function statisticsPage(props) {
    const router = useRouter();
    const itemIDfromURL = router.query["item"];
    const itemData = fetchItemData(props, itemIDfromURL)
    const sourceArray = fetchSourceData(props, itemIDfromURL);
    const [numberSlider, setNumberSlider] = useState(1);
    const [probabilitySlider, setProbabilitySlider] = useState(0.9);
    const { hovered: probabilitySliderIsHovered, ref: probabilitySliderHoverRef } = useHover();

    let cardArr = [];

    //useHover implementation not Perfectly implemented - see if it can be polished or replaced
    for (let source in sourceArray) {
        const sourceName = sourceArray[source].source.sourceName;
        const sourceText = sourceArray[source].source.sourceText;
        const pValue = eval(sourceArray[source].binomialData.pValue);
        const axisLimX = Math.ceil(Math.log(0.0001 + 1 - 0.99) / Math.log((1 - pValue)));

        cardArr.push(
            generateChart(
                sourceName,
                sourceText,
                pValue,
                [numberSlider, setNumberSlider],
                [probabilitySlider, setProbabilitySlider],
                { probabilitySliderIsHovered, probabilitySliderHoverRef },
                axisLimX)
        )
    }
    return (
        //Maybe add a new element indicating item drop type (Binomial or CDF)
        //Maybe 
        <>
            <Paper
                sx={(theme) => ({
                    height: "100vh",
                    width: "100vw",
                    display: "flex",
                    flexFlow: "column",
                    backgroundColor: theme.colorScheme === "light" ? theme.colors.background : theme.colors.dark[7],
                    padding: 0,
                })}>
                <TitleFrame />
                <ScrollArea
                    sx={{
                        height: "100vh",
                        width: "100vw",
                        display: "flex",
                        flexFlow: "wrap",
                        alignItems: "flex-start",
                        padding: "0% 4% 0% 4%",
                        //background: "black"
                    }}>
                    <div
                        style={{
                            height: "fit-content",
                            width: "fit-content",
                            display: "flex",
                            flexFlow: "wrap",
                            justifyContent: "flex-start",
                            padding: "4vmin 0% 30px 0%",
                            gap: "30px",
                            //background: "black"
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
                        <Card
                            sx={(theme) => ({
                                id: "itemImageCard",
                                height: "fit-content",
                                width: "fit-content",
                                boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                                background: theme.colors.button,
                                borderRadius: "32%"
                            })}>
                            <Image style={{ imageRendering: "pixelated" }} withPlaceholder src={`/minecraftItemIcons/${itemIDfromURL}.png`} alt={itemIDfromURL} height={"9vmin"} />
                        </Card>
                        <Card
                            sx={(theme) => ({
                                id: "itemDescriptionCard",
                                height: "fit-content",
                                width: "fit-content",
                                boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                            })}>
                            <Text size="lg" weight={700} color="gray">
                                {itemData[1]}
                            </Text>
                        </Card>
                    </div>
                    <div
                        style={{
                            height: "fit-content",
                            width: "fit-content",
                            display: "flex",
                            flexFlow: "wrap",
                            //justifyItems: "stretch",
                            justifyContent: "space-between",
                            gap: "30px",
                            //background: "black"
                        }}>
                        {cardArr}
                    </div>

                </ScrollArea>

            </Paper >
        </>
    );
}