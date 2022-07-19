// case #1
// 1 5 7 2 9 13 10
// 2 3 9 10 4 8 11

// case #2
// 1 4 1 3 5 6 10
// 9 2 3 1 3 4 10

// case #3
// 1 1 9 4 1 3 11
// 2 3 3 13 12 9 9

// case #4
// 1 4 9 4 1 10 13
// 11 13 9 3 1 9 1

// case #5
// 1 3 5 4 2 10 4
// 11 13 11 3 11 9 1

// case #6
// 1 1 4 4 1 1 9
// 1 2 11 3 11 4 5

const getInput = () => {
    const fs = require("fs");
    const filePath = "input.txt";
    const input = fs
        .readFileSync(filePath)
        .toString()
        .split("\n")
        .map((a) => a.split(" "));

    const array1 = input[0].map(Number);
    const array2 = input[1].map(Number);

    return [array1, array2];
};

const sortObject = (ob) => {
    let sortedOb = [];
    for (let o in ob) {
        sortedOb.push([o, ob[o]]);
    }

    sortedOb.sort((a, b) => {
        if (b[1] === a[1]) return b[0] - a[0];
        else return b[1] - a[1];
    });

    return sortedOb;
};

const pairCheck = (arr) => {
    let cnts = {};
    for (let i = 0; i < arr.length; i++) {
        if (cnts[arr[i]]) cnts[arr[i]] += 1;
        else cnts[arr[i]] = 1;
    }

    const sortedCnts = sortObject(cnts);

    if (sortedCnts[0][1] === 1) return 0;
    else return [sortedCnts[0][0], sortedCnts[0][1]];
};

const sequenceSearch = (arr) => {
    let stack = [];
    for (let i = 0; i < arr.length; i++) {
        if (stack.length === 0) stack.push(arr[i]);
        else {
            if (stack[stack.length - 1] + 1 === arr[i]) stack.push(arr[i]);
            else if (stack.length >= 5) break;
            else stack = [arr[i]];
        }
    }

    return stack;
};

const sequenceCheck = (arr) => {
    const sortedArr = [...new Set(arr)].sort((a, b) => a - b);
    if (sortedArr.length < 5) return 0;

    let stack = sequenceSearch(sortedArr);

    if (stack.length < 5) return 0;
    else return [stack.join("").slice(-5), 3.5];
};

const choice = (p1, p2, s1, s2) => {
    let [c1, c2] = [0, 0];
    if ((p1 === 0 && s1 !== 0) || p1[1] < s1[1]) c1 = s1;
    else if ((p1 !== 0 && s1 === 0) || p1[1] > s1[1]) c1 = p1;

    if ((p2 === 0 && s2 !== 0) || p2[1] < s2[1]) c2 = s2;
    else if ((p2 !== 0 && s2 === 0) || p2[1] > s2[1]) c2 = p2;

    return [c1, c2];
};

const compare = (c1, c2) => {
    if (c1 === c2 || (c1[0] === c2[0] && c1[1] === c2[1])) return 0;

    if (c1[1] === 3.5 && c2[1] === 3.5) {
        if (parseInt(c1[0]) > parseInt(c2[0])) return 1;
        else return 2;
    }

    if (c1[1] > c2[1]) return 1;
    else return 2;
};

const main = () => {
    const [array1, array2] = getInput();
    const [pair1, pair2] = [pairCheck(array1), pairCheck(array2)];
    const [sequence1, sequence2] = [
        sequenceCheck(array1),
        sequenceCheck(array2),
    ];
    const [choice1, choice2] = choice(pair1, pair2, sequence1, sequence2);

    const result = compare(choice1, choice2);

    console.log(result);
};

main();
