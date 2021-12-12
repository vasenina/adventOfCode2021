const path = "/data10.txt";
var arr = [];
const { SSL_OP_COOKIE_EXCHANGE } = require("constants");
const fs = require("fs");

fs.readFileSync(__dirname + path)
    .toString()
    .split("\n")
    .forEach((line) => {
        arr.push(line);
    });
//console.log(arr);

const scores = {
    ")": 3,
    "]": 57,
    "}": 1197,
    ">": 25137,
};
const open = ["(", "[", "{", "<"];
const close = [")", "]", "}", ">"];

let incomplete = []; //array for lines, which should be completed

function isItOpen(ch) {
    const idx = open.findIndex((el) => el == ch);
    return idx >= 0 ? true : false;
}

function findIndex(ch) {
    const idx = open.findIndex((el) => el == ch);
    return idx;
}

function findIllegal(line) {
    let illegal = "";
    let stack = [line[0]];
    for (let i = 1; i < line.length; i++) {
        if (isItOpen(line[i])) {
            stack.push(line[i]);
            //console.log("opened", line[i]);
        } else {
            const idx = close.findIndex((el) => el == line[i]);
            if (findIndex(stack[stack.length - 1]) == idx) {
                stack.pop();
            } else return { illegal: line[i], stack: [] };

            //console.log("closed", line[i]);
        }
    }
    return { illegal, stack };
}

function getScore(data) {
    let score = 0;
    for (let i = 0; i < data.length; i++) {
        const sign = findIllegal(arr[i]);
        //console.log("Sign:", sign);
        if (sign.illegal != "") {
            score += scores[sign.illegal];
        } else incomplete.push(sign.stack);
    }
    return score;
}

console.log("Part 1 result", getScore(arr));

//part 2

const scores2 = {
    ")": 1,
    "]": 2,
    "}": 3,
    ">": 4,
};

//returns ponts for line for part 2
function countPoints2(line) {
    let total = 0;
    for (let i = 0; i < line.length; i++) {
        total = total * 5 + scores2[line[i]];
    }
    return total;
}
//function returns a line that should be completed
function getEndofLine(line) {
    let endLine = [];
    for (let i = 0; i < line.length; i++) {
        let idx = findIndex(line[i]);
        endLine.unshift(close[idx]);
    }
    return endLine;
}

function getMiddleScore2(data) {
    let scores = [];
    for (let i = 0; i < data.length; i++) {
        const line = getEndofLine(data[i]);
        const score = countPoints2(line);
        scores.push(score);
    }
    scores.sort((a, b) => a - b);
    const middle = Math.floor(scores.length / 2);

    return scores[middle];
}

console.log("Part 2 result", getMiddleScore2(incomplete));
