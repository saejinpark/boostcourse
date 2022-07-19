const readline = require("readline");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

const lineToArr = (line) => {
    return line.split(" ").map((v) => parseInt(v));
};

const numMapAddCount = (numMap, num) => {
    numMap.set(num, numMap.get(num) + 1);
    return numMap.get(num);
}

const getPairNumAndCountAndMap = (array) => {
    let pairNum = 0, maxPairCount = 0, numMap = new Map();
    for (let oneOfArray of array) {
        if(!numMap.has(oneOfArray))numMap.set(oneOfArray, 1);
        else {
            let testCase = numMapAddCount(numMap, oneOfArray);
            if (testCase > 1 && testCase >= maxPairCount) [maxPairCount, pairNum] = [testCase, oneOfArray];
        };
    } return [pairNum, maxPairCount, numMap];
}

const getFiveSequenceAndNum = (numMap) => {
    let fiveSequence = false, fiveSequenceNum = 0, sequenceCount = 0;
    for(let i=1; i<=13; i++)
        if(numMap.has(i)){
            sequenceCount++;
            if(sequenceCount >= 5)[fiveSequence, fiveSequenceNum] = [true, i];
        }else sequenceCount = 0;
    return [fiveSequence, fiveSequenceNum];
}

const getPairWinSectionOne = (array1MaxPairCount, array2MaxPairCount, array1PairNum, array2PairNum) => {
    return array1MaxPairCount === 0 && array2MaxPairCount === 0 ? 0 : getPairWinSectionTwo(array1MaxPairCount, array2MaxPairCount, array1PairNum, array2PairNum);
}

const getPairWinSectionTwo = (array1MaxPairCount, array2MaxPairCount, array1PairNum, array2PairNum) => {
    if (array1MaxPairCount > array2MaxPairCount) return 1;
    else if (array1MaxPairCount < array2MaxPairCount) return 2;
    else return getPairWinSectionThree(array1PairNum, array2PairNum);
}

const getPairWinSectionThree = (array1PairNum, array2PairNum) => {
    if (array1PairNum > array2PairNum) return 1;
    else if (array1PairNum < array2PairNum) return 2;
    else return 0;
}

const getSequenceWinSectionOne = (array1FiveSequence, array2FiveSequence, array1FiveSequenceNum, array2FiveSequenceNum) => {
    if (array1FiveSequence && !array2FiveSequence) return 1;
    else if (!array1FiveSequence && array2FiveSequence) return 2;
    else return getSequenceWinSectionTwo(array1FiveSequenceNum, array2FiveSequenceNum);
}

const getSequenceWinSectionTwo = (array1FiveSequenceNum, array2FiveSequenceNum) => {
    if (array1FiveSequenceNum > array2FiveSequenceNum) return 1;
    else if (array1FiveSequenceNum < array2FiveSequenceNum) return 2;
    else return 0;
}

const comparePairWinAndSequenceWinSectionOne = (pairWin, sequenceWin, array1MaxPairCount, array2MaxPairCount) => {
    if(pairWin === sequenceWin) return pairWin;
    else if (pairWin !== 0 && sequenceWin === 0) return pairWin;
    else if (pairWin === 0 && sequenceWin !== 0) return sequenceWin;
    else return comparePairWinAndSequenceWinSectionTwo(pairWin, sequenceWin, array1MaxPairCount, array2MaxPairCount);
}

const comparePairWinAndSequenceWinSectionTwo = (pairWin, sequenceWin, array1MaxPairCount, array2MaxPairCount) => {
    let pairValue = pairWin === 1 ? array1MaxPairCount : array2MaxPairCount;
    if (pairValue > 3) return pairWin;
    else return sequenceWin;
}

const selectBigArray = (array1, array2) => {
    const [array1PairNum, array1MaxPairCount, array1NumMap] = getPairNumAndCountAndMap(array1);
    const [array2PairNum, array2MaxPairCount, array2NumMap] = getPairNumAndCountAndMap(array2);
    const [array1FiveSequence, array1FiveSequenceNum] = getFiveSequenceAndNum(array1NumMap);
    const [array2FiveSequence, array2FiveSequenceNum] = getFiveSequenceAndNum(array2NumMap);
    const pairWin = getPairWinSectionOne(array1MaxPairCount, array2MaxPairCount, array1PairNum, array2PairNum);
    const sequenceWin = getSequenceWinSectionOne(array1FiveSequence, array2FiveSequence, array1FiveSequenceNum, array2FiveSequenceNum);
    return comparePairWinAndSequenceWinSectionOne(pairWin, sequenceWin, array1MaxPairCount, array2MaxPairCount);
};

const LIMIT = 2;
let count = 0;

let array1 = null;
let array2 = null;

console.log("첫번째 배열을 입력해주세요.");

rl.on("line", (line) => {
    count++;
    if (count === 1) {
        array1 = lineToArr(line);
        console.log("두번째 배열을 입력해주세요.");
    }else if (count === LIMIT) {
        array2 = lineToArr(line);
        const bigArray = selectBigArray(array1, array2);
        console.log(bigArray === 0 ? "더 큰 배열은 없습니다" : `더 큰 배열은 'array${selectBigArray(array1, array2)}'입니다`);
        rl.close();
    }
});

rl.on("close", () => {
    process.exit();
});