"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
const Logger = (logString) => {
    return function (constructor) {
        console.log(logString);
        console.log(constructor);
    };
};
const WithTemplate = (template, hookId) => {
    return function (constructor) {
        console.log("Rendering template");
        const hookEl = document.getElementById(hookId);
        const p = new constructor();
        if (hookEl) {
            hookEl.innerHTML = template;
            hookEl.querySelector("h1").textContent = p.name;
        }
    };
};
let DecoratorPerson = class DecoratorPerson {
    constructor() {
        this.name = "Jacinto";
        console.log("Creating Person...");
    }
};
DecoratorPerson = __decorate([
    Logger("LOGGING"),
    WithTemplate("<h1>My Person Object</h1>", "app")
], DecoratorPerson);
const pers = new DecoratorPerson();
console.log(pers);
const Log = (target, propertyName) => {
    console.log("Property Decorator!");
    console.log(target, propertyName);
};
const Log2 = (target, name, descriptor) => {
    console.log("Accessor decorator!");
    console.log(target);
    console.log(name);
    console.log(descriptor);
};
class DecoratorProduct {
    set price(val) {
        if (val > 0) {
            this._price = val;
        }
        else {
            throw new Error("Invalid price-Should be positive!");
        }
    }
    constructor(t, p) {
        this.title = t;
        this._price = p;
    }
    getPriceWithTax(tax) {
        return this._price * (1 + tax);
    }
}
__decorate([
    Log
], DecoratorProduct.prototype, "title", void 0);
__decorate([
    Log2
], DecoratorProduct.prototype, "price", null);
