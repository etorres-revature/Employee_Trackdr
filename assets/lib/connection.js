const mysql = require("mysql");

//create/configure connection to the MySQL database
const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "",
  database: "company_db",
});

module.exports = connection;
