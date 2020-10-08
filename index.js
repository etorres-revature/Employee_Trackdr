//import dependencies
const mysql = require("mysql");
const inquirer = require("inquirer");
const cTable = require("console.table");

//create/configure connection to the MySQL database
const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "",
    database: "company_db"
});

//connect to the MySQL server, and call for inquirere prompts when connected
connection.connect(err => {
    if (err) throw err;
    inquirerPrompt();
});