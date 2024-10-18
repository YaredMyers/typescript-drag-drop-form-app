"use strict";
let userInput;
let userName;
userInput = 5;
userInput = "Yared";
if (typeof userInput === "string") {
    userName = userInput;
}
const generateError = (message, code) => {
    throw { message: message, errorCode: code };
};
generateError("Booom, you died!", 500);
