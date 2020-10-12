//importing dependncies for this file
//console.table npm library to display MySQL in console
const cTable = require("console.table");
//connection to connect to MySQL database
const connection = require("./connection");
//to go back to the inquirer prompts contained in local file
const inquireMod = require("./inquirerPrompts");
//importing the npm inquirer library
const inquirer = require("inquirer");

//displays all roles in company
function viewRoles() {
  //query logic to pull all roles
  const query = "SELECT * FROM role";
  //calling the connection and passing in the query
  connection.query(query, (err, res) => {
    //error handling
    if (err) throw err;
    //generating a table of roles
    const table = cTable.getTable(res);
    //sending the table to the console
    console.log(table);
    //returning the program to the inquirer prompts file
    inquireMod.prompts();
  });
}

//adding new role to role table
function addRole() {
  //calling inquirer
  inquirer
    //function to collect user input
    .prompt([
      //collecting the role "title"
      {
        name: "title",
        type: "input",
        message: "Please input the title for the new role.",
      },
      //collecting the salary integer
      {
        name: "salary",
        type: "input",
        message: "Please input the salary for the new role.",
      },
      //collecting the department id
      {
        name: "department_id",
        type: "input",
        message: "Please input the Department ID for the new role.",
      },
    ])
    //promise to do after inquirer prompts collect user infomation
    .then((data) => {
      //creating the query for setting the role in the role table
      const query = "INSERT INTO role SET ?";
      //making an object of table rows and user input that corresponds to that field
      const newRole = {
        title: data.title,
        salary: data.salary,
        department_id: data.department_id,
      };
      //calling the connection file and passing in the query and object of user input to the MySQL database
      connection.query(query, newRole, (err, res) => {
        //error handling
        if (err) throw err;
        //console success message
        console.log("New Role successfully added to the role table in the company database.");
        //returning the program to the file containing the inquirer prompts
        inquireMod.prompts();
      });
    });
}

//funtion to update an employee's role
function updateEmpRole() {
  //calling inquirer
  inquirer
    //function to collect user input
    .prompt([
      //asking for the ID of the employee whose role is to be updated
      {
        name: "employee",
        type: "input",
        message:
          "Enter the ID of the Employee whose Role you would like to update.",
      },
      //collecting the new role id for that employee
      {
        name: "role",
        type: "input",
        message: "Enter the new Role ID for this Employee.",
      },
    ])
    //promise to perform after user input
    .then((data) => {
      //querty to update the employee record WHERE the id is equal to the input and set it to the new role id infromation input by the user
      const query = "UPDATE employee SET ? WHERE ?";
      //object for what information to put into the question marks
      const newRole = [
        {
          role_id: data.role,
        },
        {
          id: data.employee,
        },
      ];
      //calling the connection file and passing in the query and object of user input to the MySQL database
      connection.query(query, newRole, (err, res) => {
        //error handling
        if (err) throw err;
        //console success message
        console.log("This Role has been updated in the role table.");
        //returning the program to the file containing the inquirer prompts
        inquireMod.prompts();
      });
    });
}

  //funtion to update a role
  function updateRole() {
    //calling inquirer
    inquirer
      //function to collect user input
      .prompt([
        //asking for the ID of the employee whose role is to be updated
        {
          name: "roleID",
          type: "input",
          message:
            "Enter the ID of the Role you would like to update.",
        },
        //collecting the new role id for that employee
        {
          name: "role",
          type: "input",
          message: "Enter the new Role title.",
        },
        {
          name: "salary",
          type: "input",
          message: "Enter the new salary for this role."
        }, 
        {
          name: "deptID",
          type: "input",
          message: "Enter the new Department ID for this role"
        }
      ])
      //promise to perform after user input
      .then((data) => {
        //querty to update the employee record WHERE the id is equal to the input and set it to the new role id infromation input by the user
        const query = "UPDATE role SET ? WHERE ?";
        //object for what information to put into the question marks
        const newRole = [
          {
            title: data.role,
            salary: data.salary,
            department_id: data.deptID
          },
          {
            id: data.roleID,
          },
        ];
        //calling the connection file and passing in the query and object of user input to the MySQL database
        connection.query(query, newRole, (err, res) => {
          //error handling
          if (err) throw err;
          //console success message
          console.log("The Role has been updated in the role table of the company database.");
          //returning the program to the file containing the inquirer prompts
          inquireMod.prompts();
        });
      });
  }

//function to delete a role from the role table
function deleteRole() {
  //calling inquirer
  inquirer
    //function to determine user inputs
    .prompt([
      //asking the user to enter the title of the Role that is no longer needed
      {
        name: "role",
        type: "input",
        message: "Enter the title of the Role you would like to delete.",
      },
    ])
    //promise to return after user input
    .then((data) => {
      //setting the DELETE query on the role table where title is equal to the user input
      const query = "DELETE FROM role WHERE ?";
      //object containing the table row title and user input
      const deleteRole = {
        title: data.role,
      };
      //calling the connection file and passing in the query and object of user input to the MySQL database
      connection.query(query, deleteRole, (err, res) => {
        //error handling
        if (err) throw err;
        //console success messsage
        console.log("This Role has been deleted from the company database.");
        //returning the program to the file containing the inquirer prompts
        inquireMod.prompts();
      });
    });
}

//exporting the CRUD functions from this module for use by other modules
module.exports = {
  create: addRole,
  read: viewRoles,
  update: updateRole,
  updateEmp: updateEmpRole,
  delete: deleteRole,
};
