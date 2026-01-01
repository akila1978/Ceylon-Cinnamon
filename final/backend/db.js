const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: "mysql-3e42a36-kumarasadun886-aff5.l.aivencloud.com",
  user: "avnadmin",
  password: "AVNS_UidiEFQNZqB0CY6kKrF",
  database: "goo",
  port: 27589,
  ssl: {
    rejectUnauthorized: false
  }
});

connection.connect(err => {
  if (err) {
    console.error("Database connection failed: " + err.stack);
    return;
  }
  console.log("MySQL Connected to Aiven Cloud Successfully!");
});

module.exports = connection;