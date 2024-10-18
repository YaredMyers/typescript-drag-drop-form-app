// con tsc "file" compilamos un archivo concreto UNA TIRADA
// con tsc "file -w (o --watch) nos ponemos a escuchar all el rato un archivo
// con tsc --init se crea un archivo tsconfig.json que nos permitirá compilar all el proyecto posteriormente solo ejecutando el comando tsc
// const tsc -w nos ponemos en modo vigilancia de ALL el proyecto

// en tsconfig.json tenemos la opcion sourceMap, si la descomentamos y ponemos a true, podemos ver los archivos .ts en el navegador en la pestaña source y hacer debug
// en tsconfig.json tenemos la opcion outDir, si la descomentamos y ponemos el directorio (ej dist) al compilar los .js irán allí
// podemos añadir noEmitOnError y settearlo a false o true, lo cual impide que se genere un .js file si el .ts tiene errores que solucionar

/*
const button = document.querySelector("button")!;

button.addEventListener("click", () => {
    console.log("clicked");
})*/

// TS CLASSES
// poniendo private nos aseguramos de que las propiedades o metodos de la clase no sean modificables desde fuera
// la diferencia entre private y protected es que la segunda nos deja acceder y modificarla en otras clases extendidas de la primera mientras que con private no
// con static lo que hacemos es permitir acceder a esa variable o prop sin necesidad de conocer el resto de la class
// poniendo abstract es para que las clases que extienden de otra clase base, puedan usar metodos imponiendose (ejemplo del describe())
abstract class Department {
    //private name: string;
    protected employees: string[] = [];
    static fiscalYear = 2024;

    constructor(protected readonly id: string, public name: string) { //con esta forma nos ahorramos declararlo arriba
        //this.name = n;
    }

    abstract describe(this: Department): void;

    addEmployee(employee: string) {
        this.employees.push(employee);
    }

    printEmployeeInformation() {
        console.log(`Printing Employee Information`);
        console.log(this.employees.length);
        console.log(this.employees);
    }
}

class ITDepartment extends Department {
    admins: string[];

    constructor(id: string, admins: string[]) {
        super(id, "IT");
        this.admins = admins;
    }

    describe() {
        console.log(`IT Department - ID: ${this.id}`);
    }
}

class AccountingDepartment extends Department {
    private lastReport: string;

    describe() {
        console.log("Accounting Department");
    }

    get mostRecentReport() {
        if (this.lastReport) {
            return this.lastReport;
        }
        throw new Error("No recent report");
    }

    set mostRecentReport(value: string) {
        if (!value) {
            throw new Error("No recent report");
        }
        this.addReport(value);
    }

    constructor(id: string, private reports: string[]) {
        super(id, "AccountingDepartment");
        this.lastReport = reports[0];
    }

    addEmployee(name: string) {
        if (name === "Yared") {
            return;
        }
        this.employees.push(name);
    }

    addReport(text:string) {
        this.reports.push(text);
        this.lastReport = text;
    }

    printReports() {
        console.log(this.reports);
    }
}

//const department = new Department("Sec.1","Accounting");
const it = new ITDepartment("Sec.2", ["Yared"]);
const accounting = new AccountingDepartment("Sec.3", []);

/*department.describe();
department.addEmployee("Yare");
department.addEmployee("Lore");
department.printEmployeeInformation();*/
console.log(`Fiscal Year: ${Department.fiscalYear}`);

it.describe();
it.addEmployee("Lore");
it.addEmployee("Morri");
it.printEmployeeInformation();

accounting.describe();
accounting.mostRecentReport = "FUCK!";
accounting.addReport("BANKRUPTCY!");
console.log(accounting.mostRecentReport)
accounting.printReports();


