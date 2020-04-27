var express = require("express");
var router = express.Router();
var Photo = require("../models/Photo");
var path = require("path");
var fs = require("fs");
var join = path.join;

var photos = [];
photos.push({
  name: "Node.js Logo",
  path: "https://nodejs.org/images/logos/nodejs-green.png",
});
photos.push({
  name: "Node.js speaker",
  path: "https://nodejs.org/images/ryan-speaker.jpg",
});

exports.list = function (req, res) {
  res.render("photos", {
    title: "photo",
    photos: photos,
  });
};
exports.form = function (req, res) {
  res.render("photos/upload", {
    title: "photo upload",
  });
};

exports.submit = function (dir) {
  return function (req, res, next) {
    console.log(req);
    var img = req.files.photo.image;
    var name = req.body.photo.name || img.name;
    var path = join(dir, img.name);

    // 重命名文件
    fs.rename(img.path, path, function (err) {
      if (err) return next(err);
      Photo.create(
        {
          name: name,
          path: img.path,
        },
        function (err) {
          if (err) return next(err);
          // res.redirect("/photo");
        }
      );
    });
  };
};
