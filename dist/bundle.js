"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
define("src/components/base-components", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Component = void 0;
    class Component {
        constructor(templateId, hostElementId, insertAtStart, newElementId) {
            this.templateElement = document.getElementById(templateId);
            this.hostElement = document.getElementById(hostElementId);
            const importedNode = document.importNode(this.templateElement.content, true);
            this.element = importedNode.firstElementChild;
            if (newElementId) {
                this.element.id = newElementId;
            }
            this.attach(insertAtStart);
        }
        attach(insertAtBeginning) {
            this.hostElement.insertAdjacentElement(insertAtBeginning ? "afterbegin" : "beforeend", this.element);
        }
    }
    exports.Component = Component;
});
define("src/util/validation", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.validate = void 0;
    const validate = (validatableInput) => {
        let isValid = true;
        if (validatableInput.required) {
            isValid = isValid && validatableInput.value.toString().trim().length !== 0;
        }
        if (validatableInput.minLength != null && typeof validatableInput.value === "string") {
            isValid = isValid && validatableInput.value.length >= validatableInput.minLength;
        }
        if (validatableInput.maxLength != null && typeof validatableInput.value === "string") {
            isValid = isValid && validatableInput.value.length <= validatableInput.maxLength;
        }
        if (validatableInput.min != null && typeof validatableInput.value === "number") {
            isValid = isValid && validatableInput.value >= validatableInput.min;
        }
        if (validatableInput.max != null && typeof validatableInput.value === "number") {
            isValid = isValid && validatableInput.value <= validatableInput.max;
        }
        return isValid;
    };
    exports.validate = validate;
});
define("src/decorators/autobind", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.autobind = void 0;
    const autobind = (_, _2, descriptor) => {
        const originalMethod = descriptor.value;
        const adjDescriptor = {
            configurable: true,
            get() {
                const boundFn = originalMethod.bind(this);
                return boundFn;
            }
        };
        return adjDescriptor;
    };
    exports.autobind = autobind;
});
define("src/models/project", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Project = exports.ProjectStatus = void 0;
    var ProjectStatus;
    (function (ProjectStatus) {
        ProjectStatus[ProjectStatus["Active"] = 0] = "Active";
        ProjectStatus[ProjectStatus["Finished"] = 1] = "Finished";
    })(ProjectStatus || (exports.ProjectStatus = ProjectStatus = {}));
    class Project {
        constructor(id, title, description, people, status) {
            this.id = id;
            this.title = title;
            this.description = description;
            this.people = people;
            this.status = status;
        }
    }
    exports.Project = Project;
});
define("src/state/project-state", ["require", "exports", "src/models/project"], function (require, exports, project_js_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.projectState = exports.ProjectState = void 0;
    class State {
        constructor() {
            this.listeners = [];
        }
        addListener(listenerFn) {
            this.listeners.push(listenerFn);
        }
    }
    class ProjectState extends State {
        constructor() {
            super();
            this.projects = [];
        }
        static getInstance() {
            if (this.instance) {
                return this.instance;
            }
            this.instance = new ProjectState();
            return this.instance;
        }
        moveProject(projectId, newStatus) {
            const project = this.projects.find(prj => prj.id === projectId);
            if (project && project.status !== newStatus) {
                project.status = newStatus;
                this.updateListeners();
            }
        }
        updateListeners() {
            for (const listenerFn of this.listeners) {
                listenerFn(this.projects.slice());
            }
        }
        addProject(title, description, numOfPeople) {
            const newProject = new project_js_1.Project(Math.random().toString(), title, description, numOfPeople, project_js_1.ProjectStatus.Active);
            this.projects.push(newProject);
            this.updateListeners();
        }
    }
    exports.ProjectState = ProjectState;
    exports.projectState = ProjectState.getInstance();
});
define("src/components/project-input", ["require", "exports", "src/components/base-components", "src/util/validation", "src/decorators/autobind", "src/state/project-state"], function (require, exports, base_components_js_1, validation_js_1, autobind_js_1, project_state_js_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ProjectInput = void 0;
    class ProjectInput extends base_components_js_1.Component {
        constructor() {
            super("project-input", "app", true, "user-input");
            this.titleInputElement = this.element.querySelector("#title");
            this.descriptionInputElement = this.element.querySelector("#description");
            this.peopleInputElement = this.element.querySelector("#people");
            this.configure();
        }
        configure() {
            this.element.addEventListener("submit", this.submitHandler);
        }
        renderContent() {
        }
        gatherUserInput() {
            const enteredTitle = this.titleInputElement.value;
            const enteredDescription = this.descriptionInputElement.value;
            const enteredPeople = this.peopleInputElement.value;
            const titleValidatable = {
                value: enteredTitle,
                required: true,
            };
            const descriptionValidatable = {
                value: enteredDescription,
                required: true,
                minLength: 5
            };
            const peopleValidatable = {
                value: enteredPeople,
                required: true,
                min: 1,
                max: 5
            };
            if (!(0, validation_js_1.validate)(titleValidatable) ||
                !(0, validation_js_1.validate)(descriptionValidatable) ||
                !(0, validation_js_1.validate)(peopleValidatable)) {
                alert("Invalid input, please try again");
                return;
            }
            else {
                return [enteredTitle, enteredDescription, +enteredPeople];
            }
        }
        clearInputs() {
            this.titleInputElement.value = "";
            this.descriptionInputElement.value = "";
            this.peopleInputElement.value = "";
        }
        submitHandler(event) {
            event.preventDefault();
            const userInput = this.gatherUserInput();
            if (Array.isArray(userInput)) {
                const [title, desc, people] = userInput;
                project_state_js_1.projectState.addProject(title, desc, people);
                this.clearInputs();
            }
        }
    }
    exports.ProjectInput = ProjectInput;
    __decorate([
        autobind_js_1.autobind
    ], ProjectInput.prototype, "submitHandler", null);
});
define("src/models/drag-drop", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});
define("src/components/project-item", ["require", "exports", "src/components/base-components", "src/decorators/autobind"], function (require, exports, base_components_js_2, autobind_js_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ProjectItem = void 0;
    class ProjectItem extends base_components_js_2.Component {
        get persons() {
            if (this.project.people === 1) {
                return "1 Person";
            }
            else {
                return `${this.project.people} persons`;
            }
        }
        constructor(hostID, project) {
            super("single-project", hostID, false, project.id);
            this.project = project;
            this.configure();
            this.renderContent();
        }
        dragStartHandler(event) {
            event.dataTransfer.setData("text/plain", this.project.id);
            event.dataTransfer.effectAllowed = "move";
        }
        dragEndHandler(_) {
            console.log("DragEnd");
        }
        configure() {
            this.element.addEventListener("dragstart", this.dragStartHandler);
            this.element.addEventListener("dragend", this.dragEndHandler);
        }
        renderContent() {
            this.element.querySelector("h2").textContent = this.project.title;
            this.element.querySelector("h3").textContent = this.persons + " assigned.";
            this.element.querySelector("p").textContent = this.project.description;
        }
    }
    exports.ProjectItem = ProjectItem;
    __decorate([
        autobind_js_2.autobind
    ], ProjectItem.prototype, "dragStartHandler", null);
});
define("src/components/project-list", ["require", "exports", "src/components/base-components", "src/models/project", "src/decorators/autobind", "src/state/project-state", "src/components/project-item"], function (require, exports, base_components_js_3, project_js_2, autobind_js_3, project_state_js_2, project_item_js_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ProjectList = void 0;
    class ProjectList extends base_components_js_3.Component {
        constructor(type) {
            super("project-list", "app", false, `${type}-projects`);
            this.type = type;
            this.assignedProjects = [];
            this.configure();
            this.renderContent();
        }
        dragOverHandler(event) {
            if (event.dataTransfer && event.dataTransfer.types[0] === "text/plain") {
                event.preventDefault();
                const listEl = this.element.querySelector("ul");
                listEl.classList.add("droppable");
            }
        }
        dropHandler(event) {
            const prjId = event.dataTransfer.getData("text/plain");
            project_state_js_2.projectState.moveProject(prjId, this.type === "active" ? project_js_2.ProjectStatus.Active : project_js_2.ProjectStatus.Finished);
        }
        dragLeaveHandler(_) {
            const listEl = this.element.querySelector("ul");
            listEl.classList.remove("droppable");
        }
        renderProjects() {
            const listEl = document.getElementById(`${this.type}-project-list`);
            listEl.innerHTML = "";
            for (const prjItem of this.assignedProjects) {
                new project_item_js_1.ProjectItem(this.element.querySelector("ul").id, prjItem);
            }
        }
        configure() {
            this.element.addEventListener("dragover", this.dragOverHandler);
            this.element.addEventListener("dragleave", this.dragLeaveHandler);
            this.element.addEventListener("drop", this.dropHandler);
            project_state_js_2.projectState.addListener((projects) => {
                const relevantProjects = projects.filter(prj => {
                    if (this.type === "active") {
                        return prj.status === project_js_2.ProjectStatus.Active;
                    }
                    return prj.status === project_js_2.ProjectStatus.Finished;
                });
                this.assignedProjects = relevantProjects;
                this.renderProjects();
            });
        }
        renderContent() {
            const listId = `${this.type}-project-list`;
            this.element.querySelector("ul").id = listId;
            this.element.querySelector("h2").textContent = this.type.toUpperCase() + " PROJECTS";
        }
    }
    exports.ProjectList = ProjectList;
    __decorate([
        autobind_js_3.autobind
    ], ProjectList.prototype, "dragOverHandler", null);
    __decorate([
        autobind_js_3.autobind
    ], ProjectList.prototype, "dropHandler", null);
    __decorate([
        autobind_js_3.autobind
    ], ProjectList.prototype, "dragLeaveHandler", null);
});
define("app", ["require", "exports", "src/components/project-input", "src/components/project-list"], function (require, exports, project_input_js_1, project_list_js_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    new project_input_js_1.ProjectInput();
    new project_list_js_1.ProjectList("active");
    new project_list_js_1.ProjectList("finished");
});
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
console.log("Listening another file not app.js....");
function addBasicSum(n1, n2, showResult, phrase) {
    const result = n1 + n2;
    if (showResult) {
        console.log(phrase + result);
    }
    else {
        return result;
    }
}
const number1 = 5;
const number2 = 2.8;
const printBasicsResult = true;
const resultPhrase = "Result is: ";
const result = addBasicSum(number1, number2, printBasicsResult, resultPhrase);
console.log(result);
const add = (n1, n2) => {
    return n1 + n2;
};
const printResult = (num) => {
    console.log("Result: " + num);
};
const addAndHandle = (n1, n2, cb) => {
    const result = n1 + n2;
    cb(result);
};
printResult(add(5, 12));
let combinedValues;
combinedValues = add;
console.log(combinedValues(8, 8));
addAndHandle(10, 20, (result) => {
    console.log(result);
});
var Role;
(function (Role) {
    Role[Role["ADMIN"] = 0] = "ADMIN";
    Role[Role["READ_ONLY"] = 1] = "READ_ONLY";
    Role[Role["AUTHOR"] = 2] = "AUTHOR";
})(Role || (Role = {}));
const person = {
    name: "Yared",
    age: 34,
    hobbies: ["Sports", "Cooking"],
    role: Role.ADMIN,
};
let favoriteActivities;
favoriteActivities = ["Sports"];
console.log(person);
for (const hobby of person.hobbies) {
    console.log(hobby);
}
function combine(input1, input2) {
    let result;
    if (typeof input1 === "number" && typeof input2 === "number") {
        result = input1 + input2;
    }
    else {
        result = input1.toString() + input2.toString();
    }
    return result;
}
const combinedAges = combine(30, 26);
console.log(combinedAges);
const combinedNames = combine("Yared", "Lore");
console.log(combinedNames);
function combineLiteral(input1, input2, resultConversion) {
    let result;
    if (typeof input1 === "number" && typeof input2 === "number") {
        result = input1 + input2;
    }
    else {
        result = input1.toString() + input2.toString();
    }
    if (resultConversion === "as-number") {
        return +result;
    }
    else {
        return result.toString();
    }
}
const combinedLiteralAges = combineLiteral(30, 26, "as-number");
console.log(combinedAges);
const combinedStringAges = combineLiteral("30", "26", "as-number");
console.log(combinedStringAges);
const combinedLiteralNames = combineLiteral("Yared", "Lore", "as-text");
console.log(combinedNames);
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
class Department {
    constructor(id, name) {
        this.id = id;
        this.name = name;
        this.employees = [];
    }
    addEmployee(employee) {
        this.employees.push(employee);
    }
    printEmployeeInformation() {
        console.log(`Printing Employee Information`);
        console.log(this.employees.length);
        console.log(this.employees);
    }
}
Department.fiscalYear = 2024;
class ITDepartment extends Department {
    constructor(id, admins) {
        super(id, "IT");
        this.admins = admins;
    }
    describe() {
        console.log(`IT Department - ID: ${this.id}`);
    }
}
class AccountingDepartment extends Department {
    describe() {
        console.log("Accounting Department");
    }
    get mostRecentReport() {
        if (this.lastReport) {
            return this.lastReport;
        }
        throw new Error("No recent report");
    }
    set mostRecentReport(value) {
        if (!value) {
            throw new Error("No recent report");
        }
        this.addReport(value);
    }
    constructor(id, reports) {
        super(id, "AccountingDepartment");
        this.reports = reports;
        this.lastReport = reports[0];
    }
    addEmployee(name) {
        if (name === "Yared") {
            return;
        }
        this.employees.push(name);
    }
    addReport(text) {
        this.reports.push(text);
        this.lastReport = text;
    }
    printReports() {
        console.log(this.reports);
    }
}
const it = new ITDepartment("Sec.2", ["Yared"]);
const accounting = new AccountingDepartment("Sec.3", []);
console.log(`Fiscal Year: ${Department.fiscalYear}`);
it.describe();
it.addEmployee("Lore");
it.addEmployee("Morri");
it.printEmployeeInformation();
accounting.describe();
accounting.mostRecentReport = "FUCK!";
accounting.addReport("BANKRUPTCY!");
console.log(accounting.mostRecentReport);
accounting.printReports();
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
