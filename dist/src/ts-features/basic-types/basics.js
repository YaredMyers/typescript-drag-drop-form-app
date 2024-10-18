"use strict";
function addBasicSum(n1, n2, showResult, phrase) {
    const result = n1 + n2;
    if (showResult) {
        console.log(phrase + result);
    }
    else {
        return result;
    }
}
const number1 = 5;
const number2 = 2.8;
const printBasicsResult = true;
const resultPhrase = "Result is: ";
const result = addBasicSum(number1, number2, printBasicsResult, resultPhrase);
console.log(result);
