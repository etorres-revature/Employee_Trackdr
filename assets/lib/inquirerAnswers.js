const department = require("./department");
const role = require("./role");
const employee = require("./employee");
const connection = require("./connection");

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
  
      case "Update Employee Role":
        role.update();
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

  module.exports = {
      answers: promptAnswer
  }