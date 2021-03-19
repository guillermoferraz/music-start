const { Schema, model } = require('mongoose');
const avatarSchema = new Schema({
  filename: { type: String },
  originalname: { type: String },
  path: { type: String },
  size: { type: String },
  user: { type: String },
  alias: {type: String  }
}, {
    timestamps: true
});

module.exports = model('avatar', avatarSchema)
