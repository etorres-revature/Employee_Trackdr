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
  database: "company_db",
});

//connect to the MySQL server, and call for inquirere prompts when connected
connection.connect((err) => {
  if (err) throw err;
  inquirerPrompts();
});

function inquirerPrompts() {
  inquirer
    .prompt({
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
        "View total budget of Department",
        "Exit"
      ],
    })
    .then(promptAnswer);
}

function promptAnswer({ choice }) {
  switch (choice) {
    case "View all Departments":
      viewDepartments();
      break;

    case "View all Roles":
      viewRoles();
      break;

    case "View all Employees":
      viewEmployees();
      break;

    case "Add new Department":
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

    case "Exit":
    default:
      console.log(
        "Thank you for using the company Content Management System (CMS).  See you again real soon."
      );
      connection.end();
  }
}

function viewDepartments() {
  const query = "SELECT * FROM department";
  connection.query(query, (err, res) => {
    if (err) throw err;
    const table = cTable.getTable(res);
    console.log(table);
    inquirerPrompts();
  });
}

function viewRoles() {
  const query = "SELECT * FROM role";
  connection.query(query, (err, res) => {
    if (err) throw err;
    const table = cTable.getTable(res);
    console.log(table);
    inquirerPrompts();
  });
}

function viewEmployees() {
  const query = "SELECT * FROM employee";
  connection.query(query, (err, res) => {
    if (err) throw err;
    const table = cTable.getTable(res);
    console.log(table);
    inquirerPrompts();
  });
}

function addDepartment() {
  inquirer
    .prompt([
      {
        name: "newDepartment",
        type: "input",
        message: "Please input the name of the new Department",
      },
    ])
    .then((data) => {
      const query = "INSERT INTO department SET ?";
      const newDept = {
          name: data.newDepartment
      }
      connection.query(query, newDept, (err, res) => {
        if (err) throw err;
        console.log("New Department successfully added!")
        inquirerPrompts();
      });
    });
}
function addRole() {
  inquirer
    .prompt([
      {
        name: "title",
        type: "input",
        message: "Please input the title for the new role.",
      },
      {
        name: "salary",
        type: "input",
        message: "Please input the salary for the new role.",
      },
      {
        name: "department_id",
        type: "input",
        message: "Please input the Department ID for the new role.",
      },
    ])
    .then((data) => {
      const query = "INSERT INTO role SET ?";
        const newRole = {
        title: data.title,
        salary: data.salary,
        department_id: data.department_id
         }
      connection.query(query, newRole, (err, res) => {
        if (err) throw err;
        console.log("New Role successfully added.")
        inquirerPrompts();
      });
    });
}
function addEmployee() {
  inquirer
    .prompt([
      {
        name: "empFName",
        type: "input",
        message: "Please input new employee's first name.",
      },
      {
        name: "empLName",
        type: "input",
        message: "Please input the new employee's last name.",
      },
      {
        name: "empRole",
        type: "input",
        message: "Please input the Role ID for the new employee.",
      },
      {
        name: "empManager",
        type: "input",
        message: "Please input Employee ID of the new employee (Please leave blank if the employee is a manager).",
      },
    ])
    .then((data) => {
      const query = "INSERT INTO employee SET ?";
      const newEmp = {
          first_name: data.empFName,
          last_name: data.empLName,
          role_id: data.empRole,
          manager_id: data.empManager
      }
      connection.query(query, newEmp, (err, res) => {
        if (err) throw err;
        console.log("New Employee successfully added.")
        inquirerPrompts();
      });
    });
}

function updateRole() {
    inquirer([{
        name: "employee",
        type: "input",
        message: "Enter the ID of the Employee whose Role you would like to update."
    },
{
    name: "role",
    type: "input",
    message: "Enter the new Role ID for this Employee."
}]).then(data => {

})
}