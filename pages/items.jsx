import { Button, Image, Paper, ScrollArea } from '@mantine/core';
import Link from 'next/link'
import TitleFrame from "../components/TitleFrame";
import SearchBar from "../components/SearchBar";

export default function ItemsPage() {

    function LandingPage() {

        let buttonsArr = [];
        for (let items = 0; items < 28; items++) {
            //Iterate through a data store file of buttons here to generate each one uniquely with its properties 
            //SQL implementation? Excel seems a bit limited in usefulness...
            //JSON seems to be the way to go
            buttonsArr.push(

                <Link href={"/statistics?item=Trident"}>
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
                        <Image withPlaceholder src='/Trident.png' alt="Trident" height={70} />
                    </Button>
                </Link>

            )
        }

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
                    <TitleFrame/>
                    <SearchBar />
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
                            {buttonsArr}
                        </div>
                    </ScrollArea>
                </Paper>
            </>
        );
    }

    return (
        <LandingPage />
    );

}