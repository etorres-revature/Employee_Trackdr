//import the mysql dependency to connect to the database
const mysql = require("mysql");

//create/configure connection to the MySQL database
const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "",
  database: "company_db",
});

//export of this file for use by other modules
module.exports = connection;
