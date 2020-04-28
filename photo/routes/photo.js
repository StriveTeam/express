var express = require("express");
var router = express.Router();
var Photo = require("../models/Photo");
var path = require("path");
var fs = require("fs");
var join = path.join;
var fileController = require("../controllers/upload");

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
router.post("/uploads", fileController.submit);
module.exports = router;
