//2 parts completed!
const path = "/data4.txt";
var arr = [];
//const lineReader = require("line-reader");
const fs = require("fs");
let count = 0;

var bingoRow = [
    18, 99, 39, 89, 0, 40, 52, 72, 61, 77, 69, 51, 30, 83, 20, 65, 93, 88, 29,
    22, 14, 82, 53, 41, 76, 79, 46, 78, 56, 57, 24, 36, 38, 11, 50, 1, 19, 26,
    70, 4, 54, 3, 84, 33, 15, 21, 9, 58, 64, 85, 10, 66, 17, 43, 31, 27, 2, 5,
    95, 96, 16, 97, 12, 34, 74, 67, 86, 23, 49, 8, 59, 45, 68, 91, 25, 48, 13,
    28, 81, 94, 92, 42, 7, 37, 75, 32, 6, 60, 63, 35, 62, 98, 90, 47, 87, 73,
    44, 71, 55, 80,
];
//console.log(bingoRow.length);

fs.readFileSync(__dirname + path)
    .toString()
    .split("\n")
    .forEach((line) => {
        if (line.length != 0) {
            line.split("\n").forEach((num) => {
                if (!arr[count]) {
                    arr[count] = [];
                    arr[count].push(num);
                } else {
                    arr[count].push(num);
                }
            });
        } else {
            //arr.push(line);
            count += 1;
        }
    });

let resultMap = [];
let minMatrix = bingoRow.length;

function parsekMatrix(matrix) {
    let parsedMatrix = [];
    for (let i = 0; i < matrix.length; i++) {
        parsedMatrix.push(
            matrix[i]
                .split(/\s+/)
                .filter((el) => el != "")
                .map((el) => Number(el))
        );
    }
    // console.log(parsedMatrix);
    return parsedMatrix;
}

function countWinCallforMatrix(matrix) {
    //rows
    let winCall = bingoRow.length - 1;
    for (let j = 0; j < matrix.length; j++) {
        let lineCallComlete = 0;
        for (let i = 0; i < matrix[j].length; i++) {
            let idx = bingoRow.findIndex((el) => el == matrix[i][j]);
            lineCallComlete =
                idx > lineCallComlete && idx != -1 ? idx : lineCallComlete;
        }
        winCall = lineCallComlete < winCall ? lineCallComlete : winCall;
    }

    //columns

    for (let j = 0; j < matrix.length; j++) {
        let colCallComlete = 0;
        for (let i = 0; i < matrix[j].length; i++) {
            let idx = bingoRow.findIndex((el) => el == matrix[j][i]);
            colCallComlete =
                idx > colCallComlete && idx != -1 ? idx : colCallComlete;
        }
        winCall = colCallComlete < winCall ? colCallComlete : winCall;
    }

    return winCall;
}

let parsedArr = parsekMatrix(arr[0]);
let call = countWinCallforMatrix(parsedArr);
//console.log("win at", call);
//console.log(arr.length);
let winCallMap = [];
for (let i = 0; i < arr.length; i++) {
    let parsedArr = parsekMatrix(arr[i]);
    winCallMap.push(countWinCallforMatrix(parsedArr));
}
//console.log(winCallMap[4], typeof winCallMap[4]);

// находим минимум - матрицу которая выиграла

let winner = winCallMap.indexOf(Math.min(...winCallMap));
// console.log(
//     "IndexxOfWinMAtrix:",
//     winner,
//     "index finalCall:",
//     winCallMap[winner],
//     "lastcall",
//     bingoRow[winCallMap[winner]]
// );

//теперь находим элементы которые не выпали в матрице
const bingoWin = bingoRow.slice(0, winCallMap[winner] + 1);
//console.log(bingoWin);

function sumUncall(matrix, bingo) {
    let uncall = 0;
    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[i].length; j++) {
            let idx = bingo.findIndex((el) => el == matrix[i][j]);
            if (idx == -1) {
                //console.log(matrix[i][j]);
                uncall += matrix[i][j];
            }
        }
    }
    //console.log("Sum UNCall", uncall, typeof uncall);
    return uncall;
}

const winnerMatrix = parsekMatrix(arr[winner]);
let sum = sumUncall(winnerMatrix, bingoWin);
//console.log(sum, typeof sum);

//console.log(bingoWin);
let result = sum * bingoRow[winCallMap[winner]];

console.log("Part 1 result", result);

///про последнего

let lastWinner = winCallMap.indexOf(Math.max(...winCallMap));

// console.log(
//     "IndexxOfWinMAtrix:",
//     lastWinner,
//     "index finalCall:",
//     winCallMap[lastWinner],
//     "lastcall",
//     bingoRow[winCallMap[lastWinner]]
// );

const lastbingoWin = bingoRow.slice(0, winCallMap[lastWinner] + 1);
const lastWinnerMatrix = parsekMatrix(arr[lastWinner]);
let sumLast = sumUncall(lastWinnerMatrix, lastbingoWin);
let resultLast = sumLast * bingoRow[winCallMap[lastWinner]];
//console.log(sumLast);
console.log("Part 2 result", resultLast);
