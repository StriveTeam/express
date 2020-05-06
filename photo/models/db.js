const mysql = require("mysql");
var pool = mysql.createPool({
  connectionLimit: 10,
  host: "127.0.0.1",
  user: "root",
  password: "123456",
  database: "express",
});

// db.query("select* from fileupload", function (error, results, fields) {
//   if (error) throw error;
//   // connected!
//   console.log(results);
// });
module.exports = {
  connPool (sql, val, cb) {
      pool.getConnection((err, conn) => {
          conn.query(sql, val, (err, rows) => {
              if (err) {
                  console.log(err);
              }
              console.log(rows)
              cb(err, rows);
              conn.release();
          });
      });
  },

  // json格式
  writeJson(res, code = 200, msg = 'ok', data = null) {
      let obj = {code, msg, data};

      if (!data) {
          delete obj.data;
      }

      res.send(obj);
  },
};

// module.exports.pool = pool;
