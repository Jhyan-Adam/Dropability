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
                            This website is a compendium of items from video games that have been implemented as random drops. 
                            The website is intended to make understanding your drop rates clear through interactive visualisation of these problems with the use of statistical modelling. 
                            If instead of blindly grinding, you want to know your chances of obtaining items, the data here will be useful to you.
                            <br/><br/>
                            It lists two types; the first type includes all items that have a fixed chance for one or more to drop, as well as a fixed chance for none to drop (they may not drop at all). 
                            The second type includes all items which may be dropped multiple times, but for which the quantity of items that actually drop is assigned to random chance. 
                            For these second-type items, each quantity has its own chance, but at least one is always guaranteed to drop. 
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
                            Multiple reasons apply here. 
                            Firstly, I was extremely annoyed while trying to get a trident in Minecraft because all wikis just stated the basic drop-rate.<br/>
                            Most importantly, I am passionate about creating cool stuff, like a really dynamic and beautifully designed website.
                            The word "cool" here also applies to the mathematics and statistics behind the website.
                            I find that interesting, and I think everyone should too (or at least appreciate it; maths gets too much hate societally).<br/>
                            Another reason is that I learned about these distributions in my studies, so I thought it would be enriching to create a project directly using the concepts.<br/>
                            The possibility of monetising the idea with non-intrusive ads or possibly other features is a nice bonus.
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
                            I am a student, so I just started this as a project to broaden my skillset and put my knowledge to use, with the possibility of monetisation on the side.
                            While I am studying a field unrelated to web development, I want to go that much further and put in effort beyond just what is expected of me.
                            <br/><br/>
                            Also I felt unproductive during the holidays staying up late, playing video games and consuming endless media, so I did the normal thing everybody does and coded an entire website.
                            <br/><br/>
                            I want to create my own projects like this one, and I will likely have more things brewing in the future.
                        </Text>
                    </Card>
                </div>
            </ScrollArea>

        </Paper>
    )
}