//importing dependencies for this file
//console.table nmp library to display MySQL in console
const cTable = require("console.table");
//connection to connect to MySQL database
const connection = require("./connection");
//to go back to inquirer prompts contained in local file
const inquireMod = require("./inquirerPrompts");
//importing the npm inquirer library
const inquirer = require("inquirer");

//displays all departments in company
function viewDepts() {
  //query logic to pull all departments
    const query = "SELECT * FROM department";
    //calling the connection and passing in the query
    connection.query(query, (err, res) => {
      //error handling
      if (err) throw err;
      //generating table of departments
      const table = cTable.getTable(res);
      //sending the table to the console
      console.log(table);
      //returning the program to the file containning the inquirer prompts
      inquireMod.prompts();
    });
  }

  //adding new department to the department table
  function addDept() {
    //inquirer prompts to gather user information
    inquirer
    //function to collect user input
      .prompt([
        //collecting the name of the new Department
        {
          name: "newDepartment",
          type: "input",
          message: "Please input the name of the new Department",
        },
      ])
      //promise to do after the inquirer prompts collect user information
      .then((data) => {
        //creating the query for setting the department in the department table
        const query = "INSERT INTO department SET ?";
        //making an object of the table row and corresponding infromation to put in that field
        const newDept = {
          name: data.newDepartment,
        };
        //calling the connection file and passing in the query and object of user input to the MySQL database
        connection.query(query, newDept, (err, res) => {
          //error handling
          if (err) throw err;
          //console success message
          console.log("New Department successfully added!");
          //returning the program to the file containing the inquirer prompts
          inquireMod.prompts();
        });
      });
  }

  //function to delete a department from the department table
  function deleteDept() {
    //calling inquirer
    inquirer
    //function to determine user inputs
      .prompt([
        //asking the user to enter the name of the department to be deleted
        {
          name: "department",
          type: "input",
          message: "Enter the name of the Department you would like to delete.",
        },
      ])
      //promise to return after user input
      .then((data) => {
        //setting DELETE query on role table WHERE the department name is equal to the user input
        const query = "DELETE FROM department WHERE ?";
        //object containing the table row name and user input
        const deleteDept = {
          name: data.department,
        };
        //calling the connection file and passing in the query and object of user input to the MySQL database
        connection.query(query, deleteDept, (err, res) => {
          //error handling
          if (err) throw err;
          //console success message
          console.log(
            "This Department has been deleted from the company records."
          );
          //returning the program to the file contaiing the inquirer prompts
          inquireMod.prompts();
        });
      });
  }

  //exporting the CRUD functions (minus the "U") from this module for use by other modules
  module.exports = {
      create: addDept,
      read: viewDepts,
      delete: deleteDept
  }