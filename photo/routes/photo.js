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

router.get("/photo", UploadController.uploadList);
router.get("/upload", form);
router.post("/uploads", UploadController.uploadFn);
module.exports = router;
