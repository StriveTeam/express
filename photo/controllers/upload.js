var Photo = require("../models/Photo");
var path = require("path");
var multiparty = require("multiparty");
var fs = require("fs");
var join = path.join;

class UploadController {
  static async uploadFn(req, res, next) {
    // console.log(ctx.request);
    // const re = ctx.request.body;
    // console.log(re);
    // var data = {
    //   name: 112,
    //   file: 333,
    // };
    // res.send({
    //   code: "200",
    //   msg: `上传文件`,
    //   result: data,
    // });
    // return;

    var form = new multiparty.Form();
    form.parse(req, function (err, fields, files) {
      if (err) {
        console.log("上传失败", err);
      } else {
        console.log("上传成功", files);
        var file = files.file[0];
        var rs = fs.createReadStream(file.path);
        var newPath = "/images/" + file.originalFilename;
        var ws = fs.createWriteStream("./public" + newPath);
        rs.pipe(ws);
        ws.on("close", function () {
          console.log("文件上传成功");
          res.send({
            err: "",
            msg: newPath,
          });
        });
      }
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
