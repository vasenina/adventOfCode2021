//2 parts completed!
const path = "/data1.txt";
var arr = [];
const fs = require("fs");

fs.readFileSync(__dirname + path)
    .toString()
    .split("\n")
    .forEach((line) => {
        arr.push(Number(line));
    });

//console.log("arr.length", arr.length);

let count = 0;

for (i = 1; i < arr.length; i++) {
    if (arr[i] > arr[i - 1]) {
        count++;
    }
}
console.log("Simple-Counter", count);
count = 0;

for (i = 2; i < arr.length - 1; i++) {
    if (arr[i - 2] + arr[i - 1] + arr[i] < arr[i - 1] + arr[i] + arr[i + 1]) {
        count++;
    }
}

console.log("3lines", count);
