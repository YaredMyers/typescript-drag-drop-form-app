// interface se usa para definir la estructura de un objeto
interface Named {
    readonly name: string;
    outputName?: string; // ? le dice que este campo es OPCIONAL
}

interface Greetable extends Named { // aqui podemos extender para que una interface adquiera values de otras, podemos poner tantas como queramos
    greet(phrase: string): void;
}

class Person implements Greetable { //aqui podemos implementar para que la clase tenga tantas interfaces como queramos
    name: string;
    age = 30;

    constructor(n: string) {
        this.name = n;
    }

    greet(phrase: string): void {
        if (this.name) {
            console.log(`Hi There, I'm ${phrase}`);
        } else {
            console.log("Hello")
        }
    }
}

let user1: Greetable;
let user2: Greetable;

user1 = {
    name: "Yare",
    greet(phrase: string) {
        console.log(`Hi There, I'm ${phrase}`);
    }
}

user2 = new Person("Loren")
console.log(user2);


user1.greet(user1.name);
user2.greet(user2.name);

// interfaces as function types
//type AddFn = (a: number, b: number) => number; normal way

interface AddFn {
    (a: number, b: number): number;
}

let addWithInterface: AddFn;

addWithInterface = (n1: number, n2: number) => {
    return n1 + n2;
}