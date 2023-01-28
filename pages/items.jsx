import { Button, Image, Paper, ScrollArea } from '@mantine/core';
import Link from 'next/link'
import TitleFrame from "../components/TitleFrame";
import SearchBar from "../components/SearchBar";
import fsPromises from 'fs/promises';
import path from 'path'


export async function getStaticProps() {
    const filePath = path.join(process.cwd(), 'minecraftData.json');
    const jsonData = await fsPromises.readFile(filePath);
    const objectData = JSON.parse(jsonData);

    return {
        props: objectData
    }
}

export default function ItemsPage(props) {

    //console.log(props);
    const items = props.items;
    //let buttonsArr = [];

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
                <SearchBar />
                {/* <div>{items+"1"}</div>  THIS IS FOR DEBUGGING */}
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
                            padding: "1% 1% 1% 1%",
                            gap: "50px 50px",
                            //backgroundColor: "black",
                        }}>
                        {
                            //buttonsArr}
                            items?.map(item =>
                                <Link href={"/statistics?item=" + item.gameID}>
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
                                            style={{imageRendering: "pixelated"}}
                                            src={`/minecraftItemIcons/${item.gameID}.png`}
                                            alt={item.itemName}
                                            width={64}
                                            height={64}
                                            withPlaceholder
                                        />
                                    </Button>
                                </Link>)
                        }
                    </div>
                </ScrollArea>
            </Paper>
        </>
    );
}