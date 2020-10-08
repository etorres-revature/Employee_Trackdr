const mysql = require("mysql");
const cTable = require("console.table");
const connection = require("./connection");
const inquirer = require("./inquirer")

function viewEmployees() {
    const query = "SELECT * FROM employee";
    connection.query(query, (err, res) => {
      if (err) throw err;
      const table = cTable.getTable(res);
      console.log(table);
      inquirer.prompts();
    });
  }
  
  
  function addEmployee() {
    inquirer
      .prompt([
        {
          name: "empFName",
          type: "input",
          message: "Please input new employee's first name.",
        },
        {
          name: "empLName",
          type: "input",
          message: "Please input the new employee's last name.",
        },
        {
          name: "empRole",
          type: "input",
          message: "Please input the Role ID for the new employee.",
        },
        {
          name: "empManager",
          type: "input",
          message:
            "Please input Employee ID of the new employee (Please leave blank if the employee is a manager).",
        },
      ])
      .then((data) => {
        const query = "INSERT INTO employee SET ?";
        const newEmp = {
          first_name: data.empFName,
          last_name: data.empLName,
          role_id: data.empRole,
          manager_id: data.empManager,
        };
        connection.query(query, newEmp, (err, res) => {
          if (err) throw err;
          console.log("New Employee successfully added.");
          inquirer.prompts();
        });
      });
  }
  
  function updateManager() {
    inquirer
      .prompt([
        {
          name: "employee",
          type: "input",
          message:
            "Enter the ID of the Employee whose Manager you would like to update.",
        },
        {
          name: "manager",
          type: "input",
          message: "Enter the new Manager ID for this Employee.",
        },
      ])
      .then((data) => {
        const query = "UPDATE employee SET ? WHERE ?";
        const newRole = [
          {
            manager_id: data.manager,
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
  
  function viewEmployeesByManager() {
    const query = `SELECT CONCAT(e2.first_name, " ", e2.last_name) AS Manager, e1.id AS EMPID, e1.first_name AS FName, e1.last_name AS LName, role.title AS Title, department.name AS Department, role.salary AS Salary FROM employee AS e1
      LEFT JOIN role on e1.role_id = role.id
      LEFT JOIN department ON role.department_id = department.id
      INNER JOIN employee AS e2 on e2.id=e1.manager_id
      ORDER BY manager ASC;`;
    connection.query(query, (err, res) => {
      if (err) throw err;
      const table = cTable.getTable(res);
      console.log(table);
      inquirer.prompts();
    });
  }
  
  function viewEmployeesByDepartment() {
      const query = `SELECT e1.id AS EMPID, e1.first_name AS FName, e1.last_name AS LName, role.title AS Title, department.name AS Department, role.salary AS Salary, CONCAT(e2.first_name, " ", e2.last_name) AS Manager FROM employee AS e1
      LEFT JOIN role on e1.role_id = role.id
      LEFT JOIN department ON role.department_id = department.id
      LEFT JOIN employee AS e2 on e2.id=e1.manager_id
      ORDER BY department ASC;`;
    connection.query(query, (err, res) => {
      if (err) throw err;
      const table = cTable.getTable(res);
      console.log(table);
      inquirer.prompts();
    });
  }

  function deleteEmployee() {
    inquirer
      .prompt([
        {
          name: "empID",
          type: "input",
          message: "Enter the ID of the Employee you would like to delete.",
        },
      ])
      .then((data) => {
        const query = "DELETE FROM employee WHERE ?";
        const deleteEmp = {
          id: data.empID,
        };
        connection.query(query, deleteEmp, (err, res) => {
          if (err) throw err;
          console.log("This Employee has been deleted from the company records.");
          inquirer.prompts();
        });
      });
  }
  
  function viewTotalBudgetDept() {}
  

module.exports = {
    create: addEmployee,
    read: viewEmployees,
    empByMan: viewEmployeesByManager,
    empByDept: viewEmployeesByDepartment,
    empByBudget: viewTotalBudgetDept,
    updateMan: updateManager,
    delete: deleteEmployee
};