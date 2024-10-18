"use strict";
const merge = (objA, objB) => {
    return Object.assign(objA, objB);
};
const mergedObj = merge({ name: "Yared", hobbies: ["games"] }, { age: 34 });
console.log(mergedObj);
const countAndDescribe = (element) => {
    let descriptionText = "Got no value";
    if (element.length === 1) {
        descriptionText = "Got 1 Element";
    }
    else if (element.length > 1) {
        descriptionText = `Got ${element.length} elements`;
    }
    return [element, descriptionText];
};
console.log(countAndDescribe(["yared", "developer"]));
const extractAndConvert = (obj, key) => {
    return `Value: ${obj[key]}`;
};
extractAndConvert({ name: "Pepe" }, "name");
class DataStorage {
    constructor() {
        this.data = [];
    }
    addItem(item) {
        this.data.push(item);
    }
    removeItem(item) {
        if (this.data.indexOf(item) === -1) {
            return;
        }
        this.data.splice(this.data.indexOf(item), 1);
    }
    getItems() {
        return [...this.data];
    }
}
const textStorage = new DataStorage();
textStorage.addItem("Yare");
textStorage.addItem("Lore");
textStorage.addItem("Morri");
textStorage.addItem("Pride");
textStorage.removeItem("Lore");
textStorage.removeItem("Yare");
textStorage.removeItem("Morri");
console.log(textStorage.getItems());
