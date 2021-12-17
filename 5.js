const path = "/data5.txt";
var arr = [];
const fs = require("fs");
fs.readFileSync(__dirname + path)
    .toString()
    .split("\n")
    .forEach((line) => {
        //console.log("----");
        let i = 0;
        arr.push(line);
    });

function splitLine(line) {
    let parsedLine = [];
    line.split(" -> ").forEach((el) => {
        el.split(",").forEach((pos) => {
            parsedLine.push(Number(pos));
        });
    });
    return parsedLine;
}
arr.forEach((el) => {
    return (el = splitLine(el));
});

for (let i = 0; i < arr.length; i++) {
    arr[i] = splitLine(arr[i]);
}

//console.log(arr);
//0,9 -> 5,9

let filteredArr = arr.filter((line) => {
    //console.log(line);
    if (line[0] == line[2] || line[1] == line[3]) {
        return line;
    }
});

function checkdiag(line) {
    const x1 = line[0],
        y1 = line[1];
    const x2 = line[2],
        y2 = line[3];

    if (
        Math.max(x1, x2) - Math.min(x1, x2) ==
        Math.max(y1, y2) - Math.min(y1, y2)
    ) {
        return true;
    } else {
        return false;
    }
}

let filteredDiagArr = arr.filter((line) => {
    //console.log(line);
    if (line[0] == line[2] || line[1] == line[3] || checkdiag(line)) {
        return line;
    }
});

//console.log(filteredArr);

//now we should produce the  diagram

function findMaxandMin(matrix) {
    let max = matrix[0][0],
        min = matrix[0][0];
    for (let i = 0; i < matrix.length; i++) {
        maxi = Math.max(...matrix[i]);
        mini = Math.min(...matrix[i]);
        max = maxi > max ? maxi : max;
        min = mini < min ? mini : min;
    }
    return { max, min };
}

const maxPoint = findMaxandMin(filteredArr);
//console.log(maxPoint);

//create an empty diagram

function createDiagram(max) {
    let diagram = [];

    for (let i = 0; i < max + 1; i++) {
        let line = [];
        for (let i = 0; i < max + 1; i++) {
            line.push(0);
        }
        diagram.push(line);
    }
    return diagram;
}
function printDiagram(diagram) {
    for (let i = 0; i < diagram.length; i++) {
        let printline = "";
        for (let j = 0; j < diagram[i].length; j++) {
            printline += diagram[i][j] == 0 ? "." : diagram[i][j];
        }
        console.log(printline);
    }
}

function addLine(line, matrix) {
    //console.log("from addLine MATRIX", matrix);
    //matrix[9][0]++;
    //console.log(line);
    const x1 = line[0],
        y1 = line[1];
    const x2 = line[2],
        y2 = line[3];
    if (x1 == x2 && y1 == y2) {
        // console.log("not here");
        matrix[x1][y1]++;
    } else if (x1 == x2) {
        // console.log("im here");
        for (let i = Math.min(y1, y2); i <= Math.max(y1, y2); i++) {
            // console.log(x1);
            matrix[i][x1]++;
        }
    } else if (y1 == y2) {
        // console.log("imhere", y1);
        for (let i = Math.min(x1, x2); i <= Math.max(x1, x2); i++) {
            //console.log(y1, i, matrix);
            matrix[y1][i]++;
            // printDiagram(matrix);
        }
    }
    // else {
    //     let j;
    //     if (x1 > x2) {
    //         j = x1;
    //     }
    //     //let j = Math.min(x1, x2);
    //     for (let i = y1; i <= Math.max(y1, y2); i++) {
    //         //j = Math.min(x1, x2);
    //         // for (let j = Math.min(x1, x2); j <= Math.max(x1, x2); j++) {
    //         matrix[i][j]++;
    //         j++;
    //         // }
    //     }
    // }
}

function drawalllines(lines, matrix) {
    for (let i = 0; i < lines.length; i++) {
        addLine(lines[i], matrix);
    }
}

function countPoints(matrix) {
    let count = 0;
    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[i].length; j++) {
            if (matrix[i][j] > 1) {
                count++;
            }
        }
    }
    return count;
}

let diagram = createDiagram(maxPoint.max);
//printDiagram(diagram);
drawalllines(filteredArr, diagram);
//addLine(filteredArr[1], diagram);
//printDiagram(diagram);
//console.log(diagram);
console.log("Part 1 result", countPoints(diagram));

// let diagDiagram = createDiagram(maxPoint.max);
// drawalllines(filteredDiagArr, diagDiagram);
// printDiagram(diagDiagram);
// console.log("Part 2 result", countPoints(diagDiagram));
