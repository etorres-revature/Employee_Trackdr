//import dependencies for this file:
//1. npm inquirer library;
const inquirer = require("inquirer");
//2. the local file that contains the logic for the inquirer promise
const answer = require("./inquirerAnswers");

//this function is called by the index file and at the end of each of the funcitons to go back to the prompts
function inquirerPrompts() {
  inquirer
    .prompt({
      name: "choice",
      type: "rawlist",
      message: "What would you like to accomplish today?",
      //prompts to display in the command line for app functionality
      choices: [
        "View all Departments",
        "View all Roles",
        "View all Employees",
        "Add new Department",
        "Add new Role",
        "Add new Employee",
        "Update Department",
        "Update Role",
        "Update Employee Role",
        "Update Employee Manager",
        "View Employees by Manager",
        "View Employees by Department",
        "Delete Department",
        "Delete Role",
        "Delete Employee",
        "View total budget by Department",
        "View total budget of Department",
        "Exit",
      ],
    })
    //promise function contained in separate local file
    .then(answer.answers);
}

//export of this file for use by other modules
module.exports.prompts = inquirerPrompts;
