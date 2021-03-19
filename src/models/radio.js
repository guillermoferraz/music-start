const {Schema, model} = require('mongoose');

const radioSchema = new Schema({
  r_link: {
      type: String,
      required: true,

  },
  r_name: {
    type: String,
    required: true,

  },
  r_description: {
    type: String,
    required: false,
  },
  user: {
    type: String
  }

}, {
  timestamps: true
});

module.exports = model('Radio', radioSchema);
