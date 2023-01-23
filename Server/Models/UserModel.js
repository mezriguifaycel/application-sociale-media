const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
  name: String,
  email: {
    type: String,
    required: true,
    unique: true,
  },

  nationalite: String,

  password: {
    type: String,
    required: true,
  },
  Img: {
    type: mongoose.Schema.Types.Mixed,
  },
  Role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
});

module.exports = mongoose.model('AuthUser1',UserSchema)