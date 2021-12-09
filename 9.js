//1 part completed!
const path = "/data9.txt";
const fs = require("fs");

var arr = [];

fs.readFileSync(__dirname + path)
    .toString()
    .split("\n")
    .forEach((line) => {
        arr.push(line);
    });

//console.log(arr);
function lineToArr(line) {
    return line.split("").map((el) => Number(el));
}
function parseArrtoMatrix(arr) {
    let resArr = [];
    for (i = 0; i < arr.length; i++) {
        resArr.push(lineToArr(arr[i]));
    }
    return resArr;
}

const matrix = parseArrtoMatrix(arr);

//console.log(matrix.length);

function isLowPoint(matrix, i, j) {
    const point = matrix[i][j];
    const top = i - 1 < 0 ? true : point < matrix[i - 1][j];
    const bottom =
        i + 1 > matrix[i].length - 1 ? true : point < matrix[i + 1][j];
    const left = j - 1 < 0 ? true : point < matrix[i][j - 1];
    const right = j + 1 > matrix.length - 1 ? true : point < matrix[i][j + 1];
    return top && bottom && left && right;
}

function getAllIndexes(arr, val) {
    var indexes = [],
        i;
    for (i = 0; i < arr.length; i++) {
        if (arr[i] === val) indexes.push(i);
        //console.log(arr[i]);
    }
    return indexes;
}

function findAllPoints(matrix) {
    let sum = 0;
    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[i].length; j++) {
            sum += isLowPoint(matrix, i, j) ? matrix[i][j] + 1 : 0;
        }
    }
    return sum;
}

console.log("Part1 result:", findAllPoints(matrix));
