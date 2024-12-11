import { Card, Paper, Image, Text, ScrollArea, Slider, CardSection, } from '@mantine/core';
//import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler, Animation, BarElement } from 'chart.js' //Unused stuff might be useful?
import { Line, Bar } from 'react-chartjs-2';

export function generateHorizontalLineData(pValueItem, probabilityFromSlider) {
    const n = Math.round(Math.log(1 - Math.min(probabilityFromSlider, 0.9999)) / Math.log(1 - pValueItem));

    return Array(n + 1).fill(probabilityFromSlider);
}


export function generateBinomialChartData(
    axisLimX = 1000,
    pValueItem = 0.01,
    pValueSlider,
    numberSlider) {
    const chartData = {
        labels: Array.from(Array(axisLimX).keys()), //optimal?
        datasets: [
            {
                label: 'Geometric Cumulative Probability',
                data: generateBinomialOutputData(axisLimX, pValueItem),
                fill: "origin",
                tension: "0.1"
            },
            //Also when using the probability slider this does not always align to the curve because the x-coordinate snaps to the closest value. 
            //Maybe use a floor or ceiling function? I'm not entirely sure how to fix this yet...
            {
                label: "P(N ≥ 1 | n = " + numberSlider + ")",
                data: generateHorizontalLineData(pValueItem, pValueSlider)
            },
            //NEED VERTICAL LINE CORRESPONDENT HERE; also needs a similar readout for N(trials)
        ],
    };

    return chartData;
}


//This function currently generates a PMF instead of a CDF
export function generateDiscreteChartData(pVector = [[1, 2, 3, 4, 5], [0.2, 0.2, 0.2, 0.2, 0.2]]) {
    const chartData = {
        labels: pVector[0],
        datasets: [
            {
                label: 'CDF',
                data: pVector[1],
                borderColor: "#4BC0C0",
                backgroundColor: "#1CE3CB33",
                borderWidth: 2,
                barThickness: 10,
                //barPercentage: 0.5
            }
        ]
    };

    return chartData;
}


export function generateBinomialOutputData(axisLimX = 1000, pValue = 0.01) {
    const functionOutput = [];
    for (let index = 0; index <= axisLimX; index++) {
        functionOutput.push(1 - ((1 - pValue) ** index));
    }

    return functionOutput;
};


export function Sliders(pValue, [numberSlider, setNumberSlider], [probabilitySlider, setProbabilitySlider], axisLimX) {
    return (
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
                onChange={(val) => {
                    setNumberSlider(val);
                    setProbabilitySlider(1 - ((1 - pValue) ** val))
                }}
                min={0}
                max={axisLimX}
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
                onChange={(val) => {
                    setProbabilitySlider(val);
                    setNumberSlider(Math.round(Math.log(1 - Math.min(val, 0.9999)) / Math.log(1 - pValue)))
                }}
                min={0}
                max={0.999}
                precision={3}
                step={0.001}
                //ref={probabilitySliderHoverRef}
                disabled={false}
            />
        </div>
    )
}


export function generateBinomialChart(
    sourceName,
    sourceText,
    pValueItem,
    [numberSlider, setNumberSlider],
    [probabilitySlider, setProbabilitySlider],
    axisLimX) {

    return (
        <Card
            sx={{// Issues with this: inconsistent size and changes on refresh for some reason
                boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                minWidth: "400px",
                height: "fit-content"
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
                //width and height parameters are inverted here for some reason
                //height={"60vh"}
                data={generateBinomialChartData(axisLimX, pValueItem, probabilitySlider, numberSlider)}
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
            <CardSection sx={{ maxWidth: "600px" }}>
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
            {Sliders(pValueItem, [numberSlider, setNumberSlider], [probabilitySlider, setProbabilitySlider], axisLimX)}
        </Card >
    )
}


export function generateDiscreteChart(
    sourceName,
    sourceText,
    pVector) {

    return (
        <Card
            sx={{// Issues with this: inconsistent size and changes on refresh for some reason
                boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                minWidth: "400px",
                height: "fit-content"
            }}>
            <CardSection sx={{ paddingInlineStart: "4%" }}>
                <Text
                    sx={{//make function of theme; appeal to global theme values
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
            <Bar
                data={generateDiscreteChartData(pVector)}
            />
            <CardSection sx={{ maxWidth: "600px" }}>
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
        </Card >
    )
}