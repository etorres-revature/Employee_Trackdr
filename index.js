//import dependencies
const mysql = require("mysql");
const inquirer = require("inquirer");
const cTable = require("console.table");

//create/configure connection to the MySQL database
const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "",
    database: "company_db"
});

//connect to the MySQL server, and call for inquirere prompts when connected
connection.connect(err => {
    if (err) throw err;
    inquirerPrompts();
});

function inquirerPrompts() {
    inquirer.prompt({
        name: "choice",
        type: "rawlist",
        messabge: "What would you like to accomplish today?",
        choices: [
            "View all Departments",
            "View all Roles",
            "View all Employees",
            "Add new Department", 
            "Add new Role",
            "Add new Employee",
            "Update Employee Role",
            "Update Employee Manager",
            "View Employees by Manager",
            "Delete Department", 
            "Delete Role", 
            "Delete Employee",
            "View total budget of Department"
        ]
    }).then(promptAnswer);
}

function promptAnswer({ choice }) {
    switch(choice){
        case "View all Departments":
            viewDepartments();
        break;

        case "View all Roles":
            viewRoles();
        break;

        case "View all Employees":
            viewEmployees();
        break;

        case"Add new Department":
            addDepartment();
        break;

        case "Add new Role":
            addRole();
        break;

        case "Add new Employee":
            addEmployee();
        break;

        case "Update Employee Role":
            updateRole();
        break;

        case "Update Employee Manager":
            updateManager();
        break;

        case "View Employees by Manager":
            viewEmployeesByManager();
        break;

        case "Delete Department":
            deleteDepartment();
        break;
        case "Delete Role":
            deleteRole();
        break;

        case "Delete Employee":
            deleteEmployee();
        break;

        case "View total budget of Department":
            viewTotalBudgetDept();
        break;
    }
}

function viewDepartments() {
       const query = "SELECT * FROM department";
       connection.query(query, (err, res) => {
           if (err) throw err;
           const table = cTable.getTable(res);
           console.log(table);
       })
}