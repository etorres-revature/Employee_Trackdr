const mysql = require("mysql");
const cTable = require("console.table");
const connection = require("./connection");
const inquirer = require("./inquirerPrompts");

function viewRoles() {
    const query = "SELECT * FROM role";
    connection.query(query, (err, res) => {
      if (err) throw err;
      const table = cTable.getTable(res);
      console.log(table);
      inquirer.prompts();
    });
  }

  function addRole() {
    inquirer
      .prompt([
        {
          name: "title",
          type: "input",
          message: "Please input the title for the new role.",
        },
        {
          name: "salary",
          type: "input",
          message: "Please input the salary for the new role.",
        },
        {
          name: "department_id",
          type: "input",
          message: "Please input the Department ID for the new role.",
        },
      ])
      .then((data) => {
        const query = "INSERT INTO role SET ?";
        const newRole = {
          title: data.title,
          salary: data.salary,
          department_id: data.department_id,
        };
        connection.query(query, newRole, (err, res) => {
          if (err) throw err;
          console.log("New Role successfully added.");
          inquirer.prompts();
        });
      });
  }

  function updateRole() {
    inquirer
      .prompt([
        {
          name: "employee",
          type: "input",
          message:
            "Enter the ID of the Employee whose Role you would like to update.",
        },
        {
          name: "role",
          type: "input",
          message: "Enter the new Role ID for this Employee.",
        },
      ])
      .then((data) => {
        const query = "UPDATE employee SET ? WHERE ?";
        const newRole = [
          {
            role_id: data.role,
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

  function deleteRole() {
    inquirer
      .prompt([
        {
          name: "role",
          type: "input",
          message: "Enter the title of the Role you would like to delete.",
        },
      ])
      .then((data) => {
        const query = "DELETE FROM role WHERE ?";
        const deleteRole = {
          title: data.role,
        };
        connection.query(query, deleteRole, (err, res) => {
          if (err) throw err;
          console.log("This Role has been deleted from the company records.");
          inquirer.prompts();
        });
      });
  }

module.exports = {
    create: addRole,
    read: viewRoles,
    update: updateRole,
    delete: deleteRole
}