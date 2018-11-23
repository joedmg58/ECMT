var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var userSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, require: true },
  role: String, // the values will be 'user' or 'manager'
  date: { type: Date, default: Date.now }
});

var User = mongoose.model("User", userSchema);

module.exports = User;
