//GENERAL COMMENTS:
//I might have to restructure everything to be more modular by using separate functional components instead of generating everything directly with the default function 

import { useState, useEffect } from 'react'; //useEffect?
import { Card, Paper, Image, Text, ScrollArea, Slider, CardSection, } from '@mantine/core';
import { useHover } from '@mantine/hooks';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler, Animation, BarElement } from 'chart.js' //Unused stuff might be useful?
import { useRouter } from "next/router";
import fsPromises from 'fs/promises';
import path from 'path'
import TitleFrame from "../components/TitleFrame";
//import { generateBinomialChart, generateDiscreteChart } from '../algorithms/Graphing';
import * as graphing from '../algorithms/Graphing';
Object.assign(globalThis, graphing);

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Filler, BarElement)


//Investigate server-side rendering here; also bugfix added for placeholder image in Mantine 7.x
export async function getStaticProps() {
    const filePath = path.join(process.cwd(), 'minecraftData.json');
    const jsonData = await fsPromises.readFile(filePath);
    const objectData = await JSON.parse(jsonData);

    return {
        props: objectData
    }
}


function fetchItemData(objectData, itemIDfromURL) {
    const itemsTable = objectData.items;
    //let itemName, itemDescription;

    const matchingItem = itemsTable.find(item => item.gameID == itemIDfromURL);
    const itemName = matchingItem?.itemName;
    const itemDescription = matchingItem?.itemDescription;

    return [itemName, itemDescription];
}


function fetchSourceData(objectData, itemIDfromURL) {
    const itemsTable = objectData.items;
    const bridgeTable = objectData.javaItemSourceLink;
    const sourcesTable = objectData.sources;
    const binomialTable = objectData.javaBinomialSources;
    const CDFTable = objectData.javaCDFSources;
    let sourceArray = [];

    //returns matching item entry from itemsTable
    const matchingItem = itemsTable.find(item => item.gameID == itemIDfromURL);
    const itemID = matchingItem?.itemID;

    //returns all entries matching itemID from bridgeTable
    const matchingBridgeEntries = bridgeTable?.filter(entry => entry.itemID == itemID);

    //builds a comprehensive array of each source's relevent data from all 3 tables (transforms a certain database entry into a denormalised result)
    //MAY NEED REVISION AFTER EQUIPMENT ITEMS ARE SEPARATED
    for (let entry in matchingBridgeEntries) {
        if (sourcesTable.find(source => source.sourceID == matchingBridgeEntries[entry].sourceID).type == true) { // Checks if type=true (Binomial)
            sourceArray.push(
                {
                    "bridgeEntry": matchingBridgeEntries[entry],
                    "source": sourcesTable.find(source => source.sourceID == matchingBridgeEntries[entry].sourceID),
                    "type": true,
                    "binomialData": binomialTable.find(b => b.sourceID == matchingBridgeEntries[entry].sourceID)
                }
            )
        } else if (sourcesTable.find(source => source.sourceID == matchingBridgeEntries[entry].sourceID).type == false) {
            sourceArray.push(
                {
                    "bridgeEntry": matchingBridgeEntries[entry],
                    "source": sourcesTable.find(source => source.sourceID == matchingBridgeEntries[entry].sourceID),
                    "type": false,
                    "DiscreteData": CDFTable.find(d => d.sourceID == matchingBridgeEntries[entry].sourceID)
                }
            )
        }
    }

    //RETURN
    return sourceArray;
}


export default function statisticsPage(objectData) {
    const router = useRouter();
    const itemIDfromURL = router.query["item"];
    const itemData = fetchItemData(objectData, itemIDfromURL)
    const sourceArray = fetchSourceData(objectData, itemIDfromURL);
    const [numberSlider, setNumberSlider] = useState(1);
    const [probabilitySlider, setProbabilitySlider] = useState(0.9);
    const { hovered: probabilitySliderIsHovered, ref: probabilitySliderHoverRef } = useHover();

    let cardArr = [];

    //useHover implementation not Perfectly implemented - see if it can be polished or replaced 
    for (let entry in sourceArray) {
        if (sourceArray[entry].source.type == true) {
            const sourceName = sourceArray[entry].source.sourceName;
            const sourceText = sourceArray[entry].source.sourceText;
            const pValue = eval(sourceArray[entry].binomialData.pValue);
            const axisLimX = Math.ceil(Math.log(0.0001 + 1 - 0.99) / Math.log((1 - pValue)));

            cardArr.push(
                generateBinomialChart(
                    sourceName,
                    sourceText,
                    pValue,
                    [numberSlider, setNumberSlider],
                    [probabilitySlider, setProbabilitySlider],
                    { probabilitySliderIsHovered, probabilitySliderHoverRef },
                    axisLimX)
            )
        } else if (sourceArray[entry].source.type == false) {
            const sourceName = sourceArray[entry].source.sourceName;
            const sourceText = sourceArray[entry].source.sourceText;
            const pVector = eval(sourceArray[entry].DiscreteData.distribution);

            cardArr.push(
                generateDiscreteChart(
                    sourceName,
                    sourceText,
                    pVector,
                    [numberSlider, setNumberSlider],
                    [probabilitySlider, setProbabilitySlider],
                    { probabilitySliderIsHovered, probabilitySliderHoverRef })
            )
        }
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