var express = require("express");
var router = express.Router();
// var Photo = require("../models/Photo");
var path = require("path");
var multiparty = require('multiparty');
var fs = require("fs");
var join = path.join;
var UploadController = require("../controllers/upload");

var photos = [];
photos.push({
  name: "Node.js Logo",
  path: "https://nodejs.org/images/logos/nodejs-green.png",
});
photos.push({
  name: "Node.js speaker",
  path: "https://nodejs.org/images/ryan-speaker.jpg",
});

const list = function (req, res) {
  res.render("photos", {
    title: "photo",
    photos: photos,
  });
};
const form = function (req, res) {
  res.render("photos/upload", {
    title: "photo upload",
  });
};

router.get("/photo", list);
router.get("/upload", form);
// router.post("/uploads", UploadController.uploadFn);
router.post("/uploads", function (req, res, next) {
  var form = new multiparty.Form();
  form.parse(req, function(err, fields, files) {
    if(err) {
      console.log('上传失败', err)
    } else {
      console.log('上传成功', files)
      var file = files.file[0]
      var rs = fs.createReadStream(file.path)
      var newPath = '/images/' + file.originalFilename
      var ws = fs.createWriteStream('./public' + newPath)
      rs.pipe(ws)
      ws.on('close', function() {
        console.log('文件上传成功')
        res.send({
          err: '',
          msg: newPath
        })
      })
    }
  });
  // res.send(data);
});
module.exports = router;
