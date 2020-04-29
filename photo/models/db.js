const mysql = require("mysql");
var db = mysql.createPool({
  connectionLimit: 10,
  host: "127.0.0.1",
  user: "root",
  password: "123456",
  database: "express",
});

db.query("select* from fileupload", function (error, results, fields) {
  if (error) throw error;
  // connected!
  console.log(results);
});

module.exports.db = db;
