"use strict";
const add = (n1, n2) => {
    return n1 + n2;
};
const printResult = (num) => {
    console.log("Result: " + num);
};
const addAndHandle = (n1, n2, cb) => {
    const result = n1 + n2;
    cb(result);
};
printResult(add(5, 12));
let combinedValues;
combinedValues = add;
console.log(combinedValues(8, 8));
addAndHandle(10, 20, (result) => {
    console.log(result);
});
