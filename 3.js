//2 parts completed!
const path = "/data3.txt";
var arr = [];
const fs = require("fs");

fs.readFileSync(__dirname + path)
    .toString()
    .split("\n")
    .forEach((line) => {
        arr.push(line);
    });

let arrOfSum = [];

function getOxygen(arr, j) {
    if (arr.length <= 1) {
        return arr[0];
    }
    if (j === arr[0].length) {
        //console.log("J", j);
        return arr;
    }
    let sum = 0;
    //dычисляем что там доминирует
    for (let i = 0; i < arr.length; i++) {
        sum += Number(arr[i][j]);
    }
    //console.log("SUM FOR ", j, arr.length, sum);

    // let results = [];
    // console.log("need to split", sum, arr.length);
    if (sum + sum === arr.length) {
        results = arr.filter((item) => item[j] == "1");
        // console.log("one");
    } else if (sum < arr.length / 2) {
        results = arr.filter((item) => item[j] == "0");
        //console.log("null");
    } else {
        results = arr.filter((item) => item[j] == "1");
        // console.log("one");
    }
    // console.log("RESULT ARR", results.length);
    return getOxygen(results, j + 1);
}

function getCO(arr, j) {
    if (arr.length <= 1) {
        return arr[0];
    }
    if (j === arr[0].length) {
        //console.log("J", j);
        return arr;
    }
    let sum = 0;
    //dычисляем что там доминирует
    for (let i = 0; i < arr.length; i++) {
        sum += Number(arr[i][j]);
    }
    //console.log("SUM FOR ", j, arr.length, sum);

    // let results = [];
    //console.log("need to split", sum, arr.length);
    if (sum + sum === arr.length) {
        results = arr.filter((item) => item[j] == "0");
        // console.log("one");
    } else if (sum < arr.length / 2) {
        results = arr.filter((item) => item[j] == "1");
        //console.log("null");
    } else {
        results = arr.filter((item) => item[j] == "0");
        // console.log("one");
    }
    //console.log("RESULT ARR", results.length);
    return getCO(results, j + 1);
}

let oxigen = getOxygen(arr, 0);
// console.log("OXIGEN Rating:", oxigen);
// console.log("arr length", arr.length);
let co = getCO(arr, 0);
//console.log("CO", co);

let oxdigit = parseInt(oxigen, 2);
let codigit = parseInt(co, 2);

console.log("Part 2 result:", oxdigit * codigit);

// for (let i = 0; i < arr.length; i++) {
//     for (let j = 0; j < arr[i].length; j++) {
//         arrOfSum[j] += Number(arr[i][j]);
//     }
// }
// console.log(arrOfSum);

// let gammRate = "",
//     epsilonRate = "";

// for (let i = 0; i < arrOfSum.length; i++) {
//     gammRate += arrOfSum[i] < 500 ? "0" : "1";
//     epsilonRate += arrOfSum[i] < 500 ? "1" : "0";
// }
// console.log(gammRate, epsilonRate);

// let gamma = parseInt(gammRate, 2);
// let epsilon = parseInt(epsilonRate, 2);

// console.log(gamma, epsilon, "Result", gamma * epsilon);
