// Intersection Types
type Admin = {
    name: string;
    privileges: string[];
}

type Employee = {
    name: string;
    startDate: Date;
}

// interface ElevatedEmployee extends Admin, Employee {} (esto es lo mismo que la linea de abajo)
type ElevatedEmployee = Admin & Employee;

const e1: ElevatedEmployee = {
    name: "Yared",
    privileges: ["create-server"],
    startDate: new Date(),
}

type CombinableType = string | number;
type Numeric = number | boolean;

type Universal = CombinableType | Numeric;

// Type guards
const anotherAdd = (a: CombinableType, b: CombinableType) => {
    if (typeof a === "string" || typeof b === "string") { // esto es un type guard que nos verifica en run time el type
        return a.toString() + b.toString();
    }
    return a + b;
}

type UnknownEmployee = Employee | Admin;

const printUnknownEmployee = (emp: UnknownEmployee) => {
    console.log(`Name: ${emp.name}`);
    if ("privileges" in emp) { // type guard
        console.log(`Privileges: ${emp.privileges}`);
    }
    if ("startDate" in emp) {
        console.log(`Start Date: ${emp.startDate}`);
    }
}

printUnknownEmployee(e1);

class Car {
    drive() {
        console.log("Driving...")
    }
}

class Truck {
    drive() {
        console.log("Driving a Truck...")
    }

    loadCargo(amount: number) {
        console.log(`Load Cargo ${amount}`);
    }
}

type Vehicle = Car | Truck;

const v1 = new Car();
const v2 = new Truck();

const useVehicle = (vehicle: Vehicle) => {
    vehicle.drive();
    if (vehicle instanceof Truck) { // type guard, el instanceOf solo puede ser usado en classes
        vehicle.loadCargo(10000);
    }
}

useVehicle(v1);
useVehicle(v2);

// Discriminated Unions
interface Bird {
    type: "bird"; // Discriminated Unions
    flyingSpeed: number;
}

interface Horse {
    type: "horse"; // Discriminated Unions
    runningSpeed: number;
}

type Animal = Bird | Horse;

const moveAnimal = (animal: Animal) => {
    let speed;

    switch (animal.type) { // Discriminated Unions aplicado
        case "bird":
            speed = animal.flyingSpeed;
            break;
        case "horse":
            speed = animal.runningSpeed;
            break;
    }
    console.log(`Va a una velocidad de ${speed}`)
}

moveAnimal({type: "bird", flyingSpeed: 10000});

// Type Casting
// sirve para indicarle en ciertos momentos que TYPE sera cuando TS no sabe identificarlo
//const userInputElement =<HTMLInputElement>document.getElementById("userInput")!;
const userInputElement = document.getElementById("user-input")! as HTMLInputElement;

userInputElement.value = "Hi Guys";

//Index Properties
interface ErrorContainer {
    [prop: string]: string;
}

const errorBag: ErrorContainer = {
    email: "Not a valid email",
    username: "Must start with a capital letter"
}

//Function Overloads
//Optional Chaining
// ponemos el ? para si no tenemos claro si un campo esta populado o existe y evitar un error
const fetchedUserData = {
    id: "u1",
    name: "Yare",
    job: { title: "SE", description: "Frontend Developer" }
}

console.log(fetchedUserData?.job.title);

// Nullish Coalescing
const userInputNullish = undefined;

const storedData = userInputNullish ?? "DEFAULT"; // Con ?? le decimos que si el valor de userInput es NULL o UNDEFINED, coja el siguiente valor

console.log(storedData);