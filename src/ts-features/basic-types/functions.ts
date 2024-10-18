const add = (n1: number, n2: number) => {
    return n1 + n2;
}

const printResult = (num: number) => {
    console.log("Result: " + num);
}

const addAndHandle = (n1: number, n2: number, cb: (num: number) => void) => {
    const result = n1 + n2;
    cb(result)
}

printResult(add(5,12))

let combinedValues: Function;
//let combinedValues: (a: number, b: number) => number;

combinedValues = add;
//combinedValues = 5;

console.log(combinedValues(8,8));

addAndHandle(10, 20, (result) => {
    console.log(result);
})