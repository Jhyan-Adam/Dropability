import { ActionIcon, Button, Image, Text, Paper, ScrollArea } from '@mantine/core';
import TitleFrame from "../components/TitleFrame";
import SearchBar from "../components/SearchBar";

export default function HomePage() {

    function LandingPage() {
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
                    <TitleFrame text="Items" />
                    <SearchBar />
                    <ScrollArea
                        sx={{
                            //FIX THIS HEIGHT
                            height: "100%",
                            width: "100%",
                            display: "flex",
                            flexFlow: "column",
                            alignItems: "flex-start",
                            padding: "0% 4% 0% 4%",
                            gap: "2%",
                        }}>
                        <div
                            style={{
                                height: "2000px",
                                width: "100%",
                                display: "flex",
                                flexFlow: "row",
                                alignItems: "flex-start",
                                padding: "1% 0% 1%",
                                gap: "2%",
                                backgroundColor: "",
                            }}>
                            <Button
                                style={{
                                    width: "80px",
                                    height: "80px",
                                    background: "#1CE3CB",
                                    borderRadius: "14px",
                                    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.25)",
                                }}>
                                <Image withPlaceholder src='' alt="Trident" width={250} />
                            </Button>
                            <Button
                                style={{
                                    width: "80px",
                                    height: "80px",
                                    background: "#1CE3CB",
                                    borderRadius: "14px",
                                    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.25)",
                                }}>
                                <Image withPlaceholder src='' alt="Trident" width={250} />
                            </Button>
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