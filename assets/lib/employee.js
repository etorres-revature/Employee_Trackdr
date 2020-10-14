//importing dependncies for this file
//console.table npm library to display MySQL in console
const cTable = require("console.table");
//connection to connect to the MySQL database
const connection = require("./connection");
//to go back to the inquirer prompts contained in a local file
const inquireMod = require("./inquirerPrompts");
//importing the npm inquirer library
const inquirer = require("inquirer");

//displays all employees in company
function viewEmployees() {
  //query logic to pull all employees
  const query = "SELECT * FROM employee";
  //calling the connection and passing in the query
  connection.query(query, (err, res) => {
    //error handling
    if (err) throw err;
    //generating the table of employees
    const table = cTable.getTable(res);
    //sending the table to the console
    console.log(table);
    //returning the program to the inquirer prompts file
    inquireMod.prompts();
  });
}

//adding new employee to the employee table
function addEmployee() {
  //calling inquirer
  inquirer
    //function to collect user input
    .prompt([
      //collecting the employee first name
      {
        name: "empFName",
        type: "input",
        message: "Please input new employee's first name.",
      },
      //collecting employee last name
      {
        name: "empLName",
        type: "input",
        message: "Please input the new employee's last name.",
      },
      //collecting a role id for employee
      {
        name: "empRole",
        type: "input",
        message: "Please input the Role ID for the new employee.",
      },
      //collecting the employee id of the manager
      {
        name: "empManager",
        type: "input",
        message:
          "Please input Employee ID of the new employee (Please leave blank if the employee is a manager).",
      },
    ])
    //promise to do after inquirer prompts collect user information
    .then((data) => {
      //creating the query for setting the employee in the employee table
      const query = "INSERT INTO employee SET ?";
      //making an object of table rows and user input tha corresponds to that field
      const newEmp = {
        first_name: data.empFName,
        last_name: data.empLName,
        role_id: data.empRole,
        manager_id: data.empManager,
      };
      //calling the connection file and passing in the query and object of user input to the MySQL database
      connection.query(query, newEmp, (err, res) => {
        //error handling
        if (err) throw err;
        //console success message
        console.log("New Employee successfully added to the employee table of the company database.");
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
      //query to update the employee record WHERE the id is equal to the input and set it to the new role id infromation input by the user
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
        console.log("This Role has been updated in the employee table.");
        //returning the program to the file containing the inquirer prompts
        inquireMod.prompts();
      });
    });
}

//function to update manager for employee
function updateEmpManager() {
  //calling inquirer
  inquirer
    //function to collect user input
    .prompt([
      //collecting the employee id
      {
        name: "employee",
        type: "input",
        message:
          "Enter the ID of the Employee whose Manager you would like to update.",
      },
      //collecting the employee id of the manager for this employee
      {
        name: "manager",
        type: "input",
        message: "Enter the new Manager ID for this Employee.",
      },
    ])
    //promise to do after inquirer prompts collect user information
    .then((data) => {
      //creating the query string to update employee table at employee id with new manager id input from user
      const query = "UPDATE employee SET ? WHERE ?";
      //making an object of table rows and user input that corresponds to that field
      const newRole = [
        {
          manager_id: data.manager,
        },
        {
          id: data.employee,
        },
      ];
      //calling the connection file and passing in the query and object of user input to the MySQL database
      connection.query(query, newRole, (err, res) => {
        //error handling
        if (err) throw err;
        console.log("This Employee's record has been updated in the employee table of the company database.")
        //returning the program to the file containing the inquirer prompts
        inquireMod.prompts();
      });
    });
}

//function to view employees by manager
function viewEmployeesByManager() {
  //query string to concatenate the manager name and display the employees that report to that manager joining role by role id to employee, department by department id onto role, and an inner join on employee
  const query = `SELECT CONCAT(e2.first_name, " ", e2.last_name) AS Manager, e1.id AS EMPID, e1.first_name AS FName, e1.last_name AS LName, role.title AS Title, department.name AS Department, role.salary AS Salary FROM employee AS e1
      LEFT JOIN role on e1.role_id = role.id
      LEFT JOIN department ON role.department_id = department.id
      INNER JOIN employee AS e2 on e2.id=e1.manager_id
      ORDER BY manager ASC;`;
       //calling the connection file and passing in the query and object of user input to the MySQL database
  connection.query(query, (err, res) => {
    //error handling
    if (err) throw err;
    //generating a table from returned information
    const table = cTable.getTable(res);
    //sending the table to the console
    console.log(table);
    //returning the program to the inquirer prompts file
    inquireMod.prompts();
  });
}

//function to view employees by department
function viewEmployeesByDepartment() {
  //query string to select emplyees by id, display first and last name, and concatenate manager name from employee table, title and salary from role table, department from department table, 
  const query = `SELECT e1.id AS EMPID, e1.first_name AS FName, e1.last_name AS LName, role.title AS Title, department.name AS Department, role.salary AS Salary, CONCAT(e2.first_name, " ", e2.last_name) AS Manager FROM employee AS e1
      LEFT JOIN role on e1.role_id = role.id
      LEFT JOIN department ON role.department_id = department.id
      LEFT JOIN employee AS e2 on e2.id=e1.manager_id
      ORDER BY department ASC;`;
     //query string to concatenate the manager name and display the employees that report to that manager joining role by role id to employee, department by department id onto role, and an inner join on employee 
  connection.query(query, (err, res) => {
    //error handling
    if (err) throw err;
    //generating table from returned information
    const table = cTable.getTable(res);
    //sending table to the console
    console.log(table);
    //returning the program to the inquirer prompts file
    inquireMod.prompts();
  });
}

//function to delete employee from employee table
function deleteEmployee() {
  //calling inquirer
  inquirer
  //function to determine user inputs
    .prompt([
      //collecting employee id from user
      {
        name: "empID",
        type: "input",
        message: "Enter the ID of the Employee you would like to delete.",
      },
    ])
    //promise to return after user input
    .then((data) => {
      //setting the DELETE queery on the employee table where id is equal to the user input
      const query = "DELETE FROM employee WHERE ?";
      //object containing the table row title and user input
      const deleteEmp = {
        id: data.empID,
      };
      //query string to concatenate the manager name and display the employees that report to that manager joining role by role id to employee, department by department id onto role, and an inner join on employee
      connection.query(query, deleteEmp, (err, res) => {
        //error handling
        if (err) throw err;
        //console success message
        console.log("This Employee has been deleted from the company records.");
        //returning the program to the file containing the inquirer prompts
        inquireMod.prompts();
      });
    });
}

//function to view entire company budget by department
function viewCompanyBudget() {
  //query logic to get Department, SUM salary from employee with joins on role table at role id, and on department table at department id from role table
  const query = `SELECT department.name AS Department, SUM(role.salary) AS Dept_Budget FROM employee
    LEFT JOIN role ON employee.role_id = role.id
    LEFT JOIN department ON role.department_id = department.id
    GROUP BY department.name;`;
    //query string to concatenate the manager name and display the employees that report to that manager joining role by role id to employee, department by department id onto role, and an inner join on employee
  connection.query(query, (err, res) => {
    //error handling
    if (err) throw err;
    //generating a table from the returned information
    const table = cTable.getTable(res);
    //sending the table to the console
    console.log(table);
    //returning the program to the inquirer prompts file
    inquireMod.prompts();
  });
}

//function to view a single department and its budget for salary
function viewTotalBudgetDept() {
  //calling inquirer
  inquirer
  //function to collect user input
    .prompt([
      //collecting the department name that the user wants to see budget 
      {
        name: "deptName",
        type: "input",
        message:
          "Please enter the name of the Department to see its budget utilization.",
      },
    ])
    //promise to do aftr inquirer prompts collect user information
    .then((data) => {
      //query logic to get department and sum salary from employee with joins on role at role id, and on department at department id
      const query = `SELECT department.name AS Department, SUM(role.salary) AS Dept_Budget FROM employee
      LEFT JOIN role on employee.role_id = role.id
      LEFT JOIN department ON role.department_id = department.id
      WHERE ?;`;
//object containing the table row title and user input for the request
      const queryDept = {
        name: data.deptName,
      };
      //query string to concatenate the manager name and display the employees that report to that manager joining role by role id to employee, department by department id onto role, and an inner join on employee
      connection.query(query, queryDept, (err, res) => {
        //error handling
        if (err) throw err;
        //generating a table from the returned information
        const table = cTable.getTable(res);
        //sending the table to the console
        console.log(table);
        //returning the program to the inquirer prompts file
        inquireMod.prompts();
      });
    });
}

//exporting the functions fromm this module for use by other modules
module.exports = {
  create: addEmployee,
  read: viewEmployees,
  empByMan: viewEmployeesByManager,
  empByDept: viewEmployeesByDepartment,
  companyBudget: viewCompanyBudget,
  deptBudget: viewTotalBudgetDept,
  updateRole: updateEmpRole,
  updateMan: updateEmpManager,
  delete: deleteEmployee,
};
