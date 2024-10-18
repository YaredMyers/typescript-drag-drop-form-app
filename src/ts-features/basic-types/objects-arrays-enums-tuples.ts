/*const person: { Esto es un object
    name: string; Esto es un string
    age: number; Esto es un number
    hobbies: string[];
    role: [number, string];
} = {
    name: "Yared",
    age: 34,
    hobbies: ["Sports", "Cooking"], Esto es un array, no se mezclan types salvo que sea any[] lo cual no se recomienda
    role: [2, "author"] Esto es una tupla, puede mezclar types pero es de length fija
};*/

enum Role { ADMIN, READ_ONLY, AUTHOR}
//enum Role { ADMIN = 4, READ_ONLY, AUTHOR = 10};
//enum Role { ADMIN = "ADMIN", READ_ONLY = "READ_ONLY", AUTHOR}; Ejemplos de enum

const person=  {
    name: "Yared",
    age: 34,
    hobbies: ["Sports", "Cooking"],
    role: Role.ADMIN,
};

let favoriteActivities: string[];
favoriteActivities = ["Sports"];

console.log(person);

for (const hobby of person.hobbies) {
    console.log(hobby);
}