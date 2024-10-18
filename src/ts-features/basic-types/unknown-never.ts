//type unknown se usa para cuando no sabemos el type que vamos a recibir (string, number, etc)
// a diferencia del type any que permite hacer lo que sea y no pone restricciones
let userInput: unknown;
let userName: string;

userInput = 5;
userInput = "Yared";

if (typeof userInput === "string") {
    userName = userInput;
}

// the never type es parecido al void, se usa para poner de manera EXPLÍCITA, que una función no va a devolver NADA, aunque realmente podemos obviarlo porque la función ya lo hace por inferido como void, es una buena práctica
const generateError = (message: string, code: number) : never => {
    throw {message: message, errorCode: code}
}

generateError("Booom, you died!", 500)


