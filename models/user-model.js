const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    firstName: String,
    lastName: String,
    picture: String,
    email: {
      type: String,
      required: true
    },
    members: [{
      type: String,
      default: ''
    }],
    password: {
      type: String,
      required: true
    },
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Users", userSchema);