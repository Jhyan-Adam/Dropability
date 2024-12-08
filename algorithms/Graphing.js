import { Card, Paper, Image, Text, ScrollArea, Slider, CardSection, } from '@mantine/core';
//import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler, Animation, BarElement } from 'chart.js' //Unused stuff might be useful?
import { Line, Bar } from 'react-chartjs-2';

export function generateHorizontalLineData(pValue, numberFromSlider, probabilityFromSlider, probabilitySliderIsHovered = false) {
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


export function generateBinomialChartData(axisLimX = 1000, pValue = 0.01, [numberFromSlider, setNumberSlider], [probabilityFromSlider, setProbabilitySlider], probabilitySliderIsHovered) {
    const chartData = {
        labels: Array.from(Array(axisLimX).keys()), //optimal?
        datasets: [
            {
                label: 'Geometric Cumulative Probability',
                data: generateBinomialOutputData(axisLimX, pValue),
                fill: "origin",
                tension: "0.1"
            },
            //This needs to have some sort of readout of the probability value - axis labels are insufficient for accuracy
            //Also when using the probability slider this does not always align to the curve because the x-coordinate snaps to the closest value. 
            //Maybe use a floor or ceiling function? I'm not entirely sure how to fix this yet...
            {
                label: "P(N ≥ 1 | n = "+numberFromSlider+")",
                data: generateHorizontalLineData(pValue, numberFromSlider, probabilityFromSlider, probabilitySliderIsHovered)
            },
            //NEED VERTICAL LINE CORRESPONDENT HERE; also needs a similar readout for N(trials)
        ],
    };

    return chartData;
}


//This function currently generates a PMF instead of a CDF
export function generateDiscreteChartData(pVector= [[1, 2, 3, 4, 5], [0.2, 0.2, 0.2, 0.2, 0.2]], [numberFromSlider, setNumberSlider], [probabilityFromSlider, setProbabilitySlider], probabilitySliderIsHovered) {
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


export function generateBinomialOutputData(inputNumber = 1000, pValue = 0.01) {
    const functionOutput = [];
    for (let index = 0; index < inputNumber; index++) {
        functionOutput.push(1 - ((1 - pValue) ** index));
    }

    return functionOutput;
};


export function generateBinomialChart(
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
            //THIS IS WHERE YOU WILL IMPORT ITEM'S CUSTOM DATA - perhaps make n a function of p to avoid overly large data? <----- DONE
            //width and height parameters are inverted here for some reason
            //height={"60vh"}
            data={generateBinomialChartData(axisLimX, pValue, [numberSlider, setNumberSlider], [probabilitySlider, setProbabilitySlider], probabilitySliderIsHovered)}
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


export function generateDiscreteChart(
    sourceName,
    sourceText,
    pVector,
    [numberSlider, setNumberSlider],
    [probabilitySlider, setProbabilitySlider],
    { probabilitySliderIsHovered, probabilitySliderHoverRef }) {
        
        const pValue = 0.01;

        return <Card
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
        <Bar
            data={generateDiscreteChartData(pVector, [numberSlider, setNumberSlider], [probabilitySlider, setProbabilitySlider], probabilitySliderIsHovered)}
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
        <div>
        </div>

    </Card >
}