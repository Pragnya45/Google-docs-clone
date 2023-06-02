const { ObjectId } = require("mongodb");
var mongoose = require("mongoose");

var blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    maxlength: 32,
    trim: true,
  },
  content: {
    type: String,
    //required: true,
    maxlength: 2000,
    trim: true,
  },
  userId: {
    type: ObjectId,
    ref: "User",
    required: true,
  },
});

module.exports = mongoose.model("Blog", blogSchema);
