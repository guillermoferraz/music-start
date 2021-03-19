const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/MusicStart', {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
})

  .then(db => console.log('Data base Music Start is connected'))
  .catch(err => console.log('err'));
