const {Schema, model} = require('mongoose');

const videoSchema = new Schema({
  v_link: {
      type: String,
      required: true,
  },
  v_name: {
    type: String,
    required: true,
  },
  v_song: {
    type: String,
    required: true,

  },
  v_description: {
    type: String,
    required: false,

  },
  user: {
    type: String
  }
}, {
  timestamps: true
});

module.exports = model('Video', videoSchema);
