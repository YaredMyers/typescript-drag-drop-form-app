/*
const names: Array<string> = []; //Esto es lo mismo que string[]
// la idea tras los generics es añadir una capa extra de seguridad diciendole a TS no solo el tipo sino el otro tipo que se espera de ese type

const promise: Promise<number> = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve(100);
    }, 2000);
});

promise.then((data) => {
    // data.split("");
})*/

// GENERIC Functions

const merge = <T extends object, U extends object>(objA: T, objB: U) => {
    return Object.assign(objA, objB)
}

const mergedObj = merge({name: "Yared", hobbies: ["games"]}, {age: 34});
console.log(mergedObj)

interface Lengthy {
    length: number;
}

const countAndDescribe = <T extends Lengthy>(element: T): [T, string] => {
    let descriptionText = "Got no value";

    if (element.length === 1) {
        descriptionText = "Got 1 Element";
    } else if (element.length > 1) {
        descriptionText = `Got ${element.length} elements`;
    }
    return [element, descriptionText];
}

console.log(countAndDescribe(["yared", "developer"]));

const extractAndConvert = <T extends object, U extends keyof T>(obj: T, key: U) => {
    return `Value: ${obj[key]}`;
}

extractAndConvert({name: "Pepe"}, "name");

// GENERIC Classes
class DataStorage<T extends string | number | boolean> {
    private data: T[] = [];

    addItem(item: T) {
        this.data.push(item);
    }

    removeItem(item: T) {
        if (this.data.indexOf(item) === -1) {
            return;
        }
        this.data.splice(this.data.indexOf(item), 1); // -1
    }

    getItems() {
        return [...this.data];
    }
}

const textStorage = new DataStorage<string>();
textStorage.addItem("Yare");
textStorage.addItem("Lore");
textStorage.addItem("Morri");
textStorage.addItem("Pride");
textStorage.removeItem("Lore");
textStorage.removeItem("Yare");
textStorage.removeItem("Morri");
console.log(textStorage.getItems());

