//2 parts completed!
const path = "/data2.txt";
var arr = [];
const fs = require("fs");

fs.readFileSync(__dirname + path)
    .toString()
    .split("\n")
    .forEach((line) => {
        const splitedLine = line.split(" ");
        arr.push({
            1: splitedLine[0],
            2: Number(splitedLine[1]),
        });
    });

//console.log("arr.length", arr.length);

let horizont = 0;
let depth = 0;

let aim = 0;

for (let i = 0; i < arr.length; i++) {
    if (arr[i][1] === "forward") {
        horizont += arr[i][2];
        depth += aim * arr[i][2];
        //console.log("horizontal", arr[i][2]);
    } else if (arr[i][1] === "down") {
        // depth += arr[i][2];
        aim += arr[i][2];
    } else if (arr[i][1] === "up") {
        // depth -= arr[i][2];
        aim -= arr[i][2];
    }
}
console.log("Part 2 result:", horizont * depth);

//1889937 - no
//2122627955 - to high
