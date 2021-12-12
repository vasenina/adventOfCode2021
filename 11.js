//2 parts completed!
const path = "/data11.txt";
var arr = [];
const { countReset } = require("console");
const fs = require("fs");

fs.readFileSync(__dirname + path)
    .toString()
    .split("\n")
    .forEach((line) => {
        arr.push(line.split("").map((el) => Number(el)));
    });

const n = arr.length;
const m = arr[0].length;

//console.log(arr.length, n, m);
let visited = [];
for (let i = 0; i < arr.length; i++) {
    visited[i] = [];
    for (let j = 0; j < arr[i].length; j++) {
        visited[i].push(0);
    }
}

function clearvisited(visited) {
    for (let i = 0; i < visited.length; i++) {
        for (let j = 0; j < visited[i].length; j++) {
            visited[i][j] = 0;
        }
    }
}

function sumvisited(visited) {
    let sum = 0;
    for (let i = 0; i < visited.length; i++) {
        for (let j = 0; j < visited[i].length; j++) {
            sum += visited[i][j];
        }
    }
    return sum;
}

function increase(matrix) {
    let flashCounter = 0;
    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[i].length; j++) {
            matrix[i][j] += 1;
            if (matrix[i][j] > 9 && visited[i][j] == 0) {
                visited[i][j] = 1;
                flashCounter += makeFlash(matrix, i, j);
                // console.log(`flash at ${i} ${j} ${flashCounter}`);
            }
        }
    }
    return flashCounter;
}

function makeFlash(matrix, x, y) {
    let counter = 1;
    const offsetX = [-1, 0, 1, -1, 1, -1, 0, 1];
    const offsetY = [-1, -1, -1, 0, 0, 1, 1, 1];
    for (let i = 0; i < offsetX.length; i++) {
        const ox = offsetX[i] + x;
        const oy = offsetY[i] + y;
        if (ox >= 0 && ox < n && oy >= 0 && oy < m) {
            matrix[ox][oy] += 1;
            if (matrix[ox][oy] > 9 && visited[ox][oy] == 0) {
                visited[ox][oy] = 1;
                counter += makeFlash(matrix, ox, oy);
                // console.log(`flash at ${ox} ${oy} ${counter}`);
            }
        }
    }
    return counter;
}

function countFlashes(matrix) {
    let counter = 0;
    for (var i = 0; i < matrix.length; i++) {
        for (var j = 0; j < matrix[i].length; j++) {
            if (matrix[i][j] > 9) {
                counter++;
                matrix[i][j] = 0;
            }
        }
    }
    return counter;
}

function make100steps(matrix) {
    let sum = 0;
    let sumFlashes = 0;
    for (let k = 0; k < 100; k++) {
        sum += increase(matrix);
        //console.log(`step ${k}`);
        //console.log("count of visited", sumvisited(visited));
        clearvisited(visited);
        sumFlashes += countFlashes(matrix);
        //printMatrix(matrix);
        //console.log("-----");
    }
    return sumFlashes;
}
function allOctopusesFlashes(matrix) {
    let count = 0;
    let step = 1;
    do {
        increase(matrix);
        clearvisited(visited);
        count = countFlashes(matrix);
        // console.log(`step ${step} count ${count}`);
        if (count == 100) {
            //printMatrix(matrix);
            break;
        }
        step++;
    } while (true);
    console.log("Part 2 result:", step);
}

function printMatrix(matrix) {
    for (var i = 0; i < matrix.length; i++) {
        var line = "";
        for (var j = 0; j < matrix[0].length; j++) {
            line += matrix[i][j];
        }
        console.log(line);
    }
}

console.log("Part 1 result:", make100steps(arr));
allOctopusesFlashes(arr);
