var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/photo_app", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
var schema = new mongoose.Schema({
  name: String,
  path: String,
});
module.exports = mongoose.model("Photo", schema);

// Mongoose的模型上有所有的CRUD方法（Photo.create、Photo.update、Photo.remove 和Photo.find），所以这样就搞定了
