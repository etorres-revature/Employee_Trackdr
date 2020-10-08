//import dependencies
const inquirer = require("./assets/lib/inquirerPrompts");
const connection = require("./assets/lib/connection");

//connect to the MySQL server, and call for inquirere prompts when connected
connection.connect((err) => {
    if (err) throw err;
    inquirer.prompts();
  });