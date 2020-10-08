const inquirer = require("inquirer");
const answer = require("./inquirerAnswers")


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
      .then(answer.answers);
  }

  module.exports.prompts = inquirerPrompts;