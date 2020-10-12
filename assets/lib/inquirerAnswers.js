//importing dependincies for this file
//the local file with department table CRUD functions
const department = require("./department");
//the local file with the role table CRUD functions
const role = require("./role");
//the local file with the employee table CRUD functions
const employee = require("./employee");
//the local file with the connection information for the MySQL database
const connection = require("./connection");

function promptAnswer({ choice }) {
  //switch case for each of the inquirer prompts
  //with associated call to local files/modules and corresponding functions
  switch (choice) {
    case "View all Departments":
      department.read();
      break;

    case "View all Roles":
      role.read();
      break;

    case "View all Employees":
      employee.read();
      break;

    case "Add new Department":
      department.create();
      break;

    case "Add new Role":
      role.create();
      break;

    case "Add new Employee":
      employee.create();
      break;

    case "Update Department":
      department.update();
      break;

    case "Update Role":
      role.update();
      break;

    case "Update Employee Role":
      employee.updateRole();
      break;

    case "Update Employee Manager":
      employee.updateMan();
      break;

    case "View Employees by Manager":
      employee.empByMan();
      break;

    case "View Employees by Department":
      employee.empByDept();
      break;

    case "Delete Department":
      department.delete();
      break;

    case "Delete Role":
      role.delete();
      break;

    case "Delete Employee":
      employee.delete();
      break;

    case "View total budget by Department":
      employee.companyBudget();
      break;

    case "View total budget of Department":
      employee.deptBudget();
      break;

    case "Exit":
    default:
      console.log(
        "Thank you for using the company Content Management System (CMS).  See you again real soon."
      );
      connection.end();
  }
}

//export of this file for use by other modules
module.exports = {
  answers: promptAnswer,
};
