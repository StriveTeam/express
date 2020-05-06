var Photo = require("../models/Photo");
var path = require("path");
var multiparty = require("multiparty");
var fs = require("fs");
var join = path.join;
const pool = require("../models/db.js");

class UploadController {
  static async uploadFn(req, res, next) {
    var form = new multiparty.Form();
    form.parse(req, function (err, fields, files) {
      if (err) {
        console.log("上传失败", err);
        res.json({
          code: 500,
          err,
        });
      } else {
        console.log("上传成功", files);
        var file = files.file[0];
        var rs = fs.createReadStream(file.path);
        var newPath = "/images/" + file.originalFilename;
        var ws = fs.createWriteStream("./public" + newPath);
        rs.pipe(ws);
        ws.on("close", function () {
          console.log("文件上传成功");
          const sql = `INSERT INTO fileupload SET filePath = ?`;
          pool.connPool(sql, newPath, (err, rows) => {
            if (err) {
              console.log(err);
              return;
            }
            res.redirect("/photo");
            // res.json({
            //   code: 200,
            //   msg: "ok",
            //   result: { fileId: rows.insertId, filePath: newPath },
            // });
          });
        });
      }
    });
  }
  static async uploadList(req, res, next) {
    const sql = "select * from fileupload";
    pool.connPool(sql, "", (err, rows) => {
      if (err) {
        console.log(err);
        return;
      }
      res.render("photos", {
        title: "photo",
        photos: rows,
      });
      // res.json({
      //   code: 200,
      //   msg: "ok",
      //   result: rows,
      // });
    });
  }
}

// exports.submit = function (dir) {
//   return function (req, res, next) {
//     var data = {
//       name: 112,
//       file: 333,
//     };
//     ctx.body = {
//       code: "200",
//       msg: `上传文件`,
//       result: data,
//     };
//     return;
//     // var img = req.files.photo.image;
//     // var name = req.body.photo.name || img.name;
//     // var path = join(dir, img.name);

//     // // 重命名文件
//     // fs.rename(img.path, path, function (err) {
//     //   if (err) return next(err);
//     //   Photo.create(
//     //     {
//     //       name: name,
//     //       path: img.path,
//     //     },
//     //     function (err) {
//     //       if (err) return next(err);
//     //       res.redirect("/photo");
//     //     }
//     //   );
//     // });
//   };
// };

exports = module.exports = UploadController;
