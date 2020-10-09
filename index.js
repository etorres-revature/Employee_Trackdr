//import dependencies
//local file with the npm inquirer library prompts
const inquirer = require("./assets/lib/inquirerPrompts");
//local file with the connection informaiton for the MySQL database
const connection = require("./assets/lib/connection");

//connect to the MySQL server, and call for inquirer prompts when connected\
//this inquirer variable doesn't point to the npm inquirer library, but a local file with the inquirer function in it
connection.connect((err) => {
  if (err) throw err;
  inquirer.prompts();
});
