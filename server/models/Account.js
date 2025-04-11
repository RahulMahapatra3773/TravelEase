const mongoose = require('mongoose');
const accountSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  loggedInEmail: { type: String },
  name: { type: String },
  mobile: { type: String },
  gender: { type: String },
  dob: { type: Date },
  address: { type: String },
  profilePic: { type: String },
}, { timestamps: true });
const AccountModel = mongoose.model('Account', accountSchema);
module.exports = AccountModel;
