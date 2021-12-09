const path = "/data7.txt";
var arr = [];
//const lineReader = require("line-reader");
const fs = require("fs");

fs.readFileSync(__dirname + path)
    .toString()
    .split(",")
    .forEach((el) => {
        //const splitedLine = line.split(":");
        arr.push(Number(el));
        //emails.push(splitedLine[0]);
        //names.push(splitedLine[1]);
    });

function getMaxOfArray(numArray) {
    return Math.max.apply(null, numArray);
}

let max = getMaxOfArray(arr);
console.log("MAx:", max);

console.log("arr.length", arr.length);
console.log(arr[0]);
