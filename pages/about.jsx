import TitleFrame from "../components/TitleFrame";
import { Card, CardSection, Paper, ScrollArea, Text } from '@mantine/core';

export default function aboutPage() {

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
                    //FIX THIS HEIGHT
                    height: "100%",
                    width: "100%",
                    display: "flex",
                    flexFlow: "wrap",
                    padding: "1% 4% 1% 4%",
                    gap: "10px",
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
                    <Card
                        sx={{
                            minWidth: "300px",
                            height: "fit-content",
                            width: "30%",
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
                                    alignSelf: "center",
                                    padding: "18px",
                                }}>
                                What
                            </Text>
                        </CardSection>
                        <Text size="lg" weight={700} color="#5E5E5E">
                            This website is a compendium of items from video games that have been implemented as random drops. It lists two types; the first type consists of items that have a fixed chance to drop and a fixed chance to not drop. The second type includes all items which may be dropped multiple times, but the number of items that actually drop is assigned to random chance; each possible number is assigned its own fixed chance. 
                            <br/><br/> The website is intended to make understanding your drop rates clear through interactive visualisation of these problems with the use of statistical modelling. If you want to have an idea of your chances of obtaining items instead of blindly grinding, the data here will be useful to you.
                        </Text>
                    </Card>

                    <Card
                        sx={{
                            minWidth: "300px",
                            height: "fit-content",
                            width: "30%",
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
                                    alignSelf: "center",
                                    padding: "18px",
                                }}>
                                Why
                            </Text>
                        </CardSection>
                        <Text size="lg" weight={700} color="#5E5E5E">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                        </Text>
                    </Card>

                    <Card
                        sx={{
                            minWidth: "300px",
                            height: "fit-content",
                            width: "30%",
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
                                    alignSelf: "center",
                                    padding: "18px",
                                }}>
                                Who
                            </Text>
                        </CardSection>
                        <Text size="lg" weight={700} color="#5E5E5E">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                        </Text>
                    </Card>
                </div>
            </ScrollArea>

        </Paper>
    )
}