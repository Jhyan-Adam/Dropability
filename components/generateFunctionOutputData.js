export function generateCDFOutputData(inputNumber = 1000, pValue = 0.01) {
    const functionOutput = [];
    for (let index = 0; index < inputNumber; index++) {
        functionOutput.push(1 - ((1 - pValue) ** index));
    }

    return functionOutput;
};