const inquirer = require("inquirer");
const department = require("./department");
const role = require("./role");
const employee = require("./employee");
const connection = require("./connection");


function inquirerPrompts() {
    inquirer
      .prompt({
        name: "choice",
        type: "rawlist",
        message: "What would you like to accomplish today?",
        choices: [
          "View all Departments",
          "View all Roles",
          "View all Employees",
          "Add new Department",
          "Add new Role",
          "Add new Employee",
          "Update Employee Deptartment",
          "Update Employee Role",
          "Update Employee Manager",
          "View Employees by Manager",
          "View Employees by Department",
          "Delete Department",
          "Delete Role",
          "Delete Employee",
          "View total budget of Department",
          "Exit",
        ],
      })
      .then(promptAnswer);
  }

  function promptAnswer({ choice }) {
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

      case "Update Employee Deptartment":
        department.update();
        break;
  
      case "Update Employee Role":
        role.update();
        break;
  
      case "Update Employee Manager":
        emmployee.updateMan();
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
  
      case "View total budget of Department":
        employee.empByBudget();
        break;
  
      case "Exit":
      default:
        console.log(
          "Thank you for using the company Content Management System (CMS).  See you again real soon."
        );
        connection.end();
    }
  }

  module.exports = {
      prompts: inquirerPrompts
  }