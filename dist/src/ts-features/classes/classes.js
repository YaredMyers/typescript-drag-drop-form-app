"use strict";
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
