"use strict";
class Person {
    constructor(n) {
        this.age = 30;
        this.name = n;
    }
    greet(phrase) {
        if (this.name) {
            console.log(`Hi There, I'm ${phrase}`);
        }
        else {
            console.log("Hello");
        }
    }
}
let user1;
let user2;
user1 = {
    name: "Yare",
    greet(phrase) {
        console.log(`Hi There, I'm ${phrase}`);
    }
};
user2 = new Person("Loren");
console.log(user2);
user1.greet(user1.name);
user2.greet(user2.name);
let addWithInterface;
addWithInterface = (n1, n2) => {
    return n1 + n2;
};
