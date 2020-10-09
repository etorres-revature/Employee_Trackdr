const cTable = require("console.table");
const connection = require("./connection");
const inquireMod = require("./inquirerPrompts");
const inquirer = require("inquirer");

function viewDepts() {
    const query = "SELECT * FROM department";
    connection.query(query, (err, res) => {
      if (err) throw err;
      const table = cTable.getTable(res);
      console.log(table);
      inquireMod.prompts();
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
          inquireMod.prompts();
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
          inquireMod.prompts();
        });
      });
  }

  module.exports = {
      create: addDept,
      read: viewDepts,
      delete: deleteDept
  }