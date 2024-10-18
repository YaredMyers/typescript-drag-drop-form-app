"use strict";
function combine(input1, input2) {
    let result;
    if (typeof input1 === "number" && typeof input2 === "number") {
        result = input1 + input2;
    }
    else {
        result = input1.toString() + input2.toString();
    }
    return result;
}
const combinedAges = combine(30, 26);
console.log(combinedAges);
const combinedNames = combine("Yared", "Lore");
console.log(combinedNames);
function combineLiteral(input1, input2, resultConversion) {
    let result;
    if (typeof input1 === "number" && typeof input2 === "number") {
        result = input1 + input2;
    }
    else {
        result = input1.toString() + input2.toString();
    }
    if (resultConversion === "as-number") {
        return +result;
    }
    else {
        return result.toString();
    }
}
const combinedLiteralAges = combineLiteral(30, 26, "as-number");
console.log(combinedAges);
const combinedStringAges = combineLiteral("30", "26", "as-number");
console.log(combinedStringAges);
const combinedLiteralNames = combineLiteral("Yared", "Lore", "as-text");
console.log(combinedNames);
