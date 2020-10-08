const mysql = require("mysql");
const cTable = require("console.table");
const connection = require("./connection");
const inquirer = require("./inquirer")

function viewDepts() {
    const query = "SELECT * FROM department";
    connection.query(query, (err, res) => {
      if (err) throw err;
      const table = cTable.getTable(res);
      console.log(table);
      inquirer.prompts();
    });
  }

  function addDept() {
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
          name: data.newDepartment,
        };
        connection.query(query, newDept, (err, res) => {
          if (err) throw err;
          console.log("New Department successfully added!");
          inquirer.prompts();
        });
      });
  }

  function updateDept() {
    inquirer
      .prompt([
        {
          name: "employee",
          type: "input",
          message:
            "Enter the ID of the Employee whose Manager you would like to update.",
        },
        {
          name: "department",
          type: "input",
          message: "Enter the new Department ID for this Employee.",
        },
      ])
      .then((data) => {
        const query = "UPDATE employee SET ? WHERE ?";
        const newRole = [
          {
            id: data.department,
          },
          {
            id: data.employee,
          },
        ];
        connection.query(query, newRole, (err, res) => {
          if (err) throw err;
          inquirer.prompts();
        });
      });
  }

  function deleteDept() {
    inquirer
      .prompt([
        {
          name: "department",
          type: "input",
          message: "Enter the name of the Department you would like to delete.",
        },
      ])
      .then((data) => {
        const query = "DELETE FROM department WHERE ?";
        const deleteDept = {
          name: data.department,
        };
        connection.query(query, deleteDept, (err, res) => {
          if (err) throw err;
          console.log(
            "This Department has been deleted from the company records."
          );
          inquirer.prompts();
        });
      });
  }

  module.exports = {
      create: addDept,
      read: viewDepts,
      update: updateDept,
      delete: deleteDept
  }