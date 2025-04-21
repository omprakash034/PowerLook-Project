const mongoose = require("mongoose");
const { type } = require("os");

const userSchema = new mongoose.Schema({
  firstName: {type: String},
  lastName: {type: String},
  email: {type: String, required: true},
  dob: {type: String},
  alt_number: {type: String},
  number: {type: String},
  gender: {
    type: String,
    enum: ['MALE', 'FEMALE', 'TRANSGENDER'],
  },
  role: {
    type: String,
    enum: ['USER','ADMIN', 'UNDERWRITER'],
  },

  address: [ {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'address'
      }],

  createdDate:{ type: Date, default: Date.now },
})

const User = mongoose.model("user", userSchema)
module.exports = User;