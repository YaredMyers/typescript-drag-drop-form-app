"use strict";
const e1 = {
    name: "Yared",
    privileges: ["create-server"],
    startDate: new Date(),
};
const anotherAdd = (a, b) => {
    if (typeof a === "string" || typeof b === "string") {
        return a.toString() + b.toString();
    }
    return a + b;
};
const printUnknownEmployee = (emp) => {
    console.log(`Name: ${emp.name}`);
    if ("privileges" in emp) {
        console.log(`Privileges: ${emp.privileges}`);
    }
    if ("startDate" in emp) {
        console.log(`Start Date: ${emp.startDate}`);
    }
};
printUnknownEmployee(e1);
class Car {
    drive() {
        console.log("Driving...");
    }
}
class Truck {
    drive() {
        console.log("Driving a Truck...");
    }
    loadCargo(amount) {
        console.log(`Load Cargo ${amount}`);
    }
}
const v1 = new Car();
const v2 = new Truck();
const useVehicle = (vehicle) => {
    vehicle.drive();
    if (vehicle instanceof Truck) {
        vehicle.loadCargo(10000);
    }
};
useVehicle(v1);
useVehicle(v2);
const moveAnimal = (animal) => {
    let speed;
    switch (animal.type) {
        case "bird":
            speed = animal.flyingSpeed;
            break;
        case "horse":
            speed = animal.runningSpeed;
            break;
    }
    console.log(`Va a una velocidad de ${speed}`);
};
moveAnimal({ type: "bird", flyingSpeed: 10000 });
const userInputElement = document.getElementById("user-input");
userInputElement.value = "Hi Guys";
const errorBag = {
    email: "Not a valid email",
    username: "Must start with a capital letter"
};
const fetchedUserData = {
    id: "u1",
    name: "Yare",
    job: { title: "SE", description: "Frontend Developer" }
};
console.log(fetchedUserData === null || fetchedUserData === void 0 ? void 0 : fetchedUserData.job.title);
const userInputNullish = undefined;
const storedData = userInputNullish !== null && userInputNullish !== void 0 ? userInputNullish : "DEFAULT";
console.log(storedData);
