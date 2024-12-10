import { useState, createContext } from 'react';
import { TextInput, Button, Image, Paper, ScrollArea } from '@mantine/core';
import Link from 'next/link'
import TitleFrame from "../components/TitleFrame";
import SearchBar from "../components/SearchBar";
//import SearchBar from "../components/SearchBar";
import fsPromises from 'fs/promises';
import path from 'path'

//This function calls data from the JSON file and assigns it to props
//Investigate server-side rendering here; bugfix for placeholder in Mantine 7.x
export async function getStaticProps() {
    const filePath = path.join(process.cwd(), 'minecraftData.json');
    const jsonData = await fsPromises.readFile(filePath);
    const objectData = JSON.parse(jsonData);

    return {
        props: objectData
    }
}

export default function ItemsPage(objectData) {
    const items = objectData.items;
    const [searchValue, setSearchValue] = useState("");

    return (
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
                <SearchBar
                    searchValue={searchValue} 
                    setSearchValue={setSearchValue} />
                {/* <div>{items + "1"}</div> */}
                <ScrollArea
                    sx={{
                        height: "100%",
                        width: "100%",
                        display: "flex",
                        flexFlow: "wrap",
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
                            padding: "1%",
                            gap: "6vmin 6vmin",
                            //backgroundColor: "black",
                        }}>
                        {
                            //NOTE: itemName in URL String does nothing as of yet
                            items?.filter(item => item.gameID.includes(searchValue)).map(item =>
                                <Link href={"/" + item.gameID}>
                                    <Button
                                        style={{
                                            width: "fit-content",
                                            height: "fit-content",
                                            background: "#1CE3CB",
                                            borderRadius: "14px",
                                            padding: "1%",
                                            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.25)",
                                            alignItems: "center",
                                        }}>
                                        <Image
                                            style={{ imageRendering: "pixelated" }}
                                            src={`/minecraftItemIcons/${item.gameID}.png`}
                                            alt={item.itemName}
                                            width={"9vmin"}
                                            height={"9vmin"}
                                            withPlaceholder
                                        />
                                    </Button>
                                </Link>
                            )
                        }
                    </div>
                </ScrollArea>
            </Paper>
        </>
    );
}